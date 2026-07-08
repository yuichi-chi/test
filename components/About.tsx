"use client";

import { Github, Globe, Mail, type LucideIcon } from "lucide-react";
import { hasContactEmail, siteConfig } from "@/lib/content";
import { PageShell } from "@/components/PageShell";
import { PrintButton } from "@/components/PrintButton";
import { ScrollReveal } from "@/components/ScrollReveal";

type ContactLink = {
  key: string;
  href: string;
  label: string;
  value: string;
  Icon: LucideIcon;
  external: boolean;
};

export function About() {
  const { contact, about, hero } = siteConfig;
  const year = new Date().getFullYear();

  const contactLinks: ContactLink[] = [
    {
      key: "github",
      href: contact.github.url,
      label: contact.github.label,
      value: contact.github.url.replace(/^https?:\/\//, ""),
      Icon: Github,
      external: true,
    },
    ...(hasContactEmail(contact.email.address)
      ? [
          {
            key: "email",
            href: `mailto:${contact.email.address}`,
            label: "Email",
            value: contact.email.address,
            Icon: Mail,
            external: false,
          } satisfies ContactLink,
        ]
      : []),
    {
      key: "sns",
      href: contact.sns.url,
      label: contact.sns.label,
      value: contact.sns.url.replace(/^https?:\/\//, ""),
      Icon: Globe,
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
            <p className="section-label mb-6 md:mb-8">Contact</p>
            {contactLinks.map(({ key, href, label, value, Icon, external }) => (
              <a
                key={key}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="contact-item"
              >
                <span className="contact-item-icon" aria-hidden="true">
                  <Icon size={18} strokeWidth={1.75} />
                </span>
                <span className="contact-item-label">{label}</span>
                <span className="contact-item-value">{value}</span>
                <span className="contact-item-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal distance={24} threshold={0.1}>
          <div className="mt-12 md:mt-16">
            <PrintButton />
          </div>
        </ScrollReveal>

        <ScrollReveal distance={24} threshold={0.1}>
          <footer className="site-footer mt-16 md:mt-24">
            <p className="site-footer-line">
              <span>© {year} Kumano Yuichi</span>
              <span aria-hidden="true">·</span>
              <span>Built with Next.js 16 · React Three Fiber</span>
              <span aria-hidden="true">·</span>
              <a
                href={contact.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="site-footer-link"
              >
                Source on GitHub
              </a>
            </p>
          </footer>
        </ScrollReveal>
      </PageShell>
    </section>
  );
}
