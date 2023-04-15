import Layout from "@/components/Layout";
import { LifeButton } from "@/components/lv1/LifeButton";
import { atom, useAtom } from "jotai";
import _ from "lodash";

const styleSettingInitialValues = {
  backdrop: {
    dummy: 0,
    blur: 4,
    brightness: 100,
    hue: 0,
    grayscale: 0,
    saturate: 100,
  }
};

const styleSettingAtoms = {
  backdrop: _.mapValues(styleSettingInitialValues.backdrop, (v) => atom(v)),
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

const BackdropFilterTuner = () => {
  const setDefault = useSetBackdropDefault();
  return (<div className="flex flex-col gap-2">
    <h3 className='bio-sub-header pb-2 flex flex-row gap-2'>
      <p>
        Backdrop Filter
      </p>
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

const LabContent = () => {
  const [blur] = useAtom(styleSettingAtoms.backdrop.blur);
  const [brightness] = useAtom(styleSettingAtoms.backdrop.brightness);
  const [grayscale] = useAtom(styleSettingAtoms.backdrop.grayscale);
  const [hue] = useAtom(styleSettingAtoms.backdrop.hue);
  const [saturate] = useAtom(styleSettingAtoms.backdrop.saturate);

  return (
    <div
      className='reader-block min-h-[30vh] flex flex-col border-[0.1em] gap-8 p-8'
      style={{ backdropFilter: `blur(${blur}px) brightness(${brightness}%) grayscale(${grayscale}%) hue-rotate(${hue}deg) saturate(${saturate}%)` }}
    >

      <div className="flex flex-col gap-4">
        <BackdropFilterTuner />
      </div>

    </div>
  );
};

export default function Lab() {
  return (
    <Layout>
        <LabContent />
    </Layout>
  );
}
