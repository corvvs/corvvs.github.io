import { useAtom } from "jotai";
import { Credit } from "./Credit";
import { ReactNode } from "react";
import { useRouter } from "next/router";
import _ from 'lodash';
import ColumnHeader from "./ColumnHeader";
import { ConfigButton } from "./ConfigButton";
import { siteConfigAtom, useBackgroundImage } from "@/states/config";

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
  { title: "実験室", path: "lab", },
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
  const [backgroundImage] = useBackgroundImage();
  console.log("[backgroundImage]", backgroundImage);

  const router = useRouter();
  const [, currentPath] = router.pathname.split("/");

  const lofiBackground = {
    backgroundImage: backgroundImage ? `url(/bg/lofi_${backgroundImage})` : undefined,
    backgroundSize: "cover",
  };
  const hifiBackground = {
    backgroundImage: backgroundImage ? `url(/bg/${backgroundImage})` : undefined,
    backgroundSize: "cover",
};

  // [メディアクエリ]
  // sm 以上で左メニューが出る
  // md 以上でパディングが大きくなる
  return (<><div
      className="min-h-screen max-h-screen flex flex-col justify-stretch overflow-hidden" style={lofiBackground}
    >
    <main
      className="flex flex-row items-stretch grow shrink gap-4 overflow-hidden" style={hifiBackground}
    >

      <div className='
        hidden sm:flex flex-col gap-4 grow-0 shrink-0
        py-24
        sm:pl-2 md:pl-24
      '>
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
          <div className='
            flex flex-col gap-1 max-h-full overflow-scroll
            pt-2 sm:pt-24
            pl-2 sm:pl-0
            pr-2 md:pr-24
          '>
            { currentPath ? <ColumnHeader title={currentPath} /> : null }
            {props.children}
          </div>
        </>) : null
      }

    </main>
  </div>
  </>)
}
