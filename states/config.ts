import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useEffect } from 'react';

export const BackgroundImageNames = [
  "bg.jpg", "bg2.jpg", "bg3.jpg", "bg4.jpg", "bg5.jpg", "bg6.jpg", "bg7.jpg", "bg8.jpg", "bg9.jpg", "bg10.jpg", "bg11.jpg",
] as const;

export type BackgroundImageName = typeof BackgroundImageNames[number];

const imageNameKey = 'life_bg_image_name';

export const siteConfigAtom = {
  backgroundImage: atomWithStorage<BackgroundImageName | null>(imageNameKey, "bg.jpg"),
};

