(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[221],{9369:function(e,l,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/about_me",function(){return s(5836)}])},3878:function(e,l,s){"use strict";s.d(l,{W:function(){return i}});var r=s(5893);let i=e=>{let{i:l,className:s}=e;return(0,r.jsx)("span",{className:"inline-block ".concat(s||"p-1"," align-middle"),children:l})}},3458:function(e,l,s){"use strict";s.d(l,{Z:function(){return y}});var r=s(5893),i=s(9583),t=s(3878);let n=()=>(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("p",{children:"2023 Kawada, Yosuke"}),(0,r.jsxs)("p",{children:[(0,r.jsx)("a",{href:"https://github.com/corvvs",children:(0,r.jsx)(t.W,{i:(0,r.jsx)(i.hJX,{})})}),(0,r.jsx)("a",{href:"https://twitter.com/corvvs",children:(0,r.jsx)(t.W,{i:(0,r.jsx)(i.fWC,{})})})]})]});var c=s(1163);function a(e){return(0,r.jsx)("div",{className:" column-header flex flex-col items-center p-[0.05em] border-[0.1em] ",children:(0,r.jsx)("div",{className:" text-sm flex flex-col w-40 p-0 text-center ",children:e.title})})}var o=s(3750),x=s(7294),d=s(6334),h=s(4080),m=s(3429);let u=e=>{let{children:l,closeModal:s,isOpen:i,tra:t,traPart:n,backTraPart:c}=e,a={...t||{enter:"transition duration-150 ease-out",enterFrom:"transform scale-100 opacity-0",enterTo:"transform scale-100 opacity-100",leave:"transition duration-100 ease-out",leaveFrom:"transform scale-100 opacity-100",leaveTo:"transform scale-100 opacity-0"},...n||{}},o={...t||{enter:"transition duration-100 ease-out",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"transition duration-75 ease-out",leaveFrom:"opacity-100",leaveTo:"opacity-0"},...n||{},...c||{}};return(0,r.jsx)(h.u,{show:i,as:x.Fragment,children:(0,r.jsxs)(m.V,{onClose:s,children:[(0,r.jsx)(h.u.Child,{...o,as:x.Fragment,children:(0,r.jsx)("div",{className:"fixed inset-0 z-50 bg-black/30 backdrop-blur-sm","aria-hidden":"true"})}),(0,r.jsx)(h.u.Child,{...a,as:x.Fragment,children:(0,r.jsx)("div",{className:"fixed inset-0 z-50 flex flex-1 flex-col items-center justify-center gap-32",children:(0,r.jsx)("div",{className:"flex max-h-[100%] w-full flex-col items-center overflow-y-auto p-2",children:(0,r.jsx)("div",{className:"flex items-center justify-center",children:(0,r.jsx)(m.V.Panel,{className:"mx-auto rounded",children:l})})})})})]})})};function f(){return(0,r.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,r.jsx)(a,{title:"setting"}),(0,r.jsx)("div",{className:"p-8 border-[1px] backdrop-blur-sm",children:(0,r.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,r.jsx)("h3",{className:"bio-sub-header",children:"背景画像"}),(0,r.jsx)(d.F,{})]})})]})}function j(e){let[l,s]=(0,x.useState)(!1),i=()=>{s(!1)};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"flex flex-row items-center justify-center",children:(0,r.jsx)("button",{className:l?"flex flex-row border-[1px] column-item-active rounded-full p-1 text-xl":"flex flex-row border-[1px] column-item rounded-full p-1 text-xl",onClick:()=>s(!0),children:(0,r.jsx)(t.W,{i:(0,r.jsx)(o.GEK,{})})})}),(0,r.jsx)(u,{closeModal:i,isOpen:l,children:(0,r.jsx)(f,{})})]})}var p=s(3684),v=s(471);let g=[{title:"作者の情報",path:"about_me"},{title:"制作物",path:"works"},{title:"文書",path:"docs"},{title:"実験室",path:"lab"}],b=e=>{let l=(0,c.useRouter)();return e.active?(0,r.jsx)("div",{className:" column-item-active flex flex-col items-center p-[0.05em] border-[0.1em] ",children:e.children}):(0,r.jsx)("div",{className:" column-item flex flex-col items-center p-[0.05em] hover:opacity-100 cursor-pointer border-[0.1em] ",onClick:()=>l.push("".concat(e.path||"")),children:e.children})},w=e=>{let l=e.title;return"function"==typeof l?l({active:!!e.active,path:e.path}):(0,r.jsx)(b,{active:e.active,path:e.path,children:(0,r.jsx)("div",{className:"flex flex-col w-40 p-1 px-2 text-xl font-bold tracking-wide",children:l})})},N=e=>{let l=(0,c.useRouter)(),[,s]=l.pathname.split("/");return(0,r.jsxs)("main",{className:" h-screen flex sm:hidden flex-col items-stretch grow shrink gap-1 overflow-hidden ",style:e.style,children:[e.children?(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:" flex flex-col gap-1 shrink grow overflow-scroll pt-2 pl-2 pr-2",children:[s?(0,r.jsx)(a,{title:s}):null,e.children]})}):(0,r.jsx)("div",{className:"shrink grow"}),(0,r.jsxs)("div",{className:" z-10 w-screen flex flex-row items-center gap-4 px-2 border-t-[1px] ",children:[(0,r.jsx)(v.v,{as:"div",className:"relative inline-block text-left ",children:e=>{let{open:l}=e;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(v.v.Button,{className:" inline-flex w-full justify-center px-4 py-2 text-2xl hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ",children:(0,r.jsx)("span",{className:"inline-block transition duration-100 ease-in-out ".concat(l?"transform rotate-180":""),children:(0,r.jsx)(i.RiI,{})})}),(0,r.jsx)(h.u,{enter:"transition duration-100 ease-out",enterFrom:"transform scale-[98%] opacity-0",enterTo:"transform scale-100 opacity-100",leave:"transition duration-100 ease-out",leaveFrom:"transform scale-100 opacity-100",leaveTo:"transform scale-[98%] opacity-0",children:(0,r.jsx)(v.v.Items,{className:" absolute bottom-10 left-0 mb-2 w-56 origin-top-left p-2 border-[1px] bg-black/75 divide-y divide-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ",children:(0,r.jsx)("div",{className:"flex flex-col gap-1 grow shrink",children:g.map((e,l)=>(0,r.jsx)(w,{active:s==e.path,title:e.title,path:e.path},l))})})})]})}}),(0,r.jsx)("div",{className:"grow shrink"}),(0,r.jsx)("div",{className:"flex flex-row items-center grow-0 shrink-0",children:(0,r.jsx)(w,{title:j},"config")}),(0,r.jsx)("div",{className:"flex flex-row grow-0 shrink-0",children:(0,r.jsx)(n,{})})]})]})},k=e=>{let l=(0,c.useRouter)(),[,s]=l.pathname.split("/");return(0,r.jsxs)("main",{className:" hidden sm:flex flex-row items-stretch grow shrink gap-4 overflow-hidden ",style:e.style,children:[(0,r.jsxs)("div",{className:" hidden sm:flex flex-col gap-4 grow-0 shrink-0 py-24 sm:pl-2 md:pl-24 ",children:[(0,r.jsxs)("div",{className:"flex flex-col gap-1 grow shrink",children:[(0,r.jsx)(a,{title:"#"}),g.map((e,l)=>(0,r.jsx)(w,{active:s==e.path,title:e.title,path:e.path},l)),(0,r.jsx)(w,{title:j},"config")]}),(0,r.jsx)("div",{className:"grow-0 shrink-0",children:(0,r.jsx)(n,{})})]}),e.children?(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:" flex flex-col gap-1 max-h-full overflow-scroll pt-2 sm:pt-24 pl-2 sm:pl-0 pr-2 md:pr-24 ",children:[s?(0,r.jsx)(a,{title:s}):null,e.children]})}):null]})};function y(e){let[l]=(0,p.c6)();console.log("[backgroundImage]",l);let s=(0,c.useRouter)(),[,i]=s.pathname.split("/"),t={backgroundImage:l?"url(/bg/".concat(l,")"):void 0,backgroundSize:"cover"};return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:" min-h-screen max-h-screen flex flex-col justify-stretch overflow-hidden ",style:{backgroundImage:l?"url(/bg/lofi_".concat(l,")"):void 0,backgroundSize:"cover"},children:[(0,r.jsx)(k,{style:t,children:e.children}),(0,r.jsx)(N,{style:t,children:e.children})]})})}},6334:function(e,l,s){"use strict";s.d(l,{F:function(){return o}});var r=s(5893),i=s(6663),t=s(3684);let n=()=>(0,r.jsx)("div",{className:"flex flex-row items-center justify-center w-10 h-10 border-2"}),c=()=>{let[e,l]=(0,t.c6)();return e?(0,r.jsx)("div",{className:"flex flex-row items-center justify-center w-10 h-10 border-2 cursor-pointer",onClick:()=>l("none"),children:(0,r.jsx)("p",{className:"text-sm",children:"none"})}):(0,r.jsx)(n,{})},a=e=>{let l=i.b[e.imageIndex],[s,c]=(0,t.c6)();return s===l?(0,r.jsx)(n,{}):(0,r.jsx)("div",{className:"flex flex-row items-center justify-center w-10 h-10 border-2 cursor-pointer",style:{backgroundImage:"url(/bg/".concat("thumb_".concat(l),")"),backgroundSize:"cover"},onClick:()=>c(l),children:(0,r.jsx)("p",{className:"text-xl",children:e.imageIndex+1})},l)},o=()=>(0,r.jsxs)("div",{className:"flex flex-row gap-2 flex-wrap",children:[i.b.map((e,l)=>(0,r.jsx)(a,{imageIndex:l},l)),(0,r.jsx)(c,{})]})},5836:function(e,l,s){"use strict";s.r(l),s.d(l,{default:function(){return h}});var r=s(5893),i=s(3458),t=s(5675),n=s.n(t),c=s(7106),a=s(3878),o=s(9583);let x=e=>(0,r.jsxs)("li",{className:"flex flex-row",children:[e.service,(0,r.jsxs)("a",{href:e.url,className:"flex flex-row",children:[e.icon?(0,r.jsx)(a.W,{i:e.icon}):(0,r.jsx)("span",{className:"w-2"}),e.id]})]});function d(){return(0,r.jsxs)("div",{className:"reader-block flex flex-col border-[0.1em] gap-8 p-8",children:[(0,r.jsxs)("div",{className:"flex flex-row gap-8",children:[(0,r.jsx)("div",{className:"w-20 h-20 relative  border-[1px]",children:(0,r.jsx)(n(),{alt:"mr.big",src:"/mr.big.png",fill:!0})}),(0,r.jsxs)("div",{className:"flex flex-col justify-center text-xl",children:[(0,r.jsx)("h3",{children:"Kawada, Yosuke"}),(0,r.jsx)("h3",{children:"河田 鷹介"})]})]}),(0,r.jsxs)("ul",{children:[(0,r.jsx)("li",{children:"1985年生 ♒︎"}),(0,r.jsx)("li",{children:"富山県立 呉羽高等学校 卒業"}),(0,r.jsx)("li",{children:"東京工業大学 基礎物理学専攻 修了"}),(0,r.jsx)("li",{children:"42Tokyo Lv. 13 (Common Core修了)"}),(0,r.jsx)("li",{children:"東京都在住"}),(0,r.jsxs)("li",{children:["なんでもや",(0,r.jsx)("span",{className:"text-sm opacity-50",children:"(らないといけないので仕方なくや)"}),"る系Webエンジニア"]})]}),(0,r.jsxs)("ul",{children:[(0,r.jsx)("li",{children:"餅とこんにゃくが苦手"}),(0,r.jsx)("li",{children:"きのこと雪見だいふくは好き"})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("h3",{className:"bio-sub-header",children:"関心事"}),(0,r.jsxs)("ul",{className:"flex flex-row flex-wrap gap-4",children:[(0,r.jsx)("li",{children:"手触りのいいUI"}),(0,r.jsx)("li",{children:"SVG"}),(0,r.jsx)("li",{children:"GIS"}),(0,r.jsx)("li",{children:"可視化"})]})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("h3",{className:"bio-sub-header",children:"書いたことがある言語リスト"}),(0,r.jsxs)("ul",{className:"flex flex-row flex-wrap gap-4",children:[(0,r.jsx)("li",{className:"lang-well",children:"C"}),(0,r.jsx)("li",{className:"lang-ok",children:"C++"}),(0,r.jsx)("li",{className:"lang-well",children:"Perl"}),(0,r.jsx)("li",{className:"lang-well",children:"Ruby"}),(0,r.jsx)("li",{className:"lang-ok",children:"Python"}),(0,r.jsx)("li",{className:"lang-ok",children:"Swift"}),(0,r.jsx)("li",{className:"lang-well",children:"TypeScript"}),(0,r.jsx)("li",{className:"lang-not-ok",children:"Go"}),(0,r.jsx)("li",{className:"lang-not-ok",children:"x68_64Asm"}),(0,r.jsx)("li",{className:"lang-not-ok",children:"OCaml"})]}),"(触れた順; 色が薄いやつほど自信がない)"]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("h3",{className:"bio-sub-header",children:"Social"}),(0,r.jsxs)("ul",{children:[(0,r.jsx)(x,{service:"GitHub",url:"https://github.com/corvvs",icon:(0,r.jsx)(o.hJX,{}),id:"@corvvs"}),(0,r.jsx)(x,{service:"Twitter",url:"https://twitter.com/corvvs",icon:(0,r.jsx)(o.fWC,{}),id:"@corvvs"}),(0,r.jsx)(x,{service:"Qiita",url:"https://qiita.com/corvvs",id:"@corvvs"}),(0,r.jsx)(x,{service:"GooglePhoto",url:"https://photos.app.goo.gl/EY7kQg4VsbUzzhbX8",icon:(0,r.jsx)(c.dSw,{}),id:"album"})]})]})]})}function h(){return(0,r.jsx)(i.Z,{children:(0,r.jsx)(d,{})})}}},function(e){e.O(0,[13,445,907,281,774,888,179],function(){return e(e.s=9369)}),_N_E=e.O()}]);