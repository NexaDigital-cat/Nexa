-- Create leads table
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nom TEXT NOT NULL,
    telefon TEXT NOT NULL,
    email TEXT NOT NULL,
    servei TEXT NOT NULL,
    pressupost TEXT NOT NULL,
    urgencia TEXT NOT NULL,
    descripcio TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Turn on Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow only authenticated users/service role to insert and view
-- Using supabaseAdmin in the backend bypasses RLS, but if you eventually want to insert via client,
-- you would need a policy like giving anon insert rights (not recommended to prevent spam without captcha)
CREATE POLICY "Allow service role to manage leads" ON public.leads
    FOR ALL
    USING (auth.jwt() ->> 'role' = 'service_role');
