import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <Link className="logo" href="/" aria-label="СУМ в Естонії — головна">
        <img src="/assets/sum-logo-cropped.png" alt="" />
        <span><b>Спілка української молоді</b><small>в Естонії</small></span>
      </Link>
      <nav aria-label="Головна навігація">
        <Link href="/#about">Про нас</Link><Link href="/#activities">Напрямки</Link><Link href="/merch">Мерч</Link><Link href="/#gallery">Галерея</Link><Link href="/#contact">Контакти</Link>
      </nav>
    </header>
  );
}
