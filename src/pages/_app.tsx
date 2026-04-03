import type { AppProps } from "next/app";
import { Archivo } from "next/font/google";
import "@/styles/globals.css";
import SiteBackground from "@/components/layout/site-background";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={archivo.variable}>
      <SiteBackground>
        <Component {...pageProps} />
      </SiteBackground>
    </main>
  );
}