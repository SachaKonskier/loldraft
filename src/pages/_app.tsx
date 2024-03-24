import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider as NextThemesProvider } from "next-themes"

export default function App({ Component, pageProps }: AppProps) {
  return <NextThemesProvider><Component {...pageProps} /></NextThemesProvider>
}
