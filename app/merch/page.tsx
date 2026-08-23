/* eslint-disable @next/next/no-html-link-for-pages -- роутер vinext падає на кліку по <Link>, тому звичайні <a> */
import Header from "../Header";
import MerchOrder from "./MerchOrder";

const products = [
  { name: "Футболка СУМ", price: "15 €", type: "shirt", image: "/assets/sum-polo-light-v2.webp", description: "Темно-синя футболка-поло з емблемою СУМ в Естонії." },
  { name: "Однострій СУМівця", price: "30 €", type: "uniform", image: "/assets/sum-uniform-light-v3.webp", description: "Однострій для юнака чи юначки — сорочка СУМівця для дітей і дорослих." },
  { name: "Футболка бадмінтон СУМ", price: "10 €", type: "badminton-shirt", image: "/assets/sum-badminton-shirt-light-v2.webp", description: "Чорна спортивна футболка СУМ із прізвищем гравця на спині." },
];

export default function MerchPage() {
  return <main>
    <Header />
    <section className="merch-section section"><div className="section-head"><div className="section-label">Обрати своє</div><h2>Мерч, що<br /><i>говорить за нас.</i></h2><p className="merch-lead">Речі, що об’єднують спільноту й допомагають підтримувати діяльність Спілки української молоді в Естонії.</p></div><div className="merch-grid">{products.map((product) => <article className="merch-card" key={product.name}><div className={`merch-visual ${product.type}`}>{product.image ? <img className="merch-product-photo" src={product.image} alt={product.name} loading="lazy" decoding="async" /> : <div className="merch-item-shape"><img src="/assets/sum-logo-cropped.png" alt="" /></div>}</div><div className="merch-card-copy"><h3>{product.name}</h3><p>{product.description}</p><div className="merch-card-footer"><strong>{product.price}</strong><MerchOrder product={product} /></div></div></article>)}</div></section>
    <footer><span>© {new Date().getFullYear()} СУМ в Естонії</span><a href="/">← На головну</a></footer>
  </main>;
}
