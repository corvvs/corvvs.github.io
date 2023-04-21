import { Credit } from "../Credit";
import { CSSProperties, ReactNode } from "react";
import { useRouter } from "next/router";
import _ from 'lodash';
import ColumnHeader from "../ColumnHeader";
import { ConfigButton } from "../ConfigButton";
import { Menu, Transition } from "@headlessui/react";
import { FaChevronDown, } from 'react-icons/fa';
import { GridBlock, Items } from "../layout/MainParts";

export const MainMobile = (props: {
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
              absolute bottom-10 left-0 mb-2 w-32 sm:w-56
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
        <GridBlock key="config" title={ConfigButton} />
      </div>

      <div className='flex flex-row grow-0 shrink-0'>
        <Credit />
      </div>

    </div>

  </>
}

