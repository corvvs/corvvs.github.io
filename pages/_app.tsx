import '@/styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import ShadowImageBox from '@/components/ShadowImageBox'
import { GoogleAnalytics } from '../src/lib/gtag'

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <style>{`
        @font-face {
          font-family: 'MaruMonica';
          src: url("/fonts/x12y16pxMaruMonica.ttf");
          font-weight: normal;
        }
      `}</style>
      <style>{`
        @font-face {
          font-family: 'MaruMonica';
          src: url("/fonts/x12y16pxMaruMonica.ttf");
          font-weight: bold;
        }
      `}</style>

      <GoogleAnalytics />
    </Head>  
    <ShadowImageBox />
    <Component {...pageProps} />
  </>
}
