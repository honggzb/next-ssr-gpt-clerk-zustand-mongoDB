import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";
import CustomLayout from '../custom-layout'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My GPT - local",
  description: "An AI GPT of next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <CustomLayout>{children}</CustomLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}
