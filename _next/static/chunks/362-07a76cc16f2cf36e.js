"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[362],{6362:function(e,t,r){r.d(t,{Z:function(){return F}});var s=r(5893),n=r(3684),i=r(9583),o=r(1113);let l=()=>(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("p",{children:"2023 Kawada, Yosuke"}),(0,s.jsxs)("p",{children:[(0,s.jsx)("a",{href:"https://github.com/corvvs",children:(0,s.jsx)(o.W,{i:(0,s.jsx)(i.hJX,{})})}),(0,s.jsx)("a",{href:"https://twitter.com/corvvs",children:(0,s.jsx)(o.W,{i:(0,s.jsx)(i.fWC,{})})})]})]});var c=r(1163);function a(e){return(0,s.jsx)("div",{className:" column-header flex flex-col items-center p-[0.05em] border-[0.1em] ",children:(0,s.jsx)("div",{className:" text-sm flex flex-col w-40 p-0 text-center ",children:e.title})})}var m=r(3750),u=r(7294),h=r(6334),d=r(4080),p=r(3429);let x=e=>{let{children:t,closeModal:r,isOpen:n,tra:i,traPart:o,backTraPart:l}=e,c={...i||{enter:"transition duration-150 ease-out",enterFrom:"transform scale-100 opacity-0",enterTo:"transform scale-100 opacity-100",leave:"transition duration-100 ease-out",leaveFrom:"transform scale-100 opacity-100",leaveTo:"transform scale-100 opacity-0"},...o||{}},a={...i||{enter:"transition duration-100 ease-out",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"transition duration-75 ease-out",leaveFrom:"opacity-100",leaveTo:"opacity-0"},...o||{},...l||{}};return(0,s.jsx)(d.u,{show:n,as:u.Fragment,children:(0,s.jsxs)(p.V,{onClose:r,children:[(0,s.jsx)(d.u.Child,{...a,as:u.Fragment,children:(0,s.jsx)("div",{className:"fixed inset-0 z-50 bg-black/30 backdrop-blur-sm","aria-hidden":"true"})}),(0,s.jsx)(d.u.Child,{...c,as:u.Fragment,children:(0,s.jsx)("div",{className:"fixed inset-0 z-50 flex flex-1 flex-col items-center justify-center gap-32",children:(0,s.jsx)("div",{className:"flex max-h-[100%] w-full flex-col items-center overflow-y-auto p-2",children:(0,s.jsx)("div",{className:"flex items-center justify-center",children:(0,s.jsx)(p.V.Panel,{className:"mx-auto rounded",children:t})})})})})]})})};function v(){return(0,s.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,s.jsx)(a,{title:"setting"}),(0,s.jsx)("div",{className:"p-8 border-[1px] backdrop-blur-sm",children:(0,s.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,s.jsx)("h3",{className:"bio-sub-header",children:"背景画像"}),(0,s.jsx)(h.F,{})]})})]})}function f(){let[e,t]=(0,u.useState)(!1),r=()=>{t(!1)};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{className:"flex flex-row outline-none items-center justify-center",children:(0,s.jsx)("button",{className:e?"flex flex-row border-[1px] column-item-active rounded-full p-1 text-xl":"flex flex-row border-[1px] column-item rounded-full p-1 text-xl",onClick:()=>t(!0),children:(0,s.jsx)(o.W,{i:(0,s.jsx)(m.GEK,{})})})}),(0,s.jsx)(x,{closeModal:r,isOpen:e,children:(0,s.jsx)(v,{})})]})}let b=e=>{let t=(0,c.useRouter)();return e.active?(0,s.jsx)("div",{className:" column-item-active flex flex-col items-center p-[0.05em] border-[0.1em] ",children:e.children}):(0,s.jsx)("div",{className:" column-item transition ease-out duration-200 flex flex-col items-center p-[0.05em] hover:opacity-100 cursor-pointer border-[0.1em] ",onClick:()=>t.push("".concat(e.path||"")),children:e.children})},g=e=>{let t=e.title;return"function"==typeof t?t({active:!!e.active,path:e.path}):(0,s.jsx)(b,{active:e.active,path:e.path,children:(0,s.jsx)("div",{className:" flex flex-col w-30 sm:w-40 p-1 px-2 font-bold tracking-wide text-2xl sm:text-xl ",children:t})})};var y=r(8138),j=r(6486),w=r.n(j);function k(){let e=(0,c.useRouter)(),t=0===w().compact(e.pathname.split("/")).length;return(0,s.jsx)(s.Fragment,{children:(0,s.jsx)("div",{className:"flex flex-row outline-none items-center justify-center",children:(0,s.jsx)("button",{className:t?"outline-none flex flex-row border-[1px] column-item rounded-full p-1 text-xl opacity-50 cursor-default hover:border-transparent":"outline-none flex flex-row border-[1px] column-item rounded-full p-1 text-xl active:text-black active:bg-white",onClick:()=>e.push("/"),disabled:t,children:(0,s.jsx)(o.W,{i:(0,s.jsx)(y.X1w,{})})})})})}var S=r(4576);let N=e=>{let t=(0,c.useRouter)(),[,r]=t.pathname.split("/");return(0,s.jsxs)("main",{className:" hidden sm:flex flex-row items-stretch grow shrink gap-4 overflow-hidden ",style:e.style,children:[(0,s.jsxs)("div",{className:" hidden sm:flex flex-col gap-4 grow-0 shrink-0 py-24 sm:pl-2 md:pl-24 ",children:[(0,s.jsxs)("div",{className:"flex flex-col gap-1 grow shrink",children:[(0,s.jsx)(a,{title:"#"}),S.jH.map((e,t)=>(0,s.jsx)(g,{active:r==e.path,title:e.title,path:e.path},t)),(0,s.jsx)(g,{title:f},"config"),(0,s.jsx)(g,{title:k},"home")]}),(0,s.jsx)("div",{className:"grow-0 shrink-0",children:(0,s.jsx)(l,{})})]}),e.children?(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("div",{className:" flex flex-col gap-1 max-h-full overflow-scroll pt-2 sm:pt-24 pl-2 sm:pl-0 pr-2 md:pr-24 ",children:[r?(0,s.jsx)(a,{title:r}):null,e.children]})}):null]})};var C=r(471);let T=e=>{let t=(0,c.useRouter)(),[,r]=t.pathname.split("/");return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("main",{className:" flex sm:hidden flex-col items-stretch grow shrink gap-1 overflow-hidden text-lg ",style:e.style,children:e.children?(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("div",{className:" flex flex-col gap-1 shrink grow overflow-scroll pt-2 pl-2 pr-2 pb-20",children:[r?(0,s.jsx)(a,{title:r}):null,e.children]})}):(0,s.jsx)("div",{className:"shrink grow"})}),(0,s.jsxs)("div",{className:" fixed sm:hidden h-16 bottom-0 z-10 w-screen flex flex-row items-center gap-4 px-2 pl-[10px] border-t-[1px] backdrop-blur-md ",children:[(0,s.jsx)(C.v,{as:"div",className:"relative inline-block text-left",children:e=>{let{open:t}=e;return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(C.v.Button,{className:" inline-flex w-full justify-center px-4 py-2 text-2xl hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ",children:(0,s.jsx)("span",{className:"inline-block transition duration-200 ease-in-out",style:{transform:t?"rotateX(180deg)":""},children:(0,s.jsx)(m.IAR,{})})}),(0,s.jsx)(d.u,{enter:"transition duration-200 ease-out",enterFrom:"transform translate-y-1 opacity-0",enterTo:"transform opacity-100",leave:"transition duration-200 ease-out",leaveFrom:"transform opacity-100",leaveTo:"transform translate-y-1 opacity-0",children:(0,s.jsx)(C.v.Items,{className:" absolute bottom-10 left-0 mb-2 w-40 sm:w-56 origin-top-left p-2 border-[1px] bg-black/75 divide-y divide-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ",children:(0,s.jsx)("div",{className:"flex flex-col gap-1 grow shrink",children:S.jH.map((e,t)=>(0,s.jsx)(g,{active:r==e.path,title:e.title,path:e.path},t))})})})]})}}),(0,s.jsx)("div",{className:"grow shrink"}),(0,s.jsxs)("div",{className:"flex flex-row items-center grow-0 shrink-0",children:[(0,s.jsx)(g,{title:f},"config"),(0,s.jsx)(g,{title:k},"config")]}),(0,s.jsx)("div",{className:"flex flex-row grow-0 shrink-0",children:(0,s.jsx)(l,{})})]})]})};function F(e){let[t]=(0,n.c6)();console.log("[backgroundImage]",t);let r={backgroundImage:t?"url(/bg/".concat(t,")"):void 0,backgroundPosition:"center",backgroundSize:"cover"};return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("div",{className:" min-h-screen max-h-screen flex flex-col justify-stretch overflow-hidden ",style:{backgroundImage:t?"url(/bg/lofi_".concat(t,")"):void 0,backgroundPosition:"center",backgroundSize:"cover"},children:[(0,s.jsx)(N,{style:r,children:e.children}),(0,s.jsx)(T,{style:r,children:e.children})]})})}},6334:function(e,t,r){r.d(t,{F:function(){return a}});var s=r(5893),n=r(6663),i=r(3684);let o=()=>(0,s.jsx)("div",{className:"flex flex-row items-center justify-center w-10 h-10 border-2"}),l=()=>{let[e,t]=(0,i.c6)();return e?(0,s.jsx)("div",{className:"flex flex-row items-center justify-center w-10 h-10 border-2 cursor-pointer",onClick:()=>t("none"),children:(0,s.jsx)("p",{className:"text-sm",children:"none"})}):(0,s.jsx)(o,{})},c=e=>{let t=n.b[e.imageIndex],[r,l]=(0,i.c6)();return r===t?(0,s.jsx)(o,{}):(0,s.jsx)("div",{className:"flex flex-row items-center justify-center w-10 h-10 border-2 cursor-pointer",style:{backgroundImage:"url(/bg/".concat("thumb_".concat(t),")"),backgroundSize:"cover"},onClick:()=>l(t),children:(0,s.jsx)("p",{className:"text-xl",children:e.imageIndex+1})},t)},a=()=>(0,s.jsxs)("div",{className:"flex flex-row gap-2 flex-wrap",children:[n.b.map((e,t)=>(0,s.jsx)(c,{imageIndex:t},t)),(0,s.jsx)(l,{})]})},1113:function(e,t,r){r.d(t,{W:function(){return n}});var s=r(5893);let n=e=>{let{i:t,className:r}=e;return(0,s.jsx)("span",{className:"inline-block ".concat(r||"p-1"," align-middle"),children:t})}},4576:function(e,t,r){r.d(t,{zx:function(){return i},ul:function(){return o},$C:function(){return l},ht:function(){return h},jH:function(){return c},VG:function(){return u},tt:function(){return m}});var s=r(9583),n=r(7106);let i=["手触りのいいUI","SVG","GIS","可視化"],o=[{good:"well",name:"C"},{good:"ok",name:"C++"},{good:"well",name:"Perl"},{good:"well",name:"Ruby"},{good:"ok",name:"Python"},{good:"ok",name:"Swift"},{good:"well",name:"TypeScript"},{good:"not-ok",name:"Go"},{good:"not-ok",name:"x68_64Asm"},{good:"not-ok",name:"OCaml"}],l=[{service:"GitHub",url:"https://github.com/corvvs",icon:s.hJX,id:"@corvvs"},{service:"Twitter",url:"https://twitter.com/corvvs",icon:s.fWC,id:"@corvvs"},{service:"Qiita",url:"https://qiita.com/corvvs",id:"@corvvs"},{service:"GooglePhoto",url:"https://photos.app.goo.gl/EY7kQg4VsbUzzhbX8",icon:n.dSw,id:"album"}],c=[{title:"作者の情報",path:"about_me"},{title:"制作物",path:"works"},{title:"文書",path:"docs"},{title:"実験室",path:"lab"}];var a=r(3750);let m=[{title:"life",repo:{url:"https://github.com/corvvs/corvvs.github.io",icon:s.hJX},summary:"このサイト自体",techs:["Next.js","TypeScript","TailwindCSS"],body:"「2000年代初頭の個人サイト」をコンセプトにお送りしています。"},{title:"JSON Analyzer(仮名)",links:[{url:"https://jet.corvvs.dev/",icon:a.JuS},{url:"https://github.com/corvvs/jt",icon:s.hJX}],summary:"JSON分析ツール",techs:["Next.js","TypeScript","TailwindCSS","vercel"],body:"FirefoxのJSON表示機能は便利なんだけど、いまひとつ痒い所に手が届かねェ・・・\nという思いが高じて作った99%自分のためのJSON分析ツール。"},{title:"42HoursTuningTheBackend",repo:{url:"https://github.com/corvvs/42HoursTuningTheBackend",icon:s.hJX},summary:"42時間耐久パフォーマンスチューニングコンテスト",techs:["nginx","MySQL","TypeScript"],body:"3人チームによる対抗戦。\n42時間の競技時間内にWebアプリケーションの性能を可能な限り向上させる, いわゆる ISUCON 形式のコンテスト。\n2 / 34 位だったが, 1位のチームからは2倍近く点差がついた。"},{title:"graint",repo:{url:"https://github.com/corvvs/graint",icon:s.hJX},summary:"初歩的な重力三体問題のシミュレータ",techs:["C","gnuplot"],body:"古典力学の重力三体問題を, 微分方程式を数値的に解くことでシミュレートするプログラム。\ngnuplot でアニメーションを作るスキルが身に付いた。無駄に。"}],u=[{title:"ftl_quantum",wip:!0,repo:{url:"https://github.com/corvvs/q",icon:s.hJX},summary:"量子コンピュータ基礎の基礎",techs:["Python","IBM Quantum","Qiskit"],body:"IBM Quantum を使って非常に初歩的な量子回路を実装していく。"},{title:"Override",wip:!0,summary:"CTF Pwn初級編",techs:["C","ASM","Ghidra","gdb"],body:"(repoは答えそのものなので非公開)\nCTF問題が10問連続で出題される。\nこちらもすべてPwn問題で, すべてx86 ELFバイナリだが, 64bitバイナリも出題される。\nまたデバッグ禁止問題など, ひねりの効いた問題も混ざっている。"},{title:"Rainfall",wip:!0,summary:"CTF Pwn入門編",techs:["C","ASM","Ghidra","gdb"],body:"(repoは答えそのものなので非公開)\nCTF問題が14問連続で出題される。\nすべていわゆるPwn問題で, 32bit x86 ELF バイナリを対象としている。\nシェルコードというものを初めて使った。最初はWebからパクってきただけだったが・・・"},{title:"snow_crash",summary:"初歩的CTF",techs:["C","ASM","Ghidra","PHP","Perl","Lua"],body:"(repoは答えそのものなので非公開)\n雑多なCTF問題が15問連続で出題される。\n難易度はそこまで難しくはないが、終盤になるとリバースコンパイルが要求される。\nまた、問題のジャンルは偏っている。"},{title:"ssl",repo:{url:"https://github.com/corvvs/orenetutils-ssl",icon:s.hJX},wip:!0,summary:"OpenSSLの暗号再実装",techs:["C"],body:'"SSL" という名前だが, 通信ではなく暗号関連の機能を実装する。\n3つのセクションに分かれており, だいたい「ハッシュ(md5, SHA)」「DES暗号」「RSA暗号」という感じ。\n現在は「ハッシュ」まで終了している。'},{title:"traceroute",repo:{url:"https://github.com/corvvs/orenetutils-traceroute",icon:s.hJX},wip:!0,summary:"traceroute コマンドの再現",techs:["C","Docker","Wireshark"],body:""},{title:"ping",repo:{url:"https://github.com/corvvs/ding",icon:s.hJX},summary:"inetutils 版 ping コマンドの再現",techs:["C","Docker","Wireshark"],body:"いまいち使い方がわかってないコマンドの1つである ping を実装する。\n要件とは直接関係しないのだが, 初めてパケットキャプチャなるものをやってみた。"},{title:"Cloud-1",summary:"クラウドインフラのセットアップとコンテナアプリケーションデプロイの自動化演習",techs:["Terraform","Ansible","Docker","AWS"],wip:!0,body:"2人チーム。\nマルチコンテナ構成のアプリケーションを, クラウド上のVM(1つ!!)にデプロイする。\nただしデプロイは完全に自動化されている必要がある。\n(あと自腹も切る必要がある。)\n自動化を要求されているのはデプロイのみだが、どうせならインフラの構築も自動化しようぜ、ということでTerraformを持ち出す。"},{title:"nm",repo:{url:"https://github.com/corvvs/num",icon:s.hJX},summary:"実行・オブジェクトファイルを解析するコマンド nm の実装",techs:["C"],wip:!0,body:"バイナリファイルからシンボル情報を抽出して表示する、という、\n知らない人には本当に 何を言っているのか わからねー ことで有名なコマンド nm を作る。\nなお, ファイルフォーマットは ELF のみが要求されている。"},{title:"Inception of Things",summary:"k8sクラスタ上でのCD実習",techs:["Vagrant","Kubernetes","Helm","ArgoCD","GitLab"],wip:!0,body:"2人チーム。\n軽量版Kubernertes(k3s, k3d)を使ってクラスタを作り, CD環境を立ち上げる。\nこの課題で最も難しいのは Vagrant が動くマシンを用意すること(異論は認める)。"},{title:"MLP",repo:{url:"https://github.com/corvvs/mlp",icon:s.hJX},summary:"多層パーセプトロンの実装",techs:["Data Science","TypeScript"],wip:!0,body:""},{title:"malloc",repo:{url:"https://github.com/corvvs/allocyou",icon:s.hJX},summary:"メモリアロケータ(malloc/free/realloc ...など)の実装",techs:["C"],body:"みんな大好き malloc とそのフレンズを自作する。\nmalloc のおおまかなコンセプトは「システムからユーザ空間に大きなメモリ領域を確保しておき, それをユーザからのリクエストに応じて細切れにして渡す」。\nシステムからのメモリ確保にはシステムコール brk または mmap が使われるが, 課題上 mmap のみ許可されている。\n単純に作るだけならリンクリストを慎重に操作するだけだが, これをスレッドセーフにしようと思うと考えることが一気に増える。\n各種条件を assert で厳重にチェックしていたが、これがとんでもない嵐を巻き起こすことになった・・・\nfastbins をやらなかったのがちょっと心残りだが、 vim と bash を動かせたのでよしとする。"},{title:"ls",repo:{url:"https://github.com/corvvs/ls",icon:s.hJX},summary:"lsコマンドの機能限定クローン",techs:["C"],body:"無意味に実行されるコマンド第1位こと ls を自作する。\nmacOS / Linux 両対応。といってもレイアウトが違うくらいで本質的には同じ。\n製作過程で実際のコードをチラ読みしたが, macOS と Linux(coreutils) とで中身が結構違う。\nテスト過程で macOS の script コマンドにバグがあることが発覚。\n実を言うと無限ループ対策をしていないことをここに告白しておく。しろよ。"},{title:"DSLR",repo:{url:"https://github.com/corvvs/kedavra",icon:s.hJX},summary:"ロジスティック回帰による多クラス分類",techs:["Data Science","TypeScript","SVG"],body:"2人チーム。\nホグワーツの生徒1600人の成績データが科目別に与えられるので、成績から所属寮を推定するプログラムを作る。\n要するに組分け帽子。\nML / 統計系のライブラリは使用禁止(math系はOK)。\nへそ曲がりなので TypeScript で書いた。\n画像出力まで含めて外部ライブラリにほとんど依存しない(lodash と sprintf 以外)で書けたのでそこそこ満足。"},{title:"linear regression",repo:{url:"https://github.com/corvvs/regress_progress",icon:s.hJX},summary:"線形回帰による点推定",techs:["Data Science","Ruby"],body:""},{title:"turing",repo:{url:"https://github.com/corvvs/turrrr",icon:s.hJX},summary:"チューリングマシンシミュレータの製作",techs:["OCaml"],body:"2人チーム。\n「シミュレータ」と「チューリングマシン定義作成」のうち「シミュレータ」を担当。\nOCaml のエコシステムに大苦戦。\nコード自体は割とすんなり書けたのだが、「与えられたマシン定義の時間計算量を見積もる」という追加課題の意味が今もってわからない。なにこれ？"},{title:"libasm",repo:{url:"https://github.com/corvvs/asm",icon:s.hJX},summary:"x86_64アセンブラによる簡単(?)な関数の実装",techs:["Asm","LLDB"],body:"アセンブラなんもわからん状態から始めたため、詳しい人に聞きまくって前提知識を掻き集める。\nアセンブラのコードを見ると、ループと末尾再帰がほとんど同じであることが実感できる。\nコンパイラがめちゃくちゃに最適化した後のコードを読解する遊びが自分の中で流行った。"},{title:"dr_quine",repo:{url:"https://github.com/corvvs/quine",icon:s.hJX},summary:"変則的なクワインの製作",techs:["C","Asm","Ruby"],body:"いわゆるクワイン(quine)...に余計な条件がついたもの3種を, C と Asm と任意の言語で作る。\nクワイン自体は勝ちパターンが見つかればほぼ機械的に書ける。\n「面白い」クワインとなると話は変わってくるが・・・\nちなみにこの課題はマルウェア系課題への前振りという位置付けであり、クワインに課される条件もそれを念頭に置いたものとなっている(たとえば自己増殖性)。"},{title:"transcendence",repo:{url:"https://github.com/JUNNETWORKS/42-ft_transcendence",icon:s.hJX},summary:"DB/バックエンドを伴うPvPゲームSPAの製作",techs:["TypeScript","React","TailwindCSS","NestJS","PostgreSQL","Socket.IO","Docker"],body:"4人チーム。Common Core 最終課題。\nPONGの1:1対戦にフレンド・チャット機能がついたゲームwebサービスを作る。\nフロントエンドは React, バックエンドは NestJS(で固定), DB は PostgreSQL(で固定)を使用。\nチームメンバーがいい感じのピクセルフォントを見つけてきたので, それに合わせてチープめのデザインを作り込んだ。\nこれに関しては正直そのフォントを見つけた時点で勝ちだった気がする。\nwebserv に続けて人間心理の捉えどころのなさに−もちろん自分自身のものも含めて−悩まされたが、ペアプログラミングの威力を実感できたのは収穫だった。\nこれをきっかけに「マネジメントって面白いかも」と思えるようになった、かもしれない。\n初めて React に触れたが, Vue に比べるとその「きっちり」さが性に合っていると思う。"},{title:"webserv",repo:{url:"https://github.com/corvvs/webserv",icon:s.hJX},summary:"イベント駆動HTTP/1.1サーバの実装",techs:["C++","Docker"],body:"3人チーム。\n最大の弱点「チームプレイの経験に乏しい」が露呈した課題。\n「CGIの実行以外の目的で fork してはならない」「IO多重化必須」「イベントループはプログラム全体で1つだけ」などなどの制約があるため、必然的にアーキテクチャは絞られる。\n結局1スレッド - 1プロセスに落ち着いた。\nイベント監視系として select / poll / kqueue を任意に差し替えられるようにしてみた(epollも使えたが, 基本的に macOS 上で開発・テストしていたのでこの時はスルー)。\nクラス設計にかなりの時間をかけたが、その甲斐はあったと思う。"},{title:"2048",repo:{url:"https://github.com/corvvs/2048",icon:s.hJX},summary:"テキストUIでプレイできる2048パズルの作成",techs:["C","ncurses"],body:"2人チーム, タイムリミット60時間。\n趣味の王様こと2048をテキストUIで実装する。\n楽しくなっちゃったので機能を色々持ってみた。\nただしアニメーションまではできず。"},{title:"inception",summary:"複数コンテナからなるWebアプリサービスの構築",techs:["Docker","nginx","WordPress","Adminer","MySQL","Redis"],body:"WordPressを中核としたコンテナ群によるWebアプリサービスを, docker-compose を使って管理する.\n外部に直接公開されているのはnginxのみで, 内部のサービスとの通信は nginx を通じて行う.\n(ただし管理のためここのコンテナにはSSHでログインできる.)"},{title:"containers",repo:{url:"https://github.com/corvvs/containers",icon:s.hJX},summary:"STLコンテナの再実装",techs:["C++"],body:"vector, map, set, pair, stack を再実装する。\nテンプレートと真剣に向き合う課題。その over powered ぶりを思い知った。\n42特有のルールのせいで auto が使えないため、非常に冗長なコーディングを強いられる。\nこの課題に限った事ではないが、コミットコメントがひどい・・・"},{title:"miniRT",repo:{url:"https://github.com/ryo-manba/miniRT",icon:s.hJX},summary:"初歩的なレイトレーシングエンジンの実装",techs:["C"],body:"2人チーム。GPUは使わない。\nFdF と同じく数式まみれになる課題だが, 同じ3Dとはいえ似ているようで実はそれほど似ていない。\n線形な FdF に対しこちらは非線形だからだろうか。"},{title:"minishell",repo:{url:"https://github.com/ryo-manba/minishell",icon:s.hJX},summary:"bash-likeなシェルの実装",techs:["C"],body:"2人チームで bash を再現する。\nまず bash の挙動を時間をかけて徹底的に観察した上で, それらの挙動を再現するような「なるべく自然、かつ大きなルール」を構築するアプローチを取った。\n100%とはいかないが、まずまず上手くいったと思う。"},{title:"FdF",repo:{url:"https://github.com/corvvs/fildefer",icon:s.hJX},summary:"ワイヤーフレームのレンダリング",techs:["C"],body:"数式まみれになる課題。\nただし平行投影なのでパースがなく、その分考えやすい。\n3Dをきちんと触るのは初めての経験で、非常に楽しかった。"},{title:"printf",summary:"printfの再実装",techs:["C"],body:"対応しているフォーマット指定子はcsdiuxXpo%efg.\n(課題改訂により, efg は今は課題範囲外となっている.)\nefgとフラグの一見不規則な(ように見える)相互作用に翻弄される10日間だった。"}],h=[{title:"＜AA木じゃねぇ　木のAAさ＞",to:"https://qiita.com/corvvs/items/6bcb7793c4428255cd21",summary:"42Tokyoの2022年のアドベントカレンダーに書いた二分木の可視化の記事。全然跳ねなかった。"},{title:"目で味わう三体問題",to:"https://qiita.com/corvvs/items/173b983a9a19ac5fe017",summary:"42Tokyoの2021年のアドベントカレンダーに書いた物理シミュレーションの記事。なぜかじわ伸びした。"}]}}]);