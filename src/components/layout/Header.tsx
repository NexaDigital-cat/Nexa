"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";

export function Header({ dict, lang }: { dict: any; lang: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLocaleUrl = (newLocale: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = newLocale;
    return segments.join("/");
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 flex flex-col",
        isScrolled
          ? "bg-brand-background/95 backdrop-blur-md shadow-sm border-b border-border/50"
          : "bg-transparent border-b border-transparent"
      )}
    >
      {/* Top Contact Bar */}
      <div className="bg-[#0A1128] text-slate-300 py-2 border-b border-white/5">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-center sm:justify-between items-center text-[11px] sm:text-xs font-medium gap-2 sm:gap-0 tracking-wide">
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="tel:+34699368895" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={13} strokeWidth={2.5} className="text-brand-accent/90" />
              <span>699 368 895</span>
            </a>
            <a href="mailto:nexainforma@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail size={13} strokeWidth={2.5} className="text-brand-accent/90" />
              <span>nexainforma@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-1.5 hidden sm:flex">
            <MapPin size={13} strokeWidth={2.5} className="text-brand-accent/90" />
            <span>Reus, Tarragona</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center gap-2 group">
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl tracking-tight text-brand-primary group-hover:text-brand-accent transition-colors">
              Nexa<span className="text-brand-secondary">Digital</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href={`/${lang}/#serveis`}
            className="text-sm font-medium text-brand-text/80 hover:text-brand-primary transition-colors"
          >
            {dict.header.services}
          </Link>
          <Link
            href={`/${lang}/#proces`}
            className="text-sm font-medium text-brand-text/80 hover:text-brand-primary transition-colors"
          >
            {dict.header.process}
          </Link>
          <Link
            href={`/${lang}/casos-d-exit`}
            className="text-sm font-medium text-brand-text/80 hover:text-brand-primary transition-colors"
          >
            {dict.header.portfolio}
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Link
            href={switchLocaleUrl(lang === "ca" ? "es" : "ca")}
            className="text-sm font-bold text-brand-text/60 hover:text-brand-primary transition-colors uppercase"
          >
            {lang === "ca" ? "ES" : "CA"}
          </Link>

          <Link
            href={`/${lang}/#contacte`}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-brand-primary text-primary-foreground hover:bg-brand-primary/90 h-10 px-4 py-2"
          >
            {dict.header.cta}
          </Link>
        </div>
      </div>
    </header>
  );
}
