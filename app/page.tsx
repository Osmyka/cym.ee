import Header from "./Header";

const activities = [
  {
    title: "Школа вихідного дня СУМ в Естонії",
    text: "Вивчення української мови, збереження традицій і культури, знайомство зі світом СУМ та формування активного, здорового й спортивного способу життя.",
    image: "/assets/school-class-new.jpeg",
    tone: "blue",
    facts: ["Діти 6–18 років", "Вивчення української мови, освоєння читання, письма", "Maneeži 3"],
    href: "/school",
  },
  {
    title: "Український ансамбль пісні і танцю «Воля»",
    text: "Один із найбільших українських творчих колективів у країнах Балтії. Через народний танець, вокал і сценічну творчість «Воля» зберігає та популяризує українську культурну спадщину.",
    image: "/assets/volya-stage-dancers.webp",
    tone: "yellow",
    facts: ["Учасники 5–50 років", "Хореографія, вокал", "Виступи на міжнародних фестивалях та конкурсах, а також локальних заходах"],
    href: "https://volyaensemble.ee/",
  },
  {
    title: "Бадмінтон",
    text: "Тренування та ігри для початківців і досвідчених гравців. Ракетки та волани надаємо, тож для першого заняття потрібне лише бажання долучитися.",
    image: "/assets/badminton-group-new.webp",
    tone: "green",
    facts: ["Початківці й досвідчені", "Пт · 19:30–21:00 / Сб · 19:00–20:30", "Golden Club · Sõjakooli tn 10"],
    href: "/badminton",
  },
  {
    title: "Англійська мова",
    text: "Напрям у розробці",
    image: "",
    tone: "blue",
    facts: [],
    href: "#contact",
    action: "Напрям у розробці",
    development: true,
  },
  {
    title: "Шахи",
    text: "Напрям у розробці",
    image: "",
    tone: "yellow",
    facts: [],
    href: "#contact",
    action: "Напрям у розробці",
    development: true,
  },
  {
    title: "Група продовженого дня",
    text: "Напрям у розробці",
    image: "",
    tone: "green",
    facts: [],
    href: "#contact",
    action: "Напрям у розробці",
    development: true,
  },
  {
    title: "Ігри для підлітків та молоді",
    text: "Напрям у розробці",
    image: "",
    tone: "blue",
    facts: [],
    href: "#contact",
    action: "Напрям у розробці",
    development: true,
  },
];

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

const team = [
  ["Володимир Паламар", "Голова крайової управи СУМ в Естонії · Директор Школи вихідного дня СУМ", "/assets/volodymyr-palamar.webp"],
  ["Анастасія Козачок", "Художній керівник і головний балетмейстер ансамблю «Воля» · Адміністратор СУМ · Викладач хореографії Школи СУМ", "/assets/anastasiia-kozachok.webp"],
  ["Віталіна Мусієнко", "Керівник вокальної групи ансамблю «Воля» · Викладач вокалу Школи СУМ", "/assets/vitalina-musienko.webp"],
  ["Ірина Дзера", "Викладач історії, українознавства та СУМознавства у Школі СУМ", "/assets/iryna-dzera.jpg"],
  ["Маргарита Винниченко", "Викладач української мови Школи вихідного дня СУМ", "/assets/marharyta-vynnychenko.webp"],
  ["Ганна Кірієнко", "Викладач української мови, літератури та українознавства Школи СУМ", "/assets/hanna-kiriienko.webp"],
  ["Максим Щербатюк", "Тренер з бадмінтону", "/assets/maksym-shcherbatiuk.webp"],
  ["Катерина Чалова", "Викладач вокалу ансамблю «Воля» та Школи вихідного дня СУМ", "/assets/kateryna-chalova.webp"],
  ["Станіслав Щербатюк", "Викладач шахів", "/assets/stanislav-shcherbatiuk.webp"],
  ["Георгій Паламар", "Волонтер", "/assets/heorhii-palamar.webp"],
];

const reports = [
  { year: "2023", title: "Творчість, виховання та благодійні ініціативи", sections: [
    { heading: "Створення ансамблю «Воля»", text: "На початку 2023 року при СУМ в Естонії створено Український ансамбль пісні і танцю «Воля». Колектив об’єднав дітей і молодь навколо української пісні, танцю та сценічного мистецтва. Його завданням стало збереження й популяризація української культури, розвиток талантів та посилення міжкультурного діалогу з Естонією." },
    { heading: "Культурні проєкти та фестивалі", bullets: ["СУМ провела, співорганізувала або підтримала низку культурних подій для патріотичного виховання дітей і молоді.", "Відбулися міжнародні фестивалі «Північна зірка» та «Квіти України».", "У жовтні–грудні СУМ стала інформаційним партнером проєкту «Дитячий кіноклуб в Естонії».", "Проєкт «Творчі майстерні» охопив заняття з валяння вовни, кераміки та малювання.", "Проведено різдвяний концерт «В моєму серці ти живеш»."] },
    { heading: "Сходини, освіта та українська ідентичність", bullets: ["Протягом року проходили юнацькі сходини з розпису пряників, писанкарства та інших творчих практик.", "Окремі зустрічі були присвячені Державному Прапору України, створенню панно з Державним Гімном та безпеці в інтернеті.", "Діти взяли участь у майстер-класі «Фільм за годину».", "У січні організовано «Прощання з колядою».", "У лютому проведено заходи «Символ Свободи» до 105-ї річниці затвердження Тризуба Державним Гербом УНР."] },
    { heading: "Благодійність і громадська участь", bullets: ["СУМ долучилася до світових акцій «Різдво з Україною» та «Теплом зігріємо серця».", "Разом з учасниками майстерень було зібрано і передано 460 євро.", "Молодь СУМ взяла участь у Ході єдності та подяки до роковин початку повномасштабного вторгнення Росії в Україну."] },
    { heading: "Основа майбутньої школи", text: "Упродовж року формувався освітній напрям для дітей і молоді. Його зміст поєднав любов і шану до України, знання історії, культури й традицій, критичне мислення, ініціативність, внутрішні цінності, фізичне здоров’я, працьовитість і творчий розвиток." },
  ] },
  { year: "2024", title: "Школа, табори, творчість і спорт", sections: [
    { heading: "Українська школа вихідного дня", text: "Восени 2024 року започатковано українську школу вихідного дня при СУМ в Естонії. Вона стала сучасним простором для дітей і молоді, де навчання української мови, історії, культури та традицій поєднується з творчістю, критичним мисленням, вихованням внутрішніх цінностей і фізичним розвитком." },
    { heading: "Фестивалі та публічні події", bullets: ["СУМ продовжила роботу над міжнародним фестивалем дитячої та юнацької творчості «Квіти України».", "Організація долучилася до міжнародного фестивалю «Північна зірка 2024».", "СУМ стала співорганізатором і координатором концертної програми фестивалю «Вишиванка об’єднує»."] },
    { heading: "Табори для дітей і молоді", bullets: ["15–19 липня — літній танцювальний табір «Koos on tore! Разом чудово!».", "21–25 листопада — перша зміна міського табору «Volja linnalaager».", "23–27 грудня — друга зміна міського табору «Volja linnalaager»."] },
    { heading: "Календар подій", bullets: ["16 січня — міжнародна благодійна акція «Теплом зігріємо серця».", "18 і 25 лютого — творча майстерня з валяння вовни та майстер-клас із малювання.", "9 березня — святкування річниці ансамблю «Воля».", "Квітень–грудень — тринадцять регулярних ігор з бадмінтону.", "21 і 28 квітня — майстер-класи з писанкарства та приготування сирної паски.", "7 червня — виступ ансамблю «Воля» на Днях Старого міста в Таллінні.", "26 листопада — участь школи та ансамблю «Воля» у Радіодиктанті національної єдності й семінар із поліського народного танцю.", "30 листопада — концертна поїздка ансамблю «Воля» до Пайде.", "21 грудня — різдвяний концерт і благодійний аукціон.", "Грудень — вечір пісні ансамблю «Воля» та благодійна подія на підтримку фонду «Місто Добра»."] },
    { heading: "Благодійний результат", text: "Під час різдвяних подій унікальний виріб з елемента снаряда у формі ангела було придбано за 120 євро. Ще 217 євро зібрали завдяки пожертвам на концерті. Кошти спрямували на технічне забезпечення сумівців, які захищають Україну." },
  ] },
  { year: "2025", title: "Події, школа, творчість і спорт", sections: [
    { heading: "Підсумок року", text: "У 2025 році СУМ в Естонії продовжила розвивати українську школу, ансамбль пісні і танцю «Воля», спортивні заняття та культурні ініціативи. Протягом року діти, молодь і родини зустрічалися, навчалися, творили разом і представляли українську культуру в Естонії." },
    { heading: "Школа, культура та творчість", bullets: ["9 січня представлено мініфільм про ансамбль «Воля».", "8 лютого відбулася зустріч хореографа з Канади з учасниками ансамблю.", "3 березня представлено вокально-хореографічний номер «Сумний святий вечір».", "Упродовж року «Воля» брала участь у концертах, фестивалях та інших публічних культурних подіях."] },
    { heading: "Спорт і активний розвиток", bullets: ["Протягом року регулярно проходили тренування та ігри з бадмінтону для дітей, молоді й дорослих.", "26 грудня відбувся турнір з бадмінтону 2025.", "Спортивні зустрічі стали простором для здорового дозвілля, командної взаємодії та нових знайомств."] },
    { heading: "Освітні та громадські ініціативи", bullets: ["26 січня СУМ отримала підручники від Посольства України в Естонії та Міністерства закордонних справ України.", "Школа вихідного дня поєднувала вивчення української мови, історії, культури й традицій із творчим та фізичним розвитком.", "Діяльність СУМ об’єднувала дітей, молодь, батьків, педагогів, партнерів і волонтерів навколо української ідентичності."] },
    { heading: "Завершення року", bullets: ["27 грудня відбулося заключне заняття у 2025 році Школи вихідного дня СУМ.", "27 грудня заключне заняття провів Український ансамбль пісні і танцю «Воля»."] },
  ] },
];

export default function Home() {
  return (
    <main>
      <Header />

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="kicker"><span />Україна · Естонія</p>
          <h1>Разом<br /><em>сильніші.</em></h1>
          <p className="hero-text">Спілка української молоді в Естонії — простір, де діти, молодь і родини зберігають українське, розвиваються та творять майбутнє разом.</p>
          <div className="hero-actions"><a className="button button-dark" href="#about">Дізнатися більше <span>↓</span></a><a className="text-link" href="mailto:cym@ukraine.ee">cym@ukraine.ee <span>↗</span></a></div>
        </div>
        <div className="hero-art"><div className="sun" /><img className="hero-sum-logo" src="/assets/sum-logo-cropped.png" alt="Логотип Спілки української молоді" /><a className="association-card" href="https://ukraine.ee/ua" aria-label="Перейти на сайт Асоціації українських організацій в Естонії"><img src="/assets/association-logo.png" alt="Логотип Асоціації українських організацій в Естонії" /></a></div>
      </section>

      <section className="intro section" id="about">
        <div className="section-label">01 / Про нас</div>
        <div className="intro-content"><h2>Українська<br /><span>спільнота в дії.</span></h2><div><p>Ми об’єднуємо українських дітей, молодь і дорослих в Естонії. Через освіту, культуру, спорт і волонтерство допомагаємо залишатися близькими до України та одне до одного.</p></div></div>
      </section>

      <section className="quote-band"><div className="quote-mark">“</div><blockquote>Виховання дітей та молоді<br /><span>в любові до України.</span></blockquote><div className="quote-line" /></section>

      <section className="activities section" id="activities">
        <div className="section-head"><div className="section-label">02 / Що ми робимо</div><h2>Місце для<br /><i>кожного.</i></h2></div>
        <div className="activity-grid">{activities.map((item, index) => <article className={`activity-card ${item.tone}${item.development ? " development-card" : ""}`} key={item.title}>{!item.development && <a className="card-image" href={item.href} aria-label={`Відкрити: ${item.title}`}><img src={item.image} alt="" loading="lazy" decoding="async" /></a>}<div className="card-number">0{index + 1}</div><h3>{item.title}</h3><p>{item.text}</p>{!item.development && <ul className="card-facts">{item.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>}{!item.development && <a href={item.href} aria-label={`${item.action || "Детальніше"}: ${item.title}`}>{item.action || "Детальніше"} <span>↗</span></a>}</article>)}</div>
      </section>

      <section className="team-section section" id="team"><div className="section-head"><div className="section-label">03 / Команда</div><h2>Люди, які<br /><i>творять СУМ в Естонії.</i></h2></div><div className="team-grid">{team.map(([name, role, photo]) => <article className="team-card" key={name}><div className="team-photo"><img src={photo} alt={name} loading="lazy" decoding="async" /></div><h3>{name}</h3><p>{role}</p></article>)}</div></section>

      <section className="reports-section section" id="reports"><div className="section-head"><div className="section-label">04 / Звіти</div><h2>Роки, наповнені<br /><i>спільними справами.</i></h2></div><div className="reports-list">{reports.map((report) => <details className="report-card" key={report.year}><summary><strong>{report.year}</strong><span>{report.title}</span><i>+</i></summary><div className="report-body report-body-full">{report.sections.map((section) => <section className="report-section" key={section.heading}><h3>{section.heading}</h3>{section.text && <p>{section.text}</p>}{section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}</section>)}</div></details>)}</div></section>

      <section className="gallery section" id="gallery"><div className="section-head gallery-head"><div><div className="section-label">05 / Наші моменти</div><h2>Зростаємо<br /><i>разом.</i></h2></div><a className="arrow-link" href="https://www.instagram.com/cym.eesti/">Дивитися більше фото <span>↗</span></a></div><div className="gallery-grid">{gallery.map((image, i) => <img key={image} className={`gallery-${i + 1}`} src={image} alt="Момент із життя спільноти" loading="lazy" decoding="async" />)}</div></section>

      <section className="join-section" id="contact"><div className="section-label">06 / Долучитися</div><h2>Долучитися</h2><div className="join-card"><div><h3>Маєте ідею? Давайте втілимо її разом</h3><p>Напишіть нам про бажаний напрям, власну ініціативу або можливість партнерства.</p></div><a href="mailto:cym@ukraine.ee">Написати команді <span>↗</span></a></div></section>

      <section className="contacts-section"><div><div className="section-label">Наші контакти</div><h2>Будьмо<br /><i>на зв’язку.</i></h2></div><div className="contact-list"><a href="tel:+37253774435"><small>Телефон</small><strong>+372 5377 4435</strong><span>↗</span></a><a href="mailto:cym@ukraine.ee"><small>Email</small><strong>cym@ukraine.ee</strong><span>↗</span></a><a href="https://t.me/cym_eesti"><small>Telegram</small><strong>@cym_eesti</strong><span>↗</span></a><a href="https://www.instagram.com/cym.eesti/"><small>Instagram</small><strong>@cym.eesti</strong><span>↗</span></a><a href="https://www.facebook.com/CYM.Estonia"><small>Facebook</small><strong>CYM.Estonia</strong><span>↗</span></a></div></section>

      <section className="partners-section"><div className="section-label">Наші партнери</div><img src="/assets/partners-strip.webp" alt="Логотипи партнерів Спілки української молоді в Естонії" loading="lazy" decoding="async" /></section>

      <footer><span>© {new Date().getFullYear()} СУМ в Естонії</span><span>Україна починається з нас.</span><a href="#top">На початок ↑</a></footer>
    </main>
  );
}
