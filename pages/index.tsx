import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })



const GridBlock = (props: {
  title: string;
}) => {
  return (
    <div className="
      column-item
      flex flex-col items-center p-[0.05em]
      opacity-30 hover:backdrop-blur-sm hover:opacity-100 cursor-pointer border-[0.1em]
    ">
      <div className="flex flex-col w-40 p-1 px-2 text-xl font-bold tracking-widest">
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

const Credit = () => {
  return (<p>
    2023 Kawada, Yosuke
  </p>)
}

export default function Home() {

  const assetPrefix = process.env.assetPrefix || "";

  return (
    <main
      className="flex min-h-screen flex-col items-start justify-between p-24"
      style={{ backgroundImage: `url(${assetPrefix}/bg.jpg)`, backgroundSize: "cover" }}
    >
      <div className='flex flex-col gap-1'>
        <ColumnHeader title="#" />
        <GridBlock title="作者の情報" />
        <GridBlock title="制作物" />
      </div>
      <Credit />
    </main>
  )
}
