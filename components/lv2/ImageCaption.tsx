import {
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import { InlineIcon } from '../lv1/InlineIcon';
import {
  backgroundImageCaptions,
  useBackgroundImageRoll,
} from '@/states/config';

export const ImageCaption = () => {
  const {
    rawBackgroundImage,
    setBackgroudImage,
    previousImage,
    nextImage,
  } = useBackgroundImageRoll();
  const caption = rawBackgroundImage
    ? backgroundImageCaptions[rawBackgroundImage]
    : null;
  return (
    <div className="flex flex-row items-center justify-center gap-2">
      {caption ? <p>{caption}</p> : null}
      <button
        onClick={() => setBackgroudImage(previousImage)}
      >
        <InlineIcon i={<FaChevronLeft />} />
      </button>
      <button onClick={() => setBackgroudImage(nextImage)}>
        <InlineIcon i={<FaChevronRight />} />
      </button>
    </div>
  );
};
