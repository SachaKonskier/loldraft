import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (

      <SessionProvider session={session}>
        <NextThemesProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          </QueryClientProvider>
        </NextThemesProvider>
      </SessionProvider>
   
  );
}
