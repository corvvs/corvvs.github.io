import Layout from "@/components/Layout";
import MainContentBlock from "@/components/MainContentBlock";

import Image from 'next/image'
import { InlineIcon } from '@/components/lv1/InlineIcon';
import { AMInterests, AMLanguages, AMSocialItemParams, AMSocialItems } from '@/data';

const SocialItem = (props: AMSocialItemParams) => {
  const Icon = props.icon;
  return <li className='flex flex-row'>
    { props.service }
    <a href={props.url} className='flex flex-row'>
      {Icon ? <InlineIcon i={<Icon />}/> : <span className='w-2' />}
      { props.id }
    </a>
  </li>;
}

const AboutMeContent = () => {
  return (<>

    <div className='flex flex-row gap-8'>
      <div
        className='w-20 h-20 relative  border-[1px]'
      >
        <Image
          alt="mr.big"
          src={`/mr.big.png`}
          fill
        />
      </div>

      <div className='flex flex-col justify-center text-xl'>
        <h3>Kawada, Yosuke</h3>
        <h3>河田 鷹介</h3>
      </div>
    </div>

    <ul>
      <li>1985年生 ♒︎</li>
      <li>富山県立 呉羽高等学校 卒業</li>
      <li>東京工業大学 基礎物理学専攻 修了</li>
      <li>42Tokyo Lv. 14 (Common Core修了)</li>
      <li>東京都在住</li>
      <li>なんでもや<span className='text-sm opacity-50'>(らないといけないので仕方なくや)</span>る系Webエンジニア</li>
    </ul>

    <ul>
      <li>餅とこんにゃくが苦手</li>
      <li>きのこと雪見だいふくは好き</li>
    </ul>

    <div>
      <h3 className='bio-sub-header'>関心事</h3>
      <ul className='flex flex-row flex-wrap gap-4'>
      { AMInterests.map(item => <li key={item}>{item}</li>) }
      </ul>
    </div>


    <div>
      <h3 className='bio-sub-header'>書いたことがある言語リスト</h3>
      <ul className='flex flex-row flex-wrap gap-4'>
        { AMLanguages.map(item => <li key={item.name} className={`lang-${item.good}`}>{item.name}</li>) }
      </ul>
      (触れた順; 色が薄いやつほど自信がない)
    </div>

    <div>
      <h3 className='bio-sub-header'>Social</h3>
      <ul>
      { AMSocialItems.map(item => <SocialItem key={item.service} {...item} />) }
      </ul>
    </div>
  </>)
}

export default function AboutMe() {
  return <Layout>
    <MainContentBlock><AboutMeContent /></MainContentBlock>
  </Layout>
}
