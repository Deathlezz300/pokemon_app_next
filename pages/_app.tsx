import '@/styles/index.css';
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react';
import { darktheme } from '@/themes/darktheme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={darktheme}>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}
