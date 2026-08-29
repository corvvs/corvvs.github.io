import {
  CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  BackgroundImageName,
  BackgroundImageNames,
  useBackgroundImage,
} from '@/states/config';
import {
  isTiltShiftActive,
  lerpTiltShift,
  tiltShiftOf,
  useTiltShiftTable,
} from '@/states/tiltShift';
import {
  FreqSepParams,
  FreqSepRenderer,
  easeInOutSine,
} from './freqSep';
import { TiltShiftGuide } from './TiltShiftGuide';

// 背景の 3 層。
//   1. lofi  : 即座に描ける低解像度。hifi が来るまでの土台 (従来どおり)
//   2. hifi  : 実際に見せている画像
//   3. canvas: 切り替え中と、チルトシフトがかかっている間だけ不透明になる
//
// canvas を出すのは必要なときだけ。チルトシフトを設定していない画像では
// 従来どおり 1+2 だけが見えているし、WebGL2 が無い環境でも同じになる。
//
// 遷移は effect のクリーンアップで中断されないよう ref で駆動する。
// 実行中に別の画像が選ばれた場合は最新の 1 枚だけを覚えておき、
// 今の遷移が終わってからそこへ繋ぐ (途中で飛ばないので画が跳ねない)。

// チルトシフトの入り切りで canvas を出し入れするときの時間。
// ぼけ量 0 の canvas は下の CSS 層とほぼ同じ絵なので、
// 気持ち馴染ませる以上のことはしなくていい。
const tiltFadeMs = 140;

const hifiUrl = (n: BackgroundImageName) => `/bg/${n}`;
const lofiUrl = (n: BackgroundImageName) => `/bg/lofi_${n}`;

const coverStyle = (
  url: string | null
): CSSProperties => ({
  backgroundImage: url ? `url(${url})` : undefined,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
});

function neighbours(name: BackgroundImageName) {
  const i = BackgroundImageNames.indexOf(name);
  if (i < 0) return [];
  const n = BackgroundImageNames.length;
  return [
    BackgroundImageNames[(i + 1) % n],
    BackgroundImageNames[(i - 1 + n) % n],
  ];
}

export const BackgroundLayers = () => {
  const [backgroundImage] = useBackgroundImage();
  const [tiltTable] = useTiltShiftTable();
  const [displayed, setDisplayed] =
    useState<BackgroundImageName | null>(null);
  // 遷移が終わるたびに増やして、最新の backgroundImage を拾い直させる
  const [settleTick, setSettleTick] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<FreqSepRenderer | null>(null);
  const displayedRef =
    useRef<BackgroundImageName | null>(null);
  const runningRef = useRef(false);
  const rafRef = useRef(0);
  const stillRafRef = useRef(0);
  const timerRef = useRef(0);
  const mountedRef = useRef(true);
  const reduceMotionRef = useRef(false);
  // 遷移の開始時と静止画の描画時に読む。
  // 遷移の最中に変わった分は settle 後の描き直しで拾う。
  const tiltTableRef = useRef(tiltTable);

  useEffect(() => {
    tiltTableRef.current = tiltTable;
  }, [tiltTable]);

  const setDisplayedBoth = useCallback(
    (v: BackgroundImageName | null) => {
      displayedRef.current = v;
      setDisplayed(v);
    },
    []
  );

  const setCanvasOpaque = useCallback(
    (opaque: boolean, immediate = false) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.style.transition = immediate
        ? 'none'
        : `opacity ${tiltFadeMs}ms linear`;
      canvas.style.opacity = opaque ? '1' : '0';
    },
    []
  );

  // --- WebGL の用意 ---
  useEffect(() => {
    mountedRef.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    rendererRef.current = FreqSepRenderer.create(canvas);

    const mq = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );
    reduceMotionRef.current = mq.matches;
    const onChange = () => {
      reduceMotionRef.current = mq.matches;
    };
    mq.addEventListener('change', onChange);

    return () => {
      mountedRef.current = false;
      mq.removeEventListener('change', onChange);
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(stillRafRef.current);
      window.clearTimeout(timerRef.current);
      rendererRef.current?.dispose();
      rendererRef.current = null;
    };
  }, []);

  // --- 遷移していないときの 1 枚を描く ---
  // スライダーを掴んで動かすと値が細かく飛んでくるので、
  // 1 フレームに 1 回へまとめる。描く必要が無いときは canvas を引っ込める。
  const renderStill = useCallback(() => {
    cancelAnimationFrame(stillRafRef.current);
    stillRafRef.current = requestAnimationFrame(() => {
      if (!mountedRef.current || runningRef.current) return;
      const renderer = rendererRef.current;
      const name = displayedRef.current;
      if (!renderer || !name) {
        setCanvasOpaque(false);
        return;
      }
      const tilt = tiltShiftOf(tiltTableRef.current, name);
      if (!isTiltShiftActive(tilt)) {
        setCanvasOpaque(false);
        return;
      }
      renderer
        .ensureImage(hifiUrl(name))
        .then((img) => {
          if (!mountedRef.current || runningRef.current)
            return;
          // 待っている間に別の画像へ移っていたら捨てる
          if (displayedRef.current !== name) return;
          renderer.render(img, img, 0, tilt);
          setCanvasOpaque(true);
        })
        .catch(() => undefined);
    });
  }, [setCanvasOpaque]);

  // --- 画像が変わったら遷移する ---
  // クリーンアップを持たないので、実行中に再評価されても遷移は中断されない。
  useEffect(() => {
    if (runningRef.current) return;
    const next = backgroundImage;
    const prev = displayedRef.current;
    if (next === prev) return;

    const renderer = rendererRef.current;
    const canvas = canvasRef.current;
    // 初回表示 (prev が無い) と「背景なし」への出入りは従来どおり即差し替え
    const animate =
      !!renderer &&
      !!canvas &&
      !!prev &&
      !!next &&
      !reduceMotionRef.current;
    if (!animate) {
      // canvas に前の画像が残っていると、差し替えたはずの絵が隠れてしまう。
      // ここでは引っ込めておいて、必要なら renderStill が出し直す。
      setCanvasOpaque(false, true);
      setDisplayedBoth(next);
      return;
    }

    // 切り替えの前後でチルトシフトの設定は別物なので、遷移の間に繋ぐ。
    const table = tiltTableRef.current;
    const tiltPrev = tiltShiftOf(table, prev);
    const tiltNext = tiltShiftOf(table, next);

    const settle = () => {
      runningRef.current = false;
      if (mountedRef.current) {
        setSettleTick((t) => t + 1);
      }
    };

    runningRef.current = true;
    Promise.all([
      renderer.ensureImage(hifiUrl(prev)),
      renderer.ensureImage(hifiUrl(next)),
    ])
      .then(([a, b]) => {
        if (!mountedRef.current) return;

        // t=0 は prev そのもの = 今見えている絵。
        // ここで canvas を不透明にしても見た目は変わらない。
        renderer.render(a, b, 0, tiltPrev);
        canvas.style.transition = 'none';
        canvas.style.opacity = '1';

        const startedAt = performance.now();
        const step = () => {
          if (!mountedRef.current) return;
          const raw = Math.min(
            1,
            (performance.now() - startedAt) /
              FreqSepParams.durationMs
          );
          const t = easeInOutSine(raw);
          renderer.render(
            a,
            b,
            t,
            lerpTiltShift(tiltPrev, tiltNext, t)
          );
          if (raw < 1) {
            rafRef.current = requestAnimationFrame(step);
            return;
          }
          // t=1 の canvas は next そのもの。CSS 層を next に
          // 差し替えてから canvas を消すので引き渡しは見えない。
          setDisplayedBoth(next);
          if (isTiltShiftActive(tiltNext)) {
            // 引き渡す先が無いので canvas は出したままにする。
            // 下の CSS 層は素の next になるが、上に載っている
            // チルトシフト済みの next で隠れる。
            settle();
            return;
          }
          rafRef.current = requestAnimationFrame(() => {
            if (!mountedRef.current) return;
            canvas.style.transition = `opacity ${FreqSepParams.fadeOutMs}ms linear`;
            canvas.style.opacity = '0';
            timerRef.current = window.setTimeout(
              settle,
              FreqSepParams.fadeOutMs
            );
          });
        };
        rafRef.current = requestAnimationFrame(step);
      })
      .catch(() => {
        if (mountedRef.current) setDisplayedBoth(next);
        settle();
      });
  }, [
    backgroundImage,
    settleTick,
    setDisplayedBoth,
    setCanvasOpaque,
  ]);

  // --- 表示中の画像かチルトシフトの設定が変わったら描き直す ---
  useEffect(() => {
    renderStill();
  }, [displayed, tiltTable, settleTick, renderStill]);

  // --- 画面サイズが変わったら描き直す ---
  // canvas の描画バッファは CSS のサイズに自動では追随しない。
  useEffect(() => {
    const onResize = () => renderStill();
    window.addEventListener('resize', onResize);
    return () =>
      window.removeEventListener('resize', onResize);
  }, [renderStill]);

  // --- 落ち着いたら前後の画像を温めておく ---
  // 次の切り替えで decode 待ちが入らないようにするためのもの。
  // 帯域が惜しければこの effect ごと消してよい (遷移自体は動く)。
  useEffect(() => {
    if (runningRef.current || !displayed) return;
    const renderer = rendererRef.current;
    if (!renderer) return;
    const targets = neighbours(displayed)
      .map(hifiUrl)
      .filter((u) => !renderer.has(u));
    if (targets.length === 0) return;

    const idle =
      window.requestIdleCallback ??
      ((cb: () => void) => window.setTimeout(cb, 800));
    const handle = idle(() => {
      targets.forEach((u) =>
        renderer.ensureImage(u).catch(() => undefined)
      );
    });
    return () => {
      if (window.cancelIdleCallback) {
        window.cancelIdleCallback(handle as number);
      } else {
        window.clearTimeout(handle as number);
      }
    };
  }, [displayed, settleTick]);

  return (
    <>
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={coverStyle(
          displayed ? lofiUrl(displayed) : null
        )}
        aria-hidden
      />
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={coverStyle(
          displayed ? hifiUrl(displayed) : null
        )}
        aria-hidden
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 w-full h-full block pointer-events-none"
        style={{ opacity: 0 }}
        aria-hidden
      />
      <TiltShiftGuide
        params={tiltShiftOf(tiltTable, displayed)}
      />
    </>
  );
};
