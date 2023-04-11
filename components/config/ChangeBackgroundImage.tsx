import { assetPrefix } from '@/constants/path';
import { BackgroundImageNames, siteConfigAtom } from '@/states';
import { useAtom } from 'jotai';


export const ChangeBackgroundImage = () => {
  const [backgroundImage, setBackgroundImage] = useAtom(siteConfigAtom.backgroundImage);

  return (<div className='flex flex-row gap-2'>
    {
      BackgroundImageNames.map((name, i) => {
        const thumbnailName = `thumb_${name}`;
        return backgroundImage === name ? <div
          key={name}
          className='flex flex-row items-center justify-center w-10 h-10'
        >
        </div> : <div
          key={name}
          className='flex flex-row items-center justify-center w-10 h-10 border-2 cursor-pointer'
          style={{ backgroundImage: `url(${assetPrefix}/bg/${thumbnailName})`, backgroundSize: "cover" }}
          onClick={() => setBackgroundImage(name)}
        >
          <p className='text-xl'>{ i + 1 }</p>
        </div>
      })
    }
  </div>);
}
