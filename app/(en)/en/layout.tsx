import type { Metadata } from "next";
import { getDictionary } from "../../i18n";
import "../../globals.css";

const copy = getDictionary("en");

export const metadata: Metadata = {
  title: copy.metadata.title,
  description: copy.metadata.description,
};

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
