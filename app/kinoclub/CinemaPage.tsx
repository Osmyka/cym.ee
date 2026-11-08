import Header from "../Header";
import { getDictionary, localizedPath, type Locale } from "../i18n";
import CinemaRegistration from "./CinemaRegistration";

export default function CinemaPage({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const copy = dictionary.cinema;

  return <main lang={locale}>
    <Header locale={locale} currentPath="/kinoclub" />
    <section className="detail-hero cinema-hero">
      <div>
        <p className="kicker"><span />{copy.kicker}</p>
        <h1>{copy.title[0]}<br /><em>{copy.title[1]}</em></h1>
        <p>{copy.description}</p>
      </div>
      <div className="cinema-art" aria-hidden="true">
        <div className="cinema-film">
          <span>{copy.badge.mark}</span>
          <b>▶</b>
          <small>{copy.badge.caption}</small>
        </div>
        <div className="cinema-stamp">{copy.badge.stamp[0]}<br />{copy.badge.stamp[1]}</div>
      </div>
    </section>
    <section className="detail-body cinema-body">
      <div>
        <div className="section-label">{copy.sectionLabel}</div>
        <h2>{copy.sectionTitle[0]}<br /><i>{copy.sectionTitle[1]}</i></h2>
        <p className="cinema-lead">{copy.sectionText}</p>
      </div>
      <div className="detail-copy">
        <div className="info-panel cinema-info">
          {copy.info.map((item) => <div key={item.label}><small>{item.label}</small><strong>{item.value}</strong></div>)}
        </div>
        <CinemaRegistration copy={copy.registration} locale={locale} />
      </div>
    </section>
    <section className="cinema-ending">
      <p className="section-label">{copy.closingLabel}</p>
      <h2>{copy.closingTitle[0]}<br /><i>{copy.closingTitle[1]}</i></h2>
      <p>{copy.closingText}</p>
    </section>
    <footer><span>© {new Date().getFullYear()} {dictionary.common.copyright}</span><span className="footer-credit">{dictionary.common.madeBy} <a href="https://osmyka.com/" target="_blank" rel="noopener noreferrer">software studio Osmyka</a></span><a href={localizedPath(locale)}>{dictionary.common.home}</a></footer>
  </main>;
}
