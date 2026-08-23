import Link from "next/link";
import Header from "../Header";
import SchoolRegistration from "./SchoolRegistration";

const subjects = ["Українська мова, читання та письмо", "Історія України й українознавство", "СУМознавство та українські традиції", "Вокал, хореографія і творчі заняття"];
const schoolPhotos = [
  "/assets/school-new-01.jpeg", "/assets/school-new-02.jpeg", "/assets/school-new-03.jpeg",
  "/assets/school-new-04.webp", "/assets/school-new-05.jpeg", "/assets/school-new-06.jpeg",
  "/assets/school-new-07.jpeg", "/assets/school-new-08.jpeg", "/assets/school-new-09.webp",
  "/assets/school-new-10.webp", "/assets/school-new-12.jpeg",
  "/assets/school-new-13.jpeg", "/assets/school-new-14.webp", "/assets/school-new-15.jpeg",
  "/assets/school-05-writing.webp",
];

export default function SchoolPage() {
  return <main>
    <Header />
    <section className="detail-hero school-hero"><div><p className="kicker"><span />01 / Освіта</p><h1>Школа<br />вихідного дня<br /><em>СУМ в Естонії.</em></h1><p>Запрошуємо дітей 6–18 років долучитися до навчання. Мета школи — вивчення української мови, збереження традицій і культури, знайомство зі світом СУМ та формування активного, здорового й спортивного способу життя.</p></div><img src="/assets/school-team.webp" alt="Учні та команда школи СУМ" /></section>
    <section className="detail-body"><div><div className="section-label">Навчання і розвиток</div><h2>Зростаємо<br /><i>українськими.</i></h2></div><div className="detail-copy"><ul className="feature-list">{subjects.map(subject => <li key={subject}>{subject}</li>)}</ul><div className="info-panel"><div><small>Вік дітей</small><strong>6–18 років</strong></div><div><small>Час занять</small><strong>Субота · 10:00–14:00</strong></div><div><small>Місце</small><a className="map-address" href="https://www.google.com/maps/search/?api=1&query=Manee%C5%BEi+3+Tallinn" target="_blank" rel="noreferrer"><strong>Maneeži 3 ↗</strong></a></div><div><small>Вартість</small><strong>Заняття у Школі є безкоштовними</strong></div></div><SchoolRegistration /></div></section>
    <section className="detail-gallery school-gallery">{schoolPhotos.map((photo, index) => <img key={photo} src={photo} alt={`Момент зі шкільного життя ${index + 1}`} loading="lazy" decoding="async" />)}</section>
    <footer><span>© {new Date().getFullYear()} СУМ в Естонії</span><Link href="/">← На головну</Link></footer>
  </main>;
}
