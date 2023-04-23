import Layout from "@/components/Layout";
import MainContentBlock from "@/components/MainContentBlock";
import { DocItem, DocItemsQiita } from "@/data";

const DocListItem = (props: { item: DocItem; }) => {
  const { item } = props;
  return <li className="flex flex-col gap-0">
    <h3><a className="underline" href={item.to}>{item.title}</a></h3>
    <p>{ item.summary }</p>
  </li>
}

const DocsContent = () => {
  return (
    <>

      <div className="flex flex-col gap-4">
        <h3 className='bio-sub-header'>Qiita</h3>
        <ul className="flex flex-col gap-4">
          { DocItemsQiita.map((item) => <DocListItem key={item.title} item={item} />) }
        </ul>
      </div>

    </>
  );
}

export default function Docs() {
  return (
    <Layout>
      <MainContentBlock><DocsContent /></MainContentBlock>
    </Layout>
  );
}
