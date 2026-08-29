// 背景画像切り替えの遷移 (Frequency Separation) の本番実装。
//
// /lab/background-transition で比較した結果この方式を採用した。
// 実験室側 (components/lab/backgroundTransition) は使い捨て前提で今後も
// 書き換わるため、本番はそこに依存せず必要な分だけをここに持っている。
// パラメータは実験室の既定値と同じ。
//
// A の細部を先に落とし、大構造を中盤で入れ替え、B の細部を最後に立ち上げる。

export const FreqSepParams = {
  durationMs: 300,
  fadeOutMs: 90, // 遷移完了後、canvas を CSS 背景へ引き渡すまでの時間
  sigma: 14, // 低周波のぼかし半径 (画面ピクセル)
  hiAEnd: 0.35, // A の細部が消えきる時刻
  loStart: 0.2, // 大構造の入れ替え開始
  loEnd: 0.8, // 大構造の入れ替え終了
  hiBStart: 0.62, // B の細部が立ち上がり始める時刻
  hiGain: 1,
  maxPixels: 4_200_000, // これを超えないよう描画解像度を落とす
};

export const easeInOutSine = (t: number) =>
  -(Math.cos(Math.PI * t) - 1) / 2;

const VERT = `#version 300 es
in vec2 a_pos;
out vec2 v_uv;
void main() {
  v_uv = vec2(a_pos.x * 0.5 + 0.5, 0.5 - a_pos.y * 0.5);
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 outColor;

uniform sampler2D uTexA;
uniform sampler2D uTexB;
uniform vec2 uScaleA;
uniform vec2 uOffsetA;
uniform vec2 uScaleB;
uniform vec2 uOffsetB;
uniform vec2 uSizeA;
uniform vec2 uSizeB;
uniform vec2 uResolution;
uniform float uT;
uniform float uSigma;
uniform float uHiAEnd;
uniform float uLoStart;
uniform float uLoEnd;
uniform float uHiBStart;
uniform float uHiGain;

float remap01(float x, float a, float b) {
  return clamp((x - a) / max(b - a, 1e-5), 0.0, 1.0);
}

// 低周波。ミップから拾った LOD をその段で 5x5 ガウスに掛けて均す。
vec3 lowFreqAt(
  sampler2D tex, vec2 imgSize, vec2 scale, vec2 offset, vec2 p
) {
  float imgPxPerScreenPx = imgSize.x * scale.x / max(uResolution.x, 1.0);
  float lod = max(0.0, log2(max(uSigma, 1.0) * imgPxPerScreenPx * 0.5));
  vec2 texel = exp2(lod) / imgSize;
  vec2 base = p * scale + offset;

  vec3 acc = vec3(0.0);
  float wsum = 0.0;
  for (int j = -2; j <= 2; j++) {
    for (int i = -2; i <= 2; i++) {
      vec2 o = vec2(float(i), float(j));
      float w = exp(-0.5 * dot(o, o) / (1.5 * 1.5));
      acc += textureLod(tex, base + o * texel, lod).rgb * w;
      wsum += w;
    }
  }
  return acc / wsum;
}

void main() {
  vec3 a = texture(uTexA, v_uv * uScaleA + uOffsetA).rgb;
  vec3 b = texture(uTexB, v_uv * uScaleB + uOffsetB).rgb;
  vec3 la = lowFreqAt(uTexA, uSizeA, uScaleA, uOffsetA, v_uv);
  vec3 lb = lowFreqAt(uTexB, uSizeB, uScaleB, uOffsetB, v_uv);

  float wA = 1.0 - smoothstep(0.0, max(uHiAEnd, 1e-3), uT);
  float wB = smoothstep(min(uHiBStart, 0.999), 1.0, uT);
  float tLo = smoothstep(0.0, 1.0, remap01(uT, uLoStart, uLoEnd));

  vec3 lo = mix(la, lb, tLo);
  vec3 hi = ((a - la) * wA + (b - lb) * wB) * uHiGain;
  outColor = vec4(clamp(lo + hi, 0.0, 1.0), 1.0);
}`;

export type LoadedImage = {
  url: string;
  texture: WebGLTexture;
  width: number;
  height: number;
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
    return { sx: s, sy: 1, ox: (1 - s) / 2, oy: 0 };
  }
  const s = ia / ca;
  return { sx: 1, sy: s, ox: 0, oy: (1 - s) / 2 };
}

export class FreqSepRenderer {
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram;
  private vao: WebGLVertexArrayObject;
  private uniforms = new Map<
    string,
    WebGLUniformLocation | null
  >();
  private textures = new Map<string, LoadedImage>();
  private inflight = new Map<
    string,
    Promise<LoadedImage>
  >();

  // WebGL2 が使えない環境では null を返す。呼び出し側は CSS 背景だけで動く。
  static create(
    canvas: HTMLCanvasElement
  ): FreqSepRenderer | null {
    try {
      return new FreqSepRenderer(canvas);
    } catch {
      return null;
    }
  }

  private constructor(canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl2', {
      alpha: false,
      antialias: false,
      premultipliedAlpha: false,
      // 遷移中しか描かないので、最後のフレームが残るようにしておく
      preserveDrawingBuffer: true,
    });
    if (!gl) throw new Error('webgl2 unavailable');
    this.gl = gl;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
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
    this.program = program;

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
  }

  private loc(name: string) {
    if (!this.uniforms.has(name)) {
      this.uniforms.set(
        name,
        this.gl.getUniformLocation(this.program, name)
      );
    }
    return this.uniforms.get(name) ?? null;
  }

  has(url: string) {
    return this.textures.has(url);
  }

  // decode() の完了まで待ってからテクスチャ化する。
  // 読み込み途中の絵が遷移に混ざらないようにするため。
  ensureImage(url: string): Promise<LoadedImage> {
    const done = this.textures.get(url);
    if (done) return Promise.resolve(done);
    const pending = this.inflight.get(url);
    if (pending) return pending;

    const task = (async () => {
      const img = new Image();
      img.decoding = 'async';
      img.src = url;
      await img.decode();

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
        texture,
        width: img.naturalWidth,
        height: img.naturalHeight,
      };
      this.textures.set(url, loaded);
      this.inflight.delete(url);
      return loaded;
    })();

    this.inflight.set(url, task);
    task.catch(() => this.inflight.delete(url));
    return task;
  }

  private resize(cssW: number, cssH: number) {
    const canvas = this.gl.canvas as HTMLCanvasElement;
    const dpr = Math.min(
      typeof window === 'undefined'
        ? 1
        : window.devicePixelRatio || 1,
      2
    );
    let scale = dpr;
    const budget = FreqSepParams.maxPixels;
    if (cssW * cssH * scale * scale > budget) {
      scale = Math.sqrt(budget / Math.max(cssW * cssH, 1));
    }
    const w = Math.max(1, Math.round(cssW * scale));
    const h = Math.max(1, Math.round(cssH * scale));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    this.gl.viewport(0, 0, w, h);
  }

  render(a: LoadedImage, b: LoadedImage, t: number) {
    const gl = this.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    this.resize(canvas.clientWidth, canvas.clientHeight);
    const cw = canvas.width;
    const ch = canvas.height;

    gl.useProgram(this.program);
    gl.bindVertexArray(this.vao);

    const ta = coverTransform(a.width, a.height, cw, ch);
    const tb = coverTransform(b.width, b.height, cw, ch);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, a.texture);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, b.texture);

    gl.uniform1i(this.loc('uTexA'), 0);
    gl.uniform1i(this.loc('uTexB'), 1);
    gl.uniform2f(this.loc('uScaleA'), ta.sx, ta.sy);
    gl.uniform2f(this.loc('uOffsetA'), ta.ox, ta.oy);
    gl.uniform2f(this.loc('uScaleB'), tb.sx, tb.sy);
    gl.uniform2f(this.loc('uOffsetB'), tb.ox, tb.oy);
    gl.uniform2f(this.loc('uSizeA'), a.width, a.height);
    gl.uniform2f(this.loc('uSizeB'), b.width, b.height);
    gl.uniform2f(this.loc('uResolution'), cw, ch);
    gl.uniform1f(this.loc('uT'), t);
    gl.uniform1f(this.loc('uSigma'), FreqSepParams.sigma);
    gl.uniform1f(
      this.loc('uHiAEnd'),
      FreqSepParams.hiAEnd
    );
    gl.uniform1f(
      this.loc('uLoStart'),
      FreqSepParams.loStart
    );
    gl.uniform1f(this.loc('uLoEnd'), FreqSepParams.loEnd);
    gl.uniform1f(
      this.loc('uHiBStart'),
      FreqSepParams.hiBStart
    );
    gl.uniform1f(
      this.loc('uHiGain'),
      FreqSepParams.hiGain
    );

    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.bindVertexArray(null);
  }

  dispose() {
    const gl = this.gl;
    gl.deleteProgram(this.program);
    gl.deleteVertexArray(this.vao);
    this.textures.forEach((t) =>
      gl.deleteTexture(t.texture)
    );
    this.textures.clear();
  }
}
