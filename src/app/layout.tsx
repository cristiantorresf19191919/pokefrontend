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
  title: "Pokedex | Pokemon Collection",
  description: "Browse and explore your favorite Pokemon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
