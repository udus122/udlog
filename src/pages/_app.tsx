import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "@next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="flex min-h-screen flex-col bg-gray-800">
      <Component {...pageProps} />
      <style jsx global>
        {`
          :root {
            --font-inter: ${inter.style.fontFamily};
          }
        `}
      </style>
    </main>
  );
}
