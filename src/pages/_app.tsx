import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PlayersStoreProvider } from "@/providers/players-store-provider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const queryClient = new QueryClient();
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <PlayersStoreProvider>
      <SessionProvider session={session}>
        <NextThemesProvider>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <ToastContainer />
          </QueryClientProvider>
        </NextThemesProvider>
      </SessionProvider>
    </PlayersStoreProvider>
  );
}
