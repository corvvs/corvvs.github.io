// 背景写真トランジションの実験用設定。
// 使い捨て前提のプロトタイプなので、値はここに直書きしている。

import {
  BackgroundImageName,
  BackgroundImageNames,
} from '@/states/config';

export type TransitionKind =
  | 'crossfade'
  | 'freqsep'
  | 'fourier'
  | 'palette'
  | 'depth'
  | 'edge'
  | 'contour';

export const TransitionKindList: {
  key: TransitionKind;
  label: string;
  note: string;
}[] = [
  {
    key: 'crossfade',
    label: 'Plain',
    note: '素の crossfade。他の方式を判断するための基準。',
  },
  {
    key: 'freqsep',
    label: 'Freq. Sep.',
    note: '細部と大構造を別々のタイミングで遷移させる。第1ラウンドの勝ち抜け。',
  },
  {
    key: 'fourier',
    label: 'Fourier',
    note: '周波数領域で振幅と位相を別々に補間する。alpha blend では出ない中間像を狙う。',
  },
  {
    key: 'palette',
    label: 'Palette',
    note: 'A の構造を保ったまま色だけ先に B へ移す。「A の構図 + B の色」を必ず通る。',
  },
  {
    key: 'depth',
    label: 'Depth Peel',
    note: '奥行きを時間軸に使う。遠景から (または近景から) 順に B へ置換する。',
  },
  {
    key: 'edge',
    label: 'Edge Skeleton',
    note: '平坦な領域から先に B へ。A の輪郭だけが最後まで幽霊のように残る。',
  },
  {
    key: 'contour',
    label: 'Contour Flood',
    note: '画面座標ではなく写真自身の等値領域が遷移の順序を決める。',
  },
];

// 手入力の地平線。画像の正規化座標で 0 = 上端, 1 = 下端。
// depth map を作るときの入力として使った値をそのまま残してある。
export const horizonTable: Record<
  BackgroundImageName,
  number
> = {
  'bg.jpg': 0.72,
  'bg2.jpg': 0.52,
  'bg3.jpg': 0.45,
  'bg4.jpg': 0.5,
  'bg5.jpg': 0.35,
  'bg6.jpg': 0.5,
  'bg7.jpg': 0.42,
  'bg8.jpg': 0.48,
  'bg9.jpg': 0.85,
  'bg10.jpg': 0.5,
  'bg11.jpg': 0.62,
  'bg12.jpg': 0.3,
  'bg13.jpg': 0.52,
  'bg14.jpg': 0.42,
  'bg15.jpg': 0.5,
  'bg16.jpg': 0.58,
  'bg17.jpg': 0.9,
  'bg18.jpg': 0.25,
  'bg19.jpg': 0.6,
  'bg20.jpg': 0.62,
  'bg21.jpg': 0.5,
  'bg22.jpg': 0.6,
  'bg23.jpg': 0.45,
  'bg24.jpg': 0.7,
};

// depth map を用意した画像。Depth Peel はこの組み合わせでのみ有効。
export const depthAvailable: BackgroundImageName[] = [
  'bg2.jpg',
  'bg4.jpg',
  'bg7.jpg',
  'bg11.jpg',
  'bg13.jpg',
  'bg14.jpg',
  'bg19.jpg',
  'bg21.jpg',
];

export function hasDepth(name: BackgroundImageName) {
  return depthAvailable.includes(name);
}

export function depthUrl(name: BackgroundImageName) {
  return `/bg/depth/depth_${name.replace('.jpg', '.png')}`;
}

export const pairPresets: {
  label: string;
  a: BackgroundImageName;
  b: BackgroundImageName;
  note: string;
}[] = [
  {
    label: '明暗差',
    a: 'bg13.jpg',
    b: 'bg19.jpg',
    note: '明るい夕焼けの水面 → 暗い夜の工場。明度差が最大のペア。',
  },
  {
    label: '色調差',
    a: 'bg4.jpg',
    b: 'bg14.jpg',
    note: '紫の水面 → 暗い青緑のススキ。色相がほぼ補色。',
  },
  {
    label: '構図が近い',
    a: 'bg4.jpg',
    b: 'bg2.jpg',
    note: 'どちらも富山、水平線が中央、下半分が水面。',
  },
  {
    label: '都市 ↔ 自然',
    a: 'bg21.jpg',
    b: 'bg14.jpg',
    note: '富山の夜景 → 箱根のススキ。大構造の性格が違う。',
  },
  {
    label: '遠近が明確',
    a: 'bg2.jpg',
    b: 'bg7.jpg',
    note: '用水路の一点透視 → 屋上から見た都市。Depth Peel 向き。',
  },
];

export const imageCount = BackgroundImageNames.length;

// ---- easing -------------------------------------------------

export type EasingKind =
  | 'linear'
  | 'inOutSine'
  | 'inOutCubic'
  | 'outCubic'
  | 'inCubic'
  | 'outExpo';

export const EasingList: EasingKind[] = [
  'linear',
  'inOutSine',
  'inOutCubic',
  'outCubic',
  'inCubic',
  'outExpo',
];

export const easingFns: Record<
  EasingKind,
  (t: number) => number
> = {
  linear: (t) => t,
  inOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
  inOutCubic: (t) =>
    t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2,
  outCubic: (t) => 1 - Math.pow(1 - t, 3),
  inCubic: (t) => t * t * t,
  outExpo: (t) =>
    t >= 1 ? 1 : 1 - Math.pow(2, -10 * t),
};

// ---- パラメータ --------------------------------------------

export type FourierOrder =
  | 'simultaneous'
  | 'ampFirst'
  | 'phaseFirst';

export const FourierSizes = [
  { value: 0, label: '256x128', w: 256, h: 128 },
  { value: 1, label: '512x256', w: 512, h: 256 },
];

export type LabParams = {
  // 共通
  kind: TransitionKind;
  durationMs: number;
  easing: EasingKind;
  source: 'full' | 'lofi';
  renderScale: number;

  // plain
  crossfadeLinearLight: boolean;

  // frequency separation
  freqSigma: number;
  freqHiAEnd: number;
  freqLoStart: number;
  freqLoEnd: number;
  freqHiBStart: number;
  freqHiGain: number;
  freqLinearLow: boolean;
  freqView: 'result' | 'low' | 'high';

  // fourier / phase morph
  fourOrder: FourierOrder;
  fourAmpStart: number;
  fourAmpEnd: number;
  fourPhaseStart: number;
  fourPhaseEnd: number;
  fourStrength: number;
  fourEdgeFade: number;
  fourSize: number;

  // palette transport
  palStart: number;
  palEnd: number;
  palStructStart: number;
  palStructEnd: number;
  palLuma: number;
  palChroma: number;
  palAmount: number;
  palView: 'result' | 'palette';

  // depth peel
  depthNearFirst: boolean;
  depthFeather: number;
  depthCurve: number;
  depthContrast: number;
  depthView: 'result' | 'depth';

  // edge skeleton
  edgeThreshold: number;
  edgeWidth: number;
  edgePersistence: number;
  edgeFeather: number;
  edgeGain: number;
  edgeUseB: boolean;
  edgeView: 'result' | 'mask';

  // contour flood
  contourSource: number; // 0: A輝度, 1: B輝度, 2: |A-B|, 3: 彩度
  contourLightFirst: boolean;
  contourFeather: number;
  contourCurve: number;
  contourNoise: number;
  contourNoiseScale: number;
  contourEqualize: boolean;
  contourView: 'result' | 'source';
};

export const ContourSourceList = [
  { value: 0, label: 'A 輝度' },
  { value: 1, label: 'B 輝度' },
  { value: 2, label: '|A-B|' },
  { value: 3, label: 'A 彩度' },
];

export const defaultParams: LabParams = {
  kind: 'crossfade',
  durationMs: 1200,
  easing: 'inOutSine',
  source: 'full',
  renderScale: 1,

  crossfadeLinearLight: false,

  freqSigma: 14,
  freqHiAEnd: 0.35,
  freqLoStart: 0.2,
  freqLoEnd: 0.8,
  freqHiBStart: 0.62,
  freqHiGain: 1,
  freqLinearLow: false,
  freqView: 'result',

  fourOrder: 'ampFirst',
  fourAmpStart: 0,
  fourAmpEnd: 0.55,
  fourPhaseStart: 0.45,
  fourPhaseEnd: 1,
  fourStrength: 1,
  fourEdgeFade: 0.12,
  fourSize: 0,

  palStart: 0,
  palEnd: 0.45,
  palStructStart: 0.5,
  palStructEnd: 1,
  palLuma: 0.7,
  palChroma: 1,
  palAmount: 1,
  palView: 'result',

  depthNearFirst: false,
  depthFeather: 0.14,
  depthCurve: 1,
  depthContrast: 1.2,
  depthView: 'result',

  edgeThreshold: 0.06,
  edgeWidth: 3,
  edgePersistence: 1.6,
  edgeFeather: 0.18,
  edgeGain: 3,
  edgeUseB: false,
  edgeView: 'result',

  contourSource: 0,
  contourLightFirst: false,
  contourFeather: 0.1,
  contourCurve: 1,
  contourNoise: 0.04,
  contourNoiseScale: 60,
  contourEqualize: true,
  contourView: 'result',
};

// 「振幅先行 / 位相先行 / 同時」の 3 択で 4 本のスライダーをまとめて動かす
export function applyFourierOrder(
  order: FourierOrder
): Partial<LabParams> {
  if (order === 'ampFirst') {
    return {
      fourOrder: order,
      fourAmpStart: 0,
      fourAmpEnd: 0.55,
      fourPhaseStart: 0.45,
      fourPhaseEnd: 1,
    };
  }
  if (order === 'phaseFirst') {
    return {
      fourOrder: order,
      fourPhaseStart: 0,
      fourPhaseEnd: 0.55,
      fourAmpStart: 0.45,
      fourAmpEnd: 1,
    };
  }
  return {
    fourOrder: order,
    fourAmpStart: 0,
    fourAmpEnd: 1,
    fourPhaseStart: 0,
    fourPhaseEnd: 1,
  };
}

export function imageUrl(
  name: BackgroundImageName,
  source: 'full' | 'lofi'
) {
  return source === 'lofi'
    ? `/bg/lofi_${name}`
    : `/bg/${name}`;
}

export function thumbUrl(name: BackgroundImageName) {
  return `/bg/thumb_${name}`;
}
