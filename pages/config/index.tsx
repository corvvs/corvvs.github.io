import Layout from "@/components/Layout";
import { ChangeBackgroundImage } from "@/components/config/ChangeBackgroundImage";

export default function Config() {
  return (
  <Layout>
    <div className='flex flex-col backdrop-blur-sm border-[0.1em] gap-8 p-8'>
      <div className="flex flex-col gap-2">
        <h3 className='bio-sub-header'>背景画像</h3>
        <ChangeBackgroundImage />
      </div>
    </div>
  </Layout>
  );
}
