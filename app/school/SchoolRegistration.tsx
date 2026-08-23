"use client";

import { FormEvent, useState } from "react";

export default function SchoolRegistration() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return <>
    <button className="button button-dark registration-trigger" type="button" onClick={() => { setSent(false); setOpen(true); }}>Реєстрація в школу <span>↗</span></button>
    {open && <div className="registration-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <section className="registration-modal" role="dialog" aria-modal="true" aria-labelledby="school-registration-title">
        <button className="registration-close" type="button" aria-label="Закрити форму" onClick={() => setOpen(false)}>×</button>
        {sent ? <div className="registration-success"><p className="section-label">Реєстрація до школи</p><h2>Дякуємо!</h2><p>Форму заповнено. Після підключення таблиці заявка автоматично передаватиметься адміністрації школи.</p><button className="button button-dark" type="button" onClick={() => setOpen(false)}>Закрити</button></div> : <>
          <p className="section-label">Школа вихідного дня СУМ</p>
          <h2 id="school-registration-title">Реєстрація<br /><i>до школи.</i></h2>
          <form className="registration-form" onSubmit={submit}>
            <label>Імʼя та прізвище дитини (латиницею)<input name="child_name" autoComplete="name" required /></label>
            <label>Вік учасника<input name="age" type="number" min="5" max="20" required /></label>
            <label>Школа, яку відвідує дитина<input name="school" required /></label>
            <label>Клас, який відвідує дитина у школі<input name="grade" required /></label>
            <label>Імʼя та прізвище одного із батьків (латиницею)<input name="parent_name" required /></label>
            <label>Контактний номер телефону, бажано з Telegram (+username, якщо є)<input name="contact" autoComplete="tel" required /></label>
            <label>E-mail<input name="email" type="email" autoComplete="email" required /></label>
            <label>Як довго ви мешкаєте в Естонії?<input name="time_in_estonia" required /></label>
            <label>Ваші запитання до адміністрації школи<textarea name="questions" rows={4} /></label>
            <button className="button button-dark" type="submit">Надіслати реєстрацію <span>↗</span></button>
          </form>
        </>}
      </section>
    </div>}
  </>;
}
