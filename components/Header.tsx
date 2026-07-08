"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Github, Globe, Mail, Menu, X } from "lucide-react";
import { hasContactEmail, siteConfig } from "@/lib/content";

export function Header() {
  const { contact } = siteConfig;
  const showEmail = hasContactEmail(contact.email.address);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`site-header fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 px-6 backdrop-blur-sm transition-all duration-300 md:gap-8 md:px-12 ${
          scrolled ? "is-scrolled py-4 backdrop-blur-md md:py-5" : "py-6 md:py-8"
        }`}
      >
        <Link href="/" className="header-brand nav-link" aria-label="Top">
          Kumano Yuichi
        </Link>

        <nav className="hidden items-center gap-4 md:flex md:gap-6">
          <Link href="/#works" className="nav-link">
            Works
          </Link>
          <Link href="/#about" className="nav-link">
            About
          </Link>
          <span className="nav-divider" aria-hidden="true" />
          <a
            href={contact.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-icon-link"
            aria-label="GitHub"
          >
            <Github aria-hidden="true" size={18} strokeWidth={1.75} />
          </a>
          <a
            href={contact.sns.url}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-icon-link"
            aria-label={contact.sns.label}
          >
            <Globe aria-hidden="true" size={18} strokeWidth={1.75} />
          </a>
          {showEmail && (
            <a href={`mailto:${contact.email.address}`} className="nav-icon-link" aria-label="Email">
              <Mail aria-hidden="true" size={18} strokeWidth={1.75} />
            </a>
          )}
        </nav>

        <button
          type="button"
          className="mobile-nav-toggle md:hidden"
          aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <X aria-hidden="true" size={20} strokeWidth={1.75} />
          ) : (
            <Menu aria-hidden="true" size={20} strokeWidth={1.75} />
          )}
        </button>
      </header>

      <div
        className={`mobile-nav-overlay md:hidden${menuOpen ? " is-open" : ""}`}
        aria-hidden={!menuOpen}
        onClick={closeMenu}
      />

      <nav
        className={`mobile-nav-panel md:hidden${menuOpen ? " is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <Link href="/#works" className="mobile-nav-link" onClick={closeMenu}>
          Works
        </Link>
        <Link href="/#about" className="mobile-nav-link" onClick={closeMenu}>
          About
        </Link>
        <Link href="/#contact" className="mobile-nav-link" onClick={closeMenu}>
          Contact
        </Link>
        <div className="mobile-nav-icons">
          <a
            href={contact.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-icon-link"
            aria-label="GitHub"
            onClick={closeMenu}
          >
            <Github aria-hidden="true" size={18} strokeWidth={1.75} />
          </a>
          <a
            href={contact.sns.url}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-icon-link"
            aria-label={contact.sns.label}
            onClick={closeMenu}
          >
            <Globe aria-hidden="true" size={18} strokeWidth={1.75} />
          </a>
          {showEmail && (
            <a
              href={`mailto:${contact.email.address}`}
              className="nav-icon-link"
              aria-label="Email"
              onClick={closeMenu}
            >
              <Mail aria-hidden="true" size={18} strokeWidth={1.75} />
            </a>
          )}
        </div>
      </nav>
    </>
  );
}
