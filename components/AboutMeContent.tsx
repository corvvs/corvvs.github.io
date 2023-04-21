import Image from 'next/image'
import { TbBrandGooglePhotos } from 'react-icons/tb';
import { InlineIcon } from './InlineIcon';
import { FaGithub, FaTwitter } from 'react-icons/fa';

const SocialItem = (props: {
  service: string;
  url: string;
  icon?: JSX.Element;
  id: string;
}) => {
  return <li className='flex flex-row'>
    { props.service }
    <a href={props.url} className='flex flex-row'>
      {props.icon ? <InlineIcon i={props.icon}/> : <span className='w-2' />}
      { props.id }
    </a>
  </li>;
}

export default function AboutMe() {
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
      <li>42Tokyo Lv. 13 (Common Core修了)</li>
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
      <li>手触りのいいUI</li>
      <li>SVG</li>
      <li>GIS</li>
      <li>可視化</li>
      </ul>
    </div>


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
        <li className='lang-not-ok'>x68_64Asm</li>
        <li className='lang-not-ok'>OCaml</li>
      </ul>
      (触れた順; 色が薄いやつほど自信がない)
    </div>

    <div>
      <h3 className='bio-sub-header'>Social</h3>
      <ul>
      <SocialItem service='GitHub' url="https://github.com/corvvs" icon={<FaGithub />} id="@corvvs"/>
      <SocialItem service='Twitter' url="https://twitter.com/corvvs" icon={<FaTwitter />} id="@corvvs"/>
      <SocialItem service='Qiita' url="https://qiita.com/corvvs" id="@corvvs"/>
      <SocialItem service='GooglePhoto' url="https://photos.app.goo.gl/EY7kQg4VsbUzzhbX8" icon={<TbBrandGooglePhotos />} id="album"/>
      </ul>
    </div>
  </>)
}

