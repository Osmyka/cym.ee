"use client";

import { FormEvent, useState } from "react";
import type { Dictionary } from "../i18n";

export default function BadmintonRegistration({ copy }: { copy: Dictionary["badminton"]["registration"] }) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return <>
    <button className="button button-dark registration-trigger" type="button" onClick={() => { setSent(false); setOpen(true); }}>{copy.trigger} <span>↗</span></button>
    {open && <div className="registration-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <section className="registration-modal" role="dialog" aria-modal="true" aria-labelledby="registration-title">
        <button className="registration-close" type="button" aria-label={copy.closeAria} onClick={() => setOpen(false)}>×</button>
        {sent ? <div className="registration-success"><p className="section-label">{copy.successLabel}</p><h2>{copy.thanks}</h2><p>{copy.successText}</p><button className="button button-dark" type="button" onClick={() => setOpen(false)}>{copy.close}</button></div> : <>
          <p className="section-label">{copy.eyebrow}</p>
          <h2 id="registration-title">{copy.title[0]}<br /><i>{copy.title[1]}</i></h2>
          <form className="registration-form" onSubmit={submit}>
            <label>{copy.fields.name}<input name="name" autoComplete="name" required /></label>
            <label>{copy.fields.age}<input name="age" type="number" min="5" max="100" required /></label>
            <label>{copy.fields.contact}<input name="contact" autoComplete="tel" required /></label>
            <label>{copy.fields.email}<input name="email" type="email" autoComplete="email" required /></label>
            <button className="button button-dark" type="submit">{copy.submit} <span>↗</span></button>
            <p className="registration-note">{copy.note}</p>
          </form>
        </>}
      </section>
    </div>}
  </>;
}
