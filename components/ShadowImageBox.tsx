import { BackgroundImageNames } from "@/states";
import Image from "next/image";

export default function ShadowImageBox() {
  return <div className="w-0 h-0 opacity-0">
    {
      BackgroundImageNames.map(name => <Image
        key={name}
        alt={name}
        src={`/bg/lofi_${name}`}
        width={1} height={1}
      />)
    }
  </div>
}
