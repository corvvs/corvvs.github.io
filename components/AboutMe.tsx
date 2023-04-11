import Image from 'next/image'
import * as Fa from 'react-icons/fa';
import { InlineIcon } from './InlineIcon';

const assetPrefix = process.env.assetPrefix || "";

export default function AboutMe() {
  return (<div className='flex flex-col backdrop-blur-sm border-[0.1em] gap-8 p-8'>

    <div className='flex flex-row gap-8'>
      <div
        className='w-20 h-20 relative  border-[1px]'
      >
        <Image
          alt="mr.big"
          src={`${assetPrefix}/mr.big.png`}
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
      <li>東京都在住</li>
      <li>なんでもや(らないといけないので仕方なくや)る系Webエンジニア</li>
    </ul>

    <ul>
      <li>餅とこんにゃくが苦手</li>
      <li>きのこと雪見だいふくは好き</li>
    </ul>

    <div>
      <h3 className='bio-sub-header'>書いたことがある言語リスト</h3>
      <ul className='flex flex-row flex-wrap gap-4'>
        <li className='lang-well'>C</li>
        <li className='lang-ok'>C++</li>
        <li className='lang-well'>Perl</li>
        <li className='lang-well'>Ruby</li>
        <li className='lang-ok'>Python</li>
        <li className='lang-ok'>Swift</li>
        <li className='lang-well'>TypeScript</li>
        <li className='lang-not-ok'>Go</li>
        <li className='lang-not-ok'>OCaml</li>
      </ul>
      (触れた順; 色が薄いやつほど自信がない)
    </div>

    <div>
      <h3 className='bio-sub-header'>Social</h3>
      <ul>
        <li>
          GitHub
          <a href="https://github.com/corvvs">
            <InlineIcon i={<Fa.FaGithub />}/>
            @corvvs
          </a>
        </li> 
        <li>
          Twitter
          <a href="https://twitter.com/corvvs">
            <InlineIcon i={<Fa.FaTwitter />}/>
            @corvvs
          </a>
        </li> 
      </ul>
    </div>
  </div>)
}

