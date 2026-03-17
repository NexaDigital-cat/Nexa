import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getDictionary } from "@/i18n/getDictionary";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as "ca" | "es");
  
  return {
    title: `${dict.header.portfolio} - Nexa Digital`,
    description: dict.portfolio.description,
  };
}

export default async function CasosDExitPage({ params }: { params: { lang: string } }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "ca" | "es");

  return (
    <div className="flex flex-col min-h-screen bg-brand-background text-brand-text">
      <Header dict={dict} lang={lang} />
      <main className="flex-1">
        <CaseStudiesSection dict={dict} lang={lang} />
      </main>
      <Footer dict={dict} lang={lang} />
    </div>
  );
}
