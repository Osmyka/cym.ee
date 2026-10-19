"use client";

import { FormEvent, useState } from "react";
import { submitWebsiteForm } from "../form-delivery";
import type { Dictionary } from "../i18n";

type SubmitStatus = "idle" | "submitting" | "sent" | "fallback";
type Copy = Dictionary["svoi"]["registration"];

const mapUrl = "https://www.google.com/maps/search/?api=1&query=Manee%C5%BEi+3+Tallinn";

function validateVisitDate(input: HTMLInputElement, message: string) {
  if (!input.value) {
    input.setCustomValidity("");
    return;
  }
  const date = new Date(`${input.value}T12:00:00`);
  input.setCustomValidity(date.getDay() === 4 ? "" : message);
}

export default function SvoiClubRegistration({ copy }: { copy: Copy }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [fallbackHref, setFallbackHref] = useState("");
  const [startedAt, setStartedAt] = useState(0);

  function openForm() {
    setStatus("idle");
    setFallbackHref("");
    setStartedAt(Date.now());
    setOpen(true);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const dateInput = event.currentTarget.elements.namedItem("visit_date");
    if (dateInput instanceof HTMLInputElement) validateVisitDate(dateInput, copy.dateError);
    if (!event.currentTarget.reportValidity()) return;

    setStatus("submitting");
    const result = await submitWebsiteForm({
      form: event.currentTarget,
      kind: "svoi",
      startedAt,
      subject: "Реєстрація до СВОЇ club",
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
      <section className="registration-modal" role="dialog" aria-modal="true" aria-labelledby="svoi-registration-title">
        <button className="registration-close" type="button" aria-label={copy.closeAria} onClick={() => setOpen(false)}>×</button>
        {status === "sent" ? <div className="registration-success"><p className="section-label">{copy.successLabel}</p><h2>{copy.thanks}</h2><p>{copy.successText}</p><button className="button button-dark" type="button" onClick={() => setOpen(false)}>{copy.close}</button></div> : <>
          <p className="section-label">{copy.eyebrow}</p>
          <h2 id="svoi-registration-title">{copy.title[0]}<br /><i>{copy.title[1]}</i></h2>
          <p className="svoi-lead">{copy.lead} <a className="map-address" href={mapUrl} target="_blank" rel="noreferrer">{copy.address}</a>. {copy.firstMeeting}</p>
          <form className="registration-form" onSubmit={submit}>
            <label className="form-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
            <p className="form-section-label">{copy.sections.visit}</p>
            <div className="form-grid-2">
              <label>{copy.fields.visitDate}<input name="visit_date" type="date" min="2026-11-05" required onInput={(event) => validateVisitDate(event.currentTarget, copy.dateError)} /><small className="field-hint">{copy.dateHint}</small></label>
              <label>{copy.fields.age}<input name="age" type="number" min="11" max="20" inputMode="numeric" placeholder="11–20" required /></label>
            </div>
            <label>{copy.fields.name}<input name="name" autoComplete="name" placeholder="Anna Ivanenko" required /></label>
            <p className="form-section-label">{copy.sections.activity}</p>
            <fieldset className="choice-group">
              <legend>{copy.fields.otherActivity}</legend>
              <div className="choice-options">
                {copy.activities.map((activity) => <label className={activity.value === "none" ? "choice-option full" : "choice-option"} key={activity.value}><input type="radio" name="other_activity" value={activity.value} required /><span>{activity.label}</span></label>)}
              </div>
            </fieldset>
            <p className="registration-note">{copy.priceNote}</p>
            <p className="form-section-label">{copy.sections.contacts}</p>
            <label>{copy.fields.phone}<input name="contact" type="tel" autoComplete="tel" placeholder="+372 …" required /></label>
            <div className="form-grid-2">
              <label>{copy.fields.instagram}<input name="instagram" type="text" placeholder="@nickname" autoComplete="off" required /></label>
              <label>{copy.fields.telegram}<input name="telegram" type="text" placeholder="@nickname" autoComplete="off" required /></label>
            </div>
            <label>{copy.fields.email}<input name="email" type="email" autoComplete="email" placeholder="name@example.com" required /></label>
            <label>{copy.fields.payerName}<input name="payer_name" autoComplete="name" placeholder="Olena Ivanenko" required /><small className="field-hint">{copy.payerHint}</small></label>
            <p className="form-section-label">{copy.sections.media}</p>
            <fieldset className="choice-group">
              <legend>{copy.fields.filming}</legend>
              <div className="choice-options">
                <label className="choice-option"><input type="radio" name="filming" value="yes" required /><span>{copy.consentYes}</span></label>
                <label className="choice-option"><input type="radio" name="filming" value="no" /><span>{copy.consentNo}</span></label>
              </div>
            </fieldset>
            <fieldset className="choice-group">
              <legend>{copy.fields.materials}</legend>
              <div className="choice-options">
                <label className="choice-option"><input type="radio" name="materials" value="yes" required /><span>{copy.consentYes}</span></label>
                <label className="choice-option"><input type="radio" name="materials" value="no" /><span>{copy.consentNo}</span></label>
              </div>
            </fieldset>
            <button className="button button-dark" type="submit" disabled={status === "submitting"}>{status === "submitting" ? copy.sending : copy.submit} <span>↗</span></button>
            {status === "fallback" && <p className="form-delivery-error">{copy.fallbackText} <a href={fallbackHref}>{copy.fallbackLink}</a></p>}
            <p className="registration-note">{copy.note}</p>
          </form>
        </>}
      </section>
    </div>}
  </>;
}
