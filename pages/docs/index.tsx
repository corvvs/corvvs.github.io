import Layout from "@/components/Layout";
import { IconType } from "react-icons";

type DocItem = {
  title: string;
  to: string;
  summary: string;
};

const ItemsQiita: DocItem[] = [
  {
    title: "＜AA木じゃねぇ　木のAAさ＞", to: "https://qiita.com/corvvs/items/6bcb7793c4428255cd21",
    summary: "42Tokyoの2022年のアドベントカレンダーに書いた二分木の可視化の記事。全然跳ねなかった。",
  },
  {
    title: "目で味わう三体問題", to: "https://qiita.com/corvvs/items/173b983a9a19ac5fe017",
    summary: "42Tokyoの2021年のアドベントカレンダーに書いた物理シミュレーションの記事。なぜかじわ伸びした。",
  },
];

const DocListItem = (props: { item: DocItem; }) => {
  const { item } = props;
  return <li className="flex flex-col gap-0">
    <h3><a className="underline" href={item.to}>{item.title}</a></h3>
    <p>{ item.summary }</p>
  </li>
}

export function DocsContent() {
  return (
    <div className='reader-block flex flex-col border-[0.1em] gap-8 p-8'>

      <div className="flex flex-col gap-4">
        <h3 className='bio-sub-header'>Qiita</h3>
        <ul className="flex flex-col gap-4">
          { ItemsQiita.map((item) => <DocListItem key={item.title} item={item} />) }
        </ul>
      </div>

    </div>
  );
}

export default function Docs() {
  return (
    <Layout>
      <DocsContent />
    </Layout>
  );
}