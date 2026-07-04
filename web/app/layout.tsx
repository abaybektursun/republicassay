import type { Metadata } from "next";
import { ViewTransition } from "react";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Republic Assay — Transparency for the Republic",
  description:
    "A public initiative strengthening the American Republic by opening the AI models entering public life to the people — and measuring them against American values.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <ViewTransition enter="page-in" exit="page-out">
          <div className="flex min-h-screen flex-col">{children}</div>
        </ViewTransition>
      </body>
    </html>
  );
}
