import { BackgroundImageNames } from '@/states';
import { useBackgroundImage } from '@/states/config';

const SelectedImageButton = () => {
  return <div className='flex flex-row items-center justify-center w-10 h-10 border-2' />
}

const NoneImageButton = () => {
  const [backgroundImage, setBackgroundImage] = useBackgroundImage();
  if (!backgroundImage) {
    return <SelectedImageButton />
  } else {
    return <div
      className='flex flex-row items-center justify-center w-10 h-10 border-2 cursor-pointer'
      onClick={() => setBackgroundImage("none")}
    >
      <p className='text-sm'>none</p>
    </div> 
  }
};

const SelectImageButton = (props: { imageIndex: number; }) => {
  const name = BackgroundImageNames[props.imageIndex];
  const thumbnailName = `thumb_${name}`;
  const [backgroundImage, setBackgroundImage] = useBackgroundImage();

  if (backgroundImage === name) {
    return <SelectedImageButton />
  } else {
    return <div
      key={name}
      className='flex flex-row items-center justify-center w-10 h-10 border-2 cursor-pointer'
      style={{ backgroundImage: `url(/bg/${thumbnailName})`, backgroundSize: "cover" }}
      onClick={() => setBackgroundImage(name)}
    >
      <p className='text-xl'>{ props.imageIndex + 1 }</p>
    </div>
  }
};

export const ChangeBackgroundImage = () => {
  return (
    <div className='grid grid-cols-8 gap-2'>
      {BackgroundImageNames.map((name, i) => <SelectImageButton key={i} imageIndex={i} />)}
      <NoneImageButton />
    </div>
  );
}
