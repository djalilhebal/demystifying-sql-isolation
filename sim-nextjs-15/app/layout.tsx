import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const medievalSharp = localFont({
  src: "./fonts/MedievalSharp-Regular.ttf",
  variable: "--font-medieval-sharp",
});

export const metadata: Metadata = {
  title: "Demystifying SQL Isolation",
  description: "The tortoise and the hare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${medievalSharp.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
