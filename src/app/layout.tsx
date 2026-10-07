import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dietetyka Jagoda - Biochemiczna Harmonia",
  description: "Biochemiczna harmonia. Przeciwzapalna równowaga. Twój indywidualny protokół zdrowia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
