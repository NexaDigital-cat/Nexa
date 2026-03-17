"use client";

import { useState } from "react";

const steps = [
  {
    number: "01",
    title: "Reunió de descobriment",
    description: "Una trucada ràpida on entenem el teu model de negoci, què et fa únic i qui és el teu client ideal.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
  },
  {
    number: "02",
    title: "Proposta i disseny",
    description: "Preparem l'estructura visual i els textos amb l'enfocament tècnic perfecte per aconseguir el teu objectiu.",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800"
  },
  {
    number: "03",
    title: "Desenvolupament",
    description: "Programem la teva web a mida amb tecnologia d'avantguarda, assegurant la màxima velocitat de càrrega i SEO en ment.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
  },
  {
    number: "04",
    title: "Llançament i suport",
    description: "Entreguem el projecte claus en mà. T'ensenyem a fer canvis si ho desitges o ens deixes el manteniment a nosaltres.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=800"
  }
];

export function ProcessSection({ dict }: { dict: any }) {
  const [activeStep, setActiveStep] = useState(0);

  const stepImages = [
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=800"
  ];

  return (
    <section id="proces" className="py-8 md:py-16 bg-brand-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative abstract elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-secondary/10 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-4 text-center md:text-left">
          <h2 className="text-sm font-bold tracking-wider text-brand-secondary uppercase mb-3">{dict.process.overtitle}</h2>
          <div className="flex flex-col gap-4">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold max-w-2xl">
              {dict.process.title}
            </h3>
            <p className="text-primary-foreground/80 max-w-md text-sm md:text-base">
              {dict.process.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Steps List */}
          <div className="flex flex-col gap-2">
            {dict.process.steps.map((step: any, index: number) => {
              const isActive = index === activeStep;
              return (
                <div 
                  key={index} 
                  className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border border-transparent ${
                    isActive 
                      ? "bg-white/10 border-brand-secondary/30 shadow-[0_0_30px_rgba(79,209,197,0.1)] lg:translate-x-2" 
                      : "hover:bg-white/5 lg:hover:translate-x-1"
                  }`}
                  onClick={() => setActiveStep(index)}
                  onMouseEnter={() => setActiveStep(index)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold font-display transition-colors duration-300 ${
                      isActive 
                        ? "bg-brand-secondary text-brand-primary" 
                        : "bg-brand-primary border-2 border-brand-secondary text-brand-secondary"
                    }`}>
                      {step.number}
                    </div>
                    <div>
                      <h4 className={`text-xl font-display font-semibold mb-2 transition-colors duration-300 ${isActive ? "text-brand-secondary" : "text-white"}`}>
                        {step.title}
                      </h4>
                      <p className={`text-sm leading-relaxed transition-opacity duration-300 ${isActive ? "text-primary-foreground/90" : "text-primary-foreground/60"}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dynamic Image Container */}
          <div className="relative w-full aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10 mt-8 lg:mt-0">
            {dict.process.steps.map((step: any, index: number) => (
              <img
                key={index}
                src={stepImages[index]}
                alt={step.title}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                  index === activeStep ? "opacity-100 scale-100 relative z-10" : "opacity-0 scale-105 absolute z-0"
                }`}
              />
            ))}
            {/* Elegant gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-brand-primary/20 to-transparent z-20 pointer-events-none" />
            
            {/* Active step title overlay */}
            <div className="absolute bottom-8 left-8 right-8 z-30">
               <div className="inline-block px-4 py-2 bg-brand-secondary/90 backdrop-blur-md text-brand-primary rounded-lg font-bold shadow-lg transform transition-transform duration-500">
                 {dict.process.stepPrefix} {dict.process.steps[activeStep].number}: {dict.process.steps[activeStep].title}
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
