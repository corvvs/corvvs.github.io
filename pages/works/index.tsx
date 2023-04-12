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
  return <li className="flex flex-col border-[1px] p-2">
    <div className="flex flex-row items-center gap-1">
      <h3 className="text-xl">
        { item.wip ? "(WIP)" : null }
        { item.title }
      </h3>
      { item.repo ? <ExLinkButton item={item.repo} /> : null }
    </div>
    <h4>{ item.summary }</h4>
    { item.techs ? <TechsList techs={item.techs} /> : null }
  </li>
};

function WorksContent() {
  return (
    <div className='reader-block flex flex-col border-[0.1em] gap-8 p-8'>

      <div className="flex flex-col gap-4">
        <h3 className='bio-sub-header'>個人的なもの</h3>
        <ul className="flex flex-row flex-wrap gap-4">
          { ItemsPrivate.map((item) => <WorksListItem key={item.title} {...item} />) }
        </ul>
      </div>


      <div className="flex flex-col gap-4">
        <h3 className='bio-sub-header'>42Tokyo Excercises</h3>
        <ul className="flex flex-row flex-wrap gap-4">
          { ItemsFT.map((item) => <WorksListItem key={item.title} {...item} />) }
        </ul>
        ほか色々...
      </div>

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