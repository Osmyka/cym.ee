/* eslint-disable @next/next/no-html-link-for-pages -- роутер vinext падає на кліку по <Link>, тому звичайні <a> */

export default function Header() {
  return (
    <header className="site-header">
      <a className="logo" href="/" aria-label="СУМ в Естонії — головна">
        <img src="/assets/sum-logo-cropped.png" alt="" />
        <span><b>Спілка української молоді</b><small>в Естонії</small></span>
      </a>
      <nav aria-label="Головна навігація">
        {/*
          Клієнтський роутер vinext кидає помилку на кліку й губить hash — навігація через звичайні <a>.
        */}
        <a href="/#about">Про нас</a><a href="/#activities">Напрямки</a><a href="/merch">Мерч</a><a href="/#gallery">Галерея</a><a href="/#contact">Контакти</a>
      </nav>
    </header>
  );
}
