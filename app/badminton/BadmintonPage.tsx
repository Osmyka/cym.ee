import Header from "../Header";
import { getDictionary, localizedPath, type Locale } from "../i18n";
import BadmintonRegistration from "./BadmintonRegistration";

const galleryImages = [
  "/assets/badminton-07-action.webp",
  "/assets/badminton-08-group.jpeg",
  "/assets/badminton-02-action.webp",
  "/assets/badminton-new-01.webp",
  "/assets/badminton-new-02.jpeg",
  "/assets/badminton-new-03.jpeg",
  "/assets/badminton-new-04.webp",
  "/assets/badminton-new-05.webp",
  "/assets/badminton-new-06.webp",
];

function Lines({ value }: { value: string }) {
  const lines = value.split("\n");
  return <>{lines.map((line, index) => <span key={`${line}-${index}`}>{line}{index < lines.length - 1 && <br />}</span>)}</>;
}

export default function BadmintonPage({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const copy = dictionary.badminton;

  return <main lang={locale}>
    <Header locale={locale} currentPath="/badminton" />
    <section className="detail-hero badminton-hero"><div><p className="kicker"><span />{copy.kicker}</p><h1>{copy.title[0]}<br /><em>{copy.title[1]}</em></h1><p>{copy.description}</p></div><img src="/assets/badminton-team-clean.webp" alt={copy.heroAlt} /></section>
    <section className="detail-body"><div><div className="section-label">{copy.sectionLabel}</div><h2>{copy.sectionTitle[0]}<br /><i>{copy.sectionTitle[1]}</i></h2></div><div className="detail-copy">
      <div className="info-panel badminton-info">
        {copy.info.map((item, index) => <div key={item.label}><small>{item.label}</small>{index === 2 ? <a className="map-address" href="https://www.google.com/maps/search/?api=1&query=Golden+Club+S%C3%B5jakooli+tn+10+11316+Tallinn" target="_blank" rel="noreferrer"><strong><Lines value={item.value} /> ↗</strong></a> : <strong><Lines value={item.value} /></strong>}</div>)}
      </div>
      <BadmintonRegistration copy={copy.registration} />
    </div></section>
    <section className="detail-gallery badminton-gallery">{galleryImages.map((image, index) => <img src={image} alt={copy.galleryAlts[index]} loading="lazy" decoding="async" key={image} />)}</section>
    <footer><span>© {new Date().getFullYear()} {dictionary.common.copyright}</span><a href={localizedPath(locale)}>{dictionary.common.home}</a></footer>
  </main>;
}
