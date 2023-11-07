import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";
import { NextProviders } from "./Providers/NextUI";

const inter = Inter({ subsets: ["latin"] });

import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Welcome - VModel - Discover, Connect, and Collaborate with Brands",
  description: "Discover, Connect, and Collaborate with Brands",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader color="#7a5555" />
        <NextProviders>
          <ReduxProvider>{children}</ReduxProvider>
        </NextProviders>
      </body>
    </html>
  );
}
