import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Falten variables d'entorn per a Supabase");
}

// Client per ús general (amb permisos RLS)
export const supabase = createClient(
  supabaseUrl || "",
  supabaseAnonKey || ""
);

// Client amb permisos d'administrador (no s'ha d'utilitzar al costat del client, només en fitxers servidors)
export const supabaseAdmin = createClient(
  supabaseUrl || "",
  supabaseServiceRoleKey || supabaseAnonKey || "",
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);
