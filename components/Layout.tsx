import { CSSProperties, ReactNode } from 'react';
import { MainPC } from './layout/MainPC';
import { MainMobile } from './layout/MainMobile';
import { BackgroundLayers } from './background/BackgroundLayers';

// 背景そのものは BackgroundLayers が描く (切り替え時に freq sep の遷移が入る)。
// MainPC / MainMobile には背景ではなく重ね順だけを渡し、本文が背景層の上に来るようにする。
const contentLayer: CSSProperties = {
  position: 'relative',
  zIndex: 1,
};

export default function Layout(props: {
  children?: ReactNode;
}) {
  // [メディアクエリ]
  // sm 以上で左メニューが出る
  // md 以上でパディングが大きくなる
  return (
    <div
      className="
        relative
        min-h-screen max-h-screen flex flex-col justify-stretch overflow-hidden
      "
    >
      <BackgroundLayers />
      <MainPC style={contentLayer}>{props.children}</MainPC>
      <MainMobile style={contentLayer}>
        {props.children}
      </MainMobile>
    </div>
  );
}
