"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/content";

export function Header() {
  const { contact } = siteConfig;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-end gap-6 bg-[#faf9f6]/90 px-6 backdrop-blur-sm transition-all duration-300 md:gap-8 md:px-12 ${
        scrolled ? "border-b border-black/[0.08] py-4 backdrop-blur-md md:py-5" : "py-6 md:py-8"
      }`}
    >
      <a href={contact.sns.url} target="_blank" rel="noopener noreferrer" className="nav-link">
        {contact.sns.label}
      </a>
      <Link href="/#works" className="nav-link">
        Works
      </Link>
      <Link href="/#about" className="nav-link">
        About
      </Link>
    </header>
  );
}
