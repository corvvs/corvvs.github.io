import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })



const GridBlock = (props: {
  title: string;
}) => {
  return (
    <div className="
      flex flex-col items-center p-[0.05em]
      opacity-60 hover:opacity-100
    ">
      <div className="flex flex-col w-40 border-[0.1em] p-2">
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
      flex flex-col items-center p-[0.05em]
    ">
      <div className="
        column-header
        text-sm
        flex flex-col w-40 border-[0.1em] p-0 text-center
      ">
        { props.title }
      </div>
    </div>
  )
}

export default function Home() {

  const assetPrefix = process.env.assetPrefix || "";

  return (
    <main
      className="flex min-h-screen flex-col items-start justify-between p-24"
      style={{ backgroundImage: `url(${assetPrefix}/bg.jpg)`, backgroundSize: "cover" }}
    >
      <div className='flex flex-col gap-1 backdrop-blur-sm'>
        <ColumnHeader title="cat" />
        <GridBlock title="個人情報" />
        <GridBlock title="制作物" />
        <GridBlock title="playground" />
      </div>
    </main>
  )
}
