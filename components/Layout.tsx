import { Credit } from "./Credit";
import { CSSProperties, ReactNode } from "react";
import { useRouter } from "next/router";
import _ from 'lodash';
import ColumnHeader from "./ColumnHeader";
import { ConfigButton } from "./ConfigButton";
import { useBackgroundImage } from "@/states/config";
import { Menu, Transition } from "@headlessui/react";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// [Item]
// 以下の性質を持つコンポーネント:
// - クリックした時の遷移先として `path: string` を持つ.
// - パラメータ `active: boolean` を取る or 表示文字列として`title: string` を持つ.

type ItemComponent = (props: { active: boolean; path?: string; }) => JSX.Element;

type ItemParam = {
  title: ItemComponent | string;
  path?: string;
};

const Items: ItemParam[] = [
  { title: "作者の情報", path: "about_me", },
  { title: "制作物", path: "works", },
  { title: "文書", path: "docs", },
  { title: "実験室", path: "lab", },
];

const Outer = (props: Omit<ItemParam, "title"> & {
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

const GridBlock = (props: ItemParam & {
  active?: boolean;
}) => {
  const t = props.title;
  if (typeof t === "function") {
    return t({ active: !!props.active, path: props.path });
  }
  return (
    <Outer active={props.active} path={props.path}>
      <div className="flex flex-col w-40 p-1 px-2 text-xl font-bold tracking-wide">{t}</div>
    </Outer>
  );
};

const MobileMain = (props: {
  style?: CSSProperties;
  children?: ReactNode;
}) => {
  const router = useRouter();
  const [, currentPath] = router.pathname.split("/");
  const rotationClass = 'transform rotate-180';

  return <>
  <main
    className="
      flex sm:hidden
      flex-col items-stretch grow shrink gap-1 overflow-hidden
    "
    style={props.style}
  >


    {
      props.children ? (<>
        <div className=' flex flex-col gap-1 shrink grow overflow-scroll pt-2 pl-2 pr-2 pb-12'>
          { currentPath ? <ColumnHeader title={currentPath} /> : null }
          {props.children}
        </div>
      </>) : <div className='shrink grow'>
      </div>
    }
  </main>

    <div className="
      fixed sm:hidden
      bottom-0
      z-10
      w-screen
      flex flex-row items-center gap-4
      px-2
      border-t-[1px]
      backdrop-blur-md
    ">
      <Menu as="div" className="relative inline-block text-left ">
        {({ open }) => (<>
          <Menu.Button className="
            inline-flex w-full justify-center
            px-4 py-2
            text-2xl
            hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white
            focus-visible:ring-opacity-75
          ">
            <span
              className={`inline-block transition duration-100 ease-in-out ${open ? rotationClass : ''}`}
            >
              <FaChevronDown />
            </span>
          </Menu.Button>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-[98%] opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-100 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-[98%] opacity-0"
          >
            <Menu.Items className="
              absolute bottom-10 left-0 mb-2 w-56
              origin-top-left
              p-2
              border-[1px]
              bg-black/75
              divide-y divide-gray-100 shadow-lg ring-1 ring-black ring-opacity-5
              focus:outline-none
            ">
              <div className='flex flex-col gap-1 grow shrink'>
                { Items.map((item, i) =>
                  <GridBlock
                    key={i}
                    active={currentPath == item.path}
                    title={item.title} path={item.path}
                  />
                )}
              </div>
            </Menu.Items>
          </Transition>
        </>)}
      </Menu>

      <div className='grow shrink'>
      </div>

      <div className='flex flex-row items-center grow-0 shrink-0'>
        <GridBlock
          key="config"
          title={ConfigButton}
        />
      </div>

      <div className='flex flex-row grow-0 shrink-0'>
        <Credit />
      </div>

    </div>

  </>
}

const PCMain = (props: {
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
        <GridBlock
          key="config"
          title={ConfigButton}
        />
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

export default function Layout(props: {
  children?: ReactNode;
}) {
  const [backgroundImage] = useBackgroundImage();
  console.log("[backgroundImage]", backgroundImage);

  const lofiBackground = {
    backgroundImage: backgroundImage ? `url(/bg/lofi_${backgroundImage})` : undefined,
    backgroundSize: "cover",
  };
  const hifiBackground = {
    backgroundImage: backgroundImage ? `url(/bg/${backgroundImage})` : undefined,
    backgroundSize: "cover",
  };

  // [メディアクエリ]
  // sm 以上で左メニューが出る
  // md 以上でパディングが大きくなる
  return (<><div
      className="
        min-h-screen max-h-screen flex flex-col justify-stretch overflow-hidden
      "
      style={lofiBackground}
    >
    <PCMain style={hifiBackground}>{props.children}</PCMain>
    <MobileMain style={hifiBackground}>{props.children}</MobileMain>
  </div>
  </>)
}
