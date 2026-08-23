import Header from "../Header";
import { getDictionary, localizedPath, type Locale } from "../i18n";
import MerchOrder, { type ProductId } from "./MerchOrder";

const productConfig: Array<{ id: ProductId; price: string; type: string; image: string }> = [
  { id: "polo", price: "15 €", type: "shirt", image: "/assets/sum-polo-light-v2.webp" },
  { id: "uniform", price: "30 €", type: "uniform", image: "/assets/sum-uniform-light-v3.webp" },
  { id: "badminton", price: "10 €", type: "badminton-shirt", image: "/assets/sum-badminton-shirt-light-v2.webp" },
];

export default function MerchPage({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const copy = dictionary.merch;

  return <main lang={locale}>
    <Header locale={locale} currentPath="/merch" />
    <section className="merch-section section">
      <div className="section-head"><div className="section-label">{copy.sectionLabel}</div><h2>{copy.title[0]}<br /><i>{copy.title[1]}</i></h2><p className="merch-lead">{copy.lead}</p></div>
      <div className="merch-grid">
        {copy.products.map((productCopy, index) => {
          const product = productConfig[index];
          return <article className="merch-card" key={product.id}><div className={`merch-visual ${product.type}`}><img className="merch-product-photo" src={product.image} alt={productCopy.name} loading="lazy" decoding="async" /></div><div className="merch-card-copy"><h3>{productCopy.name}</h3><p>{productCopy.description}</p><div className="merch-card-footer"><strong>{product.price}</strong><MerchOrder product={{ id: product.id, name: productCopy.name, price: product.price }} copy={copy.order} /></div></div></article>;
        })}
      </div>
    </section>
    <footer><span>© {new Date().getFullYear()} {dictionary.common.copyright}</span><a href={localizedPath(locale)}>{dictionary.common.home}</a></footer>
  </main>;
}
