import { getDictionary } from "@/i18n/getDictionary";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ServiceHeroSection } from "@/components/sections/ServiceHeroSection";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export default async function ServicePage({
  params,
}: {
  params: { lang: string; slug: string };
}) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang as "ca" | "es");

  // Find the exact service matching the slug
  const service = dict.services.items.find((s: any) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Header dict={dict} lang={lang} />
      <main className="flex-1 bg-white">
        {/* Premium Lead Generation Hero */}
        <ServiceHeroSection dict={dict} lang={lang} service={service} />
        
        {/* Features / Details Section */}
        {service.features && service.features.length > 0 && (
          <section className="py-20 md:py-32 bg-brand-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                   <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-primary mb-4">
                     {dict.servicePage.featuresTitle}
                   </h2>
                   <div className="w-20 h-1 bg-brand-secondary mx-auto rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {service.features.map((feature: string, idx: number) => (
                    <div 
                      key={idx} 
                      className="bg-white p-6 rounded-2xl shadow-sm border border-border/50 flex items-start gap-4 hover:shadow-md transition-shadow"
                    >
                      <CheckCircle2 className="w-6 h-6 text-brand-secondary shrink-0 mt-0.5" />
                      <p className="text-brand-text/80 leading-relaxed">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
