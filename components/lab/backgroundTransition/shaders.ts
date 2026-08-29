// WebGL2 (GLSL ES 3.00) のシェーダ群。
// Fourier だけは中間像を CPU で作って uTexC に流し込み、シェーダは合成だけを担当する。
// 残りは A/B (+ depth) を 1 パスで合成する。

import { TransitionKind } from './config';

export const VERT = `#version 300 es
in vec2 a_pos;
out vec2 v_uv;
void main() {
  // 画面左上を v_uv = (0, 0) にする。テクスチャも 1 行目 = 画像上端で積んである。
  v_uv = vec2(a_pos.x * 0.5 + 0.5, 0.5 - a_pos.y * 0.5);
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const PRELUDE = `#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 outColor;

uniform sampler2D uTexA;
uniform sampler2D uTexB;
uniform vec2 uScaleA;
uniform vec2 uOffsetA;
uniform vec2 uScaleB;
uniform vec2 uOffsetB;
uniform vec2 uSizeA;      // A の画像ピクセル数
uniform vec2 uSizeB;      // B の画像ピクセル数
uniform vec2 uResolution; // canvas の描画ピクセル数
uniform float uT;         // easing 適用済みの進捗 0..1

const float PI = 3.14159265359;

// 画面座標 -> 画像 UV (background-size: cover 相当のクロップ込み)
vec2 mapA(vec2 p) { return p * uScaleA + uOffsetA; }
vec2 mapB(vec2 p) { return p * uScaleB + uOffsetB; }
vec3 sampA(vec2 p) { return texture(uTexA, mapA(p)).rgb; }
vec3 sampB(vec2 p) { return texture(uTexB, mapB(p)).rgb; }

// 近似 gamma。CPU 側 (stats.ts) と同じ 2.2 を使って揃えている。
vec3 toLinear(vec3 c) { return pow(max(c, 0.0), vec3(2.2)); }
vec3 toSrgb(vec3 c) { return pow(max(c, 0.0), vec3(1.0 / 2.2)); }
float lumOf(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }

float remap01(float x, float a, float b) {
  return clamp((x - a) / max(b - a, 1e-5), 0.0, 1.0);
}

// しきい値 thr が key を追い越した画素から B になる。
// thr を (1 + feather) 倍して渡すので、t=0 で全部 A、t=1 で全部 B になる。
float sweepMix(float key, float thr, float feather) {
  float f = max(feather, 1e-4);
  return smoothstep(key, key + f, thr * (1.0 + f));
}

// 低周波。ミップから拾った LOD をその段で 5x5 ガウスに掛けて均す。
vec3 lowFreqAt(
  sampler2D tex, vec2 imgSize, vec2 scale, vec2 offset,
  vec2 p, float sigma
) {
  float imgPxPerScreenPx = imgSize.x * scale.x / max(uResolution.x, 1.0);
  float lod = max(0.0, log2(max(sigma, 1.0) * imgPxPerScreenPx * 0.5));
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

// Sobel。widthPx で拾うミップ段を変えるので、太い輪郭 = 輪郭からの距離場の近似になる。
float sobelAt(
  sampler2D tex, vec2 imgSize, vec2 scale, vec2 offset,
  vec2 p, float widthPx
) {
  float imgPxPerScreenPx = imgSize.x * scale.x / max(uResolution.x, 1.0);
  float lod = max(0.0, log2(max(widthPx, 1.0) * imgPxPerScreenPx * 0.5));
  vec2 texel = exp2(lod) / imgSize;
  vec2 b = p * scale + offset;

  float tl = lumOf(textureLod(tex, b + texel * vec2(-1.0, -1.0), lod).rgb);
  float tm = lumOf(textureLod(tex, b + texel * vec2( 0.0, -1.0), lod).rgb);
  float tr = lumOf(textureLod(tex, b + texel * vec2( 1.0, -1.0), lod).rgb);
  float ml = lumOf(textureLod(tex, b + texel * vec2(-1.0,  0.0), lod).rgb);
  float mr = lumOf(textureLod(tex, b + texel * vec2( 1.0,  0.0), lod).rgb);
  float bl = lumOf(textureLod(tex, b + texel * vec2(-1.0,  1.0), lod).rgb);
  float bm = lumOf(textureLod(tex, b + texel * vec2( 0.0,  1.0), lod).rgb);
  float br = lumOf(textureLod(tex, b + texel * vec2( 1.0,  1.0), lod).rgb);

  float gx = (tr + 2.0 * mr + br) - (tl + 2.0 * ml + bl);
  float gy = (bl + 2.0 * bm + br) - (tl + 2.0 * tm + tr);
  return length(vec2(gx, gy));
}

// 位置だけで決まるノイズ。progress を戻せば必ず同じ絵になる。
float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), f.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}
`;

// Oklab。Palette Transport と Contour Flood (彩度) で使う。
const OKLAB = `
vec3 linearToOklab(vec3 c) {
  float l = 0.4122214708 * c.r + 0.5363325363 * c.g + 0.0514459929 * c.b;
  float m = 0.2119034982 * c.r + 0.6806995451 * c.g + 0.1073969566 * c.b;
  float s = 0.0883024619 * c.r + 0.2817188376 * c.g + 0.6299787005 * c.b;
  float l_ = pow(max(l, 0.0), 1.0 / 3.0);
  float m_ = pow(max(m, 0.0), 1.0 / 3.0);
  float s_ = pow(max(s, 0.0), 1.0 / 3.0);
  return vec3(
    0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
    1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
    0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_
  );
}

vec3 oklabToLinear(vec3 lab) {
  float l_ = lab.x + 0.3963377774 * lab.y + 0.2158037573 * lab.z;
  float m_ = lab.x - 0.1055613458 * lab.y - 0.0638541728 * lab.z;
  float s_ = lab.x - 0.0894841775 * lab.y - 1.2914855480 * lab.z;
  float l = l_ * l_ * l_;
  float m = m_ * m_ * m_;
  float s = s_ * s_ * s_;
  return vec3(
     4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
  );
}
`;

// ---- 1. Plain crossfade ------------------------------------

const FRAG_CROSSFADE = `${PRELUDE}
uniform float uLinearLight;

void main() {
  vec3 a = sampA(v_uv);
  vec3 b = sampB(v_uv);
  vec3 c = uLinearLight > 0.5
    ? toSrgb(mix(toLinear(a), toLinear(b), uT))
    : mix(a, b, uT);
  outColor = vec4(c, 1.0);
}`;

// ---- 2. Frequency separation -------------------------------
//
// 高周波 = 元画像 - 低周波 (符号付き)。
// A の細部を先に落とし、低周波を中盤で混ぜ、B の細部を最後に立ち上げる。

const FRAG_FREQSEP = `${PRELUDE}
uniform float uSigma;
uniform float uHiAEnd;
uniform float uLoStart;
uniform float uLoEnd;
uniform float uHiBStart;
uniform float uHiGain;
uniform float uLinearLow;
uniform int uView;         // 0: 合成結果, 1: 低周波のみ, 2: 高周波のみ

void main() {
  vec3 a = sampA(v_uv);
  vec3 b = sampB(v_uv);
  vec3 la = lowFreqAt(uTexA, uSizeA, uScaleA, uOffsetA, v_uv, uSigma);
  vec3 lb = lowFreqAt(uTexB, uSizeB, uScaleB, uOffsetB, v_uv, uSigma);
  vec3 ha = a - la;
  vec3 hb = b - lb;

  float wA = 1.0 - smoothstep(0.0, max(uHiAEnd, 1e-3), uT);
  float wB = smoothstep(min(uHiBStart, 0.999), 1.0, uT);
  float tLo = smoothstep(0.0, 1.0, remap01(uT, uLoStart, uLoEnd));

  vec3 lo = uLinearLow > 0.5
    ? toSrgb(mix(toLinear(la), toLinear(lb), tLo))
    : mix(la, lb, tLo);
  vec3 hi = (ha * wA + hb * wB) * uHiGain;

  vec3 c;
  if (uView == 1) c = lo;
  else if (uView == 2) c = hi + 0.5;
  else c = lo + hi;

  outColor = vec4(clamp(c, 0.0, 1.0), 1.0);
}`;

// ---- 3. Fourier / Phase Morph ------------------------------
//
// 中間像は CPU (fourier.ts) が uTexC に書き込む。
// ここは cover 変換を掛けて、強度で plain crossfade と混ぜるだけ。

const FRAG_FOURIER = `${PRELUDE}
uniform sampler2D uTexC;
uniform float uStrength;
uniform float uEdgeFade;

void main() {
  // FFT 格子は元画像全体を引き伸ばしたものなので、cover 変換を
  // A -> B へ補間して掛ければ両端の画角が元画像と一致する。
  vec2 scale = mix(uScaleA, uScaleB, uT);
  vec2 offset = mix(uOffsetA, uOffsetB, uT);
  vec3 f = texture(uTexC, v_uv * scale + offset).rgb;
  vec3 plain = mix(sampA(v_uv), sampB(v_uv), uT);

  // FFT 格子は画面よりずっと粗いので、そのままだと t=0/1 でも
  // 元画像より甘い絵が出る。両端だけ実画像へ寄せて、他方式と同じく
  // 端点が厳密に A / B になるようにする。
  float fade = 1.0;
  if (uEdgeFade > 1e-3) {
    fade = smoothstep(0.0, uEdgeFade, uT) *
           smoothstep(0.0, uEdgeFade, 1.0 - uT);
  }
  outColor = vec4(mix(plain, f, clamp(uStrength, 0.0, 1.0) * fade), 1.0);
}`;

// ---- 4. Palette Transport ----------------------------------
//
// Oklab の平均/標準偏差を A から B へ移す。
// 色が移りきるまで構造は 100% A のままなので、
// 「A の構図 + B の色」という中間状態を必ず通る。

const FRAG_PALETTE = `${PRELUDE}
${OKLAB}
uniform vec3 uMeanA;
uniform vec3 uStdA;
uniform vec3 uMeanB;
uniform vec3 uStdB;
uniform float uPalStart;
uniform float uPalEnd;
uniform float uStructStart;
uniform float uStructEnd;
uniform float uLumaStrength;
uniform float uChromaStrength;
uniform float uAmount;
uniform int uView;   // 0: 合成結果, 1: 色移しだけ (構造遷移を止める)

// c の統計を (meanA, stdA) から (meanB, stdB) へ w の割合だけ寄せる
vec3 transport(vec3 c, float w) {
  vec3 lab = linearToOklab(toLinear(c));
  vec3 gain = clamp(
    mix(vec3(1.0), uStdB / max(uStdA, vec3(1e-4)), w),
    vec3(0.2), vec3(5.0)
  );
  vec3 target = mix(uMeanA, uMeanB, w);
  vec3 moved = (lab - uMeanA) * gain + target;
  // 明度と彩度で効きを分けられるようにしておく
  vec3 k = clamp(vec3(uLumaStrength, uChromaStrength, uChromaStrength), 0.0, 1.0);
  moved = mix(lab, moved, k);
  return clamp(toSrgb(oklabToLinear(moved)), 0.0, 1.0);
}

void main() {
  float wPal = smoothstep(uPalStart, max(uPalEnd, uPalStart + 1e-3), uT)
             * clamp(uAmount, 0.0, 1.0);
  float wStruct = uView == 1
    ? 0.0
    : smoothstep(uStructStart, max(uStructEnd, uStructStart + 1e-3), uT);

  // A が B の色を着てから構造が入れ替わるので、
  // 入れ替えの瞬間は「構造だけの遷移」になる。
  vec3 a = transport(sampA(v_uv), wPal);
  vec3 b = sampB(v_uv);
  outColor = vec4(mix(a, b, wStruct), 1.0);
}`;

// ---- 5. Depth Peel -----------------------------------------
//
// depth は事前生成した grayscale (0 = 遠景, 1 = 近景)。
// 画面座標では動かさず、奥行きのしきい値だけを時間で動かす。

const FRAG_DEPTH = `${PRELUDE}
uniform sampler2D uDepthA;
uniform sampler2D uDepthB;
uniform float uNearFirst;
uniform float uFeather;
uniform float uCurve;
uniform float uContrast;
uniform int uView;   // 0: 合成結果, 1: depth をそのまま表示

void main() {
  float dA = texture(uDepthA, mapA(v_uv)).r;
  float dB = texture(uDepthB, mapB(v_uv)).r;
  float d = mix(dA, dB, uT);
  d = clamp((d - 0.5) * max(uContrast, 0.05) + 0.5, 0.0, 1.0);

  if (uView == 1) {
    outColor = vec4(vec3(d), 1.0);
    return;
  }

  float key = uNearFirst > 0.5 ? 1.0 - d : d;
  float thr = pow(clamp(uT, 0.0, 1.0), max(uCurve, 0.05));
  float m = sweepMix(key, thr, uFeather);
  outColor = vec4(mix(sampA(v_uv), sampB(v_uv), m), 1.0);
}`;

// ---- 6. Edge Skeleton --------------------------------------
//
// 平坦な領域から先に B へ置き換え、輪郭の周りだけを最後まで A のまま残す。
// 中間状態では B の上に A の形だけが幽霊のように残る。

const FRAG_EDGE = `${PRELUDE}
uniform float uThreshold;
uniform float uWidth;
uniform float uPersistence;
uniform float uFeather;
uniform float uGain;
uniform float uUseBEdges;
uniform int uView;   // 0: 合成結果, 1: 輪郭マスクを表示

float edgeness(vec2 p) {
  float eA =
    sobelAt(uTexA, uSizeA, uScaleA, uOffsetA, p, uWidth) * 0.6 +
    sobelAt(uTexA, uSizeA, uScaleA, uOffsetA, p, uWidth * 3.0) * 1.6;
  float e = eA;
  if (uUseBEdges > 0.5) {
    float eB =
      sobelAt(uTexB, uSizeB, uScaleB, uOffsetB, p, uWidth) * 0.6 +
      sobelAt(uTexB, uSizeB, uScaleB, uOffsetB, p, uWidth * 3.0) * 1.6;
    e = max(eA, eB);
  }
  e = clamp(e * uGain, 0.0, 1.0);
  e = remap01(e, uThreshold, 1.0);
  return pow(e, 1.0 / max(uPersistence, 0.05));
}

void main() {
  float k = edgeness(v_uv);
  if (uView == 1) {
    outColor = vec4(vec3(k), 1.0);
    return;
  }
  float m = sweepMix(k, uT, uFeather);
  outColor = vec4(mix(sampA(v_uv), sampB(v_uv), m), 1.0);
}`;

// ---- 7. Contour Flood --------------------------------------
//
// 画面座標ではなく、写真自身の等値領域が遷移の順序を決める。

const FRAG_CONTOUR = `${PRELUDE}
${OKLAB}
uniform float uQuant[33];  // source の輝度分位点
uniform int uSource;       // 0: A輝度, 1: B輝度, 2: |A-B|, 3: 彩度
uniform float uLightFirst;
uniform float uFeather;
uniform float uCurve;
uniform float uNoise;
uniform float uNoiseScale;
uniform float uEqualize;
uniform int uView;         // 0: 合成結果, 1: source を表示

float chromaOf(vec3 c) {
  vec3 lab = linearToOklab(toLinear(c));
  return clamp(length(lab.yz) * 3.0, 0.0, 1.0);
}

float contourSource(vec2 p) {
  vec3 a = sampA(p);
  vec3 b = sampB(p);
  if (uSource == 1) return lumOf(b);
  if (uSource == 2) return clamp(length(a - b) / 1.732, 0.0, 1.0);
  if (uSource == 3) return chromaOf(a);
  return lumOf(a);
}

// 分位点をたどってしきい値を進める。輝度の偏った写真でも
// 置き換わる面積が時間に対してほぼ一定になる。
float equalized(float t) {
  float x = clamp(t, 0.0, 1.0) * 32.0;
  int i = int(floor(x));
  int j = min(i + 1, 32);
  return mix(uQuant[i], uQuant[j], x - float(i));
}

void main() {
  float src = contourSource(v_uv);
  src += (vnoise(v_uv * max(uNoiseScale, 1.0)) - 0.5) * uNoise;
  src = clamp(src, 0.0, 1.0);
  if (uLightFirst > 0.5) src = 1.0 - src;

  if (uView == 1) {
    outColor = vec4(vec3(src), 1.0);
    return;
  }

  float tc = pow(clamp(uT, 0.0, 1.0), max(uCurve, 0.05));
  // 等化は A/B の輝度を source にしたときだけ意味がある
  bool canEq = uEqualize > 0.5 && uSource <= 1;
  float thr = tc;
  if (canEq) {
    thr = uLightFirst > 0.5
      ? 1.0 - equalized(1.0 - tc)
      : equalized(tc);
  }

  float m = sweepMix(src, thr, uFeather);
  outColor = vec4(mix(sampA(v_uv), sampB(v_uv), m), 1.0);
}`;

export const FRAGMENTS: Record<TransitionKind, string> = {
  crossfade: FRAG_CROSSFADE,
  freqsep: FRAG_FREQSEP,
  fourier: FRAG_FOURIER,
  palette: FRAG_PALETTE,
  depth: FRAG_DEPTH,
  edge: FRAG_EDGE,
  contour: FRAG_CONTOUR,
};
