import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "СУМ в Естонії — Разом сильніші",
  description: "Спілка української молоді в Естонії: освіта, культура, спорт і спільнота.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
