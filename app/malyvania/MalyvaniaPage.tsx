import Header from "../Header";
import { getDictionary, localizedPath, type Locale } from "../i18n";
import DrawingRegistration from "./DrawingRegistration";

export default function MalyvaniaPage({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const copy = dictionary.drawing;

  return <main lang={locale}>
    <Header locale={locale} currentPath="/malyvania" />
    <section className="detail-hero drawing-hero">
      <div>
        <p className="kicker"><span />{copy.kicker}</p>
        <h1>{copy.title[0]}<br /><em>{copy.title[1]}</em></h1>
        <p>{copy.description}</p>
      </div>
    </section>
    <section className="detail-body">
      <div>
        <div className="section-label">{copy.sectionLabel}</div>
        <h2>{copy.sectionTitle[0]}<br /><i>{copy.sectionTitle[1]}</i></h2>
        <p className="drawing-lead">{copy.sectionText}</p>
      </div>
      <div className="detail-copy">
        <div className="drawing-highlights">
          {copy.highlights.map((item, index) => <p key={item}><b>{String(index + 1).padStart(2, "0")}</b>{item}</p>)}
        </div>
        <div className="info-panel drawing-info">
          {copy.info.map((item) => <div key={item.label}><small>{item.label}</small><strong>{item.value}</strong></div>)}
        </div>
        <DrawingRegistration copy={copy.registration} locale={locale} />
      </div>
    </section>
    <section className="drawing-teacher">
      <div className="section-label">{copy.teacherLabel}</div>
      <div>
        <h2>{copy.teacherTitle[0]}<br /><i>{copy.teacherTitle[1]}</i></h2>
        <p className="drawing-role">{copy.teacherRole}</p>
        {copy.teacherBio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </section>
    <section className="drawing-ending">
      <p className="section-label">{copy.closingLabel}</p>
      <h2>{copy.closingTitle[0]}<br /><i>{copy.closingTitle[1]}</i></h2>
      <p>{copy.closingText}</p>
    </section>
    <footer><span>© {new Date().getFullYear()} {dictionary.common.copyright}</span><span className="footer-credit">{dictionary.common.madeBy} <a href="https://osmyka.com/" target="_blank" rel="noopener noreferrer">software studio Osmyka</a></span><a href={localizedPath(locale)}>{dictionary.common.home}</a></footer>
  </main>;
}
