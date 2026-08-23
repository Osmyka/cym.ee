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
          <span className={`mobile-nav-icon mobile-nav-icon-${item.id}`} aria-hidden="true" />
          <span className="mobile-nav-label">{item.label}</span>
        </a>
      ))}
    </nav>
  );
}
