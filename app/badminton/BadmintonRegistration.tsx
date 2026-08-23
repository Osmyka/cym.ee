"use client";

import { FormEvent, useState } from "react";

export default function BadmintonRegistration() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return <>
    <button className="button button-dark registration-trigger" type="button" onClick={() => { setSent(false); setOpen(true); }}>Реєстрація на бадмінтон <span>↗</span></button>
    {open && <div className="registration-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <section className="registration-modal" role="dialog" aria-modal="true" aria-labelledby="registration-title">
        <button className="registration-close" type="button" aria-label="Закрити форму" onClick={() => setOpen(false)}>×</button>
        {sent ? <div className="registration-success"><p className="section-label">Реєстрація</p><h2>Дякуємо!</h2><p>Форму заповнено. Після підключення таблиці заявка автоматично передаватиметься команді.</p><button className="button button-dark" type="button" onClick={() => setOpen(false)}>Закрити</button></div> : <>
          <p className="section-label">Бадмінтон · Таллінн</p>
          <h2 id="registration-title">Реєстрація<br /><i>на гру.</i></h2>
          <form className="registration-form" onSubmit={submit}>
            <label>Імʼя та прізвище латиницею<input name="name" autoComplete="name" required /></label>
            <label>Вік<input name="age" type="number" min="5" max="100" required /></label>
            <label>Контактний номер телефону та нікнейм у Telegram<input name="contact" autoComplete="tel" required /></label>
            <label>Email<input name="email" type="email" autoComplete="email" required /></label>
            <button className="button button-dark" type="submit">Надіслати реєстрацію <span>↗</span></button>
            <p className="registration-note">📧 Після заповнення форми на вашу електронну пошту буде надіслано рахунок для оплати.</p>
          </form>
        </>}
      </section>
    </div>}
  </>;
}
