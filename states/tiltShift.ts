import { useCallback } from 'react';
import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { BackgroundImageName } from './config';

// 背景写真にかけるチルトシフト (ぼかしのみ) のパラメータ。
//
//  ぼけ量
//       |`-.                        ,-'
//       |   `-._                 ,-'
//     0 |       `-._________,-'
//       +--------------------------> 画面の縦位置
//                ^         ^
//               top       bottom
//
// 合焦帯 (focus を中心に width の幅) の中は素通し。そこから上は画面上端に
// 向かって sigmaUp まで、下は画面下端に向かって sigmaDown まで線形にぼける。
//
// 立ち上がりの距離を画面端に固定してあるので、帯を下に寄せるほど下側が
// 急激にぼけることになる。近いものほど急速にぼける実際の写り方と同じ向き
// なので、パラメータを 1 つ減らすついでに実写に寄る。
//
// いい感じになる値は写真ごとにまるで違うので、画像ごとに持つ。
export type TiltShiftParams = {
  /** 合焦帯の中心。0 = 画面上端, 1 = 画面下端 */
  focus: number;
  /** 合焦帯の幅。画面の高さに対する割合 */
  width: number;
  /** 画面上端でのぼけ量 (CSS ピクセル) */
  sigmaUp: number;
  /** 画面下端でのぼけ量 (CSS ピクセル) */
  sigmaDown: number;
};

// ぼけ量 0 = 素の写真。何も設定していない画像はここに落ちる。
export const defaultTiltShiftParams: TiltShiftParams = {
  focus: 0.5,
  width: 0.2,
  sigmaUp: 0,
  sigmaDown: 0,
};

export const tiltShiftRanges = {
  focus: { min: 0, max: 1, step: 0.005 },
  width: { min: 0, max: 1, step: 0.005 },
  sigmaUp: { min: 0, max: 40, step: 0.5 },
  sigmaDown: { min: 0, max: 40, step: 0.5 },
} as const;

// 上下とも 0 なら素の写真と変わらないので、canvas を出す必要もない。
export function isTiltShiftActive(p: TiltShiftParams) {
  return p.sigmaUp > 0 || p.sigmaDown > 0;
}

// 画像を切り替える間、パラメータも一緒に繋ぐ。
// 切り替え前後で値が違っても、合焦帯が滑って移るだけで画は跳ねない。
export function lerpTiltShift(
  a: TiltShiftParams,
  b: TiltShiftParams,
  t: number
): TiltShiftParams {
  const at = (x: number, y: number) => x + (y - x) * t;
  return {
    focus: at(a.focus, b.focus),
    width: at(a.width, b.width),
    sigmaUp: at(a.sigmaUp, b.sigmaUp),
    sigmaDown: at(a.sigmaDown, b.sigmaDown),
  };
}

// スライダーを掴んでいる間だけ、どれを掴んでいるかを置いておく。
// 合焦帯の目安の線は背景側 (BackgroundLayers) が描くので、
// 操作卓から背景へ「今これを触っている」を伝えるためだけの状態。
// 保存はしない。
export type TiltShiftGrab = 'focus' | 'width';

const tiltShiftGrabAtom = atom<TiltShiftGrab | null>(null);

export const useTiltShiftGrab = () =>
  useAtom(tiltShiftGrabAtom);

export type TiltShiftTable = Partial<
  Record<BackgroundImageName, TiltShiftParams>
>;

const tableKey = 'life_bg_tilt_v1';

// atomWithStorage は初回レンダー時点では初期値を返し、
// localStorage の読み出しが済んでから差し替わる。
// 背景画像 (states/config.ts) と同じで、SSR とはズレない。
const tiltShiftTableAtom = atomWithStorage<TiltShiftTable>(
  tableKey,
  {}
);

export function tiltShiftOf(
  table: TiltShiftTable,
  name: BackgroundImageName | null
): TiltShiftParams {
  if (!name) return defaultTiltShiftParams;
  return table[name] ?? defaultTiltShiftParams;
}

export const useTiltShiftTable = () =>
  useAtom(tiltShiftTableAtom);

/**
 * 指定した画像のチルトシフト設定。
 * name が null (背景なし) のときは既定値を返し、更新は握り潰す。
 */
export const useTiltShift = (
  name: BackgroundImageName | null
) => {
  const [table, setTable] = useAtom(tiltShiftTableAtom);

  const patch = useCallback(
    (diff: Partial<TiltShiftParams>) => {
      if (!name) return;
      setTable((prev) => ({
        ...prev,
        [name]: {
          ...(prev[name] ?? defaultTiltShiftParams),
          ...diff,
        },
      }));
    },
    [name, setTable]
  );

  const reset = useCallback(() => {
    if (!name) return;
    setTable((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, [name, setTable]);

  return [tiltShiftOf(table, name), patch, reset] as const;
};
