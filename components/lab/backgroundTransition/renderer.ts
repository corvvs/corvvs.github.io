// 実験用の極小 WebGL2 レンダラ。
// 方式ごとに fragment shader を 1 本ずつ持ち、遅延コンパイルして使い回す。
//
// テクスチャユニット: 0 = A, 1 = B, 2 = depth A, 3 = depth B, 4 = CPU 生成の中間像

import { LabParams, TransitionKind } from './config';
import { FRAGMENTS, VERT } from './shaders';
import { ImageStats, computeStats } from './stats';

export type LoadedImage = {
  url: string;
  img: HTMLImageElement;
  texture: WebGLTexture;
  width: number;
  height: number;
  stats: ImageStats;
};

export type LoadedDepth = {
  url: string;
  texture: WebGLTexture;
};

type Program = {
  program: WebGLProgram;
  uniforms: Map<string, WebGLUniformLocation | null>;
};

function compile(
  gl: WebGL2RenderingContext,
  type: number,
  src: string
) {
  const sh = gl.createShader(type);
  if (!sh) throw new Error('createShader failed');
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh);
    gl.deleteShader(sh);
    throw new Error(`shader compile failed: ${log}`);
  }
  return sh;
}

function link(
  gl: WebGL2RenderingContext,
  fragSrc: string
): Program {
  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, fragSrc);
  const program = gl.createProgram();
  if (!program) throw new Error('createProgram failed');
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.bindAttribLocation(program, 0, 'a_pos');
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(`program link failed: ${log}`);
  }
  return { program, uniforms: new Map() };
}

// background-size: cover 相当のクロップを UV 変換として求める。
function coverTransform(
  imgW: number,
  imgH: number,
  canvasW: number,
  canvasH: number
) {
  const ia = imgW / Math.max(imgH, 1);
  const ca = canvasW / Math.max(canvasH, 1);
  if (ia > ca) {
    const s = ca / ia;
    return {
      scale: [s, 1] as const,
      offset: [(1 - s) / 2, 0] as const,
    };
  }
  const s = ia / ca;
  return {
    scale: [1, s] as const,
    offset: [0, (1 - s) / 2] as const,
  };
}

export class TransitionRenderer {
  private gl: WebGL2RenderingContext;
  private vao: WebGLVertexArrayObject;
  private programs = new Map<TransitionKind, Program>();
  private textures = new Map<string, LoadedImage>();
  private depths = new Map<string, LoadedDepth>();
  private inflight = new Map<string, Promise<unknown>>();
  private dynTex: WebGLTexture;
  private dummyTex: WebGLTexture;
  private dynW = 0;
  private dynH = 0;

  constructor(canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl2', {
      alpha: false,
      antialias: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) {
      throw new Error(
        'WebGL2 が利用できません。この実験ページは WebGL2 が必要です。'
      );
    }
    this.gl = gl;

    const vao = gl.createVertexArray();
    const buf = gl.createBuffer();
    if (!vao || !buf)
      throw new Error('buffer allocation failed');
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.bindVertexArray(null);
    this.vao = vao;

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);

    this.dynTex = this.makeFlatTexture([0, 0, 0, 255]);
    this.dummyTex = this.makeFlatTexture([0, 0, 0, 255]);
  }

  private makeFlatTexture(rgba: number[]) {
    const gl = this.gl;
    const tex = gl.createTexture();
    if (!tex) throw new Error('createTexture failed');
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array(rgba)
    );
    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_MIN_FILTER,
      gl.LINEAR
    );
    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_MAG_FILTER,
      gl.LINEAR
    );
    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_WRAP_S,
      gl.CLAMP_TO_EDGE
    );
    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_WRAP_T,
      gl.CLAMP_TO_EDGE
    );
    gl.bindTexture(gl.TEXTURE_2D, null);
    return tex;
  }

  private programFor(kind: TransitionKind) {
    const hit = this.programs.get(kind);
    if (hit) return hit;
    const p = link(this.gl, FRAGMENTS[kind]);
    this.programs.set(kind, p);
    return p;
  }

  private loc(p: Program, name: string) {
    if (!p.uniforms.has(name)) {
      p.uniforms.set(
        name,
        this.gl.getUniformLocation(p.program, name)
      );
    }
    return p.uniforms.get(name) ?? null;
  }

  peekImage(url: string): LoadedImage | null {
    return this.textures.get(url) ?? null;
  }

  peekDepth(url: string): LoadedDepth | null {
    return this.depths.get(url) ?? null;
  }

  private loadElement(url: string) {
    const img = new Image();
    img.decoding = 'async';
    img.src = url;
    return img.decode().then(() => img);
  }

  // decode() まで待ってからテクスチャ化する。
  // 「読み込み途中の絵が遷移の一部に見えてしまう」のを避けるのが目的。
  ensureImage(url: string): Promise<LoadedImage> {
    const done = this.textures.get(url);
    if (done) return Promise.resolve(done);
    const pending = this.inflight.get(url);
    if (pending) return pending as Promise<LoadedImage>;

    const task = this.loadElement(url).then((img) => {
      const gl = this.gl;
      const texture = gl.createTexture();
      if (!texture)
        throw new Error('createTexture failed');
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        img
      );
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MIN_FILTER,
        gl.LINEAR_MIPMAP_LINEAR
      );
      gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MAG_FILTER,
        gl.LINEAR
      );
      gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_WRAP_S,
        gl.CLAMP_TO_EDGE
      );
      gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_WRAP_T,
        gl.CLAMP_TO_EDGE
      );
      gl.bindTexture(gl.TEXTURE_2D, null);

      const loaded: LoadedImage = {
        url,
        img,
        texture,
        width: img.naturalWidth,
        height: img.naturalHeight,
        stats: computeStats(img),
      };
      this.textures.set(url, loaded);
      this.inflight.delete(url);
      return loaded;
    });

    this.inflight.set(url, task);
    task.catch(() => this.inflight.delete(url));
    return task;
  }

  ensureDepth(url: string): Promise<LoadedDepth> {
    const done = this.depths.get(url);
    if (done) return Promise.resolve(done);
    const pending = this.inflight.get(url);
    if (pending) return pending as Promise<LoadedDepth>;

    const task = this.loadElement(url).then((img) => {
      const gl = this.gl;
      const texture = gl.createTexture();
      if (!texture)
        throw new Error('createTexture failed');
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        img
      );
      gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MIN_FILTER,
        gl.LINEAR
      );
      gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MAG_FILTER,
        gl.LINEAR
      );
      gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_WRAP_S,
        gl.CLAMP_TO_EDGE
      );
      gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_WRAP_T,
        gl.CLAMP_TO_EDGE
      );
      gl.bindTexture(gl.TEXTURE_2D, null);

      const loaded: LoadedDepth = { url, texture };
      this.depths.set(url, loaded);
      this.inflight.delete(url);
      return loaded;
    });

    this.inflight.set(url, task);
    task.catch(() => this.inflight.delete(url));
    return task;
  }

  // Fourier の中間像を毎フレーム流し込む
  uploadDynamic(data: ImageData) {
    const gl = this.gl;
    gl.activeTexture(gl.TEXTURE4);
    gl.bindTexture(gl.TEXTURE_2D, this.dynTex);
    if (
      data.width !== this.dynW ||
      data.height !== this.dynH
    ) {
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        data.width,
        data.height,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        data.data
      );
      this.dynW = data.width;
      this.dynH = data.height;
    } else {
      gl.texSubImage2D(
        gl.TEXTURE_2D,
        0,
        0,
        0,
        data.width,
        data.height,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        data.data
      );
    }
  }

  resize(cssW: number, cssH: number, scale: number) {
    const canvas = this.gl.canvas as HTMLCanvasElement;
    const w = Math.max(1, Math.round(cssW * scale));
    const h = Math.max(1, Math.round(cssH * scale));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    this.gl.viewport(0, 0, w, h);
  }

  clear() {
    const gl = this.gl;
    gl.clearColor(0.04, 0.05, 0.09, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  get canvasAspect() {
    const c = this.gl.canvas as HTMLCanvasElement;
    return c.width / Math.max(c.height, 1);
  }

  render(
    a: LoadedImage,
    b: LoadedImage,
    depthA: LoadedDepth | null,
    depthB: LoadedDepth | null,
    t: number,
    p: LabParams
  ) {
    const gl = this.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    const cw = canvas.width;
    const ch = canvas.height;

    const prog = this.programFor(p.kind);
    gl.useProgram(prog.program);
    gl.bindVertexArray(this.vao);

    const ta = coverTransform(a.width, a.height, cw, ch);
    const tb = coverTransform(b.width, b.height, cw, ch);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, a.texture);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, b.texture);
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(
      gl.TEXTURE_2D,
      depthA ? depthA.texture : this.dummyTex
    );
    gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(
      gl.TEXTURE_2D,
      depthB ? depthB.texture : this.dummyTex
    );
    gl.activeTexture(gl.TEXTURE4);
    gl.bindTexture(gl.TEXTURE_2D, this.dynTex);

    const u1 = (n: string, v: number) =>
      gl.uniform1f(this.loc(prog, n), v);
    const ui = (n: string, v: number) =>
      gl.uniform1i(this.loc(prog, n), v);
    const u2 = (n: string, x: number, y: number) =>
      gl.uniform2f(this.loc(prog, n), x, y);
    const u3 = (n: string, v: ArrayLike<number>) =>
      gl.uniform3f(this.loc(prog, n), v[0], v[1], v[2]);

    ui('uTexA', 0);
    ui('uTexB', 1);
    ui('uDepthA', 2);
    ui('uDepthB', 3);
    ui('uTexC', 4);
    u2('uScaleA', ta.scale[0], ta.scale[1]);
    u2('uOffsetA', ta.offset[0], ta.offset[1]);
    u2('uScaleB', tb.scale[0], tb.scale[1]);
    u2('uOffsetB', tb.offset[0], tb.offset[1]);
    u2('uSizeA', a.width, a.height);
    u2('uSizeB', b.width, b.height);
    u2('uResolution', cw, ch);
    u1('uT', t);

    switch (p.kind) {
      case 'crossfade':
        u1(
          'uLinearLight',
          p.crossfadeLinearLight ? 1 : 0
        );
        break;
      case 'freqsep':
        u1('uSigma', p.freqSigma);
        u1('uHiAEnd', p.freqHiAEnd);
        u1('uLoStart', p.freqLoStart);
        u1('uLoEnd', p.freqLoEnd);
        u1('uHiBStart', p.freqHiBStart);
        u1('uHiGain', p.freqHiGain);
        u1('uLinearLow', p.freqLinearLow ? 1 : 0);
        ui(
          'uView',
          p.freqView === 'low'
            ? 1
            : p.freqView === 'high'
            ? 2
            : 0
        );
        break;
      case 'fourier':
        u1('uStrength', p.fourStrength);
        u1('uEdgeFade', p.fourEdgeFade);
        break;
      case 'palette':
        u3('uMeanA', a.stats.oklabMean);
        u3('uStdA', a.stats.oklabStd);
        u3('uMeanB', b.stats.oklabMean);
        u3('uStdB', b.stats.oklabStd);
        u1('uPalStart', p.palStart);
        u1('uPalEnd', p.palEnd);
        u1('uStructStart', p.palStructStart);
        u1('uStructEnd', p.palStructEnd);
        u1('uLumaStrength', p.palLuma);
        u1('uChromaStrength', p.palChroma);
        u1('uAmount', p.palAmount);
        ui('uView', p.palView === 'palette' ? 1 : 0);
        break;
      case 'depth':
        u1('uNearFirst', p.depthNearFirst ? 1 : 0);
        u1('uFeather', p.depthFeather);
        u1('uCurve', p.depthCurve);
        u1('uContrast', p.depthContrast);
        ui('uView', p.depthView === 'depth' ? 1 : 0);
        break;
      case 'edge':
        u1('uThreshold', p.edgeThreshold);
        u1('uWidth', p.edgeWidth);
        u1('uPersistence', p.edgePersistence);
        u1('uFeather', p.edgeFeather);
        u1('uGain', p.edgeGain);
        u1('uUseBEdges', p.edgeUseB ? 1 : 0);
        ui('uView', p.edgeView === 'mask' ? 1 : 0);
        break;
      case 'contour': {
        const quant =
          p.contourSource === 1
            ? b.stats.quant
            : a.stats.quant;
        gl.uniform1fv(this.loc(prog, 'uQuant'), quant);
        ui('uSource', p.contourSource);
        u1(
          'uLightFirst',
          p.contourLightFirst ? 1 : 0
        );
        u1('uFeather', p.contourFeather);
        u1('uCurve', p.contourCurve);
        u1('uNoise', p.contourNoise);
        u1('uNoiseScale', p.contourNoiseScale);
        u1('uEqualize', p.contourEqualize ? 1 : 0);
        ui('uView', p.contourView === 'source' ? 1 : 0);
        break;
      }
    }

    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.bindVertexArray(null);
  }

  dispose() {
    const gl = this.gl;
    this.programs.forEach((p) =>
      gl.deleteProgram(p.program)
    );
    this.programs.clear();
    this.textures.forEach((t) =>
      gl.deleteTexture(t.texture)
    );
    this.textures.clear();
    this.depths.forEach((d) =>
      gl.deleteTexture(d.texture)
    );
    this.depths.clear();
    gl.deleteTexture(this.dynTex);
    gl.deleteTexture(this.dummyTex);
    gl.deleteVertexArray(this.vao);
  }
}
