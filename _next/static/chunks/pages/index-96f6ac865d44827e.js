(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return s(2603)}])},3878:function(e,t,s){"use strict";s.d(t,{W:function(){return r}});var l=s(5893);let r=e=>{let{i:t,className:s}=e;return(0,l.jsx)("span",{className:"inline-block ".concat(s||"p-1"," align-middle"),children:t})}},3458:function(e,t,s){"use strict";s.d(t,{Z:function(){return k}});var l=s(5893),r=s(9583),i=s(3878);let n=()=>(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("p",{children:"2023 Kawada, Yosuke"}),(0,l.jsxs)("p",{children:[(0,l.jsx)("a",{href:"https://github.com/corvvs",children:(0,l.jsx)(i.W,{i:(0,l.jsx)(r.hJX,{})})}),(0,l.jsx)("a",{href:"https://twitter.com/corvvs",children:(0,l.jsx)(i.W,{i:(0,l.jsx)(r.fWC,{})})})]})]});var a=s(1163);function c(e){return(0,l.jsx)("div",{className:" column-header flex flex-col items-center p-[0.05em] border-[0.1em] ",children:(0,l.jsx)("div",{className:" text-sm flex flex-col w-40 p-0 text-center ",children:e.title})})}var o=s(3750),d=s(7294),x=s(6334),m=s(4080),h=s(3429);let u=e=>{let{children:t,closeModal:s,isOpen:r,tra:i,traPart:n,backTraPart:a}=e,c={...i||{enter:"transition duration-150 ease-out",enterFrom:"transform scale-100 opacity-0",enterTo:"transform scale-100 opacity-100",leave:"transition duration-100 ease-out",leaveFrom:"transform scale-100 opacity-100",leaveTo:"transform scale-100 opacity-0"},...n||{}},o={...i||{enter:"transition duration-100 ease-out",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"transition duration-75 ease-out",leaveFrom:"opacity-100",leaveTo:"opacity-0"},...n||{},...a||{}};return(0,l.jsx)(m.u,{show:r,as:d.Fragment,children:(0,l.jsxs)(h.V,{onClose:s,children:[(0,l.jsx)(m.u.Child,{...o,as:d.Fragment,children:(0,l.jsx)("div",{className:"fixed inset-0 z-50 bg-black/30 backdrop-blur-sm","aria-hidden":"true"})}),(0,l.jsx)(m.u.Child,{...c,as:d.Fragment,children:(0,l.jsx)("div",{className:"fixed inset-0 z-50 flex flex-1 flex-col items-center justify-center gap-32",children:(0,l.jsx)("div",{className:"flex max-h-[100%] w-full flex-col items-center overflow-y-auto p-2",children:(0,l.jsx)("div",{className:"flex items-center justify-center",children:(0,l.jsx)(h.V.Panel,{className:"mx-auto rounded",children:t})})})})})]})})};function f(){return(0,l.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,l.jsx)(c,{title:"setting"}),(0,l.jsx)("div",{className:"p-8 border-[1px] backdrop-blur-sm",children:(0,l.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,l.jsx)("h3",{className:"bio-sub-header",children:"背景画像"}),(0,l.jsx)(x.F,{})]})})]})}function p(e){let[t,s]=(0,d.useState)(!1),r=()=>{s(!1)};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("div",{className:"flex flex-row items-center justify-center",children:(0,l.jsx)("button",{className:t?"flex flex-row border-[1px] column-item-active rounded-full p-1 text-xl":"flex flex-row border-[1px] column-item rounded-full p-1 text-xl",onClick:()=>s(!0),children:(0,l.jsx)(i.W,{i:(0,l.jsx)(o.GEK,{})})})}),(0,l.jsx)(u,{closeModal:r,isOpen:t,children:(0,l.jsx)(f,{})})]})}var j=s(3684),v=s(471);let g=[{title:"作者の情報",path:"about_me"},{title:"制作物",path:"works"},{title:"文書",path:"docs"},{title:"実験室",path:"lab"}],b=e=>{let t=(0,a.useRouter)();return e.active?(0,l.jsx)("div",{className:" column-item-active flex flex-col items-center p-[0.05em] border-[0.1em] ",children:e.children}):(0,l.jsx)("div",{className:" column-item flex flex-col items-center p-[0.05em] hover:opacity-100 cursor-pointer border-[0.1em] ",onClick:()=>t.push("".concat(e.path||"")),children:e.children})},w=e=>{let t=e.title;return"function"==typeof t?t({active:!!e.active,path:e.path}):(0,l.jsx)(b,{active:e.active,path:e.path,children:(0,l.jsx)("div",{className:"flex flex-col w-40 p-1 px-2 text-xl font-bold tracking-wide",children:t})})},N=e=>{let t=(0,a.useRouter)(),[,s]=t.pathname.split("/");return(0,l.jsxs)("main",{className:" h-screen flex sm:hidden flex-col items-stretch grow shrink gap-1 overflow-hidden ",style:e.style,children:[e.children?(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)("div",{className:" flex flex-col gap-1 shrink grow overflow-scroll pt-2 pl-2 pr-2",children:[s?(0,l.jsx)(c,{title:s}):null,e.children]})}):(0,l.jsx)("div",{className:"shrink grow"}),(0,l.jsxs)("div",{className:" z-10 w-screen flex flex-row items-center gap-4 px-2 border-t-[1px] ",children:[(0,l.jsx)(v.v,{as:"div",className:"relative inline-block text-left ",children:e=>{let{open:t}=e;return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(v.v.Button,{className:" inline-flex w-full justify-center px-4 py-2 text-2xl hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ",children:(0,l.jsx)("span",{className:"inline-block transition duration-100 ease-in-out ".concat(t?"transform rotate-180":""),children:(0,l.jsx)(r.RiI,{})})}),(0,l.jsx)(m.u,{enter:"transition duration-100 ease-out",enterFrom:"transform scale-[98%] opacity-0",enterTo:"transform scale-100 opacity-100",leave:"transition duration-100 ease-out",leaveFrom:"transform scale-100 opacity-100",leaveTo:"transform scale-[98%] opacity-0",children:(0,l.jsx)(v.v.Items,{className:" absolute bottom-10 left-0 mb-2 w-56 origin-top-left p-2 border-[1px] bg-black/75 divide-y divide-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ",children:(0,l.jsx)("div",{className:"flex flex-col gap-1 grow shrink",children:g.map((e,t)=>(0,l.jsx)(w,{active:s==e.path,title:e.title,path:e.path},t))})})})]})}}),(0,l.jsx)("div",{className:"grow shrink"}),(0,l.jsx)("div",{className:"flex flex-row items-center grow-0 shrink-0",children:(0,l.jsx)(w,{title:p},"config")}),(0,l.jsx)("div",{className:"flex flex-row grow-0 shrink-0",children:(0,l.jsx)(n,{})})]})]})},y=e=>{let t=(0,a.useRouter)(),[,s]=t.pathname.split("/");return(0,l.jsxs)("main",{className:" hidden sm:flex flex-row items-stretch grow shrink gap-4 overflow-hidden ",style:e.style,children:[(0,l.jsxs)("div",{className:" hidden sm:flex flex-col gap-4 grow-0 shrink-0 py-24 sm:pl-2 md:pl-24 ",children:[(0,l.jsxs)("div",{className:"flex flex-col gap-1 grow shrink",children:[(0,l.jsx)(c,{title:"#"}),g.map((e,t)=>(0,l.jsx)(w,{active:s==e.path,title:e.title,path:e.path},t)),(0,l.jsx)(w,{title:p},"config")]}),(0,l.jsx)("div",{className:"grow-0 shrink-0",children:(0,l.jsx)(n,{})})]}),e.children?(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)("div",{className:" flex flex-col gap-1 max-h-full overflow-scroll pt-2 sm:pt-24 pl-2 sm:pl-0 pr-2 md:pr-24 ",children:[s?(0,l.jsx)(c,{title:s}):null,e.children]})}):null]})};function k(e){let[t]=(0,j.c6)();console.log("[backgroundImage]",t);let s=(0,a.useRouter)(),[,r]=s.pathname.split("/"),i={backgroundImage:t?"url(/bg/".concat(t,")"):void 0,backgroundSize:"cover"};return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)("div",{className:" min-h-screen max-h-screen flex flex-col justify-stretch overflow-hidden ",style:{backgroundImage:t?"url(/bg/lofi_".concat(t,")"):void 0,backgroundSize:"cover"},children:[(0,l.jsx)(y,{style:i,children:e.children}),(0,l.jsx)(N,{style:i,children:e.children})]})})}},6334:function(e,t,s){"use strict";s.d(t,{F:function(){return o}});var l=s(5893),r=s(6663),i=s(3684);let n=()=>(0,l.jsx)("div",{className:"flex flex-row items-center justify-center w-10 h-10 border-2"}),a=()=>{let[e,t]=(0,i.c6)();return e?(0,l.jsx)("div",{className:"flex flex-row items-center justify-center w-10 h-10 border-2 cursor-pointer",onClick:()=>t("none"),children:(0,l.jsx)("p",{className:"text-sm",children:"none"})}):(0,l.jsx)(n,{})},c=e=>{let t=r.b[e.imageIndex],[s,a]=(0,i.c6)();return s===t?(0,l.jsx)(n,{}):(0,l.jsx)("div",{className:"flex flex-row items-center justify-center w-10 h-10 border-2 cursor-pointer",style:{backgroundImage:"url(/bg/".concat("thumb_".concat(t),")"),backgroundSize:"cover"},onClick:()=>a(t),children:(0,l.jsx)("p",{className:"text-xl",children:e.imageIndex+1})},t)},o=()=>(0,l.jsxs)("div",{className:"flex flex-row gap-2 flex-wrap",children:[r.b.map((e,t)=>(0,l.jsx)(c,{imageIndex:t},t)),(0,l.jsx)(a,{})]})},2603:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return i}});var l=s(5893),r=s(3458);function i(){return(0,l.jsx)(r.Z,{})}}},function(e){e.O(0,[13,445,281,774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);