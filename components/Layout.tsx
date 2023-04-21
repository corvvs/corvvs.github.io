import { ReactNode } from "react";
import _ from 'lodash';
import { useBackgroundImage } from "@/states/config";
import { MainPC } from "./layout/MainPC";
import { MainMobile } from "./layout/MainMobile";

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
    <MainPC style={hifiBackground}>{props.children}</MainPC>
    <MainMobile style={hifiBackground}>{props.children}</MainMobile>
  </div>
  </>)
}
