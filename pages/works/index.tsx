import Layout from "@/components/Layout";
import { IconType } from "react-icons";
import * as Fa from "react-icons/fa";


type ExLink = {
  url: string;
  icon: IconType;
}

type WorkItemFT = {
  title: string;
  repo?: string | ExLink;
  techs?: string[];
  summary: string;
  wip?: boolean;
  body?: string;
};

const ExLinkButton = (props: {
  item: ExLink | string;
}) => {
  const Icon = typeof props.item === "string" ? Fa.FaExternalLinkAlt : props.item.icon;
  const url = typeof props.item === "string" ? props.item : props.item.url;
  return <a href={url}><Icon/></a>
}

const TechsList = (props: {
  techs: string[];
}) => {
  return <ul className="flex flex-row flex-wrap gap-1">
    { props.techs.map((tech) => <li key={tech} className="px-2 py-0 border-[1px]">{tech}</li>) }
  </ul>
}

const WorkItem = (item: WorkItemFT) => {
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

const Items: WorkItemFT[] = [
  {
    title: "Inception of Things",
    summary: "オーケストレーション実習", techs: ["Vagrant", "Kubernetes"], wip: true,
  },
  {
    title: "malloc",
    repo: { url: "https://github.com/corvvs/allocyou", icon: Fa.FaGithub },
    summary: "malloc/free/realloc ...などの実装", techs: ["C"], wip: true,
  },
  {
    title: "ls",
    repo: { url: "https://github.com/corvvs/ls", icon: Fa.FaGithub },
    summary: "lsコマンドの機能限定クローン", techs: ["C"], wip: true,
  },
  {
    title: "turing",
    repo: { url: "https://github.com/corvvs/turrrr", icon: Fa.FaGithub },
    summary: "チューリングマシンシミュレータの製作", techs: ["OCaml"],
  },
  {
    title: "libasm",
    repo: { url: "https://github.com/corvvs/asm", icon: Fa.FaGithub },
    summary: "x86_64アセンブラによる簡単(?)な関数の実装", techs: ["Asm"],
  },
  {
    title: "dr_quine",
    repo: { url: "https://github.com/corvvs/quine", icon: Fa.FaGithub },
    summary: "変則的なクワインの製作", techs: ["C", "Asm", "Ruby"],
  },
  {
    title: "transcendence",
    repo: { url: "https://github.com/JUNNETWORKS/42-ft_transcendence", icon: Fa.FaGithub },
    summary: "DB/バックエンドを伴うPvPゲームSPAの製作", techs: ["TypeScript", "React", "NestJS", "PostgreSQL", "Docker"],
  },
  {
    title: "webserv",
    repo: { url: "https://github.com/corvvs/webserv", icon: Fa.FaGithub },
    summary: "イベント駆動HTTPサーバの実装", techs: ["C++", "Docker"],
  },
  {
    title: "containers",
    repo: { url: "https://github.com/corvvs/containers", icon: Fa.FaGithub },
    summary: "STLコンテナの再実装", techs: ["C++"],
  },
  {
    title: "miniRT",
    repo: { url: "https://github.com/ryo-manba/miniRT", icon: Fa.FaGithub },
    summary: "レイトレーシングエンジンの実装", techs: ["C"],
  },
  {
    title: "minishell",
    repo: { url: "https://github.com/ryo-manba/minishell", icon: Fa.FaGithub },
    summary: "bash-likeなシェルの実装", techs: ["C"],
  },
  {
    title: "FdF",
    repo: { url: "https://github.com/corvvs/fildefer", icon: Fa.FaGithub },
    summary: "ワイヤーフレームのレンダリング", techs: ["C"],
  },
];

export function WorksContent() {
  return (
    <div className='reader-block flex flex-col border-[0.1em] gap-8 p-8'>

      <div className="flex flex-col gap-4">
        <h3 className='bio-sub-header'>42Tokyo Excercises</h3>
        <ul className="flex flex-row flex-wrap gap-4">
          { Items.map((item) => <WorkItem key={item.title} {...item} />) }
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