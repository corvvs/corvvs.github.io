import { assetPrefix } from "@/constants/path";
import { siteConfigAtom } from "@/states";
import { useAtom } from "jotai";
import { Credit } from "./Credit";
import { ReactNode } from "react";
import { useRouter } from "next/router";
import * as Fa from 'react-icons/fa';
import _ from 'lodash';
import ColumnHeader from "./ColumnHeader";


type ItemParam = {
  title: (() => JSX.Element) | string;
  path?: string;
};

const Outer = (props: Omit<ItemParam, "title"> & {
  active?: boolean;
  children: ReactNode;
}) => {
  const router = useRouter();
  if (props.active) {
    return <div className="
      column-item-active
      flex flex-col items-center p-[0.05em]
      hover:backdrop-blur-sm border-[0.1em]
    "
    >
      {props.children}
    </div>
  } else {
    return (
      <div className="
        column-item
        flex flex-col items-center p-[0.05em]
        hover:backdrop-blur-sm hover:opacity-100 cursor-pointer border-[0.1em]
      "
        onClick={() => router.push(`${props.path || ""}`)}
      >
        {props.children}
      </div>
    );
  }
};

const GridBlock = (props: ItemParam & {
  active?: boolean;
}) => {
  const Inner = typeof props.title === "string" ? () => <>{ props.title }</> : props.title;
  return (
    <Outer active={props.active} path={props.path}>
      <div className="flex flex-col w-40 p-1 px-2 text-xl font-bold tracking-wide">
        <Inner />
      </div>
    </Outer>
  );
};

export default function Layout(props: {
  children?: ReactNode;
}) {
  const [backgroundImage] = useAtom(siteConfigAtom.backgroundImage);

  const router = useRouter();
  const [, currentPath] = router.pathname.split("/");

  const items: ItemParam[] = [
    { title: "作者の情報", path: "about_me", },
    { title: "制作物", },
    { title: () => <Fa.FaCog />, path: "config", },
  ];

  return (<div
      className="flex min-h-screen flex-row justify-stretch"
      style={{ backgroundImage: `url(${assetPrefix}/bg/lofi_${backgroundImage})`, backgroundSize: "cover" }}
    >
    <main
      className="flex min-h-screen flex-col items-start justify-between grow shrink p-24"
      style={{ backgroundImage: `url(${assetPrefix}/bg/${backgroundImage})`, backgroundSize: "cover" }}
    >
      <div className='flex flex-row gap-4'>
        <div className='flex flex-col gap-1'>
          <ColumnHeader title="#" />
          { items.map((item, i) =>
            <GridBlock
              key={i}
              active={currentPath == item.path}
              title={item.title} path={item.path}
            />) }
        </div>

        {
          props.children ? (<>
            <div className='flex flex-col gap-1'>
              { currentPath ? <ColumnHeader title={currentPath} /> : null }
              {props.children}
            </div>
          </>) : null
        }

      </div>
      <div className='flex flex-row gap-4'>
        <Credit />
      </div>
    </main>
  </div>)
}
