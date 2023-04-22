import { LifeButton } from "@/components/lv1/LifeButton";
import { Listbox } from "@headlessui/react";
import { atom, useAtom } from "jotai";
import _ from "lodash";
import { InlineIcon } from "../lv1/InlineIcon";
import { SiMdnwebdocs } from 'react-icons/si';

const AbsoluteLengthDimensions = ["cm", "mm", "Q", "in", "pc", "pt", "px"] as const;
const RelativeLengthDimensions = ["em", "ex", "ch", "rem", "lh", "rlh", "vw", "vh", "vmin", "vmax", "vb", "vi"] as const;

type AbsoluteLengthDimension = typeof AbsoluteLengthDimensions[number];
type RelativeLengthDimension = typeof RelativeLengthDimensions[number];
type LengthDimention = AbsoluteLengthDimension | RelativeLengthDimension;



type SizeValue = {
  num: number;
  unit: LengthDimention;
};

const styleSettingInitialValues = {
  backdrop: {
    dummy: 0,
    blur: 4,
    brightness: 100,
    hue: 0,
    grayscale: 0,
    saturate: 100,
  },
  text: {
    "dummy": { num: 0, unit: "px" },
    "font-size": { num: 16, unit: "px" },
    "line-height": { num: 1, unit: "em" },
    "letter-spacing": { num: 1, unit: "px" },
  },
};

export const styleSettingAtoms = {
  backdrop: _.mapValues(styleSettingInitialValues.backdrop, (v) => atom(v)),


  text: _.mapValues(styleSettingInitialValues.text, (v) => atom(v)),
};

const useSetBackdropDefault = () => {
  const [, setBlur] = useAtom(styleSettingAtoms.backdrop.blur);
  const [, setBrightness] = useAtom(styleSettingAtoms.backdrop.brightness);
  const [, setGrayscale] = useAtom(styleSettingAtoms.backdrop.grayscale);
  const [, setHue] = useAtom(styleSettingAtoms.backdrop.hue);
  const [, setSaturate] = useAtom(styleSettingAtoms.backdrop.saturate);
  return () => {
    setBlur(styleSettingInitialValues.backdrop.blur);
    setBrightness(styleSettingInitialValues.backdrop.brightness);
    setGrayscale(styleSettingInitialValues.backdrop.grayscale);
    setHue(styleSettingInitialValues.backdrop.hue);
    setSaturate(styleSettingInitialValues.backdrop.saturate);
  };
}


const AttributeSlider = (props: {
  name: string;
  funcname: string;
  unit: string;
  atom: typeof styleSettingAtoms.backdrop.dummy;
  range: [number, number];
}) => {
  const [value, setValue] = useAtom(props.atom);
  return (
    <div className="flex flex-row items-center gap-4">
      <h4 className="w-[4em]">{props.name}</h4>
      <input
        type="range" min={props.range[0]} max={props.range[1]} value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
      />
      <p className="w-[8em]">{props.funcname}({value}{props.unit})</p>
    </div>
  )
};

export const BackdropFilterTuner = () => {
  const setDefault = useSetBackdropDefault();
  return (<div className="flex flex-col gap-2">
    <h3 className='bio-sub-header pb-2 flex flex-row gap-2'>
      <p>
        Backdrop Filter
      </p>

      <a href="https://developer.mozilla.org/ja/docs/Web/CSS/filter">
        <InlineIcon i={<SiMdnwebdocs />} />
      </a>

      <LifeButton
        onClick={() => setDefault()}
      >reset</LifeButton>
    </h3>
    <AttributeSlider name="Blur"        funcname="blur"       range={[0, 30]}   unit="px"   atom={styleSettingAtoms.backdrop.blur} />
    <AttributeSlider name="Brightness"  funcname="brightness" range={[0, 200]}  unit="%"    atom={styleSettingAtoms.backdrop.brightness} />
    <AttributeSlider name="Grayscale"   funcname="grayscale"  range={[0, 100]}  unit="%"    atom={styleSettingAtoms.backdrop.grayscale} />
    <AttributeSlider name="Hue-Rotate"  funcname="hue-rotate" range={[0, 360]}  unit="deg"  atom={styleSettingAtoms.backdrop.hue} />
    <AttributeSlider name="Saturate"    funcname="saturate"   range={[0, 200]}  unit="%"    atom={styleSettingAtoms.backdrop.saturate} />
  </div>);
};

// CSS の長さの単位を選択するコンポーネント
const SizeUnitSelector = (props: {
  atom: typeof styleSettingAtoms.text.dummy;
}) => {
  const [value, setValue] = useAtom(props.atom);
  const options = [...AbsoluteLengthDimensions, ...RelativeLengthDimensions];
  return (
    <Listbox
      value={value.unit} onChange={(v) => setValue({ num: value.num, unit: v })}
    >
      <div className="relative w-[3em] border-[1px]">
        <Listbox.Button className="relative w-full px-2">{value.unit}</Listbox.Button>
        <Listbox.Options
          className="absolute w-[10em] flex flex-row flex-wrap justify-between overflow-auto border-[1px] bg-black/75"
          style={{
            zIndex: 100,
          }}
        >
          {options.map((unit) => (
            <Listbox.Option
              key={unit}
              value={unit}
              className={value.unit === unit ? "p-1 min-w-[2em] border-[1px] text-center" : "p-1 min-w-[2em] cursor-pointer text-center hover:bg-gray-200 hover:text-black"}
            >
              {unit}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  )
}

const PropertyTuner = (props: {
  name: string;
  atom: typeof styleSettingAtoms.text.dummy;
}) => {
  const [value, setValue] = useAtom(props.atom);
  return (
    <div className="flex flex-row items-center gap-4">
      <h4 className="w-[8em]">{props.name}</h4>
      <input
        type="range" min={-100} max={100} value={value.num}
        onChange={(e) => setValue({ num: parseFloat(e.target.value), unit: value.unit })}
      />
      <SizeUnitSelector atom={props.atom} />
      <p className="w-[8em]">{props.name}({value.num}{value.unit})</p>
    </div>
  )
};

export const TextPropertiesTuner = () => {
  return (<div className="flex flex-col gap-2">
    <h3 className='bio-sub-header pb-2 flex flex-row gap-2'>
      <p>
        Text Properties
      </p>
      <LifeButton
      >reset</LifeButton>
    </h3>
    <PropertyTuner name="font-size" atom={styleSettingAtoms.text["font-size"]} />
    <PropertyTuner name="line-height" atom={styleSettingAtoms.text["line-height"]} />
    <PropertyTuner name="letter-spacing" atom={styleSettingAtoms.text["letter-spacing"]} />
  </div>);
};

export const TestingArea = () => {
  const [fontSize] = useAtom(styleSettingAtoms.text["font-size"]);
  const [lineHeight] = useAtom(styleSettingAtoms.text["line-height"]);
  const [letterSpacing] = useAtom(styleSettingAtoms.text["letter-spacing"]);

  return (<div
      className="flex flex-col gap-2"
      style={{
        fontSize: `${fontSize.num}${fontSize.unit}`,
        lineHeight: `${lineHeight.num}${lineHeight.unit}`,
        letterSpacing: `${letterSpacing.num}${letterSpacing.unit}`,
      }}
    >
    <h3 className='bio-sub-header flex flex-row gap-2'>
      <p>
        Testing Area
      </p>
    </h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
    <p>
      僕たちどこまでだって行ける切符持ってるんだ大きいね、このくるみ、倍あるね。それはもうじきちかくに町か何かがあってそれで螫されると死ぬって先生が言ったようなすすきの穂がゆれたのです。もうまるでひどい峡谷になってはねあげられたねえ。だまってその譜を聞いているとなんだかその地図をどこかできいたぼくだって、ほんとうにこんや遠くへ行ったか一人も見えませんでした。それどころでなく、見れば見るほど、そこはぼんやり白くけむっているばかり、誰もいませんでしたから、ジョバンニは、もっとたべたかったのです。
    </p>
  </div>);
}
