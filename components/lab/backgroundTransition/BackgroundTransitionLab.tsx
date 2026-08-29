import {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';
import {
  BackgroundImageName,
  BackgroundImageNames,
  backgroundImageCaptions,
} from '@/states/config';
import {
  ContourSourceList,
  EasingKind,
  EasingList,
  FourierOrder,
  FourierSizes,
  LabParams,
  TransitionKind,
  TransitionKindList,
  applyFourierOrder,
  defaultParams,
  depthUrl,
  easingFns,
  hasDepth,
  imageUrl,
  pairPresets,
  thumbUrl,
} from './config';
import {
  LoadedDepth,
  LoadedImage,
  TransitionRenderer,
} from './renderer';
import { FourierEngine } from './fourier';

const clamp01 = (v: number) =>
  v < 0 ? 0 : v > 1 ? 1 : v;

// ---- 小さな UI 部品 ----------------------------------------

const Slider = (props: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
}) => (
  <label className="flex flex-row items-center gap-2 text-sm">
    <span className="w-[8em] shrink-0 opacity-80">
      {props.label}
    </span>
    <input
      className="grow min-w-0"
      type="range"
      min={props.min}
      max={props.max}
      step={props.step}
      value={props.value}
      onChange={(e) =>
        props.onChange(parseFloat(e.target.value))
      }
    />
    <span className="w-[4.2em] shrink-0 text-right">
      {props.format
        ? props.format(props.value)
        : props.value.toFixed(2)}
    </span>
  </label>
);

function Seg<T extends string | number>(props: {
  label?: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-row items-center gap-2 text-sm">
      {props.label ? (
        <span className="w-[8em] shrink-0 opacity-80">
          {props.label}
        </span>
      ) : null}
      <div
        className={`flex flex-row flex-wrap gap-1 ${
          props.disabled
            ? 'opacity-40 pointer-events-none'
            : ''
        }`}
      >
        {props.options.map((o) => (
          <button
            key={String(o.value)}
            className={`border-[1px] px-2 py-[0.1em] ${
              o.value === props.value
                ? 'column-item-active'
                : 'column-item'
            }`}
            onClick={() => props.onChange(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const Check = (props: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) => (
  <label className="flex flex-row items-center gap-2 text-sm cursor-pointer">
    <span className="w-[8em] shrink-0 opacity-80">
      {props.label}
    </span>
    <input
      type="checkbox"
      checked={props.value}
      onChange={(e) => props.onChange(e.target.checked)}
    />
  </label>
);

const Section = (props: {
  title: string;
  children: ReactNode;
}) => (
  <div className="flex flex-col gap-2">
    <h3 className="bio-sub-header pb-1 text-sm opacity-90">
      {props.title}
    </h3>
    {props.children}
  </div>
);

const Note = (props: { children: ReactNode }) => (
  <p className="text-xs opacity-70 leading-relaxed">
    {props.children}
  </p>
);

const ImagePicker = (props: {
  label: string;
  value: BackgroundImageName;
  onChange: (v: BackgroundImageName) => void;
  onPrefetch: (v: BackgroundImageName) => void;
  markDepth: boolean;
}) => (
  <div className="flex flex-col gap-1">
    <div className="flex flex-row items-baseline gap-2 text-sm">
      <span className="opacity-80">{props.label}</span>
      <span className="opacity-60 text-xs">
        {props.value} /{' '}
        {backgroundImageCaptions[props.value]}
      </span>
    </div>
    <div className="flex flex-row flex-wrap gap-1">
      {BackgroundImageNames.map((name, i) => {
        const depth = hasDepth(name);
        const dim =
          props.markDepth && !depth
            ? 'opacity-20'
            : 'opacity-50 hover:opacity-90';
        return (
          <button
            key={name}
            title={`${name} / ${
              backgroundImageCaptions[name]
            }${depth ? ' / depth あり' : ''}`}
            className={`w-7 h-7 border-[1px] text-[0.6rem] leading-none flex items-end justify-end ${
              name === props.value
                ? 'opacity-100 border-[2px]'
                : dim
            }`}
            style={{
              backgroundImage: `url(${thumbUrl(name)})`,
              backgroundSize: 'cover',
            }}
            onMouseEnter={() => props.onPrefetch(name)}
            onClick={() => props.onChange(name)}
          >
            <span className="px-[1px] bg-black/60">
              {i + 1}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

// ---- 本体 ---------------------------------------------------

type Status = 'loading' | 'ready' | 'error';

const INITIAL_A: BackgroundImageName = 'bg13.jpg';
const INITIAL_B: BackgroundImageName = 'bg19.jpg';

export const BackgroundTransitionLab = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<TransitionRenderer | null>(
    null
  );
  const fourierRef = useRef(new FourierEngine());
  const pairRef = useRef<{
    a: LoadedImage;
    b: LoadedImage;
    depthA: LoadedDepth | null;
    depthB: LoadedDepth | null;
  } | null>(null);
  const progressRef = useRef(0);
  const dirtyRef = useRef(true);
  const scrubRef = useRef<HTMLInputElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);

  const [params, setParams] =
    useState<LabParams>(defaultParams);
  const [imgA, setImgA] =
    useState<BackgroundImageName>(INITIAL_A);
  const [imgB, setImgB] =
    useState<BackgroundImageName>(INITIAL_B);
  const [playing, setPlaying] = useState(false);
  const [status, setStatus] = useState<Status>('loading');
  const [error, setError] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(true);
  const [fourierMs, setFourierMs] = useState(0);

  const runRef = useRef({
    playing: false,
    startedAt: 0,
    params,
  });

  const depthOk = hasDepth(imgA) && hasDepth(imgB);

  const syncProgressUi = useCallback((raw: number) => {
    if (scrubRef.current) {
      scrubRef.current.value = String(
        Math.round(raw * 1000)
      );
    }
    if (readoutRef.current) {
      const eased =
        easingFns[runRef.current.params.easing](
          clamp01(raw)
        );
      readoutRef.current.textContent = `t ${raw.toFixed(
        3
      )} → ${eased.toFixed(3)}`;
    }
  }, []);

  // --- WebGL の初期化と描画ループ ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: TransitionRenderer;
    try {
      renderer = new TransitionRenderer(canvas);
    } catch (e) {
      setStatus('error');
      setError(
        e instanceof Error ? e.message : String(e)
      );
      return;
    }
    rendererRef.current = renderer;
    dirtyRef.current = true;

    const ro = new ResizeObserver(() => {
      dirtyRef.current = true;
    });
    ro.observe(canvas);

    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const run = runRef.current;

      if (run.playing) {
        const dur = Math.max(run.params.durationMs, 1);
        const raw = clamp01(
          (performance.now() - run.startedAt) / dur
        );
        progressRef.current = raw;
        syncProgressUi(raw);
        dirtyRef.current = true;
        if (raw >= 1) {
          run.playing = false;
          setPlaying(false);
        }
      }

      if (!dirtyRef.current) return;
      dirtyRef.current = false;

      renderer.resize(
        canvas.clientWidth,
        canvas.clientHeight,
        run.params.renderScale
      );
      const pair = pairRef.current;
      if (!pair) {
        renderer.clear();
        return;
      }
      const p = run.params;
      const t = easingFns[p.easing](
        clamp01(progressRef.current)
      );

      try {
        // Fourier だけは中間像を CPU で作ってから流し込む
        if (p.kind === 'fourier') {
          const fe = fourierRef.current;
          const size =
            FourierSizes[p.fourSize] ?? FourierSizes[0];
          const t0 = performance.now();
          fe.prepare(
            pair.a.img,
            pair.b.img,
            size.w,
            size.h
          );
          const tAmp = clamp01(
            (t - p.fourAmpStart) /
              Math.max(
                p.fourAmpEnd - p.fourAmpStart,
                1e-3
              )
          );
          const tPhase = clamp01(
            (t - p.fourPhaseStart) /
              Math.max(
                p.fourPhaseEnd - p.fourPhaseStart,
                1e-3
              )
          );
          const data = fe.render(tAmp, tPhase);
          if (data) renderer.uploadDynamic(data);
          setFourierMs(performance.now() - t0);
        }

        renderer.render(
          pair.a,
          pair.b,
          pair.depthA,
          pair.depthB,
          t,
          p
        );
      } catch (e) {
        cancelAnimationFrame(raf);
        setStatus('error');
        setError(
          e instanceof Error ? e.message : String(e)
        );
      }
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.dispose();
      rendererRef.current = null;
      pairRef.current = null;
    };
  }, [syncProgressUi]);

  // --- A/B と depth の preload。decode() 完了まで一切描かない ---
  useEffect(() => {
    const renderer = rendererRef.current;
    if (!renderer) return;
    let cancelled = false;

    runRef.current.playing = false;
    setPlaying(false);
    progressRef.current = 0;
    syncProgressUi(0);
    dirtyRef.current = true;
    fourierRef.current.invalidate();

    const urlA = imageUrl(imgA, params.source);
    const urlB = imageUrl(imgB, params.source);
    const dUrlA = hasDepth(imgA) ? depthUrl(imgA) : null;
    const dUrlB = hasDepth(imgB) ? depthUrl(imgB) : null;

    const hitA = renderer.peekImage(urlA);
    const hitB = renderer.peekImage(urlB);
    const hitDA = dUrlA
      ? renderer.peekDepth(dUrlA)
      : null;
    const hitDB = dUrlB
      ? renderer.peekDepth(dUrlB)
      : null;
    if (
      hitA &&
      hitB &&
      (!dUrlA || hitDA) &&
      (!dUrlB || hitDB)
    ) {
      pairRef.current = {
        a: hitA,
        b: hitB,
        depthA: hitDA,
        depthB: hitDB,
      };
      setStatus('ready');
      return;
    }

    pairRef.current = null;
    setStatus('loading');

    Promise.all([
      renderer.ensureImage(urlA),
      renderer.ensureImage(urlB),
      dUrlA ? renderer.ensureDepth(dUrlA) : null,
      dUrlB ? renderer.ensureDepth(dUrlB) : null,
    ])
      .then(([a, b, da, db]) => {
        if (cancelled) return;
        pairRef.current = {
          a,
          b,
          depthA: da,
          depthB: db,
        };
        dirtyRef.current = true;
        setStatus('ready');
      })
      .catch((e) => {
        if (cancelled) return;
        setStatus('error');
        setError(
          e instanceof Error ? e.message : String(e)
        );
      });

    return () => {
      cancelled = true;
    };
  }, [imgA, imgB, params.source, syncProgressUi]);

  useEffect(() => {
    runRef.current.params = params;
    dirtyRef.current = true;
  }, [params]);

  const patch = useCallback((p: Partial<LabParams>) => {
    setParams((prev) => ({ ...prev, ...p }));
  }, []);

  const play = useCallback((fromZero: boolean) => {
    if (!pairRef.current) return;
    const run = runRef.current;
    const start = fromZero
      ? 0
      : progressRef.current >= 1
      ? 0
      : progressRef.current;
    progressRef.current = start;
    run.startedAt =
      performance.now() -
      start * Math.max(run.params.durationMs, 1);
    run.playing = true;
    setPlaying(true);
  }, []);

  const pause = useCallback(() => {
    runRef.current.playing = false;
    setPlaying(false);
  }, []);

  const seek = useCallback(
    (raw: number) => {
      runRef.current.playing = false;
      setPlaying(false);
      progressRef.current = clamp01(raw);
      syncProgressUi(progressRef.current);
      dirtyRef.current = true;
    },
    [syncProgressUi]
  );

  const swap = useCallback(() => {
    setImgA(imgB);
    setImgB(imgA);
  }, [imgA, imgB]);

  const prefetch = useCallback(
    (name: BackgroundImageName) => {
      const r = rendererRef.current;
      if (!r) return;
      r.ensureImage(imageUrl(name, params.source)).catch(
        () => undefined
      );
      if (hasDepth(name)) {
        r.ensureDepth(depthUrl(name)).catch(
          () => undefined
        );
      }
    },
    [params.source]
  );

  // キーボード: Space で再生, 矢印でスクラブ
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)
      ) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        if (runRef.current.playing) pause();
        else play(true);
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        seek(
          progressRef.current -
            (e.shiftKey ? 0.01 : 0.05)
        );
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        seek(
          progressRef.current +
            (e.shiftKey ? 0.01 : 0.05)
        );
      }
    };
    window.addEventListener('keydown', onKey);
    return () =>
      window.removeEventListener('keydown', onKey);
  }, [pause, play, seek]);

  const kindNote =
    TransitionKindList.find((k) => k.key === params.kind)
      ?.note ?? '';

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {status !== 'ready' ? (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="reader-block border-[1px] px-4 py-2 text-sm">
            {status === 'loading'
              ? '準備中 (画像を decode しています)'
              : `エラー: ${error ?? '不明'}`}
          </div>
        </div>
      ) : null}

      <div className="absolute top-2 left-2 flex flex-row items-center gap-2">
        <Link
          href="/lab"
          className="reader-block border-[1px] px-2 py-[0.1em] text-sm column-item"
        >
          ← 実験室
        </Link>
        <span className="reader-block border-[1px] px-2 py-[0.1em] text-sm">
          background transition
        </span>
      </div>

      <button
        className="absolute top-2 right-2 reader-block border-[1px] px-2 py-[0.1em] text-sm column-item"
        onClick={() => setPanelOpen((v) => !v)}
      >
        {panelOpen ? 'パネルを畳む' : 'パネルを開く'}
      </button>

      {panelOpen ? (
        <div className="absolute top-12 right-2 bottom-24 w-[26rem] max-w-[calc(100vw-1rem)] reader-block border-[1px] p-3 overflow-y-auto flex flex-col gap-4">
          <Section title="方式">
            <Seg
              options={TransitionKindList.map((k) => ({
                value: k.key,
                label: k.label,
              }))}
              value={params.kind}
              onChange={(v) =>
                patch({ kind: v as TransitionKind })
              }
            />
            <Note>{kindNote}</Note>
            {params.kind === 'depth' && !depthOk ? (
              <p className="text-xs border-[1px] px-2 py-1">
                この A/B には depth map がありません。
                サムネイルが明るく表示されている画像
                (現在 8 枚) を選んでください。
              </p>
            ) : null}
          </Section>

          <Section title="A / B">
            <div className="flex flex-row flex-wrap gap-1">
              {pairPresets.map((p) => (
                <button
                  key={p.label}
                  title={p.note}
                  className="border-[1px] column-item px-2 py-[0.1em] text-sm"
                  onClick={() => {
                    setImgA(p.a);
                    setImgB(p.b);
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <ImagePicker
              label="A"
              value={imgA}
              onChange={setImgA}
              onPrefetch={prefetch}
              markDepth={params.kind === 'depth'}
            />
            <ImagePicker
              label="B"
              value={imgB}
              onChange={setImgB}
              onPrefetch={prefetch}
              markDepth={params.kind === 'depth'}
            />
          </Section>

          <Section title="共通">
            <Slider
              label="duration"
              min={200}
              max={3000}
              step={50}
              value={params.durationMs}
              onChange={(v) => patch({ durationMs: v })}
              format={(v) => `${v}ms`}
            />
            <Seg
              label="easing"
              options={EasingList.map((e) => ({
                value: e,
                label: e,
              }))}
              value={params.easing}
              onChange={(v) =>
                patch({ easing: v as EasingKind })
              }
            />
            <Seg
              label="解像度"
              options={[
                { value: 'full', label: 'full' },
                { value: 'lofi', label: 'lofi' },
              ]}
              value={params.source}
              onChange={(v) =>
                patch({ source: v as 'full' | 'lofi' })
              }
            />
            <Slider
              label="render scale"
              min={0.4}
              max={1.5}
              step={0.1}
              value={params.renderScale}
              onChange={(v) => patch({ renderScale: v })}
              format={(v) => `${v.toFixed(1)}x`}
            />
          </Section>

          {params.kind === 'crossfade' ? (
            <Section title="Plain crossfade">
              <Check
                label="linear light"
                value={params.crossfadeLinearLight}
                onChange={(v) =>
                  patch({ crossfadeLinearLight: v })
                }
              />
              <Note>
                off が CSS の opacity crossfade 相当 (sRGB
                値の線形補間)。
              </Note>
            </Section>
          ) : null}

          {params.kind === 'freqsep' ? (
            <Section title="Frequency separation">
              <Slider
                label="blur 半径"
                min={1}
                max={80}
                step={1}
                value={params.freqSigma}
                onChange={(v) => patch({ freqSigma: v })}
                format={(v) => `${v.toFixed(0)}px`}
              />
              <Slider
                label="A 細部 消失"
                min={0.02}
                max={1}
                step={0.01}
                value={params.freqHiAEnd}
                onChange={(v) => patch({ freqHiAEnd: v })}
              />
              <Slider
                label="低周波 開始"
                min={0}
                max={1}
                step={0.01}
                value={params.freqLoStart}
                onChange={(v) =>
                  patch({ freqLoStart: v })
                }
              />
              <Slider
                label="低周波 終了"
                min={0}
                max={1}
                step={0.01}
                value={params.freqLoEnd}
                onChange={(v) => patch({ freqLoEnd: v })}
              />
              <Slider
                label="B 細部 開始"
                min={0}
                max={0.99}
                step={0.01}
                value={params.freqHiBStart}
                onChange={(v) =>
                  patch({ freqHiBStart: v })
                }
              />
              <Slider
                label="細部の強さ"
                min={0}
                max={2.5}
                step={0.05}
                value={params.freqHiGain}
                onChange={(v) => patch({ freqHiGain: v })}
              />
              <Check
                label="低周波を線形光で"
                value={params.freqLinearLow}
                onChange={(v) =>
                  patch({ freqLinearLow: v })
                }
              />
              <Seg
                label="表示"
                options={[
                  { value: 'result', label: '合成' },
                  { value: 'low', label: '低周波' },
                  { value: 'high', label: '高周波' },
                ]}
                value={params.freqView}
                onChange={(v) =>
                  patch({
                    freqView: v as LabParams['freqView'],
                  })
                }
              />
            </Section>
          ) : null}

          {params.kind === 'fourier' ? (
            <Section title="Fourier / Phase Morph">
              <Seg
                label="順序"
                options={[
                  { value: 'ampFirst', label: '振幅先行' },
                  {
                    value: 'phaseFirst',
                    label: '位相先行',
                  },
                  {
                    value: 'simultaneous',
                    label: '同時',
                  },
                ]}
                value={params.fourOrder}
                onChange={(v) =>
                  patch(
                    applyFourierOrder(v as FourierOrder)
                  )
                }
              />
              <Slider
                label="振幅 開始"
                min={0}
                max={1}
                step={0.01}
                value={params.fourAmpStart}
                onChange={(v) =>
                  patch({ fourAmpStart: v })
                }
              />
              <Slider
                label="振幅 終了"
                min={0}
                max={1}
                step={0.01}
                value={params.fourAmpEnd}
                onChange={(v) => patch({ fourAmpEnd: v })}
              />
              <Slider
                label="位相 開始"
                min={0}
                max={1}
                step={0.01}
                value={params.fourPhaseStart}
                onChange={(v) =>
                  patch({ fourPhaseStart: v })
                }
              />
              <Slider
                label="位相 終了"
                min={0}
                max={1}
                step={0.01}
                value={params.fourPhaseEnd}
                onChange={(v) =>
                  patch({ fourPhaseEnd: v })
                }
              />
              <Slider
                label="効果の強さ"
                min={0}
                max={1}
                step={0.01}
                value={params.fourStrength}
                onChange={(v) =>
                  patch({ fourStrength: v })
                }
              />
              <Slider
                label="端点を実画像へ"
                min={0}
                max={0.4}
                step={0.01}
                value={params.fourEdgeFade}
                onChange={(v) =>
                  patch({ fourEdgeFade: v })
                }
              />
              <Seg
                label="FFT 解像度"
                options={FourierSizes.map((s) => ({
                  value: s.value,
                  label: s.label,
                }))}
                value={params.fourSize}
                onChange={(v) => patch({ fourSize: v })}
              />
              <Note>
                中間像は CPU の FFT で毎フレーム作り直している
                (今 {fourierMs.toFixed(1)}ms/frame)。
                power of 2 に落として計算するので、両端以外は
                元画像より甘くなる。「効果の強さ」を 0 にすると
                plain crossfade に戻るので、差分を確認できる。
                「端点を実画像へ」は、両端だけ FFT 結果から実画像へ戻す幅。
                0 にすると t=0/1 でも FFT の解像度そのままの甘い絵になる。
              </Note>
            </Section>
          ) : null}

          {params.kind === 'palette' ? (
            <Section title="Palette Transport">
              <Slider
                label="色移し 開始"
                min={0}
                max={1}
                step={0.01}
                value={params.palStart}
                onChange={(v) => patch({ palStart: v })}
              />
              <Slider
                label="色移し 終了"
                min={0}
                max={1}
                step={0.01}
                value={params.palEnd}
                onChange={(v) => patch({ palEnd: v })}
              />
              <Slider
                label="構造 開始"
                min={0}
                max={1}
                step={0.01}
                value={params.palStructStart}
                onChange={(v) =>
                  patch({ palStructStart: v })
                }
              />
              <Slider
                label="構造 終了"
                min={0}
                max={1}
                step={0.01}
                value={params.palStructEnd}
                onChange={(v) =>
                  patch({ palStructEnd: v })
                }
              />
              <Slider
                label="明度の移し"
                min={0}
                max={1}
                step={0.01}
                value={params.palLuma}
                onChange={(v) => patch({ palLuma: v })}
              />
              <Slider
                label="彩度の移し"
                min={0}
                max={1}
                step={0.01}
                value={params.palChroma}
                onChange={(v) => patch({ palChroma: v })}
              />
              <Slider
                label="全体量"
                min={0}
                max={1}
                step={0.01}
                value={params.palAmount}
                onChange={(v) => patch({ palAmount: v })}
              />
              <Seg
                label="表示"
                options={[
                  { value: 'result', label: '合成' },
                  {
                    value: 'palette',
                    label: '色移しのみ',
                  },
                ]}
                value={params.palView}
                onChange={(v) =>
                  patch({
                    palView: v as LabParams['palView'],
                  })
                }
              />
              <Note>
                Oklab の平均と標準偏差を A から B へ寄せている。
                「色移しのみ」にすると構造遷移が止まるので、
                「A の構図 + B の色」だけを取り出して見られる。
              </Note>
            </Section>
          ) : null}

          {params.kind === 'depth' ? (
            <Section title="Depth Peel">
              <Check
                label="近景を先に"
                value={params.depthNearFirst}
                onChange={(v) =>
                  patch({ depthNearFirst: v })
                }
              />
              <Slider
                label="feather"
                min={0}
                max={0.6}
                step={0.005}
                value={params.depthFeather}
                onChange={(v) =>
                  patch({ depthFeather: v })
                }
              />
              <Slider
                label="進行カーブ"
                min={0.3}
                max={3}
                step={0.05}
                value={params.depthCurve}
                onChange={(v) => patch({ depthCurve: v })}
              />
              <Slider
                label="depth contrast"
                min={0.3}
                max={3}
                step={0.05}
                value={params.depthContrast}
                onChange={(v) =>
                  patch({ depthContrast: v })
                }
              />
              <Seg
                label="表示"
                options={[
                  { value: 'result', label: '合成' },
                  { value: 'depth', label: 'depth' },
                ]}
                value={params.depthView}
                onChange={(v) =>
                  patch({
                    depthView:
                      v as LabParams['depthView'],
                  })
                }
              />
              <Note>
                depth map は地平線 + 局所コントラストから
                オフラインで作った近似。白 = 近景、黒 = 遠景。
                ML による推定ではないので、細かい前後関係は正しくない。
              </Note>
            </Section>
          ) : null}

          {params.kind === 'edge' ? (
            <Section title="Edge Skeleton">
              <Slider
                label="輪郭しきい値"
                min={0}
                max={0.6}
                step={0.005}
                value={params.edgeThreshold}
                onChange={(v) =>
                  patch({ edgeThreshold: v })
                }
              />
              <Slider
                label="輪郭の太さ"
                min={1}
                max={40}
                step={0.5}
                value={params.edgeWidth}
                onChange={(v) => patch({ edgeWidth: v })}
                format={(v) => `${v.toFixed(1)}px`}
              />
              <Slider
                label="輪郭の粘り"
                min={0.3}
                max={4}
                step={0.05}
                value={params.edgePersistence}
                onChange={(v) =>
                  patch({ edgePersistence: v })
                }
              />
              <Slider
                label="feather"
                min={0}
                max={0.6}
                step={0.005}
                value={params.edgeFeather}
                onChange={(v) =>
                  patch({ edgeFeather: v })
                }
              />
              <Slider
                label="検出ゲイン"
                min={0.5}
                max={12}
                step={0.1}
                value={params.edgeGain}
                onChange={(v) => patch({ edgeGain: v })}
              />
              <Check
                label="B の輪郭も使う"
                value={params.edgeUseB}
                onChange={(v) => patch({ edgeUseB: v })}
              />
              <Seg
                label="表示"
                options={[
                  { value: 'result', label: '合成' },
                  { value: 'mask', label: '輪郭マスク' },
                ]}
                value={params.edgeView}
                onChange={(v) =>
                  patch({
                    edgeView: v as LabParams['edgeView'],
                  })
                }
              />
              <Note>
                Sobel を 2 つのスケールで取り、輪郭からの距離場を
                近似している。「輪郭の太さ」がその halo の広さ。
                B の輪郭も使うと、B 側の構造が先に居座る。
              </Note>
            </Section>
          ) : null}

          {params.kind === 'contour' ? (
            <Section title="Contour Flood">
              <Seg
                label="source"
                options={ContourSourceList}
                value={params.contourSource}
                onChange={(v) =>
                  patch({ contourSource: v })
                }
              />
              <Check
                label="明部を先に"
                value={params.contourLightFirst}
                onChange={(v) =>
                  patch({ contourLightFirst: v })
                }
              />
              <Slider
                label="feather"
                min={0}
                max={0.6}
                step={0.005}
                value={params.contourFeather}
                onChange={(v) =>
                  patch({ contourFeather: v })
                }
              />
              <Slider
                label="進行カーブ"
                min={0.3}
                max={3}
                step={0.05}
                value={params.contourCurve}
                onChange={(v) =>
                  patch({ contourCurve: v })
                }
              />
              <Slider
                label="ノイズ量"
                min={0}
                max={0.4}
                step={0.005}
                value={params.contourNoise}
                onChange={(v) =>
                  patch({ contourNoise: v })
                }
              />
              <Slider
                label="ノイズ細かさ"
                min={4}
                max={200}
                step={1}
                value={params.contourNoiseScale}
                onChange={(v) =>
                  patch({ contourNoiseScale: v })
                }
                format={(v) => v.toFixed(0)}
              />
              <Check
                label="分布で等化"
                value={params.contourEqualize}
                onChange={(v) =>
                  patch({ contourEqualize: v })
                }
              />
              <Seg
                label="表示"
                options={[
                  { value: 'result', label: '合成' },
                  { value: 'source', label: 'source' },
                ]}
                value={params.contourView}
                onChange={(v) =>
                  patch({
                    contourView:
                      v as LabParams['contourView'],
                  })
                }
              />
              <Note>
                ノイズは位置だけで決まるので、progress
                を戻せば必ず同じ絵になる。「分布で等化」は
                しきい値を輝度の分位点でたどるので、置き換わる面積が
                時間に対してほぼ一定になる (A/B 輝度のときだけ有効)。
              </Note>
            </Section>
          ) : null}

          <Section title="リセット">
            <button
              className="border-[1px] column-item px-2 py-[0.1em] text-sm self-start"
              onClick={() =>
                setParams((prev) => ({
                  ...defaultParams,
                  kind: prev.kind,
                }))
              }
            >
              パラメータを初期値へ
            </button>
          </Section>
        </div>
      ) : null}

      <div className="absolute bottom-2 left-2 right-2 reader-block border-[1px] p-2 flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2 flex-wrap text-sm">
          <button
            className="border-[1px] column-item px-2 py-[0.1em]"
            onClick={() => play(true)}
          >
            ⟲ replay
          </button>
          <button
            className="border-[1px] column-item px-2 py-[0.1em]"
            onClick={() =>
              playing ? pause() : play(false)
            }
          >
            {playing ? '⏸ pause' : '▶ play'}
          </button>
          <button
            className="border-[1px] column-item px-2 py-[0.1em]"
            onClick={swap}
          >
            ⇄ A/B 入れ替え
          </button>
          <span className="opacity-40">|</span>
          {[0, 0.25, 0.5, 0.75, 1].map((v) => (
            <button
              key={v}
              className="border-[1px] column-item px-2 py-[0.1em]"
              onClick={() => seek(v)}
            >
              {v}
            </button>
          ))}
          <span className="opacity-40">|</span>
          <span ref={readoutRef} className="opacity-90">
            t 0.000 → 0.000
          </span>
          <span className="opacity-50 text-xs">
            Space=replay / ←→=scrub (Shift で細かく)
          </span>
        </div>
        <input
          ref={scrubRef}
          className="w-full"
          type="range"
          min={0}
          max={1000}
          step={1}
          defaultValue={0}
          onChange={(e) =>
            seek(parseInt(e.target.value, 10) / 1000)
          }
        />
      </div>
    </div>
  );
};
