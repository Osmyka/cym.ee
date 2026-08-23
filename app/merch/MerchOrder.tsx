"use client";

import { FormEvent, useState } from "react";

type Product = {
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
    title: "Дитячий однострій",
    sizes: ["S", "M", "L"],
    rows: [
      ["Ширина сорочки по лінії грудей", "84", "90", "96"],
      ["Ширина спинки", "34", "36", "38"],
      ["Довжина рукава", "49", "54", "58"],
      ["Довжина сорочки", "58", "62", "66"],
      ["Обхват шиї", "34", "36", "38"],
    ],
  },
  men: {
    title: "Дорослий однострій",
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
    rows: [
      ["Ширина сорочки по лінії грудей", "96", "100", "104", "108", "112", "116", "122"],
      ["Ширина спинки", "40", "41", "42", "43", "44", "46", "47"],
      ["Довжина рукава", "62", "63", "64", "65", "66", "67", "68"],
      ["Довжина сорочки", "70", "71", "73", "74", "75", "76", "78"],
      ["Обхват шиї", "38", "39", "40", "41", "42", "44", "45"],
    ],
  },
};

export default function MerchOrder({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [fit, setFit] = useState<"women" | "men">("women");
  const [badmintonFit, setBadmintonFit] = useState<"men" | "women" | "teen">("men");
  const [sizeOpen, setSizeOpen] = useState(false);

  const shirtSizes = fit === "women"
    ? ["XS (42)", "S (44)", "M (46)", "L (48)", "XL (50)", "2XL (52)", "3XL (54–56)"]
    : ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"];
  const uniformSizes = fit === "women"
    ? ["S — дитяча", "M — дитяча", "L — дитяча"]
    : ["XS — доросла", "S — доросла", "M — доросла", "L — доросла", "XL — доросла", "XXL — доросла", "XXXL — доросла"];
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
  const badmintonFitLabels = { men: "Чоловіча", women: "Жіноча", teen: "Підліткова" };

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return <>
    <button className="merch-order-link" type="button" onClick={() => { setSent(false); setOpen(true); }}>Замовити <span>↗</span></button>
    {open && <div className="registration-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <section className="registration-modal" role="dialog" aria-modal="true" aria-labelledby="merch-order-title">
        <button className="registration-close" type="button" aria-label="Закрити форму" onClick={() => setOpen(false)}>×</button>
        {sent ? <div className="registration-success"><p className="section-label">Замовлення мерчу</p><h2>Дякуємо!</h2><p>Замовлення сформовано. Після підключення таблиці воно автоматично передаватиметься команді.</p><button className="button button-dark" type="button" onClick={() => setOpen(false)}>Закрити</button></div> : <>
          <p className="section-label">Мерч СУМ в Естонії</p>
          <h2 id="merch-order-title">Замовити<br /><i>{product.name}.</i></h2>
          <div className="selected-product"><span>Обраний товар</span><strong>{product.name} — {product.price}</strong></div>
          <form className="registration-form" onSubmit={submit}>
            <input type="hidden" name="product" value={product.name} />
            {product.name === "Футболка СУМ" && <>
              <fieldset className="shirt-type"><legend>Тип футболки</legend><label><input type="radio" name="fit" value="women" checked={fit === "women"} onChange={() => setFit("women")} /><span>Жіноча</span></label><label><input type="radio" name="fit" value="men" checked={fit === "men"} onChange={() => setFit("men")} /><span>Чоловіча</span></label></fieldset>
              <label>Розмір<select name="size" required defaultValue="" key={fit}><option value="" disabled>Оберіть розмір</option>{shirtSizes.map((size) => <option key={size}>{size}</option>)}</select></label>
            </>}
            {product.name === "Однострій СУМівця" && <>
              <fieldset className="shirt-type"><legend>Тип однострою</legend><label><input type="radio" name="category" value="women" checked={fit === "women"} onChange={() => setFit("women")} /><span>Дитячий</span></label><label><input type="radio" name="category" value="men" checked={fit === "men"} onChange={() => setFit("men")} /><span>Дорослий</span></label></fieldset>
              <label>Розмір<select name="size" required defaultValue="" key={`uniform-${fit}`}><option value="" disabled>Оберіть розмір</option>{uniformSizes.map((size) => <option key={size}>{size}</option>)}</select></label>
            </>}
            {product.name === "Футболка бадмінтон СУМ" && <>
              <fieldset className="shirt-type"><legend>Тип футболки</legend>{(["men", "women", "teen"] as const).map((value) => <label key={value}><input type="radio" name="shirtType" value={value} checked={badmintonFit === value} onChange={() => setBadmintonFit(value)} /><span>{badmintonFitLabels[value]}</span></label>)}</fieldset>
              <label>Розмір<select name="size" required defaultValue="" key={`badminton-${badmintonFit}`}><option value="" disabled>Оберіть розмір</option>{badmintonSizes.map((size) => <option key={size}>{size}</option>)}</select></label>
            </>}
            <button className="size-guide-link" type="button" onClick={() => setSizeOpen(true)}>Відкрити розмірну сітку</button>
            <label>Кількість<input name="quantity" type="number" min="1" defaultValue="1" required /></label>
            <label>Імʼя та прізвище учасника колективу<input name="name" autoComplete="name" required /></label>
            <label>Email<input name="email" type="email" autoComplete="email" required /></label>
            <label>Додати деталі замовлення<textarea name="comment" rows={3} /></label>
            <button className="button button-dark" type="submit">Надіслати запит <span>↗</span></button>
            <p className="registration-note">Після підтвердження замовлення команда зв’яжеться з вами щодо оплати й отримання.</p>
          </form>
        </>}
      </section>
      {sizeOpen && <div className="size-guide-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSizeOpen(false); }}>
        <section className="size-guide-modal" role="dialog" aria-modal="true" aria-labelledby="size-guide-title">
          <button className="registration-close" type="button" aria-label="Закрити розмірну сітку" onClick={() => setSizeOpen(false)}>×</button>
          <p className="section-label">Розмірна сітка</p>
          <h2 id="size-guide-title">Знайди свій<br /><i>розмір.</i></h2>
          {product.name === "Футболка бадмінтон СУМ" && <><div className="size-guide-tabs" role="tablist">{(["men", "women", "teen"] as const).map((value) => <button key={value} type="button" role="tab" aria-selected={badmintonFit === value} className={badmintonFit === value ? "active" : ""} onClick={() => setBadmintonFit(value)}>{badmintonFitLabels[value]}</button>)}</div><div className="size-guide-image"><img src={badmintonSizeImages[badmintonFit]} alt={`Розмірна сітка — ${badmintonFitLabels[badmintonFit]}`} decoding="async" /></div></>}
          {product.name === "Футболка СУМ" && <><div className="size-guide-tabs" role="tablist"><button type="button" role="tab" aria-selected={fit === "women"} className={fit === "women" ? "active" : ""} onClick={() => setFit("women")}>Жіноча</button><button type="button" role="tab" aria-selected={fit === "men"} className={fit === "men" ? "active" : ""} onClick={() => setFit("men")}>Чоловіча</button></div><div className="native-size-card"><div className="native-size-card-head"><span>{fit === "women" ? "Жіноча футболка-поло" : "Чоловіча футболка-поло"}</span><strong>Усі виміри в сантиметрах</strong></div><div className="native-size-table-wrap"><table className="native-size-table"><thead><tr><th>Розмір</th><th>Ширина виробу</th><th>Довжина виробу</th></tr></thead><tbody>{poloSizeRows[fit].map(([size, width, length]) => <tr key={size}><th scope="row">{size}</th><td>{width}</td><td>{length}</td></tr>)}</tbody></table></div><p>Ширину вимірюють по лінії грудей на рівно розкладеному виробі.</p></div></>}
          {product.name === "Однострій СУМівця" && <><div className="size-guide-tabs" role="tablist"><button type="button" role="tab" aria-selected={fit === "women"} className={fit === "women" ? "active" : ""} onClick={() => setFit("women")}>Дитячий</button><button type="button" role="tab" aria-selected={fit === "men"} className={fit === "men" ? "active" : ""} onClick={() => setFit("men")}>Дорослий</button></div><div className="native-size-card"><div className="native-size-card-head"><span>{uniformSizeCharts[fit].title}</span><strong>Усі виміри в сантиметрах</strong></div><div className="native-size-table-wrap"><table className="native-size-table uniform-size-table"><thead><tr><th>Параметр</th>{uniformSizeCharts[fit].sizes.map((size) => <th key={size}>{size}</th>)}</tr></thead><tbody>{uniformSizeCharts[fit].rows.map(([label, ...values]) => <tr key={label}><th scope="row">{label}</th>{values.map((value, index) => <td key={`${label}-${uniformSizeCharts[fit].sizes[index]}`}>{value}</td>)}</tr>)}</tbody></table></div><p>Порівняйте виміри з одягом, який добре сидить, щоб точніше обрати розмір.</p></div></>}
        </section>
      </div>}
    </div>}
  </>;
}
