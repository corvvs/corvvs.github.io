import { IconType } from "react-icons";
import * as Fa from "react-icons/fa";

export type ExLink = {
  url: string;
  icon: IconType;
}

export const ExLinkButton = (props: {
  item: ExLink | string;
}) => {
  const Icon = typeof props.item === "string" ? Fa.FaExternalLinkAlt : props.item.icon;
  const url = typeof props.item === "string" ? props.item : props.item.url;
  return <a href={url}><Icon/></a>
}
