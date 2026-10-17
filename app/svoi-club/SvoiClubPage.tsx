import Header from "../Header";
import { getDictionary, localizedPath, type Locale } from "../i18n";
import SvoiClubRegistration from "./SvoiClubRegistration";

const mapUrl = "https://www.google.com/maps/search/?api=1&query=Manee%C5%BEi+3+Tallinn";

function Lines({ value }: { value: string }) {
  const lines = value.split("\n");
  return <>{lines.map((line, index) => <span key={`${line}-${index}`}>{line}{index < lines.length - 1 && <br />}</span>)}</>;
}

export default function SvoiClubPage({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const copy = dictionary.svoi;

  return <main lang={locale}>
    <Header locale={locale} currentPath="/svoi-club" />
    <section className="detail-hero svoi-hero">
      <div>
        <p className="kicker"><span />{copy.kicker}</p>
        <h1>{copy.title[0]}<br /><em>{copy.title[1]}<br />{copy.title[2]}</em></h1>
        <p>{copy.description}</p>
      </div>
      <img src="/assets/svoi-club-hero.webp" alt={copy.heroAlt} />
    </section>
    <section className="detail-body">
      <div>
        <div className="section-label">{copy.sectionLabel}</div>
        <h2>{copy.sectionTitle[0]}<br /><i>{copy.sectionTitle[1]}</i></h2>
        <div className="school-about"><p>{copy.sectionText}</p></div>
      </div>
      <div className="detail-copy">
        <div className="info-panel svoi-info">
          {copy.info.map((item) => <div key={item.label}>
            <small>{item.label}</small>
            <strong><Lines value={item.value} /></strong>
            {item.note && <p className="info-note">{item.note}</p>}
            {item.address && <a className="map-address" href={mapUrl} target="_blank" rel="noreferrer">{item.address} ↗</a>}
          </div>)}
        </div>
        <SvoiClubRegistration copy={copy.registration} />
      </div>
    </section>
    <section className="svoi-coins">
      <div>
        <div className="section-label">{copy.coinsLabel}</div>
        <h2>{copy.coinsTitle[0]} <i>{copy.coinsTitle[1]}</i></h2>
        <p>{copy.coinsIntro}</p>
      </div>
      <div className="coin-grid">
        {copy.coins.map((coin) => <article className="coin-card" key={coin.value}><b>{coin.value}</b><strong>{coin.text}</strong></article>)}
      </div>
    </section>
    <footer><span>© {new Date().getFullYear()} {dictionary.common.copyright}</span><span className="footer-credit">{dictionary.common.madeBy} <a href="https://osmyka.com/" target="_blank" rel="noopener noreferrer">software studio Osmyka</a></span><a href={localizedPath(locale)}>{dictionary.common.home}</a></footer>
  </main>;
}
