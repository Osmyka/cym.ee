"use client";

import { useEffect, useState } from "react";

export type MobileNavId = "about" | "activities" | "merch" | "gallery" | "contact";

type MobileNavigationProps = {
  currentPath: string;
  ariaLabel: string;
  items: { id: MobileNavId; href: string; label: string }[];
};

const sectionIds: Exclude<MobileNavId, "merch">[] = ["about", "activities", "gallery", "contact"];

function activePage(currentPath: string): MobileNavId {
  if (currentPath === "/merch") return "merch";
  if (currentPath === "/school" || currentPath === "/badminton") return "activities";
  return "about";
}

function MobileNavIcon({ id }: { id: MobileNavId }) {
  const commonProps = {
    className: "mobile-nav-icon",
    viewBox: "0 0 32 32",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
    focusable: false,
  } as const;

  if (id === "about") {
    return (
      <svg {...commonProps}>
        <circle cx="11.5" cy="10" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M4.5 26c.5-6 3-9 7-9s6.5 3 7 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="23.5" cy="9" r="3.5" fill="var(--yellow)" />
        <path d="M20.5 17.5c3.9.3 6.2 2.8 6.6 7.5" stroke="var(--green)" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === "activities") {
    return (
      <svg {...commonProps}>
        <rect x="4" y="4" width="10" height="10" rx="3" stroke="currentColor" strokeWidth="2" />
        <rect x="18" y="4" width="10" height="10" rx="3" fill="var(--yellow)" />
        <rect x="4" y="18" width="10" height="10" rx="3" fill="var(--green)" />
        <path d="M19 23h8M23 19v8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === "merch") {
    return (
      <svg {...commonProps}>
        <path d="M11 5.5 5 8.8l2.6 5.4 3-1.4V27h10.8V12.8l3 1.4L27 8.8l-6-3.3c-1.2 2-2.8 3-5 3s-3.8-1-5-3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="18.1" cy="15.5" r="3" fill="var(--green)" />
        <path d="m16.8 15.5.9.9 1.7-2" stroke="var(--yellow)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (id === "gallery") {
    return (
      <svg {...commonProps}>
        <rect x="3.5" y="5" width="25" height="22" rx="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="22.5" cy="11" r="3" fill="var(--yellow)" />
        <path d="m6.5 24 7.2-8 4.3 4.4 2.8-2.9 4.7 6.5" stroke="var(--green)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <rect x="3.5" y="6" width="25" height="20" rx="4" stroke="currentColor" strokeWidth="2" />
      <path d="m6 9 10 8 10-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="25.5" cy="7" r="4" fill="var(--yellow)" stroke="#fff" strokeWidth="2" />
      <path d="M7 23.5h7" stroke="var(--green)" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export default function MobileNavigation({ currentPath, ariaLabel, items }: MobileNavigationProps) {
  const [active, setActive] = useState<MobileNavId>(() => activePage(currentPath));
  const visibleActive = currentPath === "/" ? active : activePage(currentPath);

  useEffect(() => {
    if (currentPath !== "/") return;

    let frame = 0;
    const updateActiveSection = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const marker = window.innerHeight * 0.38;
        let visibleSection: MobileNavId = "about";

        for (const id of sectionIds) {
          const section = document.getElementById(id);
          if (section && section.getBoundingClientRect().top <= marker) visibleSection = id;
        }

        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24) {
          visibleSection = "contact";
        }

        setActive(visibleSection);
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    window.addEventListener("hashchange", updateActiveSection);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      window.removeEventListener("hashchange", updateActiveSection);
    };
  }, [currentPath]);

  return (
    <nav className="mobile-bottom-nav" aria-label={ariaLabel}>
      {items.map((item) => (
        <a
          className={visibleActive === item.id ? "active" : undefined}
          href={item.href}
          aria-current={visibleActive === item.id ? "page" : undefined}
          onClick={() => setActive(item.id)}
          key={item.id}
        >
          <span className="mobile-nav-icon-shell">
            <MobileNavIcon id={item.id} />
          </span>
          <span className="mobile-nav-label">{item.label}</span>
        </a>
      ))}
    </nav>
  );
}
