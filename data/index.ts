import { ExLink } from "@/components/ExLinkButton";
import * as Fa from "react-icons/fa";

export type WorkItem = {
  title: string;
  repo?: string | ExLink;
  techs?: string[];
  summary: string;
  wip?: boolean;
  body?: string;
};

export const ItemsFT: WorkItem[] = [
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
    summary: "DB/バックエンドを伴うPvPゲームSPAの製作", techs: ["TypeScript", "React", "TailwindCSS", "NestJS", "PostgreSQL", "Docker"],
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

export const ItemsPrivate: WorkItem[] = [
  {
    title: "life",
    repo: { url: "https://github.com/corvvs/life", icon: Fa.FaGithub },
    summary: "このサイト自体", techs: [ "Next.js", "TypeScript", "TailwindCSS", ],
  },
  {
    title: "graint",
    repo: { url: "https://github.com/corvvs/graint", icon: Fa.FaGithub },
    summary: "初歩的な重力三体問題のシミュレータ", techs: [ "C" ],
  },
]


export type DocItem = {
  title: string;
  to: string;
  summary: string;
};

export const ItemsQiita: DocItem[] = [
  {
    title: "＜AA木じゃねぇ　木のAAさ＞", to: "https://qiita.com/corvvs/items/6bcb7793c4428255cd21",
    summary: "42Tokyoの2022年のアドベントカレンダーに書いた二分木の可視化の記事。全然跳ねなかった。",
  },
  {
    title: "目で味わう三体問題", to: "https://qiita.com/corvvs/items/173b983a9a19ac5fe017",
    summary: "42Tokyoの2021年のアドベントカレンダーに書いた物理シミュレーションの記事。なぜかじわ伸びした。",
  },
];

