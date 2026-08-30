import { useEffect } from 'react';
import { useBackgroundImage } from '@/states/config';
import {
  TiltShiftGrab,
  TiltShiftParams,
  isTiltShiftActive,
  tiltShiftRanges,
  useTiltShift,
  useTiltShiftGrab,
} from '@/states/tiltShift';

// 背景写真にかけるチルトシフトの操作卓。
//
// 効き目は背景そのものに出るので、この画面自体がプレビューを兼ねる。
// 設定は画像ごとに憶える (いい値は写真ごとにまるで違うため)。

type SliderKey = keyof TiltShiftParams;

const sliderDefs: {
  key: SliderKey;
  label: string;
  digits: number;
  guide?: TiltShiftGrab;
}[] = [
  {
    key: 'focus',
    label: '焦点位置',
    digits: 2,
    guide: 'focus',
  },
  {
    key: 'width',
    label: '合焦帯の幅',
    digits: 2,
    guide: 'width',
  },
  { key: 'sigmaUp', label: '上のぼけ量', digits: 1 },
  { key: 'sigmaDown', label: '下のぼけ量', digits: 1 },
];

const Slider = (props: {
  label: string;
  value: number;
  digits: number;
  min: number;
  max: number;
  step: number;
  disabled: boolean;
  onChange: (v: number) => void;
  onGrab?: () => void;
}) => (
  <label className="flex flex-row items-center gap-2">
    <span className="grow-0 shrink-0 w-24">
      {props.label}
    </span>
    <input
      type="range"
      className="grow shrink min-w-0"
      min={props.min}
      max={props.max}
      step={props.step}
      value={props.value}
      disabled={props.disabled}
      onPointerDown={props.onGrab}
      onChange={(e) =>
        props.onChange(e.currentTarget.valueAsNumber)
      }
    />
    <span className="grow-0 shrink-0 w-10 text-right">
      {props.value.toFixed(props.digits)}
    </span>
  </label>
);

export const TiltShiftControl = () => {
  const [backgroundImage] = useBackgroundImage();
  const [params, patch, reset] =
    useTiltShift(backgroundImage);
  const disabled = !backgroundImage;
  // 掴んでいる間だけ背景側に目安の線を出してもらう。
  const [grab, setGrab] = useTiltShiftGrab();

  // 離す場所はスライダーの上とは限らないので window で拾う。
  useEffect(() => {
    if (!grab) return;
    const end = () => setGrab(null);
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', end);
    return () => {
      window.removeEventListener('pointerup', end);
      window.removeEventListener('pointercancel', end);
    };
  }, [grab, setGrab]);

  return (
    <div className="flex flex-col gap-1">
      {sliderDefs.map((d) => (
        <Slider
          key={d.key}
          label={d.label}
          digits={d.digits}
          value={params[d.key]}
          disabled={disabled}
          onChange={(v) => patch({ [d.key]: v })}
          onGrab={
            d.guide && !disabled
              ? () => setGrab(d.guide ?? null)
              : undefined
          }
          {...tiltShiftRanges[d.key]}
        />
      ))}

      <div className="flex flex-row items-center justify-between gap-4 pt-2">
        <p className="opacity-60">
          {disabled
            ? '背景を選択してください'
            : '設定は画像ごとに記憶されます'}
        </p>
        <button
          className="border-[1px] column-item px-2 disabled:opacity-30"
          disabled={disabled || !isTiltShiftActive(params)}
          onClick={reset}
        >
          reset
        </button>
      </div>
    </div>
  );
};
