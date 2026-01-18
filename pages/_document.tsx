import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className="loading">
      <Head>
        {/* FOUC対策: 最優先で読み込まれるインラインスタイル */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html.loading { visibility: hidden; }
              @font-face {
                font-family: 'MaruMonica';
                src: url("/fonts/x12y16pxMaruMonica.ttf");
                font-weight: normal;
                font-display: block;
              }
              @font-face {
                font-family: 'MaruMonica';
                src: url("/fonts/x12y16pxMaruMonica.ttf");
                font-weight: bold;
                font-display: block;
              }
            `,
          }}
        />
        {/* フォントのプリロード */}
        <link
          rel="preload"
          href="/fonts/x12y16pxMaruMonica.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.fonts.ready.then(function() {
                document.documentElement.classList.remove('loading');
              });
              // 安全策: 最大3秒で強制表示
              setTimeout(function() {
                document.documentElement.classList.remove('loading');
              }, 3000);
            `,
          }}
        />
      </body>
    </Html>
  )
}
