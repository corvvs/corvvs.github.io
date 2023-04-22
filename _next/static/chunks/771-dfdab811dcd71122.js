"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[771],{3878:function(e,t,l){l.d(t,{W:function(){return r}});var s=l(5893);let r=e=>{let{i:t,className:l}=e;return(0,s.jsx)("span",{className:"inline-block ".concat(l||"p-1"," align-middle"),children:t})}},771:function(e,t,l){l.d(t,{Z:function(){return _}});var s=l(5893),r=l(3684),n=l(9583),i=l(3878);let a=()=>(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("p",{children:"2023 Kawada, Yosuke"}),(0,s.jsxs)("p",{children:[(0,s.jsx)("a",{href:"https://github.com/corvvs",children:(0,s.jsx)(i.W,{i:(0,s.jsx)(n.hJX,{})})}),(0,s.jsx)("a",{href:"https://twitter.com/corvvs",children:(0,s.jsx)(i.W,{i:(0,s.jsx)(n.fWC,{})})})]})]});var c=l(1163);function o(e){return(0,s.jsx)("div",{className:" column-header flex flex-col items-center p-[0.05em] border-[0.1em] ",children:(0,s.jsx)("div",{className:" text-sm flex flex-col w-40 p-0 text-center ",children:e.title})})}var x=l(3750),d=l(7294),m=l(6334),h=l(4080),u=l(3429);let f=e=>{let{children:t,closeModal:l,isOpen:r,tra:n,traPart:i,backTraPart:a}=e,c={...n||{enter:"transition duration-150 ease-out",enterFrom:"transform scale-100 opacity-0",enterTo:"transform scale-100 opacity-100",leave:"transition duration-100 ease-out",leaveFrom:"transform scale-100 opacity-100",leaveTo:"transform scale-100 opacity-0"},...i||{}},o={...n||{enter:"transition duration-100 ease-out",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"transition duration-75 ease-out",leaveFrom:"opacity-100",leaveTo:"opacity-0"},...i||{},...a||{}};return(0,s.jsx)(h.u,{show:r,as:d.Fragment,children:(0,s.jsxs)(u.V,{onClose:l,children:[(0,s.jsx)(h.u.Child,{...o,as:d.Fragment,children:(0,s.jsx)("div",{className:"fixed inset-0 z-50 bg-black/30 backdrop-blur-sm","aria-hidden":"true"})}),(0,s.jsx)(h.u.Child,{...c,as:d.Fragment,children:(0,s.jsx)("div",{className:"fixed inset-0 z-50 flex flex-1 flex-col items-center justify-center gap-32",children:(0,s.jsx)("div",{className:"flex max-h-[100%] w-full flex-col items-center overflow-y-auto p-2",children:(0,s.jsx)("div",{className:"flex items-center justify-center",children:(0,s.jsx)(u.V.Panel,{className:"mx-auto rounded",children:t})})})})})]})})};function p(){return(0,s.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,s.jsx)(o,{title:"setting"}),(0,s.jsx)("div",{className:"p-8 border-[1px] backdrop-blur-sm",children:(0,s.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,s.jsx)("h3",{className:"bio-sub-header",children:"背景画像"}),(0,s.jsx)(m.F,{})]})})]})}function j(e){let[t,l]=(0,d.useState)(!1),r=()=>{l(!1)};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{className:"flex flex-row outline-none items-center justify-center",children:(0,s.jsx)("button",{className:t?"flex flex-row border-[1px] column-item-active rounded-full p-1 text-xl":"flex flex-row border-[1px] column-item rounded-full p-1 text-xl",onClick:()=>l(!0),children:(0,s.jsx)(i.W,{i:(0,s.jsx)(x.GEK,{})})})}),(0,s.jsx)(f,{closeModal:r,isOpen:t,children:(0,s.jsx)(p,{})})]})}let v=[{title:"作者の情報",path:"about_me"},{title:"制作物",path:"works"},{title:"文書",path:"docs"},{title:"実験室",path:"lab"}],g=e=>{let t=(0,c.useRouter)();return e.active?(0,s.jsx)("div",{className:" column-item-active flex flex-col items-center p-[0.05em] border-[0.1em] ",children:e.children}):(0,s.jsx)("div",{className:" column-item transition ease-out duration-200 flex flex-col items-center p-[0.05em] hover:opacity-100 cursor-pointer border-[0.1em] ",onClick:()=>t.push("".concat(e.path||"")),children:e.children})},b=e=>{let t=e.title;return"function"==typeof t?t({active:!!e.active,path:e.path}):(0,s.jsx)(g,{active:e.active,path:e.path,children:(0,s.jsx)("div",{className:"flex flex-col w-24 sm:w-40 p-1 px-2 text-xl font-bold tracking-wide",children:t})})};var w=l(8138),N=l(6486),y=l.n(N);function k(e){let t=(0,c.useRouter)(),l=0===y().compact(t.pathname.split("/")).length;return(0,s.jsx)(s.Fragment,{children:(0,s.jsx)("div",{className:"flex flex-row outline-none items-center justify-center",children:(0,s.jsx)("button",{className:l?"outline-none flex flex-row border-[1px] column-item rounded-full p-1 text-xl opacity-50 cursor-default hover:border-transparent":"outline-none flex flex-row border-[1px] column-item rounded-full p-1 text-xl active:text-black active:bg-white",onClick:()=>t.push("/"),disabled:l,children:(0,s.jsx)(i.W,{i:(0,s.jsx)(w.X1w,{})})})})})}let F=e=>{let t=(0,c.useRouter)(),[,l]=t.pathname.split("/");return(0,s.jsxs)("main",{className:" hidden sm:flex flex-row items-stretch grow shrink gap-4 overflow-hidden ",style:e.style,children:[(0,s.jsxs)("div",{className:" hidden sm:flex flex-col gap-4 grow-0 shrink-0 py-24 sm:pl-2 md:pl-24 ",children:[(0,s.jsxs)("div",{className:"flex flex-col gap-1 grow shrink",children:[(0,s.jsx)(o,{title:"#"}),v.map((e,t)=>(0,s.jsx)(b,{active:l==e.path,title:e.title,path:e.path},t)),(0,s.jsx)(b,{title:j},"config"),(0,s.jsx)(b,{title:k},"home")]}),(0,s.jsx)("div",{className:"grow-0 shrink-0",children:(0,s.jsx)(a,{})})]}),e.children?(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("div",{className:" flex flex-col gap-1 max-h-full overflow-scroll pt-2 sm:pt-24 pl-2 sm:pl-0 pr-2 md:pr-24 ",children:[l?(0,s.jsx)(o,{title:l}):null,e.children]})}):null]})};var C=l(471);let I=e=>{let t=(0,c.useRouter)(),[,l]=t.pathname.split("/");return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("main",{className:" flex sm:hidden flex-col items-stretch grow shrink gap-1 overflow-hidden ",style:e.style,children:e.children?(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("div",{className:" flex flex-col gap-1 shrink grow overflow-scroll pt-2 pl-2 pr-2 pb-12",children:[l?(0,s.jsx)(o,{title:l}):null,e.children]})}):(0,s.jsx)("div",{className:"shrink grow"})}),(0,s.jsxs)("div",{className:" fixed sm:hidden bottom-0 z-10 w-screen flex flex-row items-center gap-4 px-2 border-t-[1px] backdrop-blur-md ",children:[(0,s.jsx)(C.v,{as:"div",className:"relative inline-block text-left ",children:e=>{let{open:t}=e;return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(C.v.Button,{className:" inline-flex w-full justify-center px-4 py-2 text-2xl hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ",children:(0,s.jsx)("span",{className:"inline-block transition duration-200 ease-in-out",style:{transform:t?"rotateX(180deg)":""},children:(0,s.jsx)(x.IAR,{})})}),(0,s.jsx)(h.u,{enter:"transition duration-200 ease-out",enterFrom:"transform translate-y-1 opacity-0",enterTo:"transform opacity-100",leave:"transition duration-200 ease-out",leaveFrom:"transform opacity-100",leaveTo:"transform translate-y-1 opacity-0",children:(0,s.jsx)(C.v.Items,{className:" absolute bottom-10 left-0 mb-2 w-32 sm:w-56 origin-top-left p-2 border-[1px] bg-black/75 divide-y divide-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ",children:(0,s.jsx)("div",{className:"flex flex-col gap-1 grow shrink",children:v.map((e,t)=>(0,s.jsx)(b,{active:l==e.path,title:e.title,path:e.path},t))})})})]})}}),(0,s.jsx)("div",{className:"grow shrink"}),(0,s.jsxs)("div",{className:"flex flex-row items-center grow-0 shrink-0",children:[(0,s.jsx)(b,{title:j},"config"),(0,s.jsx)(b,{title:k},"config")]}),(0,s.jsx)("div",{className:"flex flex-row grow-0 shrink-0",children:(0,s.jsx)(a,{})})]})]})};function _(e){let[t]=(0,r.c6)();console.log("[backgroundImage]",t);let l={backgroundImage:t?"url(/bg/".concat(t,")"):void 0,backgroundPosition:"center",backgroundSize:"cover"};return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("div",{className:" min-h-screen max-h-screen flex flex-col justify-stretch overflow-hidden ",style:{backgroundImage:t?"url(/bg/lofi_".concat(t,")"):void 0,backgroundPosition:"center",backgroundSize:"cover"},children:[(0,s.jsx)(F,{style:l,children:e.children}),(0,s.jsx)(I,{style:l,children:e.children})]})})}},6334:function(e,t,l){l.d(t,{F:function(){return o}});var s=l(5893),r=l(6663),n=l(3684);let i=()=>(0,s.jsx)("div",{className:"flex flex-row items-center justify-center w-10 h-10 border-2"}),a=()=>{let[e,t]=(0,n.c6)();return e?(0,s.jsx)("div",{className:"flex flex-row items-center justify-center w-10 h-10 border-2 cursor-pointer",onClick:()=>t("none"),children:(0,s.jsx)("p",{className:"text-sm",children:"none"})}):(0,s.jsx)(i,{})},c=e=>{let t=r.b[e.imageIndex],[l,a]=(0,n.c6)();return l===t?(0,s.jsx)(i,{}):(0,s.jsx)("div",{className:"flex flex-row items-center justify-center w-10 h-10 border-2 cursor-pointer",style:{backgroundImage:"url(/bg/".concat("thumb_".concat(t),")"),backgroundSize:"cover"},onClick:()=>a(t),children:(0,s.jsx)("p",{className:"text-xl",children:e.imageIndex+1})},t)},o=()=>(0,s.jsxs)("div",{className:"flex flex-row gap-2 flex-wrap",children:[r.b.map((e,t)=>(0,s.jsx)(c,{imageIndex:t},t)),(0,s.jsx)(a,{})]})}}]);