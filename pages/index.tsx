import { useAtom } from 'jotai';
import dynamic, { Loader, LoaderComponent } from 'next/dynamic';
import { Credit } from '@/components/Credit';
import { siteConfigAtom } from '@/states';
import { ChangeBackgroundImage } from '@/components/config/ChangeBackgroundImage';
import { assetPrefix } from '@/constants/path';

const AboutMe = dynamic(() => import('../components/AboutMe'));

const GridBlock = (props: {
  title: string;
}) => {
  return (
    <div className="
      column-item
      flex flex-col items-center p-[0.05em]
      opacity-30 hover:backdrop-blur-sm hover:opacity-100 cursor-pointer border-[0.1em]
    ">
      <div className="flex flex-col w-40 p-1 px-2 text-xl font-bold tracking-wide">
        { props.title }
      </div>
    </div>
  );
};

const ColumnHeader = (props: {
  title: string;
}) => {
  return (
    <div className="
      column-header
      flex flex-col items-center p-[0.05em] border-[0.1em]
    ">
      <div className="
        text-sm
        flex flex-col w-40 p-0 text-center
      ">
        { props.title }
      </div>
    </div>
  )
}

export default function Home() {
  const [backgroundImage] = useAtom(siteConfigAtom.backgroundImage);
  return (
    <main
      className="flex min-h-screen flex-col items-start justify-between p-24 background-image"
      style={{ backgroundImage: `url(${assetPrefix}/bg/${backgroundImage})`, backgroundSize: "cover" }}
    >
      <div className='flex flex-row gap-4'>
        <div className='flex flex-col gap-1'>
          <ColumnHeader title="#" />
          <GridBlock title="作者の情報" />
          <GridBlock title="制作物" />
        </div>

        <div className='flex flex-col gap-1'>
          <ColumnHeader title="about_me" />
          <AboutMe />
        </div>

      </div>
      <div className='flex flex-row gap-4'>
        <Credit />
        <ChangeBackgroundImage />
      </div>
    </main>
  )
}
