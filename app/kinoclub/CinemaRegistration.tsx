"use client";

import { FormEvent, useMemo, useState } from "react";
import { submitWebsiteForm } from "../form-delivery";
import type { Dictionary, Locale } from "../i18n";

type SubmitStatus = "idle" | "submitting" | "sent" | "fallback";
type Copy = Dictionary["cinema"]["registration"];

const dateLocales: Record<Locale, string> = {
  uk: "uk-UA",
  et: "et-EE",
  en: "en-GB",
};

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function tallinnParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Tallinn",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hourCycle: "h23",
    weekday: "short",
  }).formatToParts(date);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    hour: Number(get("hour").replace(/\D/g, "")),
    weekday: get("weekday"),
  };
}

export function upcomingMondays() {
  const { year, month, day, hour, weekday } = tallinnParts();
  const start = new Date(Date.UTC(year, month - 1, day));
  let offset = (1 - weekdays.indexOf(weekday) + 7) % 7;
  if (offset === 0 && hour >= 18) offset = 7;
  start.setUTCDate(start.getUTCDate() + offset);
  return Array.from({ length: 52 }, (_, index) => {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() + index * 7);
    return date.toISOString().slice(0, 10);
  });
}

export default function CinemaRegistration({ copy, locale }: { copy: Copy; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [minor, setMinor] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [fallbackHref, setFallbackHref] = useState("");
  const [startedAt, setStartedAt] = useState(0);
  const mondays = useMemo(() => upcomingMondays().map((value) => ({
    value,
    label: new Date(`${value}T12:00:00Z`).toLocaleDateString(dateLocales[locale], {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }),
  })), [locale]);

  function openForm() {
    setStatus("idle");
    setMinor(false);
    setFallbackHref("");
    setStartedAt(Date.now());
    setOpen(true);
  }

  function onAge(event: FormEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    const isMinor = value !== "" && Number(value) < 18;
    setMinor(isMinor);
    const representative = event.currentTarget.form?.elements.namedItem("representative_name");
    if (!isMinor && representative instanceof HTMLInputElement) representative.value = "";
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const dateField = form.elements.namedItem("session_date");
    if (dateField instanceof HTMLSelectElement) {
      dateField.setCustomValidity(upcomingMondays().includes(dateField.value) ? "" : copy.dateError);
    }
    if (!form.reportValidity()) return;

    setStatus("submitting");
    const result = await submitWebsiteForm({
      form,
      kind: "cinema",
      startedAt,
      subject: "Реєстрація до кіноклубу СУМ",
    });
    if (result.ok) {
      setStatus("sent");
      return;
    }
    setFallbackHref(result.mailto);
    setStatus("fallback");
    window.location.href = result.mailto;
  }

  return <>
    <button className="button button-dark registration-trigger" type="button" onClick={openForm}>{copy.trigger} <span>↗</span></button>
    {open && <div className="registration-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <section className="registration-modal cinema-modal" role="dialog" aria-modal="true" aria-labelledby="cinema-registration-title">
        <button className="registration-close" type="button" aria-label={copy.closeAria} onClick={() => setOpen(false)}>×</button>
        {status === "sent" ? <div className="registration-success"><p className="section-label">{copy.successLabel}</p><h2>{copy.thanks}</h2><p>{copy.successText}</p><button className="button button-dark" type="button" onClick={() => setOpen(false)}>{copy.close}</button></div> : <>
          <p className="section-label">{copy.eyebrow}</p>
          <h2 id="cinema-registration-title">{copy.title[0]}<br /><i>{copy.title[1]}</i></h2>
          <p className="registration-note">{copy.schedule}</p>
          <form className="registration-form cinema-form" onSubmit={submit}>
            <label className="form-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
            <label>{copy.fields.sessionDate}<select name="session_date" required defaultValue="" onChange={(event) => event.currentTarget.setCustomValidity("")}><option value="" disabled>{copy.chooseDate}</option>{mondays.map((date) => <option key={date.value} value={date.value}>{date.label}</option>)}</select><small className="field-hint">{copy.dateHint}</small></label>
            <label>{copy.fields.name}<input name="name" autoComplete="name" placeholder="Anna Ivanenko" required /></label>
            <label>{copy.fields.age}<input name="age" type="number" min="1" max="110" inputMode="numeric" required onInput={onAge} /><small className="field-hint">{copy.ageHint}</small></label>
            <label hidden={!minor}>{copy.fields.representative}<input name="representative_name" autoComplete="name" placeholder="Olena Ivanenko" required={minor} /></label>
            <label>{copy.fields.phone}<input name="contact" type="tel" autoComplete="tel" placeholder="+372 …" required /></label>
            <label>{copy.fields.email}<input name="email" type="email" autoComplete="email" placeholder="name@example.com" /></label>
            <fieldset className="choice-group">
              <legend>{copy.fields.dataConsent} <span className="required-mark">*</span></legend>
              <label className="choice-option full"><input type="checkbox" name="data_consent" value="yes" required /><span>{copy.fields.dataConsentYes}</span></label>
            </fieldset>
            <fieldset className="choice-group">
              <legend>{copy.fields.filming}</legend>
              <label className="choice-option full"><input type="checkbox" name="filming" value="yes" /><span>{copy.fields.filmingYes}</span></label>
            </fieldset>
            <fieldset className="choice-group">
              <legend>{copy.fields.materials}</legend>
              <label className="choice-option full"><input type="checkbox" name="materials" value="yes" /><span>{copy.fields.materialsYes}</span></label>
            </fieldset>
            <p className="registration-note">{copy.consentNote}</p>
            <p className="registration-note">{copy.priceNote}</p>
            <button className="button button-dark" type="submit" disabled={status === "submitting"}>{status === "submitting" ? copy.sending : copy.submit} <span>↗</span></button>
            {status === "fallback" && <p className="form-delivery-error">{copy.fallbackText} <a href={fallbackHref}>{copy.fallbackLink}</a></p>}
            <p className="registration-note">{copy.note}</p>
          </form>
        </>}
      </section>
    </div>}
  </>;
}
