"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

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
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-brand-background/80 backdrop-blur-md border-border/50 shadow-sm"
          : "bg-transparent border-transparent"
      )}
    >
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
