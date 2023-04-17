"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[892],{3878:function(e,t,r){r.d(t,{W:function(){return n}});var s=r(5893);let n=e=>{let{i:t,className:r}=e;return(0,s.jsx)("span",{className:"inline-block ".concat(r||"p-1"," align-middle"),children:t})}},3458:function(e,t,r){r.d(t,{Z:function(){return j}});var s=r(5893),n=r(8583),c=r(9583),i=r(3878);let l=()=>(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("p",{children:"2023 Kawada, Yosuke"}),(0,s.jsxs)("p",{children:[(0,s.jsx)("a",{href:"https://github.com/corvvs",children:(0,s.jsx)(i.W,{i:(0,s.jsx)(c.hJX,{})})}),(0,s.jsx)("a",{href:"https://twitter.com/corvvs",children:(0,s.jsx)(i.W,{i:(0,s.jsx)(c.fWC,{})})})]})]});var o=r(1163);function a(e){return(0,s.jsx)("div",{className:" column-header flex flex-col items-center p-[0.05em] border-[0.1em] ",children:(0,s.jsx)("div",{className:" text-sm flex flex-col w-40 p-0 text-center ",children:e.title})})}var m=r(3750),u=r(7294),h=r(6334),d=r(4080),x=r(7287);let p=e=>{let{children:t,closeModal:r,isOpen:n,tra:c,traPart:i,backTraPart:l}=e,o={...c||{enter:"transition duration-150 ease-out",enterFrom:"transform scale-100 opacity-0",enterTo:"transform scale-100 opacity-100",leave:"transition duration-100 ease-out",leaveFrom:"transform scale-100 opacity-100",leaveTo:"transform scale-100 opacity-0"},...i||{}},a={...c||{enter:"transition duration-100 ease-out",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"transition duration-75 ease-out",leaveFrom:"opacity-100",leaveTo:"opacity-0"},...i||{},...l||{}};return(0,s.jsx)(d.u,{show:n,as:u.Fragment,children:(0,s.jsxs)(x.V,{onClose:r,children:[(0,s.jsx)(d.u.Child,{...a,as:u.Fragment,children:(0,s.jsx)("div",{className:"fixed inset-0 z-50 bg-black/30 backdrop-blur-sm","aria-hidden":"true"})}),(0,s.jsx)(d.u.Child,{...o,as:u.Fragment,children:(0,s.jsx)("div",{className:"fixed inset-0 z-50 flex flex-1 flex-col items-center justify-center gap-32",children:(0,s.jsx)("div",{className:"flex max-h-[100%] w-full flex-col items-center overflow-y-auto p-2",children:(0,s.jsx)("div",{className:"flex items-center justify-center",children:(0,s.jsx)(x.V.Panel,{className:"mx-auto rounded",children:t})})})})})]})})};function f(){return(0,s.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,s.jsx)(a,{title:"setting"}),(0,s.jsx)("div",{className:"p-8 border-[1px] backdrop-blur-sm",children:(0,s.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,s.jsx)("h3",{className:"bio-sub-header",children:"背景画像"}),(0,s.jsx)(h.F,{})]})})]})}var b=r(3684);let v=[{title:"作者の情報",path:"about_me"},{title:"制作物",path:"works"},{title:"文書",path:"docs"},{title:"実験室",path:"lab"},{title:function(e){let[t,r]=(0,u.useState)(!1),n=()=>{r(!1)};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{className:"flex flex-row items-center justify-center",children:(0,s.jsx)("button",{className:t?"flex flex-row border-[1px] column-item-active rounded-full p-1 text-xl":"flex flex-row border-[1px] column-item rounded-full p-1 text-xl",onClick:()=>r(!0),children:(0,s.jsx)(i.W,{i:(0,s.jsx)(m.GEK,{})})})}),(0,s.jsx)(p,{closeModal:n,isOpen:t,children:(0,s.jsx)(f,{})})]})},path:"config"}],g=e=>{let t=(0,o.useRouter)();return e.active?(0,s.jsx)("div",{className:" column-item-active flex flex-col items-center p-[0.05em] border-[0.1em] ",children:e.children}):(0,s.jsx)("div",{className:" column-item flex flex-col items-center p-[0.05em] hover:opacity-100 cursor-pointer border-[0.1em] ",onClick:()=>t.push("".concat(e.path||"")),children:e.children})},y=e=>{let t=e.title;return"function"==typeof t?t({active:!!e.active,path:e.path}):(0,s.jsx)(g,{active:e.active,path:e.path,children:(0,s.jsx)("div",{className:"flex flex-col w-40 p-1 px-2 text-xl font-bold tracking-wide",children:t})})};function j(e){let[t]=(0,n.KO)(b.c.backgroundImage),r=(0,o.useRouter)(),[,c]=r.pathname.split("/");return(0,s.jsx)(s.Fragment,{children:(0,s.jsx)("div",{className:"flex min-h-screen max-h-screen flex-row justify-stretch",style:{backgroundImage:t?"url(/bg/lofi_".concat(t,")"):void 0,backgroundSize:"cover"},children:(0,s.jsxs)("main",{className:"flex min-h-screen max-h-screen flex-row items-stretch grow shrink px-24 gap-4",style:{backgroundImage:t?"url(/bg/".concat(t,")"):void 0,backgroundSize:"cover"},children:[(0,s.jsxs)("div",{className:"flex flex-col gap-4 grow-0 shrink-0 py-24",children:[(0,s.jsxs)("div",{className:"flex flex-col gap-1 grow shrink",children:[(0,s.jsx)(a,{title:"#"}),v.map((e,t)=>(0,s.jsx)(y,{active:c==e.path,title:e.title,path:e.path},t))]}),(0,s.jsx)("div",{className:"grow-0 shrink-0",children:(0,s.jsx)(l,{})})]}),e.children?(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("div",{className:"flex flex-col gap-1 max-h-full overflow-scroll pt-24",children:[c?(0,s.jsx)(a,{title:c}):null,e.children]})}):null]})})})}},6334:function(e,t,r){r.d(t,{F:function(){return m}});var s=r(5893),n=r(6663),c=r(3684),i=r(8583);let l=()=>(0,s.jsx)("div",{className:"flex flex-row items-center justify-center w-10 h-10 border-2"}),o=()=>{let[e,t]=(0,i.KO)(c.c.backgroundImage);return e?(0,s.jsx)("div",{className:"flex flex-row items-center justify-center w-10 h-10 border-2 cursor-pointer",onClick:()=>t(null),children:(0,s.jsx)("p",{className:"text-sm",children:"none"})}):(0,s.jsx)(l,{})},a=e=>{let t=n.b[e.imageIndex],[r,o]=(0,i.KO)(c.c.backgroundImage);return r===t?(0,s.jsx)(l,{}):(0,s.jsx)("div",{className:"flex flex-row items-center justify-center w-10 h-10 border-2 cursor-pointer",style:{backgroundImage:"url(/bg/".concat("thumb_".concat(t),")"),backgroundSize:"cover"},onClick:()=>o(t),children:(0,s.jsx)("p",{className:"text-xl",children:e.imageIndex+1})},t)},m=()=>(0,s.jsxs)("div",{className:"flex flex-row gap-2",children:[n.b.map((e,t)=>(0,s.jsx)(a,{imageIndex:t},t)),(0,s.jsx)(o,{})]})},8575:function(e,t,r){r.d(t,{Mr:function(){return c},U6:function(){return i},sM:function(){return n}});var s=r(9583);let n=[{title:"life",repo:{url:"https://github.com/corvvs/corvvs.github.io",icon:s.hJX},summary:"このサイト自体",techs:["Next.js","TypeScript","TailwindCSS"],body:"「2000年代初頭の個人サイト」をコンセプトにお送りしています。"},{title:"42HoursTuningTheBackend",repo:{url:"https://github.com/corvvs/42HoursTuningTheBackend",icon:s.hJX},summary:"42時間耐久パフォーマンスチューニングコンテスト",techs:["nginx","MySQL","TypeScript"],body:"3人チームによる対抗戦。\n42時間の競技時間内にWebアプリケーションの性能を可能な限り向上させる, いわゆる ISUCON 形式のコンテスト。\n2 / 34 位だったが, 1位のチームからは2倍近く点差がついた。"},{title:"graint",repo:{url:"https://github.com/corvvs/graint",icon:s.hJX},summary:"初歩的な重力三体問題のシミュレータ",techs:["C","gnuplot"],body:"古典力学の重力三体問題を, 微分方程式を数値的に解くことでシミュレートするプログラム。\ngnuplot でアニメーションを作るスキルが身に付いた。無駄に。"}],c=[{title:"Inception of Things",summary:"オーケストレーション実習",techs:["Vagrant","Kubernetes"],wip:!0,body:"2人チーム。"},{title:"malloc",repo:{url:"https://github.com/corvvs/allocyou",icon:s.hJX},summary:"メモリアロケータ(malloc/free/realloc ...など)の実装",techs:["C"],wip:!0,body:"みんな大好き malloc とそのフレンズを自作する。\nmalloc のおおまかなコンセプトは「システムからユーザ空間に大きなメモリ領域を確保しておき, それをユーザからのリクエストに応じて細切れにして渡す」。\nシステムからのメモリ確保にはシステムコール brk または mmap が使われるが, 課題上 mmap のみ許可されている。\n単純に作るだけならリンクリストを慎重に操作するだけだが, これをスレッドセーフにしようと思うと考えることが一気に増える。\n各種条件を assert で厳重にチェックしていたが、これがとんでもない嵐を巻き起こすことになった・・・\nfastbins をやらなかったのがちょっと心残りだが、 vim と bash を動かせたのでよしとする。"},{title:"ls",repo:{url:"https://github.com/corvvs/ls",icon:s.hJX},summary:"lsコマンドの機能限定クローン",techs:["C"],body:"無意味に実行されるコマンド第1位こと ls を自作する。\nmacOS / Linux 両対応。といってもレイアウトが違うくらいで本質的には同じ。\n製作過程で実際のコードをチラ読みしたが, macOS と Linux(coreutils) とで中身が結構違う。\nテスト過程で macOS の script コマンドにバグがあることが発覚。"},{title:"DSLR",repo:{url:"https://github.com/corvvs/kedavra",icon:s.hJX},summary:"ロジスティック回帰による多クラス分類",techs:["Data Science","TypeScript","SVG"],body:"2人チーム。\nホグワーツの生徒1600人の成績データが科目別に与えられるので、成績から所属寮を推定するプログラムを作る。\n要するに組分け帽子。\nML / 統計系のライブラリは使用禁止(math系はOK)。\nへそ曲がりなので TypeScript で書いた。\n画像出力まで含めて外部ライブラリにほとんど依存しない(lodash と sprintf 以外)で書けたのでそこそこ満足。"},{title:"turing",repo:{url:"https://github.com/corvvs/turrrr",icon:s.hJX},summary:"チューリングマシンシミュレータの製作",techs:["OCaml"],body:"2人チーム。\n「シミュレータ」と「チューリングマシン定義作成」のうち「シミュレータ」を担当。\nOCaml のエコシステムに大苦戦。\nコード自体は割とすんなり書けたのだが、「与えられたマシン定義の時間計算量を見積もる」という追加課題の意味が今もってわからない。なにこれ？"},{title:"libasm",repo:{url:"https://github.com/corvvs/asm",icon:s.hJX},summary:"x86_64アセンブラによる簡単(?)な関数の実装",techs:["Asm","LLDB"],body:"アセンブラなんもわからん状態から始めたため、詳しい人に聞きまくって前提知識を掻き集める。\nアセンブラのコードを見ると、ループと末尾再帰がほとんど同じであることが実感できる。\nコンパイラがめちゃくちゃに最適化した後のコードを読解する遊びが自分の中で流行った。"},{title:"dr_quine",repo:{url:"https://github.com/corvvs/quine",icon:s.hJX},summary:"変則的なクワインの製作",techs:["C","Asm","Ruby"],body:"いわゆるクワイン(quine)...に余計な条件がついたもの3種を, C と Asm と任意の言語で作る。\nクワイン自体は勝ちパターンが見つかればほぼ機械的に書ける。\n「面白い」クワインとなると話は変わってくるが・・・\nちなみにこの課題はマルウェア系課題への前振りという位置付けであり、クワインに課される条件もそれを念頭に置いたものとなっている(たとえば自己増殖性)。"},{title:"transcendence",repo:{url:"https://github.com/JUNNETWORKS/42-ft_transcendence",icon:s.hJX},summary:"DB/バックエンドを伴うPvPゲームSPAの製作",techs:["TypeScript","React","TailwindCSS","NestJS","PostgreSQL","Socket.IO","Docker"],body:"4人チーム。Common Core 最終課題。\nwebserv に続けて人間心理の捉えどころのなさに悩まされたが、ペアプログラミングの威力を実感できたのは収穫。\nこれをきっかけに「マネジメントって面白いかも」と思うようになった。\n初めて React に触れたが, Vue に比べるとその「きっちり」さが自分には合っていると思う。"},{title:"webserv",repo:{url:"https://github.com/corvvs/webserv",icon:s.hJX},summary:"イベント駆動HTTP/1.1サーバの実装",techs:["C++","Docker"],body:"3人チーム。\n最大の弱点「チームプレイの経験に乏しい」が露呈した課題。\n「CGIの実行以外の目的で fork してはならない」「IO多重化必須」「イベントループはプログラム全体で1つだけ」などなどの制約があるため、必然的にアーキテクチャは絞られる。\n結局1スレッド - 1プロセスに落ち着いた。\nイベント監視系として select / poll / kqueue を任意に差し替えられるようにしてみた。\nクラス設計にかなりの時間をかけたが、その甲斐はあったと思う。"},{title:"inception",summary:"複数コンテナからなるWebアプリサービスの構築",techs:["Docker","nginx","WordPress","Adminer","MySQL","Redis"],body:"WordPressを中核としたコンテナ群によるWebアプリサービスを, docker-compose を使って管理する.\n外部に直接公開されているのはnginxのみで, 内部のサービスとの通信は nginx を通じて行う.\n(ただし管理のためここのコンテナにはSSHでログインできる.)"},{title:"containers",repo:{url:"https://github.com/corvvs/containers",icon:s.hJX},summary:"STLコンテナの再実装",techs:["C++"],body:"vector, map, set, pair, stack を再実装する。\nテンプレートと真剣に向き合う課題。その over powered ぶりを思い知った。\n42特有のルールのせいで auto が使えないため、非常に冗長なコーディングを強いられる。\nこの課題に限った事ではないが、コミットコメントがひどい・・・"},{title:"miniRT",repo:{url:"https://github.com/ryo-manba/miniRT",icon:s.hJX},summary:"初歩的なレイトレーシングエンジンの実装",techs:["C"],body:"2人チーム。GPUは使わない。\nFdF と同じく数式まみれになる課題だが, 同じ3Dとはいえ似ているようで実はそれほど似ていない。\n線形な FdF に対しこちらは非線形だからだろうか。"},{title:"minishell",repo:{url:"https://github.com/ryo-manba/minishell",icon:s.hJX},summary:"bash-likeなシェルの実装",techs:["C"],body:"2人チームで bash を再現する。\nまず bash の挙動を時間をかけて徹底的に観察した上で, それらの挙動を再現するような「なるべく自然、かつ大きなルール」を構築するアプローチを取った。\n100%とはいかないが、まずまず上手くいったと思う。"},{title:"FdF",repo:{url:"https://github.com/corvvs/fildefer",icon:s.hJX},summary:"ワイヤーフレームのレンダリング",techs:["C"],body:"数式まみれになる課題。\nただし平行投影なのでパースがなく、その分考えやすい。\n3Dをきちんと触るのは初めての経験で、非常に楽しかった。"},{title:"printf",summary:"printfの再実装",techs:["C"],body:"対応しているフォーマット指定子はcsdiuxXpo%efg.\nefgとフラグの一見不規則な(ように見える)相互作用に翻弄される10日間だった。"}],i=[{title:"＜AA木じゃねぇ　木のAAさ＞",to:"https://qiita.com/corvvs/items/6bcb7793c4428255cd21",summary:"42Tokyoの2022年のアドベントカレンダーに書いた二分木の可視化の記事。全然跳ねなかった。"},{title:"目で味わう三体問題",to:"https://qiita.com/corvvs/items/173b983a9a19ac5fe017",summary:"42Tokyoの2021年のアドベントカレンダーに書いた物理シミュレーションの記事。なぜかじわ伸びした。"}]}}]);