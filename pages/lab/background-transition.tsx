import Head from 'next/head';
import { BackgroundTransitionLab } from '@/components/lab/backgroundTransition/BackgroundTransitionLab';

// 背景写真の遷移演出を見比べるための実験ページ。
// 既存の背景切り替え (states/config.ts) には一切干渉しない。
export default function BackgroundTransitionPage() {
  return (
    <>
      <Head>
        <title>background transition / lab</title>
      </Head>
      <BackgroundTransitionLab />
    </>
  );
}
