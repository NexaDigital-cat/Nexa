"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

export function CaseStudiesSection({ dict, lang }: { dict: any; lang: string }) {
  const projects = dict.portfolio.projects;
  const [activeProject, setActiveProject] = useState(projects[0]);

  return (
    <section className="pt-32 pb-20 md:pt-48 md:pb-32 bg-brand-background min-h-screen">
      <div className="container mx-auto px-4">
        
        {/* Header and Back navigation */}
        <div className="mb-12 md:mb-20">
          <Link 
            href={`/${lang}`} 
            className="inline-flex items-center text-sm font-medium text-brand-text/60 hover:text-brand-primary transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            {dict.portfolio.back}
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-brand-primary leading-tight mb-4">
                {dict.portfolio.title} <span className="text-brand-accent">{dict.portfolio.titleHighlight}</span>
              </h1>
              <p className="text-lg text-brand-text/80 leading-relaxed">
                {dict.portfolio.description}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Projects List (Sidebar) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {projects.map((project: any) => (
              <button
                key={project.id}
                onClick={() => setActiveProject(project)}
                className={`text-left p-6 rounded-2xl transition-all duration-300 border ${
                  activeProject.id === project.id 
                    ? "bg-brand-primary text-white border-transparent shadow-xl translate-x-2" 
                    : "bg-white border-border/50 text-brand-text hover:border-brand-accent/50 hover:bg-brand-secondary/5"
                }`}
              >
                <div className={`text-xs font-bold tracking-wider uppercase mb-2 ${
                  activeProject.id === project.id ? "text-brand-secondary" : "text-brand-primary"
                }`}>
                  {project.category}
                </div>
                <h3 className={`text-xl font-display font-bold mb-1 line-clamp-1 ${
                  activeProject.id === project.id ? "text-white" : "text-brand-primary"
                }`}>
                  {project.client}
                </h3>
              </button>
            ))}
          </div>

          {/* Project Details (Main View) */}
          <div className="lg:col-span-8 relative">
            <div 
              key={activeProject.id}
              className="bg-white rounded-3xl border border-border/50 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-right-8 duration-500 fill-mode-both"
            >
              {/* Image Header */}
              <div className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-slate-100 overflow-hidden group">
                <img 
                  src={activeProject.image} 
                  alt={activeProject.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 to-transparent flex items-end p-8">
                  <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                     <a href={activeProject.link} className="inline-flex items-center justify-center px-6 py-3 bg-brand-accent text-white font-medium rounded-md hover:bg-brand-accent/90 transition-colors shadow-lg">
                       {dict.portfolio.visitWeb} <ExternalLink className="ml-2 w-4 h-4" />
                     </a>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-primary mb-4">
                  {activeProject.title}
                </h2>
                <p className="text-brand-text/80 leading-relaxed text-lg mb-8">
                  {activeProject.description}
                </p>

                {/* Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8 border-y border-border/50">
                  {/* Stats */}
                  <div className="flex flex-col gap-4">
                    <h4 className="text-sm font-bold tracking-wider text-brand-primary/60 uppercase">{dict.portfolio.keyImpact}</h4>
                    <div className="flex gap-8">
                      {activeProject.stats.map((stat: any, idx: number) => (
                        <div key={idx}>
                          <div className="text-3xl font-display font-extrabold text-brand-accent mb-1">{stat.value}</div>
                          <div className="text-xs font-medium text-brand-text/60 uppercase">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-col gap-4">
                    <h4 className="text-sm font-bold tracking-wider text-brand-primary/60 uppercase">{dict.portfolio.tech}</h4>
                    <div className="flex flex-wrap gap-2">
                       {activeProject.tech.map((tech: string, idx: number) => (
                         <span key={idx} className="px-3 py-1 bg-brand-secondary/10 text-brand-primary rounded-full text-sm font-medium border border-brand-secondary/20">
                           {tech}
                         </span>
                       ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
