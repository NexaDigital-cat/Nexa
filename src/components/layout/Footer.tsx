import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer({ dict, lang }: { dict: any; lang: string }) {
  const currentYear = new Date().getFullYear();
  const serviceLinks = dict.services.items.map((s: any) => ({
    label: s.title,
    href: `/${lang}/serveis/${s.slug}`,
  }));

  return (
    <footer className="bg-brand-primary text-primary-foreground">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12 pb-12 border-b border-white/10">

          {/* Col 1: Brand */}
          <div className="lg:col-span-1">
            <span className="font-display font-bold text-2xl tracking-tight mb-4 block">
              Nexa<span className="text-brand-secondary">Digital</span>
            </span>
            <p className="text-sm text-primary-foreground/70 leading-relaxed max-w-xs">
              {dict.footer.brandSubtitle}
            </p>
          </div>

          {/* Col 2: Our Services */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-accent mb-1">
              {dict.footer.quickLinks}
            </h4>
            {serviceLinks.map((link: { label: string; href: string }) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-primary-foreground/70 hover:text-brand-secondary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Col 3: Local Service */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-accent mb-1">
              {dict.footer.localTitle}
            </h4>
            {dict.footer.localLinks.map((link: { label: string; href: string }) => (
              <Link
                key={link.href}
                href={`/${lang}${link.href}`}
                className="text-sm text-primary-foreground/70 hover:text-brand-secondary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Col 4: Company */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-accent mb-1">
              {dict.footer.companyTitle}
            </h4>
            {dict.footer.companyLinks.map((link: { label: string; href: string }) => (
              <Link
                key={link.href}
                href={link.href.startsWith("http") ? link.href : `/${lang}${link.href}`}
                className="text-sm text-primary-foreground/70 hover:text-brand-secondary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Col 5: Contact Info */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-accent mb-1">
              {dict.footer.contactTitle}
            </h4>
            <a
              href="tel:+34699368895"
              className="flex items-start gap-2.5 text-sm text-primary-foreground/70 hover:text-brand-secondary transition-colors group"
            >
              <Phone size={14} className="mt-0.5 shrink-0 text-brand-secondary group-hover:text-white transition-colors" />
              <span>{dict.footer.phone}</span>
            </a>
            <a
              href="mailto:nexainforma@gmail.com"
              className="flex items-start gap-2.5 text-sm text-primary-foreground/70 hover:text-brand-secondary transition-colors group"
            >
              <Mail size={14} className="mt-0.5 shrink-0 text-brand-secondary group-hover:text-white transition-colors" />
              <span>nexainforma@gmail.com</span>
            </a>
            <div className="flex items-start gap-2.5 text-sm text-primary-foreground/70">
              <MapPin size={14} className="mt-0.5 shrink-0 text-brand-secondary" />
              <span>{dict.footer.location}</span>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-primary-foreground/40 gap-4">
          <p>© {currentYear} {dict.footer.rights}</p>
          <div className="flex gap-5 flex-wrap justify-center">
            <Link href={`/${lang}/politica-privacitat`} className="hover:text-primary-foreground transition-colors">
              {dict.footer.privacy}
            </Link>
            <Link href={`/${lang}/avis-legal`} className="hover:text-primary-foreground transition-colors">
              {dict.footer.legal}
            </Link>
            <Link href={`/${lang}/politica-cookies`} className="hover:text-primary-foreground transition-colors">
              {dict.footer.cookies}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
