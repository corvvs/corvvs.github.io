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
    body: [
      "2人チーム。",
    ].join("\n"),
  },
  {
    title: "malloc",
    repo: { url: "https://github.com/corvvs/allocyou", icon: Fa.FaGithub },
    summary: "malloc/free/realloc ...などの実装", techs: ["C"], wip: true,
    body: [
      "みんな大好き malloc を自作する。ただしbrkは使わない。",
      "「assertは(実装によっては)内部でmalloc/freeを呼ぶ」ことが、マルチスレッド対応時にとんでもない問題を巻き起こすことに。",
      "fastbinをやらなかったのがちょっと心残りだが、 vim と bash が動くのでよしとする。",
    ].join("\n"),
  },
  {
    title: "ls",
    repo: { url: "https://github.com/corvvs/ls", icon: Fa.FaGithub },
    summary: "lsコマンドの機能限定クローン", techs: ["C"], wip: true,
    body: [
      "無意味に実行されるコマンド第1位こと ls を自作する。",
      "macOS / Linux 両対応。無駄に。",
      "macOS の script コマンドにバグがあることが発覚。",
    ].join("\n"),
  },

  {
    title: "DSLR",
    repo: { url: "https://github.com/corvvs/kedavra", icon: Fa.FaGithub },
    summary: "ロジスティック回帰による多クラス分類", techs: [ "Data Science", "TypeScript", "SVG" ],
    body: [
      "2人チーム。",
      "へそ曲がりなので TypeScript で書いた。",
      "画像出力もほぼ(lodash と sprintf 以外)スクラッチで書けたのでそこそこ満足。",
    ].join("\n"),
  },
  {
    title: "turing",
    repo: { url: "https://github.com/corvvs/turrrr", icon: Fa.FaGithub },
    summary: "チューリングマシンシミュレータの製作", techs: ["OCaml"],
    body: [
      "2人チーム。",
      "「シミュレータ」と「チューリングマシン定義作成」のうち「シミュレータ」を担当。",
      "OCaml のエコシステムに大苦戦。",
      "コード自体は割とすんなり書けた。"
    ].join("\n"),
  },
  {
    title: "libasm",
    repo: { url: "https://github.com/corvvs/asm", icon: Fa.FaGithub },
    summary: "x86_64アセンブラによる簡単(?)な関数の実装", techs: ["Asm", "LLDB"],
    body: [
      "アセンブラなんもわからん状態から始めたため、前提知識の収集に非常に手間取る。",
      "詳しい人に聞きまくってなんとか。",
      "その後は C で書いたコードを逆アセンブルしてじっと睨む日々。"
    ].join("\n"),
  },
  {
    title: "dr_quine",
    repo: { url: "https://github.com/corvvs/quine", icon: Fa.FaGithub },
    summary: "変則的なクワインの製作", techs: ["C", "Asm", "Ruby"],
    body: [
      "いわゆるクワイン(quine)...に余計な条件がついたもの3種を, C と Asm と任意の言語で作る。",
      "クワイン自体は勝ちパターンを見つければほぼ機械的に書ける。",
      "「面白い」クワインとなると話は変わってくるが・・・",
    ].join("\n"),
  },
  {
    title: "transcendence",
    repo: { url: "https://github.com/JUNNETWORKS/42-ft_transcendence", icon: Fa.FaGithub },
    summary: "DB/バックエンドを伴うPvPゲームSPAの製作", techs: ["TypeScript", "React", "TailwindCSS", "NestJS", "PostgreSQL", "Socket.IO", "Docker"],
    body: [
      "4人チーム。Common Core 最終課題。",
      "人間心理の捉えどころのなさに悩まされる。",
      "「マネジメントって面白いかも」と思えるようになったのは収穫。",
    ].join("\n"),
  },
  {
    title: "webserv",
    repo: { url: "https://github.com/corvvs/webserv", icon: Fa.FaGithub },
    summary: "イベント駆動HTTPサーバの実装", techs: ["C++", "Docker"],
    body: [
      "3人チーム。",
      "自分の最大の弱点が露呈した課題。",
      "「CGIの実行以外の目的で fork してはならない」「IO多重化必須」などなどの制約があるため、アーキテクチャはかなり限定される。",
    ].join("\n"),
  },
  {
    title: "containers",
    repo: { url: "https://github.com/corvvs/containers", icon: Fa.FaGithub },
    summary: "STLコンテナの再実装", techs: ["C++"],
    body: [
      "vector, map, set, pair, stack を再実装する。",
      "苦行、もしくは修行、あるいは荒行。",
      "42特有のルールのせいで auto が使えないことにうんざりさせられる。",
      "この課題に限った事ではないが、コミットコメントがひどい・・・"
    ].join("\n"),
  },
  {
    title: "miniRT",
    repo: { url: "https://github.com/ryo-manba/miniRT", icon: Fa.FaGithub },
    summary: "初歩的なレイトレーシングエンジンの実装", techs: ["C"],
    body: [
      "2人チーム。GPUは使わない。",
      "FdF と同じく数式まみれになる課題だが, 同じ3Dとはいえ似ているようで実はそれほど似ていない。",
      "レンダリングのマルチスレッド化は、実装コストの割に効果が劇的で良かった。",
    ].join("\n"),
  },
  {
    title: "minishell",
    repo: { url: "https://github.com/ryo-manba/minishell", icon: Fa.FaGithub },
    summary: "bash-likeなシェルの実装", techs: ["C"],
    body: [
      "2人チームで bash を再現する。",
      "明確な比較対象があるとついつい作り込んでしまう。",
    ].join("\n"),
  },
  {
    title: "FdF",
    repo: { url: "https://github.com/corvvs/fildefer", icon: Fa.FaGithub },
    summary: "ワイヤーフレームのレンダリング", techs: ["C"],
    body: [
      "数式まみれになる課題。",
      "3Dをきちんと触るのは初めての経験で、非常に楽しかった。"
    ].join("\n"),
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

