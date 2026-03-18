import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getDictionary } from "@/i18n/getDictionary";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as "ca" | "es");
  return {
    title: `${dict.cookiePage.title} - Nexa Digital`,
    description: dict.cookiePage.title,
  };
}

export default async function PoliticaCookiesPage({ params }: { params: { lang: string } }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "ca" | "es");

  return (
    <div className="flex flex-col min-h-screen bg-brand-background text-brand-text">
      <Header dict={dict} lang={lang} />
      <main className="flex-1 container mx-auto px-4 pt-32 pb-20 md:pt-48 md:pb-32 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-display font-extrabold text-brand-primary mb-4">
          {dict.cookiePage.title}
        </h1>
        <p className="text-brand-text/60 mb-12 font-medium">{dict.cookiePage.lastUpdated}</p>

        <div className="space-y-10">
          {dict.cookiePage.content.map((section: any, idx: number) => (
            <div key={idx}>
              <h2 className="text-2xl font-display font-bold text-brand-primary mb-4">
                {section.heading}
              </h2>
              <p className="text-lg text-brand-text/80 leading-relaxed">
                {section.text}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer dict={dict} lang={lang} />
    </div>
  );
}
