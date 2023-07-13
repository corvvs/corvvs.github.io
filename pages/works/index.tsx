import { ExLinkButton } from "@/components/lv1/ExLinkButton";
import Layout from "@/components/Layout";
import MainContentBlock from "@/components/MainContentBlock";
import { WorkItemsFT, WorkItemsPrivate, WorkItem } from "@/data";


const TechsList = (props: {
  techs: string[];
}) => {
  return <ul className="flex flex-row flex-wrap gap-1">
    { props.techs.map((tech) => <li key={tech} className="px-2 py-0 border-[1px]">{tech}</li>) }
  </ul>
}

const WorksListItem = (item: WorkItem) => {
  const links = item.links
    ? <>{ item.links.map((link, i) => <ExLinkButton key={i} item={link} />) }</>
    : item.repo
      ? <ExLinkButton item={item.repo} />
      : null
  return <li className="flex flex-col border-[1px] p-2 w-full sm:max-w-sm gap-2">
    <div className="flex flex-col">
      <div className="flex flex-row items-center border-b-[1px] gap-1">
        <h3 className="text-xl font-bold">
          { item.wip ? "(WIP)" : null }
          { item.title }
        </h3>
        { links }
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
    <ul className="flex flex-row items-start flex-wrap gap-8">
      { props.items.map((item) => <WorksListItem key={item.title} {...item} />) }
    </ul>
  </div>
};

const WorksContent = () => {
  return (<>
    <WorksList title="個人的なもの" items={WorkItemsPrivate} />
    <WorksList title="42Tokyo Exercises" items={WorkItemsFT} />
  </>);
}

export default function Works() {
  return (
    <Layout>
      <MainContentBlock><WorksContent /></MainContentBlock>
    </Layout>
  );
}