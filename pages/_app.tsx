import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Mulish } from "@next/font/google";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";

import { CartProvider } from "../src/hooks/cart";
import { ProductProvider } from "../src/hooks/product";

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${mulish.style.fontFamily};
        }
      `}</style>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <ProductProvider>
            <main className="md:bg-[#ebeded] min-h-screen text-black font-mulish">
              <Component {...pageProps} />
            </main>
            <Toaster />
          </ProductProvider>
        </CartProvider>
      </QueryClientProvider>
    </>
  );
}
