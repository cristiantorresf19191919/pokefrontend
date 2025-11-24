import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "@/lib/apollo/ApolloWrapper";
import { ThemeRegistry } from "@/lib/theme/ThemeRegistry";
import { LoadingProvider } from "@/lib/loading/LoadingProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Pokédex | Complete Pokemon Collection',
    template: '%s | Pokédex',
  },
  description: 'Browse and explore the complete collection of Pokemon with detailed information about abilities, moves, and forms. Your ultimate Pokédex experience.',
  keywords: ['Pokemon', 'Pokédex', 'Pokedex', 'Pokemon collection', 'Pokemon database', 'Pokemon abilities', 'Pokemon moves'],
  authors: [{ name: 'Pokédex Team' }],
  creator: 'Pokédex Team',
  publisher: 'Pokédex',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Pokédex',
    title: 'Pokédex | Complete Pokemon Collection',
    description: 'Browse and explore the complete collection of Pokemon with detailed information about abilities, moves, and forms.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Pokédex - Complete Pokemon Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pokédex | Complete Pokemon Collection',
    description: 'Browse and explore the complete collection of Pokemon with detailed information.',
    images: ['/og-image.png'],
    creator: '@pokedex',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0a0a0f" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ApolloWrapper>
          <ThemeRegistry>
            <LoadingProvider>
              {children}
            </LoadingProvider>
          </ThemeRegistry>
        </ApolloWrapper>
      </body>
    </html>
  );
}
