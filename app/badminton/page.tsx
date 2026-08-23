/* eslint-disable @next/next/no-html-link-for-pages -- роутер vinext падає на кліку по <Link>, тому звичайні <a> */
import Header from "../Header";
import BadmintonRegistration from "./BadmintonRegistration";

export default function BadmintonPage() {
  return <main>
    <Header />
    <section className="detail-hero badminton-hero"><div><p className="kicker"><span />03 / Спорт</p><h1>Бадмінтон.<br /><em>Граємо разом.</em></h1><p>Тренування та ігри для початківців і досвідчених гравців. Ракетки та волани надаємо, тож для першого заняття потрібне лише бажання долучитися.</p></div><img src="/assets/badminton-team-clean.webp" alt="Команда з бадмінтону" /></section>
    <section className="detail-body"><div><div className="section-label">Тренування та ігри</div><h2>Рух, команда<br /><i>і задоволення.</i></h2></div><div className="detail-copy">
      <div className="info-panel badminton-info">
        <div><small>Рівень</small><strong>Початківці й досвідчені</strong></div>
        <div><small>Розклад</small><strong>П’ятниця · 19:30–21:00 — тренування<br />Субота · 19:00–20:30 — гра</strong></div>
        <div><small>Адреса</small><a className="map-address" href="https://www.google.com/maps/search/?api=1&query=Golden+Club+S%C3%B5jakooli+tn+10+11316+Tallinn" target="_blank" rel="noreferrer"><strong>Golden Club<br />Sõjakooli tn 10, 11316 Tallinn ↗</strong></a></div>
        <div><small>Вартість</small><strong>Перше відвідування — 5 €<br />15 € — одне відвідування<br />55 € — 4 відвідування на місяць<br />100 € — 8 відвідувань на місяць</strong></div>
        <div><small>Спорядження</small><strong>Ракетки та волани надаємо за потреби</strong></div>
        <div><small>Що взяти</small><strong>Спортивний одяг, змінне взуття для залу та гарний настрій 😉</strong></div>
      </div>
      <BadmintonRegistration />
    </div></section>
    <section className="detail-gallery badminton-gallery"><img src="/assets/badminton-07-action.webp" alt="Гра у бадмінтон" loading="lazy" decoding="async" /><img src="/assets/badminton-08-group.jpeg" alt="Учасники тренування" loading="lazy" decoding="async" /><img src="/assets/badminton-02-action.webp" alt="Тренування з бадмінтону" loading="lazy" decoding="async" /><img src="/assets/badminton-new-01.webp" alt="Команда після тренування" loading="lazy" decoding="async" /><img src="/assets/badminton-new-02.jpeg" alt="Учасниці з ракетками" loading="lazy" decoding="async" /><img src="/assets/badminton-new-03.jpeg" alt="Гравці на корті" loading="lazy" decoding="async" /><img src="/assets/badminton-new-04.webp" alt="Команда бадмінтону" loading="lazy" decoding="async" /><img src="/assets/badminton-new-05.webp" alt="Учасники турніру" loading="lazy" decoding="async" /><img src="/assets/badminton-new-06.webp" alt="Спільне фото команди" loading="lazy" decoding="async" /></section>
    <footer><span>© {new Date().getFullYear()} СУМ в Естонії</span><a href="/">← На головну</a></footer>
  </main>;
}
