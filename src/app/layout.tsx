import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, Inter, Archivo } from "next/font/google";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { ToastHost } from "@/components/toast/ToastHost";
import { QuoteBasketProvider } from "@/components/quote-basket/QuoteBasketContext";
import { QuoteBasketDrawer } from "@/components/quote-basket/QuoteBasketDrawer";
import styles from "./layout.module.css";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NextGen Solutions PNG",
  description:
    "Workforce solutions, workwear, safety, branding and operational supplies — Papua New Guinea.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${archivo.variable}`}
    >
      <body>
        <QuoteBasketProvider>
          <Header />
          <main className={styles.main}>{children}</main>
          <Footer />
          <QuoteBasketDrawer />
        </QuoteBasketProvider>
        <ToastHost />
      </body>
    </html>
  );
}
