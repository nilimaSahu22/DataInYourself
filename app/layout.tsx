import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import ConditionalLayout from "./components/layout/ConditionalLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"], 
});

export const metadata: Metadata = {
  title: "DataInYourself",
  icons: {
    // Standard favicon sizes
    icon: [
      {
        url: '/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/favicon/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
    // Apple Touch Icons for iOS devices
    apple: [
      {
        url: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    // Android Chrome icons
    other: [
      {
        rel: 'icon',
        url: '/favicon/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        rel: 'icon',
        url: '/favicon/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        rel: 'mask-icon',
        url: '/favicon/android-chrome-192x192.png',
        color: '#FFA500',
      },
    ],
  },
  manifest: '/favicon/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'DataInYourself',
  },
  openGraph: {
    title: "DataInYourself - Data Science & IT Training",
    description: "Data In Yourself by Rudriva Technology is India's number one computer training platform, offering industry-leading courses in data science, analytics, business intelligence, programming, and IT skills. Learn from top industry experts, earn recognized certifications, and advance your career with our comprehensive, hands-on curriculum. Join thousands of successful students who have transformed their futures with Data In Yourself.",
    url: 'https://datainyourself.com',
    siteName: 'Data In Yourself',
    images: [
      {
        url: 'https://datainyourself.com/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Data In Yourself - India\'s Premier Computer Training Platform',
      },
    ],
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: "DataInYourself - Data Science & IT Training",
    description: "Data In Yourself by Rudriva Technology is India's number one computer training platform, offering industry-leading courses in data science, analytics, business intelligence, programming, and IT skills. Learn from top industry experts, earn recognized certifications, and advance your career with our comprehensive, hands-on curriculum. Join thousands of successful students who have transformed their futures with Data In Yourself.",
    images: ['https://datainyourself.com/images/og-image.png'],
    site: '@datainyourself',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#FFA500',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
