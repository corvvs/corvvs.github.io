// 画像を 64x64 に落として、方式が必要とする統計だけ先に出しておく。
//  - luma:   線形光の平均輝度
//  - oklab:  Palette Transport の平均/標準偏差
//  - quant:  Contour Flood の輝度分位点 (しきい値を分布で等化するため)

export type ImageStats = {
  luma: number;
  oklabMean: [number, number, number];
  oklabStd: [number, number, number];
  quant: Float32Array; // 33 点。quant[i] = 累積 i/32 に対応する輝度
};

export const QUANT_STEPS = 33;

// シェーダ側と揃えた近似 gamma。厳密な sRGB 曲線は今回は不要。
function toLinear(v: number) {
  return Math.pow(v / 255, 2.2);
}

function linearToOklab(
  r: number,
  g: number,
  b: number
): [number, number, number] {
  const l =
    0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m =
    0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s =
    0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
  const l_ = Math.cbrt(Math.max(l, 0));
  const m_ = Math.cbrt(Math.max(m, 0));
  const s_ = Math.cbrt(Math.max(s, 0));
  return [
    0.2104542553 * l_ +
      0.793617785 * m_ -
      0.0040720468 * s_,
    1.9779984951 * l_ -
      2.428592205 * m_ +
      0.4505937099 * s_,
    0.0259040371 * l_ +
      0.7827717662 * m_ -
      0.808675766 * s_,
  ];
}

export function computeStats(
  img: HTMLImageElement
): ImageStats {
  const size = 64;
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const ctx = c.getContext('2d', {
    willReadFrequently: true,
  });
  if (!ctx) {
    return {
      luma: 0.25,
      oklabMean: [0.5, 0, 0],
      oklabStd: [0.2, 0.05, 0.05],
      quant: Float32Array.from(
        { length: QUANT_STEPS },
        (_, i) => i / (QUANT_STEPS - 1)
      ),
    };
  }
  ctx.drawImage(img, 0, 0, size, size);
  const d = ctx.getImageData(0, 0, size, size).data;
  const n = size * size;

  let lumaSum = 0;
  const sum: [number, number, number] = [0, 0, 0];
  const sq: [number, number, number] = [0, 0, 0];
  const hist = new Uint32Array(256);

  for (let i = 0; i < n; i++) {
    const r = toLinear(d[i * 4]);
    const g = toLinear(d[i * 4 + 1]);
    const b = toLinear(d[i * 4 + 2]);
    lumaSum += 0.2126 * r + 0.7152 * g + 0.0722 * b;

    const lab = linearToOklab(r, g, b);
    for (let k = 0; k < 3; k++) {
      sum[k] += lab[k];
      sq[k] += lab[k] * lab[k];
    }

    // Contour Flood は sRGB 値の輝度をそのまま使う (シェーダ側と一致させる)
    const y =
      0.2126 * d[i * 4] +
      0.7152 * d[i * 4 + 1] +
      0.0722 * d[i * 4 + 2];
    hist[Math.min(255, Math.max(0, Math.round(y)))]++;
  }

  const mean: [number, number, number] = [0, 0, 0];
  const std: [number, number, number] = [0, 0, 0];
  for (let k = 0; k < 3; k++) {
    mean[k] = sum[k] / n;
    std[k] = Math.sqrt(
      Math.max(sq[k] / n - mean[k] * mean[k], 1e-8)
    );
  }

  // 累積分布から等間隔の分位点を拾う
  const quant = new Float32Array(QUANT_STEPS);
  let acc = 0;
  let bin = 0;
  for (let q = 0; q < QUANT_STEPS; q++) {
    const target = (q / (QUANT_STEPS - 1)) * n;
    while (bin < 255 && acc + hist[bin] < target) {
      acc += hist[bin];
      bin++;
    }
    quant[q] = bin / 255;
  }
  quant[0] = 0;
  quant[QUANT_STEPS - 1] = 1;

  return {
    luma: Math.max(lumaSum / n, 1e-4),
    oklabMean: mean,
    oklabStd: std,
    quant,
  };
}
