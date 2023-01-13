import type { AppProps } from "next/app";
import { Mulish } from "@next/font/google";
import { Toaster } from "react-hot-toast";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

import { CartProvider } from "../src/hooks/cart";
import { ProductProvider } from "../src/hooks/product";
import "../styles/globals.css";

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const localStoragePersister = createSyncStoragePersister({
  storage: typeof window === "undefined" ? undefined : window.localStorage,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${mulish.style.fontFamily};
        }
      `}</style>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: localStoragePersister }}
      >
        <CartProvider>
          <ProductProvider>
            <main className="md:bg-[#ebeded] min-h-screen text-black font-mulish">
              <Component {...pageProps} />
            </main>
            <Toaster />
          </ProductProvider>
        </CartProvider>
      </PersistQueryClientProvider>
    </>
  );
}
