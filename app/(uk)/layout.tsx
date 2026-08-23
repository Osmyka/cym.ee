import type { Metadata } from "next";
import { getDictionary } from "../i18n";
import "../globals.css";

const copy = getDictionary("uk");

export const metadata: Metadata = {
  title: copy.metadata.title,
  description: copy.metadata.description,
};

export default function UkrainianLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="uk"><body>{children}</body></html>;
}
