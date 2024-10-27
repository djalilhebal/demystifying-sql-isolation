import type { Metadata } from "next";

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
      <body>
        {children}
      </body>
    </html>
  );
}
