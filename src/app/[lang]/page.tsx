import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ContactFormSection } from "@/components/sections/ContactFormSection";

import { getDictionary } from "@/i18n/getDictionary";

export default async function Home({ params }: { params: { lang: string } }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "ca" | "es");

  return (
    <>
      <Header dict={dict} lang={lang} />
      <main className="flex-1">
        <HeroSection dict={dict} lang={lang} />
        <ServicesSection dict={dict} />
        <ProcessSection dict={dict} />
        <ContactFormSection dict={dict} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
