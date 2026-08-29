import Layout from "@/components/Layout";
import { BackdropFilterTuner, TestingArea, TextPropertiesTuner, styleSettingAtoms } from "@/components/lab";
import { useAtom } from "jotai";
import Link from "next/link";

const LabContent = () => {
  const [blur] = useAtom(styleSettingAtoms.backdrop.blur);
  const [brightness] = useAtom(styleSettingAtoms.backdrop.brightness);
  const [grayscale] = useAtom(styleSettingAtoms.backdrop.grayscale);
  const [hue] = useAtom(styleSettingAtoms.backdrop.hue);
  const [saturate] = useAtom(styleSettingAtoms.backdrop.saturate);

  return (
    <div
      className='reader-block min-h-[30vh] flex flex-col border-[0.1em] gap-8 p-8'
      style={{
        backdropFilter: `blur(${blur}px) brightness(${brightness}%) grayscale(${grayscale}%) hue-rotate(${hue}deg) saturate(${saturate}%)`,
      }}
    >

      <div className="flex flex-col gap-2">
        <h3 className='bio-sub-header pb-2'>実験ページ</h3>
        <Link className="column-item border-[1px] px-2 py-[0.1em] self-start" href="/lab/background-transition">
          背景写真トランジション
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        <BackdropFilterTuner />
      </div>

      <div className="flex flex-col gap-4">
        <TextPropertiesTuner />
      </div>

      <div className="flex flex-col gap-4">
        <TestingArea />
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
