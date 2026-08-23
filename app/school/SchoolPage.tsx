import Header from "../Header";
import { getDictionary, localizedPath, type Locale } from "../i18n";
import SchoolRegistration from "./SchoolRegistration";

const schoolPhotos = [
  "/assets/school-new-01.jpeg", "/assets/school-new-02.jpeg", "/assets/school-new-03.jpeg",
  "/assets/school-new-04.webp", "/assets/school-new-05.jpeg", "/assets/school-new-06.jpeg",
  "/assets/school-new-07.jpeg", "/assets/school-new-08.jpeg", "/assets/school-new-09.webp",
  "/assets/school-new-10.webp", "/assets/school-new-12.jpeg", "/assets/school-new-13.jpeg",
  "/assets/school-new-14.webp", "/assets/school-new-15.jpeg", "/assets/school-05-writing.webp",
];

export default function SchoolPage({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const copy = dictionary.school;

  return <main lang={locale}>
    <Header locale={locale} currentPath="/school" />
    <section className="detail-hero school-hero">
      <div><p className="kicker"><span />{copy.kicker}</p><h1>{copy.title[0]}<br />{copy.title[1]}<br /><em>{copy.title[2]}</em></h1><p>{copy.description}</p></div>
      <img src="/assets/school-team.webp" alt={copy.heroAlt} />
    </section>
    <section className="detail-body">
      <div><div className="section-label">{copy.sectionLabel}</div><h2>{copy.sectionTitle[0]}<br /><i>{copy.sectionTitle[1]}</i></h2></div>
      <div className="detail-copy">
        <ul className="feature-list">{copy.subjects.map((subject) => <li key={subject}>{subject}</li>)}</ul>
        <div className="info-panel">
          <div><small>{copy.info.ageLabel}</small><strong>{copy.info.ageValue}</strong></div>
          <div><small>{copy.info.timeLabel}</small><strong>{copy.info.timeValue}</strong></div>
          <div><small>{copy.info.placeLabel}</small><a className="map-address" href="https://www.google.com/maps/search/?api=1&query=Manee%C5%BEi+3+Tallinn" target="_blank" rel="noreferrer"><strong>Maneeži 3 ↗</strong></a></div>
          <div><small>{copy.info.priceLabel}</small><strong>{copy.info.priceValue}</strong></div>
        </div>
        <SchoolRegistration copy={copy.registration} />
      </div>
    </section>
    <section className="detail-gallery school-gallery">{schoolPhotos.map((photo, index) => <img key={photo} src={photo} alt={`${copy.galleryAlt} ${index + 1}`} loading="lazy" decoding="async" />)}</section>
    <footer><span>© {new Date().getFullYear()} {dictionary.common.copyright}</span><a href={localizedPath(locale)}>{dictionary.common.home}</a></footer>
  </main>;
}
