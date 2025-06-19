import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from 'next/font/google';
import { ThemeProviderWrapper } from "@/theme/ThemeProviderWrapper";
import Header from "@/components/shared/Header";

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: "Delicius Delivery",
  description: "aplicativo de pedidos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={nunito.className}>
        <ThemeProviderWrapper>
          <Header address="Rua do Centro, 111"/>
          {children}
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}

