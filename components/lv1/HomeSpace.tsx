import { useGalleryMode } from '@/states/gallery';
import { ImageCaption } from '../lv2/ImageCaption';
import { GalleryButton } from './GalleryButton';

export default function HomeSpace(props: {}) {
  const [isGalleryMode] = useGalleryMode();

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
        <div
          className={`
            transition-all
            ${
              !isGalleryMode
                ? 'opacity-0 pointer-events-none select-none'
                : 'opacity-100'
            }
          `}
        >
          <ImageCaption />
        </div>
      </div>
    </div>
  );
}
