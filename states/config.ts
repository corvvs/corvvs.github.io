import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useEffect } from 'react';

export const BackgroundImageNames = [
  "bg.jpg", "bg2.jpg", "bg3.jpg", "bg4.jpg", "bg5.jpg", "bg6.jpg", "bg7.jpg", "bg8.jpg", "bg9.jpg", "bg10.jpg",
] as const;

export type BackgroundImageName = typeof BackgroundImageNames[number];

const imageNameKey = 'life_bg_image_name';

const getImageNameFromStorage = () => {
  const name = localStorage.getItem(imageNameKey) || "bg.jpg";
  return ([...BackgroundImageNames] as any[]).includes(name) ? name as BackgroundImageName : null;
}

export const siteConfigAtom = {
  backgroundImage: atomWithStorage<BackgroundImageName | null>(imageNameKey, "bg.jpg"),
};

// export function useBackgroundImage () {
//   const [state, setState] = useAtom(siteConfigAtom.backgroundImage);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const storedValue = getImageNameFromStorage();
//       console.log("getting: ", storedValue);
//       setState(storedValue);
//     }
//   }, []);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       console.log("setting: ", state);
//       localStorage.setItem(imageNameKey, state || "");
//     }
//   }, [state]);

//   return [state, setState] as const;
// };
