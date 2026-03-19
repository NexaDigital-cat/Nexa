"use client";
 
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MonitorPlay } from "lucide-react";

const heroImages = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80&w=800"
];

const avatars = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
  "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=100&h=100"
];

export function HeroSection({ dict, lang }: { dict: any; lang: string }) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-40 pb-20 md:pt-56 md:pb-32 overflow-hidden bg-brand-background">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Header Copy */}
          <div className="flex flex-col gap-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-secondary"></span>
              </span>
              {dict.hero.badge}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-brand-primary leading-tight">
              {dict.hero.titleHighlight && dict.hero.title.includes(dict.hero.titleHighlight) ? (
                <>
                  {dict.hero.title.split(dict.hero.titleHighlight)[0]}<span className="text-brand-accent">{dict.hero.titleHighlight}</span>{dict.hero.title.split(dict.hero.titleHighlight)[1]}
                </>
              ) : dict.hero.title}
            </h1>
            
            <p className="text-lg text-brand-text/80 leading-relaxed max-w-xl">
              {dict.hero.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link 
                href={`/${lang}/#contacte`}
                className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-brand-accent text-primary-foreground hover:bg-brand-accent/90 h-12 px-8 py-2 shadow-lg shadow-brand-accent/20 group text-lg"
              >
                {dict.hero.ctaPrimary}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href={`/${lang}/casos-d-exit`}
                className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/5 h-12 px-8 py-2 text-lg"
              >
                <MonitorPlay className="mr-2 h-5 w-5" />
                {dict.hero.ctaSecondary}
              </Link>
            </div>

            <div className="flex items-center gap-4 mt-6 text-sm text-brand-text/70">
              <div className="flex -space-x-2">
                {/* Avatars mimicking social proof */}
                {avatars.map((avatar, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-background bg-slate-200 overflow-hidden relative">
                    <img src={avatar} alt={`Client ${i + 1}`} className="object-cover w-full h-full" />
                  </div>
                ))}
              </div>
              <p>{dict.hero.avatarsText}</p>
            </div>
          </div>

          {/* Image / Illustration Box */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            {/* Shared wrapper: overflow-visible so badge can poke outside */}
            <div className="relative">
              {/* Image card — overflow-hidden only here */}
              <div className="aspect-[4/3] rounded-2xl bg-white shadow-2xl overflow-hidden border border-border/50 relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/5 to-brand-secondary/20" />
                
                {heroImages.map((img, index) => (
                  <Image
                    key={img}
                    src={img}
                    alt={`Disseny Web i Desenvolupament ${index + 1}`}
                    fill
                    className={`object-cover transition-opacity duration-1000 ${
                      index === currentImage ? "opacity-100" : "opacity-0"
                    }`}
                    priority={index === 0}
                  />
                ))}
              </div>

              {/* Floating badge — anchored to image bottom-left corner, sitting half inside/outside */}
              <div
                className="absolute z-20 bottom-0 translate-y-1/2 left-4 sm:-left-4 bg-white p-3 sm:p-4 rounded-xl shadow-xl flex items-center gap-3 border border-border/50 animate-bounce"
                style={{ animationDuration: "3s" }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="whitespace-nowrap">
                  <p className="text-sm font-bold text-brand-primary">{dict.hero.floatingBadge.title}</p>
                  <p className="text-xs text-brand-text/70">{dict.hero.floatingBadge.text}</p>
                </div>
              </div>
            </div>

            {/* Carousel navigation indicators — below the image with natural spacing */}
            <div className="flex justify-center gap-2 mt-10">
              {heroImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentImage ? "w-6 bg-brand-accent" : "w-2 bg-brand-primary/30"
                  }`}
                  aria-label={`Veure imatge ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
