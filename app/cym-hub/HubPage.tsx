import Header from "../Header";
import { getDictionary, localizedPath, type Locale } from "../i18n";
import HubRegistration from "./HubRegistration";

const mapUrl = "https://www.google.com/maps/search/?api=1&query=Manee%C5%BEi+3+Tallinn";

function Lines({ value }: { value: string }) {
  const lines = value.split("\n");
  return <>{lines.map((line, index) => <span key={`${line}-${index}`}>{line}{index < lines.length - 1 && <br />}</span>)}</>;
}

export default function HubPage({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const copy = dictionary.hub;

  return <main lang={locale}>
    <Header locale={locale} currentPath="/cym-hub" />
    <section className="detail-hero hub-hero">
      <div>
        <p className="kicker"><span />{copy.kicker}</p>
        <h1>{copy.title[0]}<br /><em>{copy.title[1]}<br />{copy.title[2]}</em></h1>
        <p>{copy.description}</p>
      </div>
      <img src="/assets/cym-hub-hero.webp" alt={copy.heroAlt} />
    </section>
    <section className="detail-body">
      <div>
        <div className="section-label">{copy.sectionLabel}</div>
        <h2>{copy.sectionTitle[0]}<br /><i>{copy.sectionTitle[1]}</i></h2>
        <div className="school-about">{copy.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </div>
      <div className="detail-copy">
        <div className="info-panel hub-info">
          {copy.info.map((item) => <div key={item.label}>
            <small>{item.label}</small>
            <strong>{item.value}</strong>
            {item.note && <p className="info-note">{item.note}</p>}
            {item.address && <a className="map-address" href={mapUrl} target="_blank" rel="noreferrer">{item.address} ↗</a>}
          </div>)}
        </div>
        <HubRegistration copy={copy.registration} />
      </div>
    </section>
    <section className="hub-band section">
      <div className="section-label">{copy.optionsLabel}</div>
      <h2>{copy.optionsTitle[0]} <i>{copy.optionsTitle[1]}</i></h2>
      <div className="hub-option-grid">
        {copy.options.map((item) => <article className="hub-option" key={item.title}><div className="hub-kicker">{item.kicker}</div><h3>{item.title}</h3><p>{item.text}</p></article>)}
      </div>
    </section>
    <section className="hub-split section">
      <div>
        <div className="section-label">{copy.principlesLabel}</div>
        <h2>{copy.principlesTitle[0]}<br /><i>{copy.principlesTitle[1]}</i></h2>
        <p className="hub-intro">{copy.principlesIntro}</p>
      </div>
      <div className="hub-principle-list">
        {copy.principles.map((item, index) => <article className="hub-principle" key={item.title}><b>{String(index + 1).padStart(2, "0")}</b><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}
      </div>
    </section>
    <section className="hub-pricing">
      <div>
        <div className="section-label">{copy.pricingLabel}</div>
        <h2>{copy.pricingTitle[0]}<br /><i>{copy.pricingTitle[1]}</i></h2>
        <p className="hub-intro">{copy.pricingIntro}</p>
        <div className="hub-pricing-points">
          {copy.pricingPoints.map((item) => <article key={item.title}><strong>{item.title}</strong><p>{item.text}</p></article>)}
        </div>
      </div>
      <div className="hub-price-panel">
        <div className="section-label">{copy.pricingPanelTitle}</div>
        {copy.prices.map((item) => <div className="hub-price-row" key={item.label}><span>{item.label}</span><strong>{item.value}</strong></div>)}
        <p className="hub-price-foot"><Lines value={copy.pricingFoot} /></p>
      </div>
    </section>
    <section className="hub-split section">
      <div>
        <div className="section-label">{copy.teacherLabel}</div>
        <h2>{copy.teacherTitle[0]}<br /><i>{copy.teacherTitle[1]}</i></h2>
        <p className="hub-intro">{copy.teacherIntro}</p>
      </div>
      <article className="hub-teacher-card">
        <h3>{copy.teacherName}</h3>
        <p className="hub-role">{copy.teacherRole}</p>
        {copy.teacherBio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </article>
    </section>
    <section className="hub-band section">
      <div className="section-label">{copy.whyLabel}</div>
      <h2>{copy.whyTitle[0]}<br /><i>{copy.whyTitle[1]}</i></h2>
      <p className="hub-intro hub-why-intro">{copy.whyIntro}</p>
      <div className="hub-why-grid">
        {copy.why.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}
      </div>
    </section>
    <section className="hub-closing">
      <div className="section-label">{copy.closingLabel}</div>
      <h2>{copy.closingTitle[0]} <i>{copy.closingTitle[1]}</i></h2>
      <p>{copy.closingText}</p>
    </section>
    <footer><span>© {new Date().getFullYear()} {dictionary.common.copyright}</span><span className="footer-credit">{dictionary.common.madeBy} <a href="https://osmyka.com/" target="_blank" rel="noopener noreferrer">software studio Osmyka</a></span><a href={localizedPath(locale)}>{dictionary.common.home}</a></footer>
  </main>;
}
