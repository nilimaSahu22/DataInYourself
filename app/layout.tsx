import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"], 
});

export const metadata: Metadata = {
  title: "Data In Yourself",
  description: "India's number one computer training platform",
  icons: {
    // Standard favicon sizes
    icon: [
      {
        url: '/icon_assets/diy.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/icon_assets/diy.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/icon_assets/diy.png',
        sizes: '48x48',
        type: 'image/png',
      },
    ],
    // Apple Touch Icons for iOS devices
    apple: [
      {
        url: '/icon_assets/diy.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    // Android Chrome icons
    other: [
      {
        rel: 'icon',
        url: '/icon_assets/diy.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        rel: 'icon',
        url: '/icon_assets/diy.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        rel: 'mask-icon',
        url: '/icon_assets/diy.png',
        color: '#FFA500',
      },
    ],
  },
  // Additional metadata for better favicon support
  manifest: '/manifest.json',
  themeColor: '#FFA500',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'DataInYourself',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
