import { z } from "zod";

export const ServeiOpts = [
  "Web Corporativa",
  "Botiga Online (E-commerce)",
  "Landing Page",
  "Manteniment i Suport",
  "Altres"
] as const;

export const PressupostOpts = [
  "Menys de 1.000€",
  "1.000€ - 3.000€",
  "3.000€ - 5.000€",
  "Més de 5.000€"
] as const;

export const UrgenciaOpts = [
  "Ho necessito el més aviat possible",
  "En 1-2 mesos",
  "Sense pressa, estic explorant opcions"
] as const;

export const LeadFormSchema = z.object({
  nom: z.string().min(2, { message: "El nom ha de tenir almenys 2 caràcters." }),
  telefon: z.string().regex(/^[0-9+\s]{9,15}$/, { message: "Format de telèfon invàlid." }),
  email: z.string().email({ message: "Correu electrònic invàlid." }),
  servei: z.enum(ServeiOpts, { required_error: "Si us plau, selecciona un servei." }),
  pressupost: z.enum(PressupostOpts, { required_error: "Si us plau, indica un pressupost aproximat." }),
  urgencia: z.enum(UrgenciaOpts, { required_error: "Si us plau, indica la urgència." }),
  descripcio: z.string().min(10, { message: "La descripció ha de tenir almenys 10 caràcters." })
});

export type LeadFormValues = z.infer<typeof LeadFormSchema>;
