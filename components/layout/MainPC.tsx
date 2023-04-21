import { Credit } from "../Credit";
import { CSSProperties, ReactNode } from "react";
import { useRouter } from "next/router";
import _ from 'lodash';
import ColumnHeader from "../ColumnHeader";
import { ConfigButton } from "../ConfigButton";
import { GridBlock, Items } from "../layout/MainParts";

export const MainPC = (props: {
  style?: CSSProperties;
  children?: ReactNode;
}) => {
  const router = useRouter();
  const [, currentPath] = router.pathname.split("/");
  return <main
    className="
      hidden sm:flex
      flex-row items-stretch grow shrink gap-4 overflow-hidden
    "
    style={props.style}
  >

    <div className='
      hidden sm:flex flex-col gap-4 grow-0 shrink-0
      py-24
      sm:pl-2 md:pl-24
    '>
      <div className='flex flex-col gap-1 grow shrink'>
        <ColumnHeader title="#" />
        { Items.map((item, i) =>
          <GridBlock
            key={i}
            active={currentPath == item.path}
            title={item.title} path={item.path}
          />) }
        <GridBlock key="config" title={ConfigButton} />
      </div>
      <div className='grow-0 shrink-0'>
        <Credit />
      </div>
    </div>

    {
      props.children ? (<>
        <div className='
          flex flex-col gap-1 max-h-full overflow-scroll
          pt-2 sm:pt-24
          pl-2 sm:pl-0
          pr-2 md:pr-24
        '>
          { currentPath ? <ColumnHeader title={currentPath} /> : null }
          {props.children}
        </div>
      </>) : null
    }
  </main>
}
