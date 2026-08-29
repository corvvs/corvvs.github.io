import {
  TiltShiftParams,
  useTiltShiftGrab,
} from '@/states/tiltShift';

// 合焦帯の目安。焦点位置か幅のスライダーを掴んでいる間だけ出る。
//
// 背景の canvas と同じ親の absolute inset-0 に置いてあるので、
// focus / width をそのまま % にすれば実際のぼけ方と必ず一致する。
// 操作卓 (components/config/TiltShiftControl) の中に置くと、
// パネルの backdrop-blur が fixed の含みブロックになってしまい
// パネルの内側にしか線が引けない。背景の一部として持つのが素直。
//
// 実線 2 本が帯の上端と下端、破線が中心。掴んでいる方を濃く出す。

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

const Line = (props: {
  y: number;
  strong: boolean;
  dashed: boolean;
}) => (
  <div
    className="absolute left-0 right-0"
    style={{
      top: `${clamp01(props.y) * 100}%`,
      height: '1px',
      opacity: props.strong ? 1 : 0.4,
      ...(props.dashed
        ? {
            backgroundImage:
              'repeating-linear-gradient(to right,' +
              ' rgb(209,217,206) 0 6px, transparent 6px 14px)',
            filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.9))',
          }
        : {
            backgroundColor: 'rgb(209,217,206)',
            boxShadow: '0 0 3px 1px rgba(0,0,0,0.6)',
          }),
    }}
  />
);

export const TiltShiftGuide = (props: {
  params: TiltShiftParams;
}) => {
  const [grab] = useTiltShiftGrab();
  const { focus, width } = props.params;
  const top = clamp01(focus - width / 2);
  const bottom = clamp01(focus + width / 2);
  const onWidth = grab === 'width';

  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-150"
      style={{ opacity: grab ? 1 : 0 }}
      aria-hidden
    >
      <div
        className="absolute left-0 right-0"
        style={{
          top: `${top * 100}%`,
          height: `${(bottom - top) * 100}%`,
          backgroundColor: 'rgba(209,217,206,0.10)',
        }}
      />
      <Line y={top} strong={onWidth} dashed={false} />
      <Line y={bottom} strong={onWidth} dashed={false} />
      <Line y={focus} strong={grab === 'focus'} dashed />
    </div>
  );
};
