import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { SyncStorage } from 'jotai/vanilla/utils/atomWithStorage';
import _ from 'lodash';
import { useEffect } from 'react';

export const BackgroundImageNames = [
  "bg.jpg", "bg2.jpg", "bg3.jpg", "bg4.jpg", "bg5.jpg", "bg6.jpg", "bg7.jpg", "bg8.jpg", "bg9.jpg", "bg10.jpg", "bg11.jpg",
] as const;

export type BackgroundImageName = typeof BackgroundImageNames[number];

const imageNameKey = 'life_bg_image_name_v2';


// [背景画像のatom]
// 過去に指定された画像があれば, それは Storage に保存されているが、その読み出しには一定時間かかるので、
// 読み出しが終わるまでの間は背景なしにしたい。
// ただし、 Storage に保存値がない場合は bg.jpg を使用したい。
// - "loading": 読み出し中(結果未確定)
// - null:      確定 - 保存値なし -> デフォルト背景
// - "none":    確定 - 背景なし
// - その他:     確定 - 背景あり
type RawBackgroundImageType = BackgroundImageName | "loading" | "none" | null;
type BackgroundStorage = SyncStorage<RawBackgroundImageType>;
// export interface SyncStorage<Value> {
//   getItem: (key: string) => Value | typeof NO_STORAGE_VALUE;
//   setItem: (key: string, newValue: Value) => void;
//   removeItem: (key: string) => void;
//   subscribe?: (key: string, callback: (value: Value) => void) => Unsubscribe;
// }
const backgroundStorage: BackgroundStorage = {
  getItem: (key: string) => {
    const val = localStorage.getItem(key);
    if (_.isNull(val)) { return null; }
    return val as RawBackgroundImageType;
  },
  setItem: (key: string, newValue: RawBackgroundImageType) => {
    if (_.isNull(newValue)) { localStorage.removeItem(key); }
    localStorage.setItem(key, newValue!);
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
  }
};

const rawBackgroundImageAtom = atomWithStorage<BackgroundImageName | "loading" | "none" | null>(imageNameKey, "loading", backgroundStorage);
export const useBackgroundImage = () => {
  const [rawBackgroundImage, setBackgroudImage] = useAtom(rawBackgroundImageAtom);
  console.log("[rawBackgroundImage]", rawBackgroundImage);
  const backgroundImage = (() => {
    if (rawBackgroundImage === "loading") { return null; }
    if (!rawBackgroundImage) { return "bg.jpg"; }
    if (rawBackgroundImage === "none") { return null; }
    return rawBackgroundImage;
  })();
  return [backgroundImage, setBackgroudImage] as const;
};

export const siteConfigAtom = {
};

