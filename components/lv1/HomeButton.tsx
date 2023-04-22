import { CiHome } from 'react-icons/ci';
import { InlineIcon } from "./InlineIcon";
import { useRouter } from 'next/router';
import _ from 'lodash';

export function HomeButton(props: { active: boolean, path?: string }) {
  const router = useRouter();
  const isRoot = _.compact(router.pathname.split("/")).length === 0;
  const className = isRoot
    ? "outline-none flex flex-row border-[1px] column-item rounded-full p-1 text-xl opacity-50 cursor-default hover:border-transparent"
    : "outline-none flex flex-row border-[1px] column-item rounded-full p-1 text-xl active:text-black active:bg-white";
  return <>
    <div className="flex flex-row outline-none items-center justify-center">
      <button
        className={className}
        onClick={() => router.push("/")}
        disabled={isRoot}
      >
        <InlineIcon i={<CiHome />}/>
      </button>
    </div>
  </>;
}

