import { ExLinkButton } from "@/components/ExLinkButton";
import Layout from "@/components/Layout";
import { ItemsFT, ItemsPrivate, WorkItem } from "@/data";


const TechsList = (props: {
  techs: string[];
}) => {
  return <ul className="flex flex-row flex-wrap gap-1">
    { props.techs.map((tech) => <li key={tech} className="px-2 py-0 border-[1px]">{tech}</li>) }
  </ul>
}

const WorksListItem = (item: WorkItem) => {
  return <li className="flex flex-col border-[1px] p-2 max-w-sm gap-2">
    <div className="flex flex-col">
      <div className="flex flex-row items-center border-b-[1px] gap-1">
        <h3 className="text-xl font-bold">
          { item.wip ? "(WIP)" : null }
          { item.title }
        </h3>
        { item.repo ? <ExLinkButton item={item.repo} /> : null }
      </div>
      <h4>{ item.summary }</h4>
    </div>
    { item.techs ? <TechsList techs={item.techs} /> : null }
    { item.body ? <p className="whitespace-pre-line">{item.body}</p> : null }
  </li>
};

const WorksList = (props: {
  title: string;
  items: WorkItem[];
}) => {
  return <div className="flex flex-col gap-4">
    <h3 className='bio-sub-header'>{ props.title }</h3>
    <ul className="flex flex-row items-start flex-wrap gap-4">
      { props.items.map((item) => <WorksListItem key={item.title} {...item} />) }
    </ul>
  </div>
};

const WorksContent = () => {
  return (
    <div className='reader-block flex flex-col border-[0.1em] gap-8 p-8'>

      <WorksList title="個人的なもの" items={ItemsPrivate} />

      <WorksList title="42Tokyo Exercises" items={ItemsFT} />

    </div>
  );
}

export default function Works() {
  return (
    <Layout>
      <WorksContent />
    </Layout>
  );
}