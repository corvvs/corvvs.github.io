// 振幅と位相を別々のタイミングで補間する遷移。
//
// A/B が変わったときだけ前方向 FFT を回して振幅・位相を持っておき、
// フレームごとには「補間 -> 逆 FFT -> ImageData」だけをやる。
// 解像度は power of 2 に落とす必要があるので、見た目はどうしても甘くなる。

import { FFT, fft2d } from './fft';

const TAU = Math.PI * 2;

type Spectrum = {
  amp: Float32Array[]; // チャンネルごと
  phase: Float32Array[];
};

function drawToGrid(
  img: HTMLImageElement,
  w: number,
  h: number
): Uint8ClampedArray {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d', {
    willReadFrequently: true,
  });
  if (!ctx) throw new Error('2d context unavailable');
  // アスペクトは無視して引き伸ばす。表示時に元画像と同じ cover 変換を
  // 掛けるので、画角は他方式と揃う (FFT の格子だけが非等方になる)。
  ctx.drawImage(img, 0, 0, w, h);
  return ctx.getImageData(0, 0, w, h).data;
}

export class FourierEngine {
  private w = 0;
  private h = 0;
  private fx: FFT | null = null;
  private fy: FFT | null = null;
  private specA: Spectrum | null = null;
  private specB: Spectrum | null = null;
  private re = new Float32Array(0);
  private im = new Float32Array(0);
  private out: ImageData | null = null;
  private key = '';

  get width() {
    return this.w;
  }
  get height() {
    return this.h;
  }
  get ready() {
    return !!this.specA && !!this.specB && !!this.out;
  }

  private analyze(
    img: HTMLImageElement,
    fx: FFT,
    fy: FFT,
    w: number,
    h: number
  ): Spectrum {
    const px = drawToGrid(img, w, h);
    const n = w * h;
    const amp: Float32Array[] = [];
    const phase: Float32Array[] = [];
    for (let ch = 0; ch < 3; ch++) {
      const re = new Float32Array(n);
      const im = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        re[i] = px[i * 4 + ch] / 255;
      }
      fft2d(re, im, w, h, fx, fy, false);
      const a = new Float32Array(n);
      const p = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        a[i] = Math.hypot(re[i], im[i]);
        p[i] = Math.atan2(im[i], re[i]);
      }
      amp.push(a);
      phase.push(p);
    }
    return { amp, phase };
  }

  // A/B か解像度が変わったときだけ走る
  prepare(
    imgA: HTMLImageElement,
    imgB: HTMLImageElement,
    w: number,
    h: number
  ) {
    const key = `${imgA.src}|${imgB.src}|${w}x${h}`;
    if (key === this.key && this.ready) return;
    const fx = new FFT(w);
    const fy = new FFT(h);
    this.w = w;
    this.h = h;
    this.fx = fx;
    this.fy = fy;
    this.specA = this.analyze(imgA, fx, fy, w, h);
    this.specB = this.analyze(imgB, fx, fy, w, h);
    this.re = new Float32Array(w * h);
    this.im = new Float32Array(w * h);
    this.out = new ImageData(w, h);
    this.key = key;
  }

  invalidate() {
    this.key = '';
  }

  // tAmp / tPhase はそれぞれ 0..1。両方 0 なら A、両方 1 なら B に一致する。
  render(tAmp: number, tPhase: number): ImageData | null {
    if (
      !this.specA ||
      !this.specB ||
      !this.out ||
      !this.fx ||
      !this.fy
    ) {
      return null;
    }
    const { w, h, re, im, out } = this;
    const n = w * h;
    const dst = out.data;

    for (let ch = 0; ch < 3; ch++) {
      const aA = this.specA.amp[ch];
      const pA = this.specA.phase[ch];
      const aB = this.specB.amp[ch];
      const pB = this.specB.phase[ch];

      for (let i = 0; i < n; i++) {
        const amp = aA[i] + (aB[i] - aA[i]) * tAmp;
        // 位相は巻き付くので、最短の向きに回す
        let d = pB[i] - pA[i];
        if (d > Math.PI) d -= TAU;
        else if (d < -Math.PI) d += TAU;
        const ph = pA[i] + d * tPhase;
        re[i] = amp * Math.cos(ph);
        im[i] = amp * Math.sin(ph);
      }

      fft2d(re, im, w, h, this.fx, this.fy, true);

      for (let i = 0; i < n; i++) {
        const v = re[i] * 255;
        dst[i * 4 + ch] =
          v < 0 ? 0 : v > 255 ? 255 : v;
      }
    }
    for (let i = 0; i < n; i++) dst[i * 4 + 3] = 255;
    return out;
  }
}
