// Fourier / Phase Morph 用の最小限の radix-2 FFT。
// 依存を増やしたくないので自前。offset/stride を取れるようにしてあるので、
// 2 次元変換の列方向を一時バッファへコピーせずに処理できる。

export class FFT {
  readonly n: number;
  private readonly levels: number;
  private readonly rev: Uint32Array;
  private readonly cosTable: Float32Array;
  private readonly sinTable: Float32Array;

  constructor(n: number) {
    this.n = n;
    this.levels = Math.round(Math.log2(n));
    if (1 << this.levels !== n) {
      throw new Error(`FFT size must be a power of 2: ${n}`);
    }
    this.rev = new Uint32Array(n);
    for (let i = 0; i < n; i++) {
      let x = i;
      let r = 0;
      for (let b = 0; b < this.levels; b++) {
        r = (r << 1) | (x & 1);
        x >>= 1;
      }
      this.rev[i] = r;
    }
    const half = n >> 1;
    this.cosTable = new Float32Array(half);
    this.sinTable = new Float32Array(half);
    for (let i = 0; i < half; i++) {
      this.cosTable[i] = Math.cos((2 * Math.PI * i) / n);
      this.sinTable[i] = Math.sin((2 * Math.PI * i) / n);
    }
  }

  // 正規化はしない (2 次元側でまとめて割る)
  transform(
    re: Float32Array,
    im: Float32Array,
    offset: number,
    stride: number,
    inverse: boolean
  ) {
    const n = this.n;
    const rev = this.rev;

    for (let i = 0; i < n; i++) {
      const j = rev[i];
      if (j > i) {
        const a = offset + i * stride;
        const b = offset + j * stride;
        let t = re[a];
        re[a] = re[b];
        re[b] = t;
        t = im[a];
        im[a] = im[b];
        im[b] = t;
      }
    }

    const sign = inverse ? 1 : -1;
    for (let size = 2; size <= n; size <<= 1) {
      const half = size >> 1;
      const step = n / size;
      for (let i = 0; i < n; i += size) {
        for (let j = i, k = 0; j < i + half; j++, k += step) {
          const jo = offset + j * stride;
          const lo = offset + (j + half) * stride;
          const c = this.cosTable[k];
          const s = sign * this.sinTable[k];
          const tre = re[lo] * c - im[lo] * s;
          const tim = re[lo] * s + im[lo] * c;
          re[lo] = re[jo] - tre;
          im[lo] = im[jo] - tim;
          re[jo] += tre;
          im[jo] += tim;
        }
      }
    }
  }
}

export function fft2d(
  re: Float32Array,
  im: Float32Array,
  w: number,
  h: number,
  fx: FFT,
  fy: FFT,
  inverse: boolean
) {
  for (let y = 0; y < h; y++) {
    fx.transform(re, im, y * w, 1, inverse);
  }
  for (let x = 0; x < w; x++) {
    fy.transform(re, im, x, w, inverse);
  }
  if (inverse) {
    const s = 1 / (w * h);
    for (let i = 0; i < re.length; i++) {
      re[i] *= s;
      im[i] *= s;
    }
  }
}
