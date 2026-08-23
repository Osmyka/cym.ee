/* eslint-disable @next/next/no-html-link-for-pages -- якірні посилання мають бути звичайними <a> */
import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <Link className="logo" href="/" aria-label="СУМ в Естонії — головна">
        <img src="/assets/sum-logo-cropped.png" alt="" />
        <span><b>Спілка української молоді</b><small>в Естонії</small></span>
      </Link>
      <nav aria-label="Головна навігація">
        {/*
          Якірні посилання — звичайні <a>: клієнтський роутер губить hash і нікуди не скролить.
        */}
        <a href="/#about">Про нас</a><a href="/#activities">Напрямки</a><Link href="/merch">Мерч</Link><a href="/#gallery">Галерея</a><a href="/#contact">Контакти</a>
      </nav>
    </header>
  );
}
