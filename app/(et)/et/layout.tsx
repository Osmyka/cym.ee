import type { Metadata } from "next";
import { getDictionary } from "../../i18n";
import "../../globals.css";

const copy = getDictionary("et");

export const metadata: Metadata = {
  title: copy.metadata.title,
  description: copy.metadata.description,
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function EstonianLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="et"><body>{children}</body></html>;
}
