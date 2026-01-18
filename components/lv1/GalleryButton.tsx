import { InlineIcon } from './InlineIcon';
import { TbTheater } from 'react-icons/tb';
import { useGalleryMode } from '@/states/gallery';

export function GalleryButton() {
  const [isGalleryMode, setGalleryMode] = useGalleryMode();

  const className = isGalleryMode
    ? 'flex flex-row border-[1px] column-item-active rounded-full p-1 text-xl'
    : 'flex flex-row border-[1px] column-item rounded-full p-1 text-xl';

  return (
    <>
      <div className="flex flex-row outline-none items-center justify-center">
        <button
          className={className}
          onClick={() => setGalleryMode(!isGalleryMode)}
        >
          <InlineIcon i={<TbTheater />} />
        </button>
      </div>
    </>
  );
}
