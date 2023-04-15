import * as Fa from 'react-icons/fa';
import { InlineIcon } from './InlineIcon';

export const Credit = () => {
  return (<>
    <p>2023 Kawada, Yosuke</p>
    <p>
      <a href="https://github.com/corvvs">
        <InlineIcon i={<Fa.FaGithub />}/>
      </a>
      <a href="https://twitter.com/corvvs">
        <InlineIcon i={<Fa.FaTwitter />}/>
      </a>
    </p>
  </>)
}

