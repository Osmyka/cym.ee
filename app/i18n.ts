import en from "./i18n/en";
import et from "./i18n/et";

export type Locale = "uk" | "et" | "en";

type ActivityCopy = {
  title: string;
  text: string;
  facts: string[];
};

type TeamCopy = {
  name: string;
  role: string;
};

type ReportSectionCopy = {
  heading: string;
  text?: string;
  bullets?: string[];
};

type ReportCopy = {
  year: string;
  title: string;
  sections: ReportSectionCopy[];
};

type RegistrationCopy = {
  trigger: string;
  closeAria: string;
  successLabel: string;
  thanks: string;
  successText: string;
  close: string;
  eyebrow: string;
  title: [string, string];
  submit: string;
  sending: string;
  fallbackText: string;
  fallbackLink: string;
  fields: Record<string, string>;
  note?: string;
};

type SvoiRegistrationCopy = RegistrationCopy & {
  lead: string;
  address: string;
  firstMeeting: string;
  dateHint: string;
  dateError: string;
  payerHint: string;
  sections: { visit: string; activity: string; contacts: string; media: string };
  activities: Array<{ value: "school" | "volya" | "badminton" | "hub" | "none"; label: string }>;
  consentYes: string;
  consentNo: string;
  priceNote: string;
};

type HubRegistrationCopy = RegistrationCopy & {
  lead: string;
  address: string;
  dateHint: string;
  dateError: string;
  payerHint: string;
  sections: { visit: string; contacts: string; media: string };
  consentYes: string;
  consentNo: string;
  priceNote: string;
};

export type Dictionary = {
  metadata: { title: string; description: string };
  common: {
    brand: [string, string];
    copyright: string;
    home: string;
    languageLabel: string;
    madeBy: string;
  };
  header: {
    homeAria: string;
    navigationAria: string;
    about: string;
    activities: string;
    merch: string;
    gallery: string;
    contacts: string;
  };
  home: {
    kicker: string;
    heroTitle: [string, string];
    heroText: string;
    learnMore: string;
    logoAlt: string;
    associationLinkAria: string;
    associationLogoAlt: string;
    aboutLabel: string;
    aboutTitle: [string, string];
    aboutText: string;
    quote: [string, string];
    activitiesLabel: string;
    activitiesTitle: [string, string];
    activities: ActivityCopy[];
    details: string;
    development: string;
    openActivity: string;
    teamLabel: string;
    teamTitle: [string, string];
    team: TeamCopy[];
    reportsLabel: string;
    reportsTitle: [string, string];
    reports: ReportCopy[];
    galleryLabel: string;
    galleryTitle: [string, string];
    morePhotos: string;
    galleryAlt: string;
    joinLabel: string;
    joinTitle: string;
    joinHeading: string;
    joinText: string;
    writeTeam: string;
    contactsLabel: string;
    contactsTitle: [string, string];
    contactLabels: [string, string, string, string, string];
    partnersLabel: string;
    partnersAlt: string;
    footerMotto: string;
    backToTop: string;
  };
  school: {
    kicker: string;
    title: [string, string, string];
    description: string;
    heroAlt: string;
    sectionLabel: string;
    sectionTitle: [string, string];
    about: [string, string];
    subjects: string[];
    info: {
      ageLabel: string;
      ageValue: string;
      timeLabel: string;
      timeValue: string;
      placeLabel: string;
      priceLabel: string;
      priceValue: string;
    };
    galleryAlt: string;
    registration: RegistrationCopy;
  };
  badminton: {
    kicker: string;
    title: [string, string];
    description: string;
    heroAlt: string;
    sectionLabel: string;
    sectionTitle: [string, string];
    info: Array<{ label: string; value: string }>;
    galleryAlts: string[];
    registration: RegistrationCopy;
  };
  svoi: {
    kicker: string;
    title: [string, string, string];
    description: string;
    heroAlt: string;
    sectionLabel: string;
    sectionTitle: [string, string];
    sectionText: string;
    info: Array<{ label: string; value: string; note?: string; address?: string }>;
    coinsLabel: string;
    coinsTitle: [string, string];
    coinsIntro: string;
    coins: Array<{ value: string; text: string }>;
    registration: SvoiRegistrationCopy;
  };
  hub: {
    kicker: string;
    title: [string, string, string];
    description: string;
    heroAlt: string;
    sectionLabel: string;
    sectionTitle: [string, string];
    about: [string, string];
    info: Array<{ label: string; value: string; note?: string; address?: string }>;
    optionsLabel: string;
    optionsTitle: [string, string];
    options: Array<{ kicker: string; title: string; text: string }>;
    principlesLabel: string;
    principlesTitle: [string, string];
    principlesIntro: string;
    principles: Array<{ title: string; text: string }>;
    pricingLabel: string;
    pricingTitle: [string, string];
    pricingIntro: string;
    pricingPoints: Array<{ title: string; text: string }>;
    pricingPanelTitle: string;
    prices: Array<{ label: string; value: string }>;
    pricingFoot: string;
    teacherLabel: string;
    teacherTitle: [string, string];
    teacherIntro: string;
    teacherName: string;
    teacherRole: string;
    teacherBio: [string, string];
    whyLabel: string;
    whyTitle: [string, string];
    whyIntro: string;
    why: Array<{ title: string; text: string }>;
    closingLabel: string;
    closingTitle: [string, string];
    closingText: string;
    registration: HubRegistrationCopy;
  };
  merch: {
    sectionLabel: string;
    title: [string, string];
    lead: string;
    products: Array<{ name: string; description: string }>;
    order: {
      order: string;
      closeForm: string;
      successLabel: string;
      thanks: string;
      successText: string;
      close: string;
      eyebrow: string;
      title: string;
      selectedProduct: string;
      shirtType: string;
      color: string;
      navy: string;
      blue: string;
      uniformType: string;
      women: string;
      men: string;
      teen: string;
      kids: string;
      child: string;
      adult: string;
      childSuffix: string;
      adultSuffix: string;
      size: string;
      chooseSize: string;
      openSizeGuide: string;
      quantity: string;
      participantName: string;
      email: string;
      details: string;
      submit: string;
      sending: string;
      fallbackText: string;
      fallbackLink: string;
      note: string;
      closeSizeGuide: string;
      sizeGuide: string;
      sizeGuideTitle: [string, string];
      poloWomen: string;
      poloMen: string;
      poloKids: string;
      allMeasurements: string;
      sizeColumn: string;
      widthColumn: string;
      lengthColumn: string;
      poloMeasureNote: string;
      poloKidsMeasureNote: string;
      uniformChild: string;
      uniformAdult: string;
      parameterColumn: string;
      uniformRows: string[];
      uniformMeasureNote: string;
      sizeGuideAlt: string;
    };
  };
};

export const localeLabels: Record<Locale, string> = {
  uk: "UK",
  et: "ET",
  en: "EN",
};

export function localizedPath(locale: Locale, path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return locale === "uk" ? normalizedPath : `/${locale}${normalizedPath === "/" ? "" : normalizedPath}`;
}

const uk: Dictionary = {
  metadata: {
    title: "СУМ в Естонії — Разом сильніші",
    description: "Спілка української молоді в Естонії: освіта, культура, спорт і спільнота.",
  },
  common: {
    brand: ["Спілка української молоді", "в Естонії"],
    copyright: "СУМ в Естонії",
    home: "← На головну",
    languageLabel: "Оберіть мову",
    madeBy: "Розробка —",
  },
  header: {
    homeAria: "СУМ в Естонії — головна",
    navigationAria: "Головна навігація",
    about: "Про нас",
    activities: "Напрямки",
    merch: "Мерч",
    gallery: "Галерея",
    contacts: "Контакти",
  },
  home: {
    kicker: "Україна · Естонія",
    heroTitle: ["Разом", "сильніші."],
    heroText: "Спілка української молоді в Естонії — простір, де діти, молодь і родини зберігають українське, розвиваються та творять майбутнє разом.",
    learnMore: "Дізнатися більше",
    logoAlt: "Логотип Спілки української молоді",
    associationLinkAria: "Перейти на сайт Асоціації українських організацій в Естонії",
    associationLogoAlt: "Логотип Асоціації українських організацій в Естонії",
    aboutLabel: "01 / Про нас",
    aboutTitle: ["Українська", "спільнота в дії."],
    aboutText: "Ми об’єднуємо українських дітей, молодь і дорослих в Естонії. Через освіту, культуру, спорт і волонтерство допомагаємо залишатися близькими до України та одне до одного.",
    quote: ["Виховання дітей та молоді", "в любові до України."],
    activitiesLabel: "02 / Що ми робимо",
    activitiesTitle: ["Місце для", "кожного."],
    activities: [
      { title: "Школа вихідного дня СУМ в Естонії", text: "Вивчення української мови, збереження традицій і культури, знайомство зі світом СУМ та формування активного, здорового й спортивного способу життя.", facts: ["Діти 6–18 років", "Вивчення української мови, освоєння читання, письма", "Maneeži 3"] },
      { title: "Український ансамбль пісні і танцю «Воля»", text: "Один із найбільших українських творчих колективів у країнах Балтії. Через народний танець, вокал і сценічну творчість «Воля» зберігає та популяризує українську культурну спадщину.", facts: ["Учасники 5–50 років", "Хореографія, вокал", "Виступи на міжнародних фестивалях та конкурсах, а також локальних заходах"] },
      { title: "Бадмінтон", text: "Тренування та ігри для початківців і досвідчених гравців. Ракетки та волани надаємо, тож для першого заняття потрібне лише бажання долучитися.", facts: ["Початківці й досвідчені", "Пт · 19:30–21:00 / Сб · 19:00–20:30", "Golden Club · Sõjakooli tn 10"] },
      { title: "CYM Hub", text: "Затишний простір після школи: домашні завдання, творчість, ігри та відпочинок в українськомовному середовищі.", facts: ["Понеділок і середа · 14:00–17:00", "3 € / година", "CYM space · Maneeži 3"] },
      { title: "СВОЇ club", text: "Молодіжний клуб для підлітків та молоді. Настільні ігри, «Мафія», квізи та живе спілкування українською.", facts: ["11–20 років", "Четвер · 18:45–19:45", "Maneeži 3"] },
      { title: "Англійська мова", text: "Напрям у розробці", facts: [] },
      { title: "Шахи", text: "Напрям у розробці", facts: [] },
    ],
    details: "Детальніше",
    development: "Напрям у розробці",
    openActivity: "Відкрити",
    teamLabel: "03 / Команда",
    teamTitle: ["Люди, які", "творять СУМ в Естонії."],
    team: [
      { name: "Володимир Паламар", role: "Голова крайової управи СУМ в Естонії · Директор Школи вихідного дня СУМ" },
      { name: "Анастасія Козачок", role: "Художній керівник і головний балетмейстер ансамблю «Воля» · Адміністратор СУМ · Викладач хореографії Школи СУМ" },
      { name: "Віталіна Мусієнко", role: "Керівник вокальної групи ансамблю «Воля» · Викладач вокалу Школи СУМ" },
      { name: "Ірина Дзера", role: "Викладач історії, українознавства та СУМознавства у Школі СУМ" },
      { name: "Маргарита Винниченко", role: "Викладач української мови Школи вихідного дня СУМ" },
      { name: "Ганна Кірієнко", role: "Викладач української мови, літератури та українознавства Школи СУМ" },
      { name: "Максим Щербатюк", role: "Тренер з бадмінтону" },
      { name: "Катерина Чалова", role: "Викладач вокалу ансамблю «Воля» та Школи вихідного дня СУМ" },
      { name: "Станіслав Щербатюк", role: "Викладач шахів" },
      { name: "Георгій Паламар", role: "Волонтер" },
    ],
    reportsLabel: "04 / Звіти",
    reportsTitle: ["Роки, наповнені", "спільними справами."],
    reports: [
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
    ],
    galleryLabel: "05 / Наші моменти",
    galleryTitle: ["Зростаємо", "разом."],
    morePhotos: "Дивитися більше фото",
    galleryAlt: "Момент із життя спільноти",
    joinLabel: "06 / Долучитися",
    joinTitle: "Долучитися",
    joinHeading: "Маєте ідею? Давайте втілимо її разом",
    joinText: "Напишіть нам про бажаний напрям, власну ініціативу або можливість партнерства.",
    writeTeam: "Написати команді",
    contactsLabel: "Наші контакти",
    contactsTitle: ["Будьмо", "на зв’язку."],
    contactLabels: ["Телефон", "Email", "Telegram", "Instagram", "Facebook"],
    partnersLabel: "Наші партнери",
    partnersAlt: "Логотипи партнерів Спілки української молоді в Естонії",
    footerMotto: "Україна починається з нас.",
    backToTop: "На початок ↑",
  },
  school: {
    kicker: "01 / Освіта",
    title: ["Школа", "вихідного дня", "СУМ в Естонії."],
    description: "Запрошуємо дітей 6–18 років долучитися до навчання. Мета школи — вивчення української мови, збереження традицій і культури, знайомство зі світом СУМ та формування активного, здорового й спортивного способу життя.",
    heroAlt: "Учні та команда школи СУМ",
    sectionLabel: "Навчання і розвиток",
    sectionTitle: ["Зростаємо", "українськими."],
    about: [
      "Школа вихідного дня «СУМ» — верифікований український освітній осередок за кордоном. Школа працює за програмою українознавчого компонента, затвердженою Міністерством освіти і науки України. Результати навчання учнів можуть бути офіційно визнані та зараховані в українській системі освіти відповідно до чинного Порядку.",
      "Школа також зареєстрована в естонській системі освіти EHIS (Eesti Hariduse Infosüsteem) як школа за інтересами (huvikool). Діяльність школи підтримується Фондом інтеграції Естонії — Integratsiooni Sihtasutus у межах програми підтримки шкіл, які забезпечують мовне та культурне навчання дітей національних меншин.",
    ],
    subjects: ["Українська мова, читання та письмо", "Історія України й українознавство", "СУМознавство та українські традиції", "Вокал, хореографія і творчі заняття"],
    info: { ageLabel: "Вік дітей", ageValue: "6–18 років", timeLabel: "Час занять", timeValue: "Субота · 10:00–14:00", placeLabel: "Місце", priceLabel: "Вартість", priceValue: "Заняття у Школі є безкоштовними" },
    galleryAlt: "Момент зі шкільного життя",
    registration: {
      trigger: "Реєстрація в школу", closeAria: "Закрити форму", successLabel: "Надіслано ✓", thanks: "Дякуємо!", successText: "Реєстрацію надіслано до таблиці школи. Команда зв’яжеться з вами за потреби.", close: "Закрити", eyebrow: "Школа вихідного дня СУМ", title: ["Реєстрація", "до школи."], submit: "Надіслати реєстрацію", sending: "Надсилаємо…", fallbackText: "Автоматичне надсилання не спрацювало. Ми відкрили підготовлений лист — надішліть його, щоб заявка не загубилася.", fallbackLink: "Відкрити лист ще раз",
      fields: { childName: "Імʼя та прізвище дитини (латиницею)", age: "Вік учасника", school: "Школа, яку відвідує дитина", grade: "Клас, який відвідує дитина у школі", parentName: "Імʼя та прізвище одного із батьків (латиницею)", contact: "Контактний номер телефону, бажано з Telegram (+username, якщо є)", email: "E-mail", timeInEstonia: "Як довго ви мешкаєте в Естонії?", questions: "Ваші запитання до адміністрації школи" },
    },
  },
  badminton: {
    kicker: "03 / Спорт", title: ["Бадмінтон.", "Граємо разом."], description: "Тренування та ігри для початківців і досвідчених гравців. Ракетки та волани надаємо, тож для першого заняття потрібне лише бажання долучитися.", heroAlt: "Команда з бадмінтону", sectionLabel: "Тренування та ігри", sectionTitle: ["Рух, команда", "і задоволення."],
    info: [
      { label: "Рівень", value: "Початківці й досвідчені" },
      { label: "Розклад", value: "П’ятниця · 19:30–21:00 — тренування\nСубота · 19:00–20:30 — гра" },
      { label: "Адреса", value: "Golden Club\nSõjakooli tn 10, 11316 Tallinn" },
      { label: "Вартість", value: "Перше відвідування — 5 €\n15 € — одне відвідування\n55 € — 4 відвідування на місяць\n100 € — 8 відвідувань на місяць" },
      { label: "Спорядження", value: "Ракетки та волани надаємо за потреби" },
      { label: "Що взяти", value: "Спортивний одяг, змінне взуття для залу та гарний настрій 😉" },
    ],
    galleryAlts: ["Гра у бадмінтон", "Учасники тренування", "Тренування з бадмінтону", "Команда після тренування", "Учасниці з ракетками", "Гравці на корті", "Команда бадмінтону", "Учасники турніру", "Спільне фото команди"],
    registration: {
      trigger: "Реєстрація на бадмінтон", closeAria: "Закрити форму", successLabel: "Надіслано ✓", thanks: "Дякуємо!", successText: "Реєстрацію надіслано до таблиці бадмінтону. Інформацію про оплату ви отримаєте електронною поштою.", close: "Закрити", eyebrow: "Бадмінтон · Таллінн", title: ["Реєстрація", "на гру."], submit: "Надіслати реєстрацію", sending: "Надсилаємо…", fallbackText: "Автоматичне надсилання не спрацювало. Ми відкрили підготовлений лист — надішліть його, щоб заявка не загубилася.", fallbackLink: "Відкрити лист ще раз", note: "📧 Після заповнення форми на вашу електронну пошту буде надіслано рахунок для оплати.",
      fields: { name: "Імʼя та прізвище латиницею", age: "Вік", contact: "Контактний номер телефону та нікнейм у Telegram", email: "Email" },
    },
  },
  svoi: {
    kicker: "05 / Молодь",
    title: ["СВОЇ club.", "Більше, ніж", "просто ігри."],
    description: "Молодіжний клуб СУМ для підлітків та молоді 11–20 років. У СВОЇ club не потрібно бути кимось іншим, щоб стати своїм. Тут можна бути собою, знайомитися, помилятися, перемагати, програвати, жартувати та просто добре проводити час.",
    heroAlt: "Настільні ігри, картки та кубики на столі",
    sectionLabel: "Ігри та живе спілкування",
    sectionTitle: ["Граємо.", "Стаємо своїми."],
    sectionText: "Без уроків, оцінок і домашніх завдань. Настільні ігри, «Мафія», квізи, командні змагання та розмови українською, які допомагають зберігати зв’язок з Україною.",
    info: [
      { label: "Вік", value: "11–20 років" },
      { label: "Розклад", value: "Четвер · 18:45–19:45" },
      { label: "Формат", value: "Настільні та стратегічні ігри, «Мафія», квізи" },
      { label: "Вартість", value: "5 € — одна зустріч\nДля учасників інших платних активностей СУМ і VOLYA — знижка 10%", note: "Рахунок на оплату приходить після реєстрації." },
      { label: "Атмосфера", value: "Друзі, однодумці та дружнє українськомовне середовище" },
      { label: "Старт", value: "5 листопада", address: "Maneeži 3, 4 поверх" },
    ],
    coinsLabel: "Клубні бонуси",
    coinsTitle: ["СВОЇ", "coins."],
    coinsIntro: "За кожну оплачену зустріч учасник отримує один клубний жетон.",
    coins: [
      { value: "8", text: "жетонів = безкоштовна зустріч" },
      { value: "12", text: "жетонів = подарунок від клубу" },
      { value: "+1", text: "жетон, якщо приведеш нового друга" },
    ],
    registration: {
      trigger: "Реєстрація до СВОЇ club", closeAria: "Закрити реєстрацію", successLabel: "Надіслано ✓", thanks: "Дякуємо!", successText: "Реєстрацію надіслано. Рахунок для оплати надійде на вказану електронну пошту.", close: "Закрити", eyebrow: "СВОЇ CLUB · ТАЛЛІНН", title: ["Реєстрація", "до клубу."], submit: "Надіслати реєстрацію", sending: "Надсилаємо…", fallbackText: "Автоматичне надсилання не спрацювало. Ми відкрили підготовлений лист — надішліть його, щоб заявка не загубилася.", fallbackLink: "Відкрити лист ще раз",
      lead: "Щочетверга · 18:45–19:45 ·", address: "Maneeži 3, 4 поверх", firstMeeting: "Перша зустріч — 5 листопада.",
      dateHint: "Оберіть четвер, починаючи з 5 листопада.", dateError: "Оберіть четвер для зустрічі клубу.", payerHint: "Для неповнолітнього учасника вкажіть ім’я одного з батьків.",
      sections: { visit: "Зустріч та учасник", activity: "Участь в інших активностях", contacts: "Контакти та рахунок", media: "Фото та відео" },
      activities: [
        { value: "school", label: "Школа вихідного дня СУМ" },
        { value: "volya", label: "VOLYA" },
        { value: "badminton", label: "Бадмінтон" },
        { value: "hub", label: "CYM hub" },
        { value: "none", label: "Не є учасником інших активностей СУМ або VOLYA" },
      ],
      consentYes: "Так", consentNo: "Ні",
      priceNote: "Вартість зустрічі — 5 €. Для учасників інших платних активностей СУМ і VOLYA діє знижка 10%.",
      note: "Після реєстрації на вказану електронну пошту надходить рахунок для оплати.",
      fields: {
        visitDate: "На яку дату реєструєтеся?",
        age: "Вік учасника",
        name: "Ім’я та прізвище учасника латиницею",
        otherActivity: "Чи є учасником платних активностей СУМ в Естонії або VOLYA?",
        phone: "Контактний номер телефону",
        instagram: "Нікнейм в Instagram",
        telegram: "Нікнейм в Telegram",
        email: "Email",
        payerName: "Ім’я та прізвище для рахунку латиницею",
        filming: "Дозвіл на фото та відеозйомку",
        materials: "Дозвіл на використання фото та відеоматеріалів у рамках роботи СУМ в Естонії",
      },
    },
  },
  hub: {
    kicker: "04 / Після школи",
    title: ["CYM Hub.", "Твій простір", "після школи!"],
    description: "Затишний освітньо-дозвіллєвий простір у CYM space: домашні завдання, творчість, ігри та відпочинок у дружньому українськомовному середовищі.",
    heroAlt: "Світлий простір із навчальними матеріалами, книжками та настільною грою",
    sectionLabel: "Простір після уроків",
    sectionTitle: ["Час для справ.", "І для себе."],
    about: [
      "CYM Hub — місце, куди діти можуть приходити після школи, поки батьки працюють. Тут можна виконати завдання, перепочити, поспілкуватися з друзями й обрати, чим зайнятися далі.",
      "Це не школа й не додаткові уроки: дитина проводить час у комфортній атмосфері, під наглядом дорослих і без обов’язкової програми.",
    ],
    info: [
      { label: "Дні", value: "Понеділок і середа" },
      { label: "Час", value: "14:00–17:00" },
      { label: "Місце", value: "CYM space", address: "Maneeži 3, Tallinn" },
      { label: "Викладачка", value: "Маргарита Винниченко" },
      { label: "Вартість", value: "3 € / година", note: "Мінімум 3 € за відвідування" },
      { label: "Відвідування", value: "Гнучкий графік", note: "Попередня реєстрація обов’язкова" },
    ],
    optionsLabel: "Можливості CYM Hub",
    optionsTitle: ["Що можна робити", "після школи?"],
    options: [
      { kicker: "01 / Навчання", title: "Домашні завдання", text: "Виконувати шкільні завдання самостійно або з допомогою викладача, розібратися зі складними темами й підготуватися до контрольної." },
      { kicker: "02 / Творчість", title: "Малювати й майструвати", text: "Створювати поробки, малювати та виконувати творчі завдання для школи." },
      { kicker: "03 / Ігри", title: "Настільні ігри", text: "Грати з друзями в настільні, логічні та розвивальні ігри." },
      { kicker: "04 / Пауза", title: "Читати й відпочивати", text: "Почитати улюблену книжку або просто провести час у спокійній атмосфері після навчального дня." },
      { kicker: "05 / Перекус", title: "Чай та перекус", text: "Випити чаю й перекусити їжею, принесеною із собою, щоб відновити сили." },
      { kicker: "06 / Друзі", title: "Спілкуватися", text: "Знайти однодумців і нових друзів у живому українськомовному середовищі." },
    ],
    principlesLabel: "Наші принципи",
    principlesTitle: ["Простір із", "турботою."],
    principlesIntro: "Дитина сама обирає, як провести час. Ми підтримуємо її самостійність і створюємо безпечні умови для навчання та відпочинку.",
    principles: [
      { title: "Безпечний простір", text: "Протягом усього перебування діти знаходяться під наглядом викладача." },
      { title: "Допомога без тиску", text: "Пояснюємо незрозуміле й підтримуємо самостійність. CYM Hub не замінює індивідуальних занять із репетитором." },
      { title: "Відпочинок без гаджетів", text: "Заохочуємо живе спілкування, творчість та ігри. Гаджети можна використовувати для навчання і зв’язку з батьками." },
      { title: "Українськомовне середовище", text: "Допомагаємо дітям в Естонії регулярно спілкуватися українською й зберігати зв’язок з українською культурою." },
      { title: "Свобода вибору", text: "Немає обов’язкової програми: можна навчатися, читати, творити, грати чи відпочивати." },
    ],
    pricingLabel: "Гнучкий графік",
    pricingTitle: ["Приходьте, коли", "зручно."],
    pricingIntro: "Дитина може приходити у зручний час у межах роботи CYM Hub та залишатися на необхідну кількість годин. Мінімальна вартість одного відвідування — 3 €.",
    pricingPoints: [
      { title: "Оплата наприкінці місяця", text: "Батьки отримують рахунок за фактичний час перебування дитини." },
      { title: "Реєстрація заздалегідь", text: "Повідомте орієнтовний час візиту, щоб ми могли спланувати кількість учасників." },
    ],
    pricingPanelTitle: "Приклад вартості",
    prices: [
      { label: "1 година", value: "3 €" },
      { label: "1,5 години", value: "4,50 €" },
      { label: "2 години", value: "6 €" },
      { label: "2,5 години", value: "7,50 €" },
      { label: "3 години", value: "9 €" },
    ],
    pricingFoot: "Понеділок і середа · 14:00–17:00\nCYM space, Maneeži 3, Tallinn",
    teacherLabel: "Хто працює з дітьми",
    teacherTitle: ["Поруч є", "підтримка."],
    teacherIntro: "Завдання викладачки — створити дружню атмосферу, у якій кожна дитина почуватиметься комфортно та зможе отримати потрібну допомогу.",
    teacherName: "Маргарита Винниченко",
    teacherRole: "Викладачка української мови Школи вихідного дня СУМ · магістр соціальної педагогіки",
    teacherBio: [
      "Маргарита допомагатиме дітям із домашніми завданнями, організацією навчального процесу, творчими завданнями та дозвіллям.",
      "Дитина може звернутися по допомогу й водночас самостійно обирати заняття до вподоби.",
    ],
    whyLabel: "Навіщо CYM Hub",
    whyTitle: ["Після школи — час,", "наповнений змістом."],
    whyIntro: "Ми створюємо місце, де діти не залишаються самі після уроків, отримують підтримку й проводять час із користю та живим спілкуванням.",
    why: [
      { title: "Для дітей", text: "Друзі, допомога з навчанням, відпочинок і комфортне середовище." },
      { title: "Для батьків", text: "Впевненість, що дитина під наглядом дорослого, може виконати завдання і не проводить увесь вільний час із гаджетами." },
      { title: "Для громади", text: "Ще один простір, який об’єднує українських дітей в Естонії та підтримує українську мову й культуру." },
    ],
    closingLabel: "CYM Hub",
    closingTitle: ["Твій простір", "після школи!"],
    closingText: "Навчайся. Відпочивай. Спілкуйся. Будь серед своїх!",
    registration: {
      trigger: "Реєстрація до CYM Hub", closeAria: "Закрити реєстрацію", successLabel: "Надіслано ✓", thanks: "Дякуємо!", successText: "Реєстрацію надіслано. Рахунок за фактичний час перебування надійде наприкінці місяця.", close: "Закрити", eyebrow: "CYM HUB · ТАЛЛІНН", title: ["Реєстрація", "до CYM Hub."], submit: "Надіслати реєстрацію", sending: "Надсилаємо…", fallbackText: "Автоматичне надсилання не спрацювало. Ми відкрили підготовлений лист — надішліть його, щоб заявка не загубилася.", fallbackLink: "Відкрити лист ще раз",
      lead: "Понеділок і середа · 14:00–17:00 · CYM space,", address: "Maneeži 3, Tallinn",
      dateHint: "Оберіть понеділок або середу.", dateError: "Оберіть понеділок або середу.", payerHint: "Вкажіть ім’я одного з батьків або платника рахунку.",
      sections: { visit: "Дата та учасник", contacts: "Контакти та рахунок", media: "Фото та відео" },
      consentYes: "Так", consentNo: "Ні",
      priceNote: "Оплата — 3 € / година. Наприкінці місяця батьки отримують рахунок за фактичний час перебування дитини в CYM Hub.",
      note: "Після реєстрації ми підтвердимо візит. Рахунок надходить наприкінці місяця.",
      fields: {
        visitDate: "Дата, на яку реєструєтеся",
        age: "Вік учасника",
        name: "Ім’я та прізвище учасника латиницею",
        nameUk: "Ім’я та прізвище учасника кирилицею",
        phone: "Контактний номер телефону",
        telegram: "Нікнейм у Telegram",
        email: "Email",
        payerName: "Ім’я та прізвище для рахунку латиницею",
        filming: "Дозвіл на фото та відеозйомку",
        materials: "Дозвіл на використання фото та відеоматеріалів у рамках роботи СУМ в Естонії",
      },
    },
  },
  merch: {
    sectionLabel: "Обрати своє", title: ["Мерч, що", "говорить за нас."], lead: "Речі, що об’єднують спільноту й допомагають підтримувати діяльність Спілки української молоді в Естонії.",
    products: [
      { name: "Футболка СУМ", description: "Футболка-поло з емблемою СУМ в Естонії. Доступна в темно-синьому та синьому кольорах." },
      { name: "Однострій СУМівця", description: "Однострій для юнака чи юначки — сорочка СУМівця для дітей і дорослих." },
      { name: "Футболка бадмінтон СУМ", description: "Чорна спортивна футболка СУМ із прізвищем гравця на спині." },
    ],
    order: {
      order: "Замовити", closeForm: "Закрити форму", successLabel: "Надіслано ✓", thanks: "Дякуємо!", successText: "Замовлення надіслано до таблиці. Команда зв’яжеться з вами щодо оплати й отримання.", close: "Закрити", eyebrow: "Мерч СУМ в Естонії", title: "Замовити", selectedProduct: "Обраний товар", shirtType: "Тип футболки", color: "Колір", navy: "Темно-синій", blue: "Синій", uniformType: "Тип однострою", women: "Жіноча", men: "Чоловіча", teen: "Підліткова", kids: "Дитяча", child: "Дитячий", adult: "Дорослий", childSuffix: "дитяча", adultSuffix: "доросла", size: "Розмір", chooseSize: "Оберіть розмір", openSizeGuide: "Відкрити розмірну сітку", quantity: "Кількість", participantName: "Імʼя та прізвище учасника колективу", email: "Email", details: "Додати деталі замовлення", submit: "Надіслати запит", sending: "Надсилаємо…", fallbackText: "Автоматичне надсилання не спрацювало. Ми відкрили підготовлений лист — надішліть його, щоб заявка не загубилася.", fallbackLink: "Відкрити лист ще раз", note: "Після підтвердження замовлення команда зв’яжеться з вами щодо оплати й отримання.", closeSizeGuide: "Закрити розмірну сітку", sizeGuide: "Розмірна сітка", sizeGuideTitle: ["Знайди свій", "розмір."], poloWomen: "Жіноча футболка-поло", poloMen: "Чоловіча футболка-поло", poloKids: "Дитяча футболка-поло", allMeasurements: "Усі виміри в сантиметрах", sizeColumn: "Розмір", widthColumn: "Ширина виробу", lengthColumn: "Довжина виробу", poloMeasureNote: "Ширину вимірюють по лінії грудей на рівно розкладеному виробі.", poloKidsMeasureNote: "Дані наведені з інформативною метою і можуть відхилятися від вказаних у допустимих межах.", uniformChild: "Дитячий однострій", uniformAdult: "Дорослий однострій", parameterColumn: "Параметр", uniformRows: ["Ширина сорочки по лінії грудей", "Ширина спинки", "Довжина рукава", "Довжина сорочки", "Обхват шиї"], uniformMeasureNote: "Порівняйте виміри з одягом, який добре сидить, щоб точніше обрати розмір.", sizeGuideAlt: "Розмірна сітка",
    },
  },
};

export const dictionaries: Record<Locale, Dictionary> = { uk, et, en };

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
