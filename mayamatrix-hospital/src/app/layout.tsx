import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/organisms/navbar";
import { Toaster } from "sonner";
import Providers from "@/components/templates/providers";

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
    template: "%s | Mayamatrix Hospital",
  },
  description: "Serving the citizens for 25 years",
  // open graph to make our app link look good when shared in the internet
  openGraph: {
    title: "Mayamatrix Hospital",
    description: "Serving the citizens for 25 years",
    images: [
      {
        url: "/mayamatrix.jpg",
        alt: "Mayamatrix Hospital",
      },
    ],
  },
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
        <Providers>
          <Toaster richColors position="top-center" />
          <Navbar />
          <main className="min-h-[calc(100vh-56px-1px)] min-w-full flex flex-col">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
