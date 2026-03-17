"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  LeadFormSchema,
  type LeadFormValues,
  ServeiOpts,
  PressupostOpts,
  UrgenciaOpts,
} from "@/lib/schemas";
import { submitLeadAction } from "@/actions/send-lead";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ContactFormSection({ dict }: { dict: any }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(LeadFormSchema),
    defaultValues: {
      nom: "",
      telefon: "",
      email: "",
      descripcio: "",
    },
  });

  const onSubmit = async (data: LeadFormValues) => {
    try {
      const result = await submitLeadAction(data);
      if (result.success) {
        toast.success(dict.contact.success);
        reset(); // Clear the form
      } else {
        toast.error(result.error || dict.contact.error);
        if (result.issues) {
          result.issues.forEach((issue) => toast.error(issue));
        }
      }
    } catch {
      toast.error(dict.contact.error);
    }
  };

  return (
    <section id="contacte" className="py-20 bg-brand-background relative">
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-primary mb-4">
            {dict.contact.title}
          </h2>
          <p className="text-brand-text/80 max-w-2xl mx-auto">
            {dict.contact.description}
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-card shadow-xl rounded-2xl p-6 md:p-10 border border-border/50"
          noValidate
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="nom" className="text-sm font-semibold text-foreground">
                {dict.contact.form.name} *
              </label>
              <input
                {...register("nom")}
                id="nom"
                placeholder={dict.contact.form.name}
                className={cn(
                  "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  errors.nom ? "border-destructive focus-visible:ring-destructive" : "border-input"
                )}
              />
              {errors.nom && <span className="text-xs text-destructive">{errors.nom.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="telefon" className="text-sm font-semibold text-foreground">
                Telèfon *
              </label>
              <input
                {...register("telefon")}
                id="telefon"
                type="tel"
                placeholder="600 123 456"
                className={cn(
                  "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  errors.telefon ? "border-destructive focus-visible:ring-destructive" : "border-input"
                )}
              />
              {errors.telefon && <span className="text-xs text-destructive">{errors.telefon.message}</span>}
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="email" className="text-sm font-semibold text-foreground">
                {dict.contact.form.email} *
              </label>
              <input
                {...register("email")}
                id="email"
                type="email"
                placeholder="hola@exemple.com"
                className={cn(
                  "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  errors.email ? "border-destructive focus-visible:ring-destructive" : "border-input"
                )}
              />
              {errors.email && <span className="text-xs text-destructive">{errors.email.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="servei" className="text-sm font-semibold text-foreground">
                Què necessites? *
              </label>
              <select
                {...register("servei")}
                id="servei"
                className={cn(
                  "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  errors.servei ? "border-destructive focus-visible:ring-destructive" : "border-input"
                )}
              >
                <option value="" disabled hidden>---</option>
                {ServeiOpts.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {errors.servei && <span className="text-xs text-destructive">{errors.servei.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="pressupost" className="text-sm font-semibold text-foreground">
                Pressupost aproximat *
              </label>
              <select
                {...register("pressupost")}
                id="pressupost"
                className={cn(
                  "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  errors.pressupost ? "border-destructive focus-visible:ring-destructive" : "border-input"
                )}
              >
                <option value="" disabled hidden>---</option>
                {PressupostOpts.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {errors.pressupost && <span className="text-xs text-destructive">{errors.pressupost.message}</span>}
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="urgencia" className="text-sm font-semibold text-foreground">
                Urgència *
              </label>
              <select
                {...register("urgencia")}
                id="urgencia"
                className={cn(
                  "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  errors.urgencia ? "border-destructive focus-visible:ring-destructive" : "border-input"
                )}
              >
                <option value="" disabled hidden>---</option>
                {UrgenciaOpts.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {errors.urgencia && <span className="text-xs text-destructive">{errors.urgencia.message}</span>}
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="descripcio" className="text-sm font-semibold text-foreground">
                {dict.contact.form.message} *
              </label>
              <textarea
                {...register("descripcio")}
                id="descripcio"
                rows={4}
                className={cn(
                  "flex min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  errors.descripcio ? "border-destructive focus-visible:ring-destructive" : "border-input"
                )}
              />
              {errors.descripcio && <span className="text-xs text-destructive">{errors.descripcio.message}</span>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-80 bg-brand-accent text-primary-foreground hover:bg-brand-accent/90 h-12 px-8 py-2 mt-4 shadow-md"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {dict.contact.form.submitting}
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                {dict.contact.form.submit}
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
