import Link from "next/link";

export function Footer({ dict, lang }: { dict: any; lang: string }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-primary text-primary-foreground py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 border-b border-primary-foreground/10 pb-8">
          {/* Brand Info */}
          <div>
            <span className="font-display font-bold text-2xl tracking-tight mb-4 block">
              Nexa<span className="text-brand-secondary">Digital</span>
            </span>
            <p className="text-sm text-primary-foreground/80 max-w-sm">
              {dict.footer.brandSubtitle}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display font-semibold text-lg mb-2">{dict.footer.quickLinks}</h4>
            <Link href={`/${lang}/#serveis`} className="text-sm text-primary-foreground/80 hover:text-brand-accent transition-colors">
              {dict.header.services}
            </Link>
            <Link href={`/${lang}/#proces`} className="text-sm text-primary-foreground/80 hover:text-brand-accent transition-colors">
              {dict.header.process}
            </Link>
            <Link href={`/${lang}/casos-d-exit`} className="text-sm text-primary-foreground/80 hover:text-brand-accent transition-colors">
              {dict.header.portfolio}
            </Link>
            <Link href={`/${lang}/#contacte`} className="text-sm text-primary-foreground/80 hover:text-brand-accent transition-colors">
              {dict.header.cta}
            </Link>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display font-semibold text-lg mb-2">{dict.footer.contact}</h4>
            <p className="text-sm text-primary-foreground/80">{dict.footer.location}</p>
            <a href="mailto:nexainforma@gmail.com" className="text-sm text-primary-foreground/80 hover:text-brand-accent transition-colors">
              nexainforma@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-primary-foreground/60">
          <p>© {currentYear} {dict.footer.rights}</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href={`/${lang}/politica-privacitat`} className="hover:text-primary-foreground transition-colors">{dict.footer.privacy}</Link>
            <Link href={`/${lang}/avis-legal`} className="hover:text-primary-foreground transition-colors">{dict.footer.legal}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
