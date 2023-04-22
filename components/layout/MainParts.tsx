import { ReactNode } from "react";
import { useRouter } from "next/router";
import _ from 'lodash';
import { NavigationItemParam } from "@/data";

const Outer = (props: Omit<NavigationItemParam, "title"> & {
  active?: boolean;
  children: ReactNode;
}) => {

  const router = useRouter();
  if (props.active) {
    return <div className="
      column-item-active
      flex flex-col items-center p-[0.05em]
      border-[0.1em]
    "
    >
      {props.children}
    </div>
  } else {
    return (
      <div className="
        column-item
        transition
        ease-out
        duration-200
        flex flex-col items-center p-[0.05em]
        hover:opacity-100 cursor-pointer border-[0.1em]
      "
        onClick={() => router.push(`${props.path || ""}`)}
      >
        {props.children}
      </div>
    );
  }
};

export const GridBlock = (props: NavigationItemParam & {
  active?: boolean;
}) => {
  const t = props.title;
  if (typeof t === "function") {
    return t({ active: !!props.active, path: props.path });
  }
  return (
    <Outer active={props.active} path={props.path}>
      <div className="flex flex-col w-24 sm:w-40 p-1 px-2 text-xl font-bold tracking-wide">{t}</div>
    </Outer>
  );
};
