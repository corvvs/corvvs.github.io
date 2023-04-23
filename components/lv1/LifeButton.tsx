import React from "react";

export const LifeButton = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  return (
    <button
      {...{ ...props }}
      className={
        ' border-[1px] py-0 px-1' + (props.className || '')
      }
      style={{
        ...(props.style || {}),
      }}
    />
  );
};
