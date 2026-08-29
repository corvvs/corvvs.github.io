import { BsEasel } from 'react-icons/bs';
import { InlineIcon } from "./InlineIcon";
import { useState } from "react";
import { ChangeBackgroundImage } from "../config/ChangeBackgroundImage";
import { TiltShiftControl } from "../config/TiltShiftControl";
import { Modal } from "../Modal";
import ColumnHeader from "./ColumnHeader";

export function ConfigContent() {
  return <div className="flex flex-col gap-2">
    <ColumnHeader title="setting"/>
    <div className="flex flex-col gap-8 p-8 border-[1px] backdrop-blur-sm">

      <div className="flex flex-col gap-2">
        <h3 className='bio-sub-header'>背景画像</h3>
        <ChangeBackgroundImage />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className='bio-sub-header'>チルトシフト</h3>
        <TiltShiftControl />
      </div>
    </div>
  </div>
}

export function ConfigButton() {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  const className = isOpen
    ? "flex flex-row border-[1px] column-item-active rounded-full p-1 text-xl"
    : "flex flex-row border-[1px] column-item rounded-full p-1 text-xl";

  return <>
    <div className="flex flex-row outline-none items-center justify-center">
      <button
        className={className}
        onClick={() => setIsOpen(true)}
      >
        <InlineIcon i={<BsEasel />}/>
      </button>
    </div>
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      backdropClassName="fixed inset-0 z-50 bg-black/40"
    >
      <ConfigContent/>
    </Modal>
  </>;
}

