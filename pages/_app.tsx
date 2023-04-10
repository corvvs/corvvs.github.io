import '@/styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const assetPrefix = process.env.assetPrefix || "";
  return <>
    <Head>
      <style>{`:root { --asset-prefix: "${assetPrefix}"; }`}</style>
      <style>{`
        @font-face {
          font-family: 'MaruMonica';
          src: url("${assetPrefix}/fonts/x12y16pxMaruMonica.ttf");
          font-weight: normal;
        }
      `}</style>
      <style>{`
        @font-face {
          font-family: 'MaruMonica';
          src: url("${assetPrefix}/fonts/x12y16pxMaruMonica.ttf");
          font-weight: bold;
        }
      `}</style>
    </Head>  
    <Component {...pageProps} />
  </>
}
