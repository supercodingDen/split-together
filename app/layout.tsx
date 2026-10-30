import type { Metadata } from "next";
import "./style.css";
import "./redesign.css";

export const metadata: Metadata = {
  title: "Split Together · Group expenses",
  description: "Collect receipts privately, split shared expenses, and settle with a clear breakdown.",
  referrer: "no-referrer",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
