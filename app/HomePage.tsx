import Header from "./Header";
import { getDictionary, localizedPath, type Locale } from "./i18n";

const activityConfig = [
  { image: "/assets/school-class-new.jpeg", tone: "blue", href: "/school" },
  { image: "/assets/volya-stage-dancers.webp", tone: "yellow", href: "https://volyaensemble.ee/", external: true },
  { image: "/assets/badminton-group-new.webp", tone: "green", href: "/badminton" },
  { image: "", tone: "blue", href: "/#contact", development: true },
  { image: "", tone: "yellow", href: "/#contact", development: true },
  { image: "", tone: "green", href: "/#contact", development: true },
  { image: "", tone: "blue", href: "/#contact", development: true },
] as const;

const gallery = [
  "/assets/school-new-01.jpeg",
  "/assets/volya-gallery-03.webp",
  "/assets/school-new-06.jpeg",
  "/assets/badminton-group-new.webp",
  "/assets/volya-gallery-17.webp",
  "/assets/school-new-08.jpeg",
  "/assets/volya-performance.webp",
  "/assets/school-new-15.jpeg",
  "/assets/badminton-new-02.jpeg",
  "/assets/school-new-12.jpeg",
  "/assets/volya-gallery-11.webp",
  "/assets/badminton-new-05.webp",
];

const teamPhotos = [
  "/assets/volodymyr-palamar.webp",
  "/assets/anastasiia-kozachok.webp",
  "/assets/vitalina-musienko.webp",
  "/assets/iryna-dzera.jpg",
  "/assets/marharyta-vynnychenko.webp",
  "/assets/hanna-kiriienko.webp",
  "/assets/maksym-shcherbatiuk.webp",
  "/assets/kateryna-chalova.webp",
  "/assets/stanislav-shcherbatiuk.webp",
  "/assets/heorhii-palamar.webp",
];

export default function HomePage({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const copy = dictionary.home;

  return (
    <main lang={locale}>
      <Header locale={locale} />

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="kicker"><span />{copy.kicker}</p>
          <h1>{copy.heroTitle[0]}<br /><em>{copy.heroTitle[1]}</em></h1>
          <p className="hero-text">{copy.heroText}</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#about">{copy.learnMore} <span>↓</span></a>
            <a className="text-link" href="mailto:cym@ukraine.ee">cym@ukraine.ee <span>↗</span></a>
          </div>
        </div>
        <div className="hero-art">
          <div className="sun" />
          <img className="hero-sum-logo" src="/assets/sum-logo-cropped.png" alt={copy.logoAlt} />
          <a className="association-card" href="https://ukraine.ee/ua" aria-label={copy.associationLinkAria}>
            <img src="/assets/association-logo.png" alt={copy.associationLogoAlt} />
          </a>
        </div>
      </section>

      <section className="intro section" id="about">
        <div className="section-label">{copy.aboutLabel}</div>
        <div className="intro-content">
          <h2>{copy.aboutTitle[0]}<br /><span>{copy.aboutTitle[1]}</span></h2>
          <div><p>{copy.aboutText}</p></div>
        </div>
      </section>

      <section className="quote-band">
        <div className="quote-mark">“</div>
        <blockquote>{copy.quote[0]}<br /><span>{copy.quote[1]}</span></blockquote>
        <div className="quote-line" />
      </section>

      <section className="activities section" id="activities">
        <div className="section-head">
          <div className="section-label">{copy.activitiesLabel}</div>
          <h2>{copy.activitiesTitle[0]}<br /><i>{copy.activitiesTitle[1]}</i></h2>
        </div>
        <div className="activity-grid">
          {copy.activities.map((item, index) => {
            const config = activityConfig[index];
            const href = config.external ? config.href : localizedPath(locale, config.href);
            return (
              <article className={`activity-card ${config.tone}${config.development ? " development-card" : ""}`} key={item.title}>
                {!config.development && (
                  <a className="card-image" href={href} aria-label={`${copy.openActivity}: ${item.title}`}>
                    <img src={config.image} alt="" loading="lazy" decoding="async" />
                  </a>
                )}
                <div className="card-number">0{index + 1}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                {!config.development && <ul className="card-facts">{item.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>}
                {!config.development && <a href={href} aria-label={`${copy.details}: ${item.title}`}>{copy.details} <span>↗</span></a>}
              </article>
            );
          })}
        </div>
      </section>

      <section className="team-section section" id="team">
        <div className="section-head"><div className="section-label">{copy.teamLabel}</div><h2>{copy.teamTitle[0]}<br /><i>{copy.teamTitle[1]}</i></h2></div>
        <div className="team-grid">
          {copy.team.map((member, index) => <article className="team-card" key={member.name}><div className="team-photo"><img src={teamPhotos[index]} alt={member.name} loading="lazy" decoding="async" /></div><h3>{member.name}</h3><p>{member.role}</p></article>)}
        </div>
      </section>

      <section className="reports-section section" id="reports">
        <div className="section-head"><div className="section-label">{copy.reportsLabel}</div><h2>{copy.reportsTitle[0]}<br /><i>{copy.reportsTitle[1]}</i></h2></div>
        <div className="reports-list">
          {copy.reports.map((report) => <details className="report-card" key={report.year}><summary><strong>{report.year}</strong><span>{report.title}</span><i>+</i></summary><div className="report-body report-body-full">{report.sections.map((section) => <section className="report-section" key={section.heading}><h3>{section.heading}</h3>{section.text && <p>{section.text}</p>}{section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}</section>)}</div></details>)}
        </div>
      </section>

      <section className="gallery section" id="gallery">
        <div className="section-head gallery-head"><div><div className="section-label">{copy.galleryLabel}</div><h2>{copy.galleryTitle[0]}<br /><i>{copy.galleryTitle[1]}</i></h2></div><a className="arrow-link" href="https://www.instagram.com/cym.eesti/">{copy.morePhotos} <span>↗</span></a></div>
        <div className="gallery-grid">{gallery.map((image, index) => <img key={image} className={`gallery-${index + 1}`} src={image} alt={copy.galleryAlt} loading="lazy" decoding="async" />)}</div>
      </section>

      <section className="join-section" id="contact"><div className="section-label">{copy.joinLabel}</div><h2>{copy.joinTitle}</h2><div className="join-card"><div><h3>{copy.joinHeading}</h3><p>{copy.joinText}</p></div><a href="mailto:cym@ukraine.ee">{copy.writeTeam} <span>↗</span></a></div></section>

      <section className="contacts-section"><div><div className="section-label">{copy.contactsLabel}</div><h2>{copy.contactsTitle[0]}<br /><i>{copy.contactsTitle[1]}</i></h2></div><div className="contact-list"><a href="tel:+37253774435"><small>{copy.contactLabels[0]}</small><strong>+372 5377 4435</strong><span>↗</span></a><a href="mailto:cym@ukraine.ee"><small>{copy.contactLabels[1]}</small><strong>cym@ukraine.ee</strong><span>↗</span></a><a href="https://t.me/cym_eesti"><small>{copy.contactLabels[2]}</small><strong>@cym_eesti</strong><span>↗</span></a><a href="https://www.instagram.com/cym.eesti/"><small>{copy.contactLabels[3]}</small><strong>@cym.eesti</strong><span>↗</span></a><a href="https://www.facebook.com/CYM.Estonia"><small>{copy.contactLabels[4]}</small><strong>CYM.Estonia</strong><span>↗</span></a></div></section>

      <section className="partners-section"><div className="section-label">{copy.partnersLabel}</div><img src="/assets/partners-strip.webp" alt={copy.partnersAlt} loading="lazy" decoding="async" /></section>

      <footer><span>© {new Date().getFullYear()} {dictionary.common.copyright}</span><span>{copy.footerMotto}</span><a href="#top">{copy.backToTop}</a></footer>
    </main>
  );
}
