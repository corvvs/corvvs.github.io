import { atom, useAtom } from 'jotai';

const isGalleryMode = atom(false);

export const useGalleryMode = () => {
  const [galleryMode, setGalleryMode] =
    useAtom(isGalleryMode);
  return [galleryMode, setGalleryMode] as const;
};
