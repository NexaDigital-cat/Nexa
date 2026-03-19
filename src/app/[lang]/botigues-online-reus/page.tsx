import { getDictionary } from "@/i18n/getDictionary";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import { CheckCircle2, Phone, MapPin } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as "ca" | "es");
  const pageData = dict.localSeo.botiguesOnlineReus;
  return { title: `${pageData.heroTitle} - Nexa Digital`, description: pageData.heroSubtitle };
}

export default async function BotiguesOnlineReusPage({ params }: { params: { lang: string } }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "ca" | "es");
  const pageData = dict.localSeo.botiguesOnlineReus;

  return (
    <>
      <Header dict={dict} lang={lang} />
      <main className="flex-1 bg-white">
        <section className="relative pt-40 pb-28 md:pt-52 md:pb-40 overflow-hidden text-white min-h-[75vh] flex flex-col justify-center">
          <div className="absolute inset-0 z-0">
            <Image src={pageData.image} alt={pageData.heroTitle} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A1128]/85 via-[#0A1128]/70 to-[#0A1128]/90" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Link href={`/${lang}/#serveis`} className="inline-flex items-center gap-2 text-brand-secondary hover:text-white transition-colors mb-6 text-sm font-medium">
                ← {dict.servicePage.backToServices}
              </Link>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-brand-accent text-xs font-bold px-4 py-1.5 rounded-full mb-6">
                <MapPin size={12} /> {pageData.cityBadge}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">{pageData.heroTitle}</h1>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-12 max-w-3xl mx-auto">{pageData.heroSubtitle}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href={`/${lang}/#contacte`} className="w-full sm:w-auto px-8 py-4 bg-brand-accent hover:bg-brand-secondary text-brand-primary font-bold rounded-xl transition-all hover:scale-105 active:scale-95 text-center shadow-[0_0_20px_rgba(79,209,197,0.3)]">{dict.servicePage.ctaForm}</a>
                <a href="tel:+34699368895" className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"><Phone size={18} className="text-brand-accent" /> {dict.servicePage.ctaPhone}</a>
                <a href="https://wa.me/34699368895" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-400"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
                  {dict.servicePage.ctaWhatsapp}
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 md:py-32 bg-brand-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-primary mb-4">{dict.servicePage.featuresTitle}</h2>
              <div className="w-20 h-1 bg-brand-secondary mx-auto rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {pageData.features.map((feature: string, idx: number) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-border/50 flex items-start gap-4 hover:shadow-md transition-shadow">
                  <CheckCircle2 className="w-6 h-6 text-brand-secondary shrink-0 mt-0.5" />
                  <p className="text-brand-text/80 leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 bg-[#060A16] text-white text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">{dict.servicePage.bottomTitle}</h2>
            <p className="text-white/80 text-lg mb-10">{dict.servicePage.bottomSubtitle}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={`/${lang}/#contacte`} className="w-full sm:w-auto px-8 py-4 bg-brand-accent hover:bg-brand-secondary text-brand-primary font-bold rounded-xl transition-all hover:scale-105">{dict.servicePage.ctaForm}</a>
              <a href="tel:+34699368895" className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"><Phone size={18} className="text-brand-accent" /> {dict.servicePage.ctaPhone}</a>
            </div>
          </div>
        </section>
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
