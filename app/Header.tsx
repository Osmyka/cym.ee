import { getDictionary, localeLabels, localizedPath, type Locale } from "./i18n";
import MobileNavigation, { type MobileNavId } from "./MobileNavigation";

export default function Header({ locale, currentPath = "/" }: { locale: Locale; currentPath?: string }) {
  const dictionary = getDictionary(locale);
  const { header, common } = dictionary;

  return (
    <header className="site-header">
      <a className="logo" href={localizedPath(locale)} aria-label={header.homeAria}>
        <img src="/assets/sum-logo-cropped.png" alt="" />
        <span><b>{common.brand[0]}</b><small>{common.brand[1]}</small></span>
      </a>
      <nav aria-label={header.navigationAria}>
        <a href={localizedPath(locale, "/#about")}>{header.about}</a>
        <a href={localizedPath(locale, "/#activities")}>{header.activities}</a>
        <a href={localizedPath(locale, "/merch")}>{header.merch}</a>
        <a href={localizedPath(locale, "/#gallery")}>{header.gallery}</a>
        <a href={localizedPath(locale, "/#contact")}>{header.contacts}</a>
      </nav>
      <div className="language-switcher" aria-label={common.languageLabel}>
        {(["uk", "et", "en"] as const).map((item) => (
          <a
            href={localizedPath(item, currentPath)}
            hrefLang={item}
            aria-current={item === locale ? "page" : undefined}
            className={item === locale ? "active" : undefined}
            key={item}
          >
            {localeLabels[item]}
          </a>
        ))}
      </div>
      <MobileNavigation
        currentPath={currentPath}
        ariaLabel={header.navigationAria}
        items={([
          ["about", "/#about", header.about],
          ["activities", "/#activities", header.activities],
          ["merch", "/merch", header.merch],
          ["gallery", "/#gallery", header.gallery],
          ["contact", "/#contact", header.contacts],
        ] satisfies [MobileNavId, string, string][]).map(([id, path, label]) => ({
          id,
          href: localizedPath(locale, path),
          label,
        }))}
      />
    </header>
  );
}
