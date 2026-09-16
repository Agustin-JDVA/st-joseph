import type { Metadata } from "next";
import { Wix_Madefor_Display } from "next/font/google";
import "./globals.css";

const wix = Wix_Madefor_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-wix",
});

export const metadata: Metadata = {
  title: "St. JOSEPH",
  description: "Presentación del proyecto St. JOSEPH",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={wix.variable}>
        {children}
      </body>
    </html>
  );
}