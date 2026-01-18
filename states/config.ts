import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { SyncStorage } from 'jotai/vanilla/utils/atomWithStorage';
import _ from 'lodash';

export const BackgroundImageNames = [
  'bg.jpg',
  'bg2.jpg',
  'bg3.jpg',
  'bg4.jpg',
  'bg5.jpg',
  'bg6.jpg',
  'bg7.jpg',
  'bg8.jpg',
  'bg9.jpg',
  'bg10.jpg',
  'bg11.jpg',
  'bg12.jpg',
  'bg13.jpg',
  'bg14.jpg',
  'bg15.jpg',
  'bg16.jpg',
  'bg17.jpg',
  'bg18.jpg',
  'bg19.jpg',
  'bg20.jpg',
  'bg21.jpg',
  'bg22.jpg',
  'bg23.jpg',
  'bg24.jpg',
] as const;

export type BackgroundImageName =
  (typeof BackgroundImageNames)[number];

export const backgroundImageCaptions: {
  [key in BackgroundImageName]: string;
} = {
  'bg.jpg': '富山県富山市',
  'bg2.jpg': '富山県富山市',
  'bg3.jpg': '江東区 辰巳の森海浜公園',
  'bg4.jpg': '富山県富山市',
  'bg5.jpg': '横浜市磯子区',
  'bg6.jpg': '東京都日野市',
  'bg7.jpg': '目黒区 目黒天空庭園',
  'bg8.jpg': '江東区塩浜',
  'bg9.jpg': '大田区 多摩川台公園',
  'bg10.jpg': '品川区 花街道公園',
  'bg11.jpg': '川崎市川崎区',
  'bg12.jpg': '千代田区 九段北',
  'bg13.jpg': '千葉県香取郡',
  'bg14.jpg': '箱根町 仙石原',
  'bg15.jpg': '茨城県大洗町',
  'bg16.jpg': '場所不明',
  'bg17.jpg': '東京湾フェリー',
  'bg18.jpg': '港区 愛宕神社',
  'bg19.jpg': '川崎市川崎区',
  'bg20.jpg': '富山県富山市',
  'bg21.jpg': '富山県富山市',
  'bg22.jpg': '大田区 西六郷公園',
  'bg23.jpg': '富山県富山市',
  'bg24.jpg': '新潟県長岡市',
};

const imageNameKey = 'life_bg_image_name_v2';

// [背景画像のatom]
// 過去に指定された画像があれば, それは Storage に保存されているが、その読み出しには一定時間かかるので、
// 読み出しが終わるまでの間は背景なしにしたい。
// ただし、 Storage に保存値がない場合は bg.jpg を使用したい。
// - "loading": 読み出し中(結果未確定)
// - null:      確定 - 保存値なし -> デフォルト背景
// - "none":    確定 - 背景なし
// - その他:     確定 - 背景あり
type RawBackgroundImageType =
  | BackgroundImageName
  | 'loading'
  | 'none'
  | null;
type BackgroundStorage =
  SyncStorage<RawBackgroundImageType>;
// export interface SyncStorage<Value> {
//   getItem: (key: string) => Value | typeof NO_STORAGE_VALUE;
//   setItem: (key: string, newValue: Value) => void;
//   removeItem: (key: string) => void;
//   subscribe?: (key: string, callback: (value: Value) => void) => Unsubscribe;
// }
const backgroundStorage: BackgroundStorage = {
  getItem: (key: string) => {
    const val = localStorage.getItem(key);
    if (_.isNull(val)) {
      return null;
    }
    return val as RawBackgroundImageType;
  },
  setItem: (
    key: string,
    newValue: RawBackgroundImageType
  ) => {
    if (_.isNull(newValue)) {
      localStorage.removeItem(key);
    }
    localStorage.setItem(key, newValue!);
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },
};

const rawBackgroundImageAtom = atomWithStorage<
  BackgroundImageName | 'loading' | 'none' | null
>(imageNameKey, 'loading', backgroundStorage);

function isActualBackgroundImage(
  val: RawBackgroundImageType
): val is BackgroundImageName {
  return (
    val !== 'loading' && val !== 'none' && val !== null
  );
}

export const useBackgroundImage = () => {
  const [rawBackgroundImage, setBackgroudImage] = useAtom(
    rawBackgroundImageAtom
  );
  const backgroundImage = (() => {
    if (rawBackgroundImage === 'loading') {
      return null;
    }
    if (!rawBackgroundImage) {
      return 'bg.jpg';
    }
    if (rawBackgroundImage === 'none') {
      return null;
    }
    return rawBackgroundImage;
  })();
  return [backgroundImage, setBackgroudImage] as const;
};

export const useBackgroundImageRoll = () => {
  const [rawBackgroundImage, setBackgroudImage] = useAtom(
    rawBackgroundImageAtom
  );
  const isActual = isActualBackgroundImage(
    rawBackgroundImage
  );
  const previousImage = isActual
    ? (BackgroundImageNames.indexOf(rawBackgroundImage) -
        1 +
        BackgroundImageNames.length) %
      BackgroundImageNames.length
    : BackgroundImageNames.length - 1;
  const nextImage = isActual
    ? (BackgroundImageNames.indexOf(rawBackgroundImage) +
        1) %
      BackgroundImageNames.length
    : 0;
  return {
    rawBackgroundImage: isActual
      ? rawBackgroundImage
      : null,
    setBackgroudImage,
    previousImage: BackgroundImageNames[previousImage],
    nextImage: BackgroundImageNames[nextImage],
  };
};

export const siteConfigAtom = {};
