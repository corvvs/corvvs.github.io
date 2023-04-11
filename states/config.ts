import { atom, useAtom } from 'jotai';

export const BackgroundImageNames = [
  "bg.jpg", "bg2.jpg", "bg3.jpg", "bg4.jpg", "bg5.jpg", "bg6.jpg", "bg7.jpg", "bg8.jpg", "bg9.jpg", "bg10.jpg",
] as const;

type BackgroundImageName = typeof BackgroundImageNames[number];

export const siteConfigAtom = {
  backgroundImage: atom<BackgroundImageName>("bg.jpg"),
};
