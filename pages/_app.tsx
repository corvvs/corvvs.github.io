import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import ShadowImageBox from '@/components/ShadowImageBox'
import { GoogleAnalytics } from '../components/gtag'

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <ShadowImageBox />
    <GoogleAnalytics />
    <Component {...pageProps} />
  </>
}
