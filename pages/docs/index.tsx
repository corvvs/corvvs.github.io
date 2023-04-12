import Layout from "@/components/Layout";
import { DocItem, ItemsQiita } from "@/data";

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