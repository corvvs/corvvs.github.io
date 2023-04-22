type ItemComponent = (props: { active: boolean; path?: string; }) => JSX.Element;

export type NavigationItemParam = {
  title: ItemComponent | string;
  path?: string;
};

export const NavigationItems: NavigationItemParam[] = [
  { title: "作者の情報", path: "about_me", },
  { title: "制作物", path: "works", },
  { title: "文書", path: "docs", },
  { title: "実験室", path: "lab", },
];
