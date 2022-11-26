import '../tailwind.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import tw, { GlobalStyles } from 'twin.macro';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" href="/favicon.svg" />
        <title>Web Virtual Cloud</title>
      </Head>
      <Script>
        {`
          if (!('theme' in localStorage)) {
            localStorage.setItem('theme', 'system')
          }
    
          if (localStorage.getItem('theme') === 'system') {
            document.documentElement.setAttribute(
              'data-theme',
              window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
            )
          } else {
            document.documentElement.setAttribute(
              'data-theme',
              localStorage.getItem('theme')
            )
          }
    
          window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(event) {
            const newColorScheme = event.matches ? 'dark' : 'light'
            localStorage.setItem('theme', newColorScheme)
            document.documentElement.setAttribute('data-theme', newColorScheme)
          });
        `}
      </Script>
      <div css={tw`flex flex-col min-h-screen`}>
        <GlobalStyles />
        <div css={tw`flex-1 w-full max-w-3xl p-4 mx-auto space-y-12`}>
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}