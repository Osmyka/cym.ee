import type { Metadata } from "next";
import { getDictionary } from "../../i18n";
import "../../globals.css";

const copy = getDictionary("et");

export const metadata: Metadata = {
  title: copy.metadata.title,
  description: copy.metadata.description,
};

export default function EstonianLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="et"><body>{children}</body></html>;
}
