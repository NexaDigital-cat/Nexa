"use server";

import { LeadFormSchema, type LeadFormValues } from "@/lib/schemas";
import { sendLeadEmail } from "@/lib/email";
import { supabaseAdmin } from "@/lib/supabase";

export type ServerActionResponse = 
  | { success: true; message: string }
  | { success: false; error: string; issues?: string[] };

export async function submitLeadAction(data: LeadFormValues): Promise<ServerActionResponse> {
  try {
    // 1. Validació de seguretat estricta al servidor
    const validatedResult = LeadFormSchema.safeParse(data);

    if (!validatedResult.success) {
      const issues = validatedResult.error.issues.map((issue) => issue.message);
      return { 
        success: false, 
        error: "Dades invàlides. Revisa els camps del formulari.",
        issues 
      };
    }

    // 2. Desar a Supabase (Database) usant supabaseAdmin (bypasses RLS if necessary, but good for secure backend tasks)
    const { error: dbError } = await supabaseAdmin
      .from('leads')
      .insert([
        { 
          nom: validatedResult.data.nom,
          telefon: validatedResult.data.telefon,
          email: validatedResult.data.email,
          servei: validatedResult.data.servei,
          pressupost: validatedResult.data.pressupost,
          urgencia: validatedResult.data.urgencia,
          descripcio: validatedResult.data.descripcio
        }
      ]);

    if (dbError) {
      console.error("Error inserting lead into database:", dbError);
      // Podríem retornar un error o continuar i únicament enviar el mail. Normalment volem que no falli tontament.
    }

    // 3. Transmissió de l'email
    try {
      await sendLeadEmail(validatedResult.data);
    } catch (emailError) {
      console.error("Error sending lead email:", emailError);
    }

    // 4. Resposta d'èxit
    return { 
      success: true, 
      message: "Gràcies! Hem rebut la teva sol·licitud correctament. Et contactarem aviat." 
    };

  } catch (error: unknown) {
    console.error("SubmitLeadAction error:", error);
    return { 
      success: false, 
      error: "S'ha produït un error intern al enviar la sol·licitud. Torna a intentar-ho, si us plau." 
    };
  }
}
