import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Mulish } from "@next/font/google";
import { Toaster } from "react-hot-toast";

import { CartProvider } from "../src/hooks/cart";

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${mulish.style.fontFamily};
        }
      `}</style>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
      <Toaster />
    </>
  );
}
