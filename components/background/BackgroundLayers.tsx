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
  FreqSepParams,
  FreqSepRenderer,
  easeInOutSine,
} from './freqSep';

// 背景の 3 層。
//   1. lofi  : 即座に描ける低解像度。hifi が来るまでの土台 (従来どおり)
//   2. hifi  : 実際に見せている画像
//   3. canvas: 切り替え中だけ不透明になり、freq sep の遷移を描く
//
// canvas は遷移中しか出さないので、WebGL2 が無い環境では 1+2 だけが残り
// 従来と同じ「即座に差し替わる」挙動になる。
//
// 遷移は effect のクリーンアップで中断されないよう ref で駆動する。
// 実行中に別の画像が選ばれた場合は最新の 1 枚だけを覚えておき、
// 今の遷移が終わってからそこへ繋ぐ (途中で飛ばないので画が跳ねない)。

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
  const timerRef = useRef(0);
  const mountedRef = useRef(true);
  const reduceMotionRef = useRef(false);

  const setDisplayedBoth = useCallback(
    (v: BackgroundImageName | null) => {
      displayedRef.current = v;
      setDisplayed(v);
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
      window.clearTimeout(timerRef.current);
      rendererRef.current?.dispose();
      rendererRef.current = null;
    };
  }, []);

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
      setDisplayedBoth(next);
      return;
    }

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

        // t=0 は prev そのもの = 下の CSS 層と同じ絵。
        // ここで canvas を不透明にしても見た目は変わらない。
        renderer.render(a, b, 0);
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
          renderer.render(a, b, easeInOutSine(raw));
          if (raw < 1) {
            rafRef.current = requestAnimationFrame(step);
            return;
          }
          // t=1 の canvas は next そのもの。CSS 層を next に
          // 差し替えてから canvas を消すので引き渡しは見えない。
          setDisplayedBoth(next);
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
  }, [backgroundImage, settleTick, setDisplayedBoth]);

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
    </>
  );
};
