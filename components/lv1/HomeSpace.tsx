import { useGalleryMode } from '@/states/gallery';
import { ImageCaption } from '../lv2/ImageCaption';
import { GalleryButton } from './GalleryButton';
import { TiltShiftControl } from '../config/TiltShiftControl';

// ギャラリーモードのときだけ出るものに着せるクラス。
// invisible を併せているのは、透明なだけだとスライダーが Tab で拾えてしまい、
// 見えないまま矢印キーで背景が変わるため。
const onlyInGallery = (isGalleryMode: boolean) =>
  `transition-all ${
    isGalleryMode
      ? 'opacity-100'
      : 'opacity-0 invisible pointer-events-none select-none'
  }`;

export default function HomeSpace() {
  const [isGalleryMode] = useGalleryMode();
  const gallery = onlyInGallery(isGalleryMode);

  return (
    <div
      className="
      w-full my-24 mr-24
      flex
      flex-row-reverse
      justify-start
      items-end
    "
    >
      <div className="flex flex-col items-end gap-4">
        {/* 設定モーダルと同じ操作卓。こちらは背景が遮られないので、
            実際に効き目を見ながら詰めるならここが本命になる。 */}
        <div className={gallery}>
          <div className="w-80 p-4 border-[1px] bg-black/40">
            <TiltShiftControl />
          </div>
        </div>

        <div
          className="
          gap-4
          flex
          flex-row-reverse
          justify-start
          items-center
        "
        >
          <GalleryButton />
          <div className={gallery}>
            <ImageCaption />
          </div>
        </div>
      </div>
    </div>
  );
}
