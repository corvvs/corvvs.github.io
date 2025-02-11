import { IconType } from 'react-icons';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { TbBrandGooglePhotos } from 'react-icons/tb';


export const AMInterests = [
  "手触りのいいUI",
  "SVG",
  "GIS",
  "可視化",
];

type AMLanguage = {
  good: "well" | "ok" | "not-ok";
  name: string;
};

export const AMLanguages: AMLanguage[] = [
  { good: 'well',   name: "C", },
  { good: 'ok',     name: "C++", },
  { good: 'well',   name: "Perl", },
  { good: 'well',   name: "Ruby", },
  { good: 'ok',     name: "Python", },
  { good: 'ok',     name: "Swift", },
  { good: 'well',   name: "TypeScript", },
  { good: 'well', name: "Go", },
  { good: 'not-ok', name: "x68_64Asm", },
  { good: 'not-ok', name: "OCaml", },
  { good: 'not-ok', name: "Rust", },
  { good: 'not-ok', name: "Haskell", },
];

export type AMSocialItemParams = {
  service: string;
  url: string;
  icon?: IconType;
  id: string;
};

export const AMSocialItems: AMSocialItemParams[] = [
  {
    service: 'GitHub',
    url: "https://github.com/corvvs",
    icon: FaGithub,
    id: "@corvvs",
  },
  {
    service: 'Twitter',
    url: "https://twitter.com/corvvs",
    icon: FaTwitter,
    id: "@corvvs",
  },
  {
    service: 'Qiita',
    url: "https://qiita.com/corvvs",
    id: "@corvvs",
  },
  {
    service: 'GooglePhoto',
    url: "https://photos.app.goo.gl/EY7kQg4VsbUzzhbX8",
    icon: TbBrandGooglePhotos,
    id: "album",
  },
];
