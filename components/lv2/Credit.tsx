import { FaGithub, FaTwitter } from 'react-icons/fa';
import { InlineIcon } from '../lv1/InlineIcon';

export const Credit = () => {
  return (<>
    <p>2023 Kawada, Yosuke</p>
    <p>
      <a href="https://github.com/corvvs">
        <InlineIcon i={<FaGithub />}/>
      </a>
      <a href="https://twitter.com/corvvs">
        <InlineIcon i={<FaTwitter />}/>
      </a>
    </p>
  </>)
}

