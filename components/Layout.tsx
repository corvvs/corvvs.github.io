import { assetPrefix } from "@/constants/path";
import { siteConfigAtom } from "@/states";
import { useAtom } from "jotai";
import { Credit } from "./Credit";
import { ReactNode, useState } from "react";
import { useRouter } from "next/router";
import _ from 'lodash';
import ColumnHeader from "./ColumnHeader";
import { ConfigButton } from "./ConfigButton";

// [Item]
// 以下の性質を持つコンポーネント:
// - クリックした時の遷移先として `path: string` を持つ.
// - パラメータ `active: boolean` を取る or 表示文字列として`title: string` を持つ.


type ItemComponent = (props: { active: boolean; path?: string; }) => JSX.Element;

type ItemParam = {
  title: ItemComponent | string;
  path?: string;
};

const Items: ItemParam[] = [
  { title: "作者の情報", path: "about_me", },
  { title: "制作物", path: "works", },
  { title: "文書", path: "docs", },
  { title: ConfigButton, path: "config", },
];

const Outer = (props: Omit<ItemParam, "title"> & {
  active?: boolean;
  children: ReactNode;
}) => {
  const router = useRouter();
  if (props.active) {
    return <div className="
      column-item-active
      flex flex-col items-center p-[0.05em]
      border-[0.1em]
    "
    >
      {props.children}
    </div>
  } else {
    return (
      <div className="
        column-item
        flex flex-col items-center p-[0.05em]
        hover:opacity-100 cursor-pointer border-[0.1em]
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
  const t = props.title;
  if (typeof t === "function") {
    return t({ active: !!props.active, path: props.path });
  }
  return (
    <Outer active={props.active} path={props.path}>
      <div className="flex flex-col w-40 p-1 px-2 text-xl font-bold tracking-wide">{t}</div>
    </Outer>
  );
};

export default function Layout(props: {
  children?: ReactNode;
}) {
  const [backgroundImage] = useAtom(siteConfigAtom.backgroundImage);

  const router = useRouter();
  const [, currentPath] = router.pathname.split("/");

  return (<><div
      className="flex min-h-screen max-h-screen flex-row justify-stretch"
      style={{ backgroundImage: backgroundImage ? `url(${assetPrefix}/bg/lofi_${backgroundImage})` : undefined, backgroundSize: "cover" }}
    >
    <main
      className="flex min-h-screen max-h-screen flex-row items-stretch grow shrink px-24 gap-4"
      style={{ backgroundImage: backgroundImage ? `url(${assetPrefix}/bg/${backgroundImage})` : undefined, backgroundSize: "cover" }}
    >
      <div className='flex flex-col gap-4 grow-0 shrink-0 py-24'>
        <div className='flex flex-col gap-1 grow shrink'>
          <ColumnHeader title="#" />
          { Items.map((item, i) =>
            <GridBlock
              key={i}
              active={currentPath == item.path}
              title={item.title} path={item.path}
            />) }
        </div>
        <div className='grow-0 shrink-0'>
          <Credit />
        </div>
      </div>

      {
        props.children ? (<>
          <div className='flex flex-col gap-1 max-h-full overflow-scroll pt-24'>
            { currentPath ? <ColumnHeader title={currentPath} /> : null }
            {props.children}
          </div>
        </>) : null
      }
    </main>
  </div>
  </>)
}
