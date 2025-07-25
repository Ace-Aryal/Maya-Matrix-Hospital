import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MaxWidth from "@/components//templates/max-width";
import Navbar from "@/components/organisms/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mayamatrix Hospital",
    template: " %s | Mayamatrix Hospital",
  },
  description: "Serving the citizens for 25 years",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />

        <main className="min-h-[calc(100vh-56px-1px)] min-w-full flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
