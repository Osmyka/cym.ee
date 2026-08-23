"use client";

import { FormEvent, useState } from "react";
import { submitWebsiteForm } from "../form-delivery";
import type { Dictionary } from "../i18n";

export type ProductId = "polo" | "uniform" | "badminton";
type SubmitStatus = "idle" | "submitting" | "sent" | "fallback";

type Product = {
  id: ProductId;
  name: string;
  price: string;
};

const poloSizeRows = {
  women: [
    ["XS (42)", "42", "56"], ["S (44)", "44", "57"], ["M (46)", "46–47", "59"],
    ["L (48)", "48–49", "61"], ["XL (50)", "50–51", "63"], ["2XL (52)", "52–53", "65"], ["3XL (54–56)", "56–57", "70"],
  ],
  men: [
    ["XS", "45", "64"], ["S", "47", "67"], ["M", "50", "68"], ["L", "53", "71,5"],
    ["XL", "55", "74"], ["2XL", "58", "75"], ["3XL", "62", "78"], ["4XL", "66–67", "80"], ["5XL", "72–73", "80"],
  ],
};

const uniformSizeCharts = {
  women: {
    sizes: ["S", "M", "L"],
    rows: [
      ["84", "90", "96"],
      ["34", "36", "38"],
      ["49", "54", "58"],
      ["58", "62", "66"],
      ["34", "36", "38"],
    ],
  },
  men: {
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
    rows: [
      ["96", "100", "104", "108", "112", "116", "122"],
      ["40", "41", "42", "43", "44", "46", "47"],
      ["62", "63", "64", "65", "66", "67", "68"],
      ["70", "71", "73", "74", "75", "76", "78"],
      ["38", "39", "40", "41", "42", "44", "45"],
    ],
  },
};

export default function MerchOrder({ product, copy }: { product: Product; copy: Dictionary["merch"]["order"] }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [fallbackHref, setFallbackHref] = useState("");
  const [startedAt, setStartedAt] = useState(0);
  const [fit, setFit] = useState<"women" | "men">("women");
  const [badmintonFit, setBadmintonFit] = useState<"men" | "women" | "teen">("men");
  const [sizeOpen, setSizeOpen] = useState(false);

  const shirtSizes = fit === "women"
    ? ["XS (42)", "S (44)", "M (46)", "L (48)", "XL (50)", "2XL (52)", "3XL (54–56)"]
    : ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"];
  const uniformSizes = fit === "women" ? ["S", "M", "L"] : ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  const badmintonSizes = badmintonFit === "men"
    ? ["S", "M", "L", "XL", "XXL", "XXXL"]
    : badmintonFit === "women"
      ? ["XS", "S", "M", "L", "XL"]
      : ["128", "134", "140", "146", "152", "158", "164", "170"];
  const badmintonSizeImages = {
    men: "/assets/size-men.webp",
    women: "/assets/size-women.webp",
    teen: "/assets/size-kids.webp",
  };
  const badmintonFitLabels = { men: copy.men, women: copy.women, teen: copy.teen };

  function openForm() {
    setStatus("idle");
    setFallbackHref("");
    setStartedAt(Date.now());
    setOpen(true);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    const result = await submitWebsiteForm({
      form: event.currentTarget,
      kind: "merch",
      productId: product.id,
      startedAt,
      subject: `Замовлення: ${product.name}`,
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
    <button className="merch-order-link" type="button" onClick={openForm}>{copy.order} <span>↗</span></button>
    {open && <div className="registration-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <section className="registration-modal" role="dialog" aria-modal="true" aria-labelledby="merch-order-title">
        <button className="registration-close" type="button" aria-label={copy.closeForm} onClick={() => setOpen(false)}>×</button>
        {status === "sent" ? <div className="registration-success"><p className="section-label">{copy.successLabel}</p><h2>{copy.thanks}</h2><p>{copy.successText}</p><button className="button button-dark" type="button" onClick={() => setOpen(false)}>{copy.close}</button></div> : <>
          <p className="section-label">{copy.eyebrow}</p>
          <h2 id="merch-order-title">{copy.title}<br /><i>{product.name}.</i></h2>
          <div className="selected-product"><span>{copy.selectedProduct}</span><strong>{product.name} — {product.price}</strong></div>
          <form className="registration-form" onSubmit={submit}>
            <label className="form-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
            <input type="hidden" name="product" value={product.name} />
            {product.id === "polo" && <>
              <fieldset className="shirt-type"><legend>{copy.shirtType}</legend><label><input type="radio" name="fit" value="women" checked={fit === "women"} onChange={() => setFit("women")} /><span>{copy.women}</span></label><label><input type="radio" name="fit" value="men" checked={fit === "men"} onChange={() => setFit("men")} /><span>{copy.men}</span></label></fieldset>
              <label>{copy.size}<select name="size" required defaultValue="" key={fit}><option value="" disabled>{copy.chooseSize}</option>{shirtSizes.map((size) => <option key={size}>{size}</option>)}</select></label>
            </>}
            {product.id === "uniform" && <>
              <fieldset className="shirt-type"><legend>{copy.uniformType}</legend><label><input type="radio" name="category" value="women" checked={fit === "women"} onChange={() => setFit("women")} /><span>{copy.child}</span></label><label><input type="radio" name="category" value="men" checked={fit === "men"} onChange={() => setFit("men")} /><span>{copy.adult}</span></label></fieldset>
              <label>{copy.size}<select name="size" required defaultValue="" key={`uniform-${fit}`}><option value="" disabled>{copy.chooseSize}</option>{uniformSizes.map((size) => <option key={size} value={size}>{size} — {fit === "women" ? copy.childSuffix : copy.adultSuffix}</option>)}</select></label>
            </>}
            {product.id === "badminton" && <>
              <fieldset className="shirt-type"><legend>{copy.shirtType}</legend>{(["men", "women", "teen"] as const).map((value) => <label key={value}><input type="radio" name="shirtType" value={value} checked={badmintonFit === value} onChange={() => setBadmintonFit(value)} /><span>{badmintonFitLabels[value]}</span></label>)}</fieldset>
              <label>{copy.size}<select name="size" required defaultValue="" key={`badminton-${badmintonFit}`}><option value="" disabled>{copy.chooseSize}</option>{badmintonSizes.map((size) => <option key={size}>{size}</option>)}</select></label>
            </>}
            <button className="size-guide-link" type="button" onClick={() => setSizeOpen(true)}>{copy.openSizeGuide}</button>
            <label>{copy.quantity}<input name="quantity" type="number" min="1" defaultValue="1" required /></label>
            <label>{copy.participantName}<input name="name" autoComplete="name" required /></label>
            <label>{copy.email}<input name="email" type="email" autoComplete="email" required /></label>
            <label>{copy.details}<textarea name="comment" rows={3} /></label>
            <button className="button button-dark" type="submit" disabled={status === "submitting"}>{status === "submitting" ? copy.sending : copy.submit} <span>↗</span></button>
            {status === "fallback" && <p className="form-delivery-error">{copy.fallbackText} <a href={fallbackHref}>{copy.fallbackLink}</a></p>}
            <p className="registration-note">{copy.note}</p>
          </form>
        </>}
      </section>
      {sizeOpen && <div className="size-guide-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSizeOpen(false); }}>
        <section className="size-guide-modal" role="dialog" aria-modal="true" aria-labelledby="size-guide-title">
          <button className="registration-close" type="button" aria-label={copy.closeSizeGuide} onClick={() => setSizeOpen(false)}>×</button>
          <p className="section-label">{copy.sizeGuide}</p>
          <h2 id="size-guide-title">{copy.sizeGuideTitle[0]}<br /><i>{copy.sizeGuideTitle[1]}</i></h2>
          {product.id === "badminton" && <><div className="size-guide-tabs" role="tablist">{(["men", "women", "teen"] as const).map((value) => <button key={value} type="button" role="tab" aria-selected={badmintonFit === value} className={badmintonFit === value ? "active" : ""} onClick={() => setBadmintonFit(value)}>{badmintonFitLabels[value]}</button>)}</div><div className="size-guide-image"><img src={badmintonSizeImages[badmintonFit]} alt={`${copy.sizeGuideAlt} — ${badmintonFitLabels[badmintonFit]}`} decoding="async" /></div></>}
          {product.id === "polo" && <><div className="size-guide-tabs" role="tablist"><button type="button" role="tab" aria-selected={fit === "women"} className={fit === "women" ? "active" : ""} onClick={() => setFit("women")}>{copy.women}</button><button type="button" role="tab" aria-selected={fit === "men"} className={fit === "men" ? "active" : ""} onClick={() => setFit("men")}>{copy.men}</button></div><div className="native-size-card"><div className="native-size-card-head"><span>{fit === "women" ? copy.poloWomen : copy.poloMen}</span><strong>{copy.allMeasurements}</strong></div><div className="native-size-table-wrap"><table className="native-size-table"><thead><tr><th>{copy.sizeColumn}</th><th>{copy.widthColumn}</th><th>{copy.lengthColumn}</th></tr></thead><tbody>{poloSizeRows[fit].map(([size, width, length]) => <tr key={size}><th scope="row">{size}</th><td>{width}</td><td>{length}</td></tr>)}</tbody></table></div><p>{copy.poloMeasureNote}</p></div></>}
          {product.id === "uniform" && <><div className="size-guide-tabs" role="tablist"><button type="button" role="tab" aria-selected={fit === "women"} className={fit === "women" ? "active" : ""} onClick={() => setFit("women")}>{copy.child}</button><button type="button" role="tab" aria-selected={fit === "men"} className={fit === "men" ? "active" : ""} onClick={() => setFit("men")}>{copy.adult}</button></div><div className="native-size-card"><div className="native-size-card-head"><span>{fit === "women" ? copy.uniformChild : copy.uniformAdult}</span><strong>{copy.allMeasurements}</strong></div><div className="native-size-table-wrap"><table className="native-size-table uniform-size-table"><thead><tr><th>{copy.parameterColumn}</th>{uniformSizeCharts[fit].sizes.map((size) => <th key={size}>{size}</th>)}</tr></thead><tbody>{uniformSizeCharts[fit].rows.map((values, rowIndex) => <tr key={copy.uniformRows[rowIndex]}><th scope="row">{copy.uniformRows[rowIndex]}</th>{values.map((value, index) => <td key={`${rowIndex}-${uniformSizeCharts[fit].sizes[index]}`}>{value}</td>)}</tr>)}</tbody></table></div><p>{copy.uniformMeasureNote}</p></div></>}
        </section>
      </div>}
    </div>}
  </>;
}
