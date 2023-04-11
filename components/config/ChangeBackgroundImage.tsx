import { assetPrefix } from '@/constants/path';
import { BackgroundImageNames, siteConfigAtom } from '@/states';
import { useAtom } from 'jotai';


const NoneImageButton = () => {
  const [backgroundImage, setBackgroundImage] = useAtom(siteConfigAtom.backgroundImage);
  if (backgroundImage) {
    return <div
      className='flex flex-row items-center justify-center w-10 h-10 border-2 cursor-pointer'
      onClick={() => setBackgroundImage(null)}
    >
      <p className='text-sm'>none</p>
    </div> 
  } else {
    return <div
      className='flex flex-row items-center justify-center w-10 h-10 border-2'
    >
    </div> 
  }
};

const SelectImageButton = (props: { imageIndex: number; }) => {
  const name = BackgroundImageNames[props.imageIndex];
  const thumbnailName = `thumb_${name}`;
  const [backgroundImage, setBackgroundImage] = useAtom(siteConfigAtom.backgroundImage);
  if (backgroundImage === name) {
    return <div
      key={name}
      className='flex flex-row items-center justify-center w-10 h-10 border-2'
    />
  } else {
    return <div
      key={name}
      className='flex flex-row items-center justify-center w-10 h-10 border-2 cursor-pointer'
      style={{ backgroundImage: `url(${assetPrefix}/bg/${thumbnailName})`, backgroundSize: "cover" }}
      onClick={() => setBackgroundImage(name)}
    >
      <p className='text-xl'>{ props.imageIndex + 1 }</p>
    </div>
  }
};

export const ChangeBackgroundImage = () => {
  const [backgroundImage, setBackgroundImage] = useAtom(siteConfigAtom.backgroundImage);

  return (<div className='flex flex-row gap-2'>
    {BackgroundImageNames.map((name, i) => <SelectImageButton key={i} imageIndex={i} />)}
    <NoneImageButton />
  </div>);
}
