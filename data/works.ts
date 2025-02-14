import { ExLink } from '@/components/lv1/ExLinkButton';
import { BsGlobe } from 'react-icons/bs';
import { FaGithub, FaGlobe } from 'react-icons/fa';

export type WorkItem = {
  title: string;
  repo?: string | ExLink;
  links?: (string | ExLink)[];
  techs?: string[];
  summary: string;
  wip?: boolean;
  body?: string;
};

export const WorkItemsPrivate: WorkItem[] = [
  {
    title: 'life',
    repo: {
      url: 'https://github.com/corvvs/corvvs.github.io',
      icon: FaGithub,
    },
    summary: 'このサイト自体',
    techs: ['Next.js', 'TypeScript', 'TailwindCSS'],
    body: [
      '「2000年代初頭の個人サイト」をコンセプトにお送りしています。',
    ].join('\n'),
  },

  {
    title: 'JSON Analyzer(仮名)',
    links: [
      { url: 'https://jet.corvvs.dev/', icon: BsGlobe },
      {
        url: 'https://github.com/corvvs/jt',
        icon: FaGithub,
      },
    ],
    summary: 'JSON分析ツール',
    techs: [
      'Next.js',
      'TypeScript',
      'TailwindCSS',
      'vercel',
    ],
    body: [
      'FirefoxのJSON表示機能は便利なんだけど、いまひとつ痒い所に手が届かねェ・・・',
      'という思いが高じて作った99%自分のためのJSON分析ツール。',
    ].join('\n'),
  },

  {
    title: "TypeSeer(仮名)",
    links: [
      { url: "https://github.com/corvvs/typeseer", icon: FaGithub },
    ],
    summary: "JSON型定義生成器", techs: ["TypeScript"],
    body: [
      "よくわからないJSONが大量に降ってきた時、それら全てに適合する型定義を作るためのツール。",
      "今のところはCLIアプリ。"
    ].join("\n"),
  },

  {
    title: '42HoursTuningTheBackend',
    repo: {
      url: 'https://github.com/corvvs/42HoursTuningTheBackend',
      icon: FaGithub,
    },
    summary:
      '42時間耐久パフォーマンスチューニングコンテスト',
    techs: ['nginx', 'MySQL', 'TypeScript'],
    body: [
      '3人チームによる対抗戦。',
      '42時間の競技時間内にWebアプリケーションの性能を可能な限り向上させる, いわゆる ISUCON 形式のコンテスト。',
      '2 / 34 位だったが, 1位のチームからは2倍近く点差がついた。',
    ].join('\n'),
  },

  {
    title: 'graint',
    repo: {
      url: 'https://github.com/corvvs/graint',
      icon: FaGithub,
    },
    summary: '初歩的な重力三体問題のシミュレータ',
    techs: ['C', 'gnuplot'],
    body: [
      '古典力学の重力三体問題を, 微分方程式を数値的に解くことでシミュレートするプログラム。',
      'gnuplot でアニメーションを作るスキルが身に付いた。無駄に。',
    ].join('\n'),
  },
];

export const WorkItemsCTFContest: WorkItem[] = [
  {
    title: 'Wani CTF 2024',
    repo: {
      url: 'https://ctftime.org/team/308046',
      icon: FaGlobe,
    },
    summary: '2024-06-21 ~ 2024-06-23',
    techs: ['C', 'ASM', 'Ghidra', 'Docker'],
    body: [
      '主にReversing, Miscを担当.',
      '4位. 前回とは逆にReversing問題が分厚いなか全完できたので, それなりに貢献できた気がする.',
    ].join('\n'),
  },
  {
    title: 'SECCON Beginners CTF 2024',
    repo: {
      url: 'https://score.beginners.seccon.jp/',
      icon: FaGlobe,
    },
    summary: '2024-06-15 ~ 2024-06-16',
    techs: ['C', 'ASM', 'Ghidra', 'Docker'],
    body: [
      '主にReversing, Miscを担当.',
      '29位. Reversing問題の層が薄かったので得点貢献度が微妙だった。',
    ].join('\n'),
  },
  {
    title: 'AKASEC CTF 2024',
    repo: {
      url: 'https://ctftime.org/team/306623',
      icon: FaGlobe,
    },
    summary: '2024-06-07 ~ 2024-06-09',
    techs: ['C', 'ASM', 'Ghidra', 'Docker'],
    body: [
      '主にReversing, Miscを担当.',
      '46位. 初のCTFにしては上出来だったと思う.',
    ].join('\n'),
  },
];

export const WorkItemsFT: WorkItem[] = [
  {
    title: 'ftl_quantum',
    wip: true,
    repo: {
      url: 'https://github.com/corvvs/q',
      icon: FaGithub,
    },
    summary: '量子コンピュータ基礎の基礎',
    techs: ['Python', 'IBM Quantum', 'Qiskit'],
    body: [
      'IBM Quantum を使って非常に初歩的な量子回路を実装していく。',
    ].join('\n'),
  },
  {
    title: 'Override',
    wip: true,
    summary: 'CTF Pwn初級編',
    techs: ['C', 'ASM', 'Ghidra', 'gdb'],
    body: [
      "(repoは答えそのものなので非公開)",
      "CTF問題が10問連続で出題される。",
      "こちらもすべてPwn問題で, ほぼすべてx86 ELFバイナリだが, 64bit(x86_64)バイナリも出題される。",
      "またデバッグ禁止問題など, ひねりの効いた問題も混ざっている。"
    ].join("\n"),
  },
  {
    title: 'Rainfall',
    wip: true,
    summary: 'CTF Pwn入門編',
    techs: ['C', 'ASM', 'Ghidra', 'gdb'],
    body: [
      '(repoは答えそのものなので非公開)',
      'CTF問題が14問連続で出題される。',
      'すべていわゆるPwn問題で, 32bit x86 ELF バイナリを対象としている。',
      'シェルコードというものを初めて使った。最初はWebからパクってきただけだったが・・・',
    ].join('\n'),
  },
  {
    title: 'snow_crash',
    summary: '初歩的CTF',
    techs: ['C', 'ASM', 'Ghidra', 'PHP', 'Perl', 'Lua'],
    body: [
      '(repoは答えそのものなので非公開)',
      '雑多なCTF問題が15問連続で出題される。',
      '難易度はそこまで難しくはないが、終盤になるとリバースコンパイルが要求される。',
      'また、問題のジャンルは偏っている。',
    ].join('\n'),
  },

  {
    title: 'ssl',
    repo: {
      url: 'https://github.com/corvvs/orenetutils-ssl',
      icon: FaGithub,
    },
    wip: true,
    summary: 'OpenSSLの暗号再実装',
    techs: ['C'],
    body: [
      '"SSL" という名前だが, 通信ではなく暗号関連の機能を実装する。',
      '3つのセクションに分かれており, だいたい「ハッシュ(md5, SHA)」「DES暗号」「RSA暗号」という感じ。',
      '現在は「ハッシュ」まで終了している。',
    ].join('\n'),
  },

  {
    title: 'traceroute',
    repo: {
      url: 'https://github.com/corvvs/orenetutils-traceroute',
      icon: FaGithub,
    },
    wip: true,
    summary: 'traceroute コマンドの再現',
    techs: ['C', 'Docker', 'Wireshark'],
    body: [].join('\n'),
  },

  {
    title: 'ping',
    repo: {
      url: 'https://github.com/corvvs/ding',
      icon: FaGithub,
    },
    summary: 'inetutils 版 ping コマンドの再現',
    techs: ['C', 'Docker', 'Wireshark'],
    body: [
      'いまいち使い方がわかってないコマンドの1つである ping を実装する。',
      '要件とは直接関係しないのだが, 初めてパケットキャプチャなるものをやってみた。',
    ].join('\n'),
  },

  {
    title: 'Cloud-1',
    summary:
      'クラウドインフラのセットアップとコンテナアプリケーションデプロイの自動化演習',
    techs: ['Terraform', 'Ansible', 'Docker', 'AWS'],
    wip: true,
    body: [
      '2人チーム。',
      'マルチコンテナ構成のアプリケーションを, クラウド上のVM(1つ!!)にデプロイする。',
      'ただしデプロイは完全に自動化されている必要がある。',
      '(あと自腹も切る必要がある。)',
      '自動化を要求されているのはデプロイのみだが、どうせならインフラの構築も自動化しようぜ、ということでTerraformを持ち出す。',
    ].join('\n'),
  },

  {
    title: 'nm',
    repo: {
      url: 'https://github.com/corvvs/num',
      icon: FaGithub,
    },
    summary:
      '実行・オブジェクトファイルを解析するコマンド nm の実装',
    techs: ['C'],
    wip: true,
    body: [
      'バイナリファイルからシンボル情報を抽出して表示する、という、',
      '知らない人には本当に 何を言っているのか わからねー ことで有名なコマンド nm を作る。',
      'なお, ファイルフォーマットは ELF のみが要求されている。',
    ].join('\n'),
  },

  {
    title: 'Inception of Things',
    summary: 'k8sクラスタ上でのCD実習',
    techs: [
      'Vagrant',
      'Kubernetes',
      'Helm',
      'ArgoCD',
      'GitLab',
    ],
    wip: true,
    body: [
      '2人チーム。',
      '軽量版Kubernertes(k3s, k3d)を使ってクラスタを作り, CD環境を立ち上げる。',
      'この課題で最も難しいのは Vagrant が動くマシンを用意すること(異論は認める)。',
    ].join('\n'),
  },

  {
    title: 'MLP',
    repo: {
      url: 'https://github.com/corvvs/mlp',
      icon: FaGithub,
    },
    summary: '多層パーセプトロンの実装',
    techs: ['Data Science', 'TypeScript'],
    wip: true,
    body: [].join('\n'),
  },

  {
    title: 'malloc',
    repo: {
      url: 'https://github.com/corvvs/allocyou',
      icon: FaGithub,
    },
    summary:
      'メモリアロケータ(malloc/free/realloc ...など)の実装',
    techs: ['C'],
    body: [
      'みんな大好き malloc とそのフレンズを自作する。',
      'malloc のおおまかなコンセプトは「システムからユーザ空間に大きなメモリ領域を確保しておき, それをユーザからのリクエストに応じて細切れにして渡す」。',
      'システムからのメモリ確保にはシステムコール brk または mmap が使われるが, 課題上 mmap のみ許可されている。',
      '単純に作るだけならリンクリストを慎重に操作するだけだが, これをスレッドセーフにしようと思うと考えることが一気に増える。',
      '各種条件を assert で厳重にチェックしていたが、これがとんでもない嵐を巻き起こすことになった・・・',
      'fastbins をやらなかったのがちょっと心残りだが、 vim と bash を動かせたのでよしとする。',
    ].join('\n'),
  },

  {
    title: 'ls',
    repo: {
      url: 'https://github.com/corvvs/ls',
      icon: FaGithub,
    },
    summary: 'lsコマンドの機能限定クローン',
    techs: ['C'],
    body: [
      '無意味に実行されるコマンド第1位こと ls を自作する。',
      'macOS / Linux 両対応。といってもレイアウトが違うくらいで本質的には同じ。',
      '製作過程で実際のコードをチラ読みしたが, macOS と Linux(coreutils) とで中身が結構違う。',
      'テスト過程で macOS の script コマンドにバグがあることが発覚。',
      '実を言うと無限ループ対策をしていないことをここに告白しておく。しろよ。',
    ].join('\n'),
  },

  {
    title: 'DSLR',
    repo: {
      url: 'https://github.com/corvvs/kedavra',
      icon: FaGithub,
    },
    summary: 'ロジスティック回帰による多クラス分類',
    techs: ['Data Science', 'TypeScript', 'SVG'],
    body: [
      '2人チーム。',
      'ホグワーツの生徒1600人の成績データが科目別に与えられるので、成績から所属寮を推定するプログラムを作る。',
      '要するに組分け帽子。',
      'ML / 統計系のライブラリは使用禁止(math系はOK)。',
      'へそ曲がりなので TypeScript で書いた。',
      '画像出力まで含めて外部ライブラリにほとんど依存しない(lodash と sprintf 以外)で書けたのでそこそこ満足。',
    ].join('\n'),
  },

  {
    title: 'linear regression',
    repo: {
      url: 'https://github.com/corvvs/regress_progress',
      icon: FaGithub,
    },
    summary: '線形回帰による点推定',
    techs: ['Data Science', 'Ruby'],
    body: [].join('\n'),
  },

  {
    title: 'turing',
    repo: {
      url: 'https://github.com/corvvs/turrrr',
      icon: FaGithub,
    },
    summary: 'チューリングマシンシミュレータの製作',
    techs: ['OCaml'],
    body: [
      '2人チーム。',
      '「シミュレータ」と「チューリングマシン定義作成」のうち「シミュレータ」を担当。',
      'OCaml のエコシステムに大苦戦。',
      'コード自体は割とすんなり書けたのだが、「与えられたマシン定義の時間計算量を見積もる」という追加課題の意味が今もってわからない。なにこれ？',
    ].join('\n'),
  },

  {
    title: 'libasm',
    repo: {
      url: 'https://github.com/corvvs/asm',
      icon: FaGithub,
    },
    summary: 'x86_64アセンブラによる簡単(?)な関数の実装',
    techs: ['Asm', 'LLDB'],
    body: [
      'アセンブラなんもわからん状態から始めたため、詳しい人に聞きまくって前提知識を掻き集める。',
      'アセンブラのコードを見ると、ループと末尾再帰がほとんど同じであることが実感できる。',
      'コンパイラがめちゃくちゃに最適化した後のコードを読解する遊びが自分の中で流行った。',
    ].join('\n'),
  },

  {
    title: 'dr_quine',
    repo: {
      url: 'https://github.com/corvvs/quine',
      icon: FaGithub,
    },
    summary: '変則的なクワインの製作',
    techs: ['C', 'Asm', 'Ruby'],
    body: [
      'いわゆるクワイン(quine)...に余計な条件がついたもの3種を, C と Asm と任意の言語で作る。',
      'クワイン自体は勝ちパターンが見つかればほぼ機械的に書ける。',
      '「面白い」クワインとなると話は変わってくるが・・・',
      'ちなみにこの課題はマルウェア系課題への前振りという位置付けであり、クワインに課される条件もそれを念頭に置いたものとなっている(たとえば自己増殖性)。',
    ].join('\n'),
  },

  {
    title: 'transcendence',
    repo: {
      url: 'https://github.com/JUNNETWORKS/42-ft_transcendence',
      icon: FaGithub,
    },
    summary: 'DB/バックエンドを伴うPvPゲームSPAの製作',
    techs: [
      'TypeScript',
      'React',
      'TailwindCSS',
      'NestJS',
      'PostgreSQL',
      'Socket.IO',
      'Docker',
    ],
    body: [
      '4人チーム。Common Core 最終課題。',
      'PONGの1:1対戦にフレンド・チャット機能がついたゲームwebサービスを作る。',
      'フロントエンドは React, バックエンドは NestJS(で固定), DB は PostgreSQL(で固定)を使用。',
      'チームメンバーがいい感じのピクセルフォントを見つけてきたので, それに合わせてチープめのデザインを作り込んだ。',
      'これに関しては正直そのフォントを見つけた時点で勝ちだった気がする。',
      'webserv に続けて人間心理の捉えどころのなさに−もちろん自分自身のものも含めて−悩まされたが、ペアプログラミングの威力を実感できたのは収穫だった。',
      'これをきっかけに「マネジメントって面白いかも」と思えるようになった、かもしれない。',
      '初めて React に触れたが, Vue に比べるとその「きっちり」さが性に合っていると思う。',
    ].join('\n'),
  },
  {
    title: 'webserv',
    repo: {
      url: 'https://github.com/corvvs/webserv',
      icon: FaGithub,
    },
    summary: 'イベント駆動HTTP/1.1サーバの実装',
    techs: ['C++', 'Docker'],
    body: [
      '3人チーム。',
      '最大の弱点「チームプレイの経験に乏しい」が露呈した課題。',
      '「CGIの実行以外の目的で fork してはならない」「IO多重化必須」「イベントループはプログラム全体で1つだけ」などなどの制約があるため、必然的にアーキテクチャは絞られる。',
      '結局1スレッド - 1プロセスに落ち着いた。',
      'イベント監視系として select / poll / kqueue を任意に差し替えられるようにしてみた(epollも使えたが, 基本的に macOS 上で開発・テストしていたのでこの時はスルー)。',
      'クラス設計にかなりの時間をかけたが、その甲斐はあったと思う。',
    ].join('\n'),
  },

  {
    title: '2048',
    repo: {
      url: 'https://github.com/corvvs/2048',
      icon: FaGithub,
    },
    summary: 'テキストUIでプレイできる2048パズルの作成',
    techs: ['C', 'ncurses'],
    body: [
      '2人チーム, タイムリミット60時間。',
      '趣味の王様こと2048をテキストUIで実装する。',
      '楽しくなっちゃったので機能を色々持ってみた。',
      'ただしアニメーションまではできず。',
    ].join('\n'),
  },

  {
    title: 'inception',
    summary: '複数コンテナからなるWebアプリサービスの構築',
    techs: [
      'Docker',
      'nginx',
      'WordPress',
      'Adminer',
      'MySQL',
      'Redis',
    ],
    body: [
      'WordPressを中核としたコンテナ群によるWebアプリサービスを, docker-compose を使って管理する.',
      '外部に直接公開されているのはnginxのみで, 内部のサービスとの通信は nginx を通じて行う.',
      '(ただし管理のためここのコンテナにはSSHでログインできる.)',
    ].join('\n'),
  },

  {
    title: 'containers',
    repo: {
      url: 'https://github.com/corvvs/containers',
      icon: FaGithub,
    },
    summary: 'STLコンテナの再実装',
    techs: ['C++'],
    body: [
      'vector, map, set, pair, stack を再実装する。',
      'テンプレートと真剣に向き合う課題。その over powered ぶりを思い知った。',
      '42特有のルールのせいで auto が使えないため、非常に冗長なコーディングを強いられる。',
      'この課題に限った事ではないが、コミットコメントがひどい・・・',
    ].join('\n'),
  },

  {
    title: 'miniRT',
    repo: {
      url: 'https://github.com/ryo-manba/miniRT',
      icon: FaGithub,
    },
    summary: '初歩的なレイトレーシングエンジンの実装',
    techs: ['C'],
    body: [
      '2人チーム。GPUは使わない。',
      'FdF と同じく数式まみれになる課題だが, 同じ3Dとはいえ似ているようで実はそれほど似ていない。',
      '線形な FdF に対しこちらは非線形だからだろうか。',
    ].join('\n'),
  },

  {
    title: 'minishell',
    repo: {
      url: 'https://github.com/ryo-manba/minishell',
      icon: FaGithub,
    },
    summary: 'bash-likeなシェルの実装',
    techs: ['C'],
    body: [
      '2人チームで bash を再現する。',
      'まず bash の挙動を時間をかけて徹底的に観察した上で, それらの挙動を再現するような「なるべく自然、かつ大きなルール」を構築するアプローチを取った。',
      '100%とはいかないが、まずまず上手くいったと思う。',
    ].join('\n'),
  },

  {
    title: 'FdF',
    repo: {
      url: 'https://github.com/corvvs/fildefer',
      icon: FaGithub,
    },
    summary: 'ワイヤーフレームのレンダリング',
    techs: ['C'],
    body: [
      '数式まみれになる課題。',
      'ただし平行投影なのでパースがなく、その分考えやすい。',
      '3Dをきちんと触るのは初めての経験で、非常に楽しかった。',
    ].join('\n'),
  },

  {
    title: 'printf',
    summary: 'printfの再実装',
    techs: ['C'],
    body: [
      '対応しているフォーマット指定子はcsdiuxXpo%efg.',
      '(課題改訂により, efg は今は課題範囲外となっている.)',
      'efgとフラグの一見不規則な(ように見える)相互作用に翻弄される10日間だった。',
    ].join('\n'),
  },
];
