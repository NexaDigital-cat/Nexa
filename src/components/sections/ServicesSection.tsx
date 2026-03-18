import { MonitorSmartphone, ShoppingCart, Rocket, Code2, ArrowRight } from "lucide-react";
import Link from "next/link";

export function ServicesSection({ dict, lang }: { dict: any; lang: string }) {
  const servicesIcons = [
    { icon: <MonitorSmartphone className="h-6 w-6 text-brand-secondary" />, color: "bg-brand-secondary/10" },
    { icon: <ShoppingCart className="h-6 w-6 text-brand-accent" />, color: "bg-brand-accent/10" },
    { icon: <Rocket className="h-6 w-6 text-brand-primary" />, color: "bg-brand-primary/10" },
    { icon: <Code2 className="h-6 w-6 text-violet-500" />, color: "bg-violet-500/10" }
  ];

  return (
    <section id="serveis" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-wider text-brand-accent uppercase mb-3">{dict.services.overtitle}</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold text-brand-primary mb-4">
            {dict.services.title}
          </h3>
          <p className="text-brand-text/80 text-lg">
            {dict.services.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {dict.services.items.map((service: any, index: number) => (
            <Link 
              href={`/${lang}/serveis/${service.slug}`}
              key={index} 
              className="group bg-brand-background rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-border/50 block relative overflow-hidden"
            >
              <div className={`w-14 h-14 rounded-xl ${servicesIcons[index].color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {servicesIcons[index].icon}
              </div>
              <h4 className="text-xl font-display font-semibold text-brand-primary mb-3 group-hover:text-brand-secondary transition-colors">
                {service.title}
              </h4>
              <p className="text-brand-text/80 leading-relaxed text-sm mb-6">
                {service.description}
              </p>
              
              <div className="flex items-center text-sm font-semibold text-brand-accent gap-2 mt-auto">
                <span className="opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  {lang === 'es' ? 'Saber más' : 'Més informació'}
                </span>
                <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300 delay-75" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
