(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[490],{4453:function(e,l,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/config",function(){return s(5304)}])},3878:function(e,l,s){"use strict";s.d(l,{W:function(){return t}});var r=s(5893);let t=e=>{let{i:l,className:s}=e;return(0,r.jsx)("span",{className:"inline-block ".concat(s||"p-1"," align-middle"),children:l})}},3458:function(e,l,s){"use strict";s.d(l,{Z:function(){return y}});var r=s(5893),t=s(9583),i=s(3878);let n=()=>(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("p",{children:"2023 Kawada, Yosuke"}),(0,r.jsxs)("p",{children:[(0,r.jsx)("a",{href:"https://github.com/corvvs",children:(0,r.jsx)(i.W,{i:(0,r.jsx)(t.hJX,{})})}),(0,r.jsx)("a",{href:"https://twitter.com/corvvs",children:(0,r.jsx)(i.W,{i:(0,r.jsx)(t.fWC,{})})})]})]});var c=s(1163);function a(e){return(0,r.jsx)("div",{className:" column-header flex flex-col items-center p-[0.05em] border-[0.1em] ",children:(0,r.jsx)("div",{className:" text-sm flex flex-col w-40 p-0 text-center ",children:e.title})})}var o=s(3750),d=s(7294),x=s(6334),m=s(4080),h=s(3429);let u=e=>{let{children:l,closeModal:s,isOpen:t,tra:i,traPart:n,backTraPart:c}=e,a={...i||{enter:"transition duration-150 ease-out",enterFrom:"transform scale-100 opacity-0",enterTo:"transform scale-100 opacity-100",leave:"transition duration-100 ease-out",leaveFrom:"transform scale-100 opacity-100",leaveTo:"transform scale-100 opacity-0"},...n||{}},o={...i||{enter:"transition duration-100 ease-out",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"transition duration-75 ease-out",leaveFrom:"opacity-100",leaveTo:"opacity-0"},...n||{},...c||{}};return(0,r.jsx)(m.u,{show:t,as:d.Fragment,children:(0,r.jsxs)(h.V,{onClose:s,children:[(0,r.jsx)(m.u.Child,{...o,as:d.Fragment,children:(0,r.jsx)("div",{className:"fixed inset-0 z-50 bg-black/30 backdrop-blur-sm","aria-hidden":"true"})}),(0,r.jsx)(m.u.Child,{...a,as:d.Fragment,children:(0,r.jsx)("div",{className:"fixed inset-0 z-50 flex flex-1 flex-col items-center justify-center gap-32",children:(0,r.jsx)("div",{className:"flex max-h-[100%] w-full flex-col items-center overflow-y-auto p-2",children:(0,r.jsx)("div",{className:"flex items-center justify-center",children:(0,r.jsx)(h.V.Panel,{className:"mx-auto rounded",children:l})})})})})]})})};function f(){return(0,r.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,r.jsx)(a,{title:"setting"}),(0,r.jsx)("div",{className:"p-8 border-[1px] backdrop-blur-sm",children:(0,r.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,r.jsx)("h3",{className:"bio-sub-header",children:"背景画像"}),(0,r.jsx)(x.F,{})]})})]})}function p(e){let[l,s]=(0,d.useState)(!1),t=()=>{s(!1)};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"flex flex-row items-center justify-center",children:(0,r.jsx)("button",{className:l?"flex flex-row border-[1px] column-item-active rounded-full p-1 text-xl":"flex flex-row border-[1px] column-item rounded-full p-1 text-xl",onClick:()=>s(!0),children:(0,r.jsx)(i.W,{i:(0,r.jsx)(o.GEK,{})})})}),(0,r.jsx)(u,{closeModal:t,isOpen:l,children:(0,r.jsx)(f,{})})]})}var j=s(3684),v=s(471);let g=[{title:"作者の情報",path:"about_me"},{title:"制作物",path:"works"},{title:"文書",path:"docs"},{title:"実験室",path:"lab"}],b=e=>{let l=(0,c.useRouter)();return e.active?(0,r.jsx)("div",{className:" column-item-active flex flex-col items-center p-[0.05em] border-[0.1em] ",children:e.children}):(0,r.jsx)("div",{className:" column-item flex flex-col items-center p-[0.05em] hover:opacity-100 cursor-pointer border-[0.1em] ",onClick:()=>l.push("".concat(e.path||"")),children:e.children})},w=e=>{let l=e.title;return"function"==typeof l?l({active:!!e.active,path:e.path}):(0,r.jsx)(b,{active:e.active,path:e.path,children:(0,r.jsx)("div",{className:"flex flex-col w-40 p-1 px-2 text-xl font-bold tracking-wide",children:l})})},N=e=>{let l=(0,c.useRouter)(),[,s]=l.pathname.split("/");return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("main",{className:" flex sm:hidden flex-col items-stretch grow shrink gap-1 overflow-hidden ",style:e.style,children:e.children?(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:" flex flex-col gap-1 shrink grow overflow-scroll pt-2 pl-2 pr-2 pb-50",children:[s?(0,r.jsx)(a,{title:s}):null,e.children]})}):(0,r.jsx)("div",{className:"shrink grow"})}),(0,r.jsxs)("div",{className:" fixed bottom-0 z-10 w-screen flex flex-row items-center gap-4 px-2 border-t-[1px] backdrop-blur-md ",children:[(0,r.jsx)(v.v,{as:"div",className:"relative inline-block text-left ",children:e=>{let{open:l}=e;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(v.v.Button,{className:" inline-flex w-full justify-center px-4 py-2 text-2xl hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ",children:(0,r.jsx)("span",{className:"inline-block transition duration-100 ease-in-out ".concat(l?"transform rotate-180":""),children:(0,r.jsx)(t.RiI,{})})}),(0,r.jsx)(m.u,{enter:"transition duration-100 ease-out",enterFrom:"transform scale-[98%] opacity-0",enterTo:"transform scale-100 opacity-100",leave:"transition duration-100 ease-out",leaveFrom:"transform scale-100 opacity-100",leaveTo:"transform scale-[98%] opacity-0",children:(0,r.jsx)(v.v.Items,{className:" absolute bottom-10 left-0 mb-2 w-56 origin-top-left p-2 border-[1px] bg-black/75 divide-y divide-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ",children:(0,r.jsx)("div",{className:"flex flex-col gap-1 grow shrink",children:g.map((e,l)=>(0,r.jsx)(w,{active:s==e.path,title:e.title,path:e.path},l))})})})]})}}),(0,r.jsx)("div",{className:"grow shrink"}),(0,r.jsx)("div",{className:"flex flex-row items-center grow-0 shrink-0",children:(0,r.jsx)(w,{title:p},"config")}),(0,r.jsx)("div",{className:"flex flex-row grow-0 shrink-0",children:(0,r.jsx)(n,{})})]})]})},k=e=>{let l=(0,c.useRouter)(),[,s]=l.pathname.split("/");return(0,r.jsxs)("main",{className:" hidden sm:flex flex-row items-stretch grow shrink gap-4 overflow-hidden ",style:e.style,children:[(0,r.jsxs)("div",{className:" hidden sm:flex flex-col gap-4 grow-0 shrink-0 py-24 sm:pl-2 md:pl-24 ",children:[(0,r.jsxs)("div",{className:"flex flex-col gap-1 grow shrink",children:[(0,r.jsx)(a,{title:"#"}),g.map((e,l)=>(0,r.jsx)(w,{active:s==e.path,title:e.title,path:e.path},l)),(0,r.jsx)(w,{title:p},"config")]}),(0,r.jsx)("div",{className:"grow-0 shrink-0",children:(0,r.jsx)(n,{})})]}),e.children?(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:" flex flex-col gap-1 max-h-full overflow-scroll pt-2 sm:pt-24 pl-2 sm:pl-0 pr-2 md:pr-24 ",children:[s?(0,r.jsx)(a,{title:s}):null,e.children]})}):null]})};function y(e){let[l]=(0,j.c6)();console.log("[backgroundImage]",l);let s={backgroundImage:l?"url(/bg/".concat(l,")"):void 0,backgroundSize:"cover"};return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:" min-h-screen max-h-screen flex flex-col justify-stretch overflow-hidden ",style:{backgroundImage:l?"url(/bg/lofi_".concat(l,")"):void 0,backgroundSize:"cover"},children:[(0,r.jsx)(k,{style:s,children:e.children}),(0,r.jsx)(N,{style:s,children:e.children})]})})}},6334:function(e,l,s){"use strict";s.d(l,{F:function(){return o}});var r=s(5893),t=s(6663),i=s(3684);let n=()=>(0,r.jsx)("div",{className:"flex flex-row items-center justify-center w-10 h-10 border-2"}),c=()=>{let[e,l]=(0,i.c6)();return e?(0,r.jsx)("div",{className:"flex flex-row items-center justify-center w-10 h-10 border-2 cursor-pointer",onClick:()=>l("none"),children:(0,r.jsx)("p",{className:"text-sm",children:"none"})}):(0,r.jsx)(n,{})},a=e=>{let l=t.b[e.imageIndex],[s,c]=(0,i.c6)();return s===l?(0,r.jsx)(n,{}):(0,r.jsx)("div",{className:"flex flex-row items-center justify-center w-10 h-10 border-2 cursor-pointer",style:{backgroundImage:"url(/bg/".concat("thumb_".concat(l),")"),backgroundSize:"cover"},onClick:()=>c(l),children:(0,r.jsx)("p",{className:"text-xl",children:e.imageIndex+1})},l)},o=()=>(0,r.jsxs)("div",{className:"flex flex-row gap-2 flex-wrap",children:[t.b.map((e,l)=>(0,r.jsx)(a,{imageIndex:l},l)),(0,r.jsx)(c,{})]})},5304:function(e,l,s){"use strict";s.r(l),s.d(l,{default:function(){return n}});var r=s(5893),t=s(3458),i=s(6334);function n(){return(0,r.jsx)(t.Z,{children:(0,r.jsx)("div",{className:"flex flex-col backdrop-blur-sm border-[0.1em] gap-8 p-8",children:(0,r.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,r.jsx)("h3",{className:"bio-sub-header",children:"背景画像"}),(0,r.jsx)(i.F,{})]})})})}}},function(e){e.O(0,[13,445,281,774,888,179],function(){return e(e.s=4453)}),_N_E=e.O()}]);