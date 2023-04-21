import Script from "next/script"

export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''

// IDが取得できない場合を想定する
export const existsGaId = GA_ID !== ''

// PVを測定する
export const pageview = (path : string) => {
  (window as any).gtag('config', GA_ID, {
    page_path: path,
  })
}

// GAイベントを発火させる
export const event = (props:{
  action: string, category: string, label: string, value?: string}
) => {
  if (!existsGaId) {
    return
  }
  const { action, category, label, value } = props;
  (window as any).gtag('event', action, {
    event_category: category,
    event_label: JSON.stringify(label),
    value: value || "",
  })
}

export const GoogleAnalytics = () => {
  console.log(existsGaId, GA_ID);
  if (!existsGaId) { return null; }
  return <>
    <Script defer src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
    <Script id="ga" defer strategy="afterInteractive">
      {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());    
          gtag('config', '${GA_ID}');
      `}
    </Script>
  </>;
}
