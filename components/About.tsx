"use client";

import { siteConfig } from "@/lib/content";
import { PageShell } from "@/components/PageShell";
import { ScrollReveal } from "@/components/ScrollReveal";

export function About() {
  const { contact, about, hero } = siteConfig;
  const year = new Date().getFullYear();

  const contactLinks = [
    { href: contact.github.url, label: contact.github.label, external: true },
    { href: `mailto:${contact.email.address}`, label: contact.email.label, external: false },
    {
      href: contact.sns.url,
      label: contact.sns.url.replace(/^https?:\/\//, ""),
      external: true,
    },
  ];

  return (
    <section id="about" className="section-rule py-20 md:py-28">
      <PageShell>
        <ScrollReveal distance={48}>
          <h2 className="display-md">About</h2>
        </ScrollReveal>

        <div className="mt-10 max-w-2xl space-y-8 md:mt-14">
          <ScrollReveal distance={40} threshold={0.05}>
            <p className="body-text">{hero.statement}</p>
          </ScrollReveal>

          {about.paragraphs.slice(0, -1).map((paragraph, index) => (
            <ScrollReveal key={index} distance={40} threshold={0.08}>
              <p className="body-text">{paragraph}</p>
            </ScrollReveal>
          ))}

          <ScrollReveal distance={40} threshold={0.1}>
            <p className="closing-quote">{about.paragraphs[about.paragraphs.length - 1]}</p>
          </ScrollReveal>
        </div>

        <ScrollReveal distance={32} threshold={0.05}>
          <div id="contact" className="mt-16 md:mt-20">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="contact-item nav-link"
              >
                <span>{link.label}</span>
                <span className="transition-opacity duration-200">→</span>
              </a>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal distance={24} threshold={0.1}>
          <p className="mt-16 text-xs text-[var(--muted)] md:mt-20">© {year} Portfolio</p>
        </ScrollReveal>
      </PageShell>
    </section>
  );
}
