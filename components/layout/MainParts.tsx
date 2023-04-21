import { ReactNode } from "react";
import { useRouter } from "next/router";
import _ from 'lodash';

// [Item]
// 以下の性質を持つコンポーネント:
// - クリックした時の遷移先として `path: string` を持つ.
// - パラメータ `active: boolean` を取る or 表示文字列として`title: string` を持つ.

type ItemComponent = (props: { active: boolean; path?: string; }) => JSX.Element;

type ItemParam = {
  title: ItemComponent | string;
  path?: string;
};

export const Items: ItemParam[] = [
  { title: "作者の情報", path: "about_me", },
  { title: "制作物", path: "works", },
  { title: "文書", path: "docs", },
  { title: "実験室", path: "lab", },
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

export const GridBlock = (props: ItemParam & {
  active?: boolean;
}) => {
  const t = props.title;
  if (typeof t === "function") {
    return t({ active: !!props.active, path: props.path });
  }
  return (
    <Outer active={props.active} path={props.path}>
      <div className="flex flex-col w-24 sm:w-40 p-1 px-2 text-xl font-bold tracking-wide">{t}</div>
    </Outer>
  );
};
