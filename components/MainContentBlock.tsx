import { ReactNode } from "react"

export default function MainContentBlock(props: {
  children: ReactNode;
}) {
  return <div className='
    reader-block flex flex-col border-[0.1em] gap-8 p-2 sm:p-8
  '>
    {props.children}
  </div>
}
