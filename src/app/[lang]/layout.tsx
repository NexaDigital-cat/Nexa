import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Toaster } from "sonner";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Nexa Digital | Creació de Pàgines Web a Catalunya",
  description:
    "Especialistes en creació de webs i digitalització per a autònoms i petites empreses a Catalunya. Dissenys moderns i optimitzats per captar més clients locals.",
  keywords: [
    "Creació pàgines web",
    "Disseny web Catalunya",
    "Webs per a autònoms",
    "Digitalització pimes",
    "Nexa Digital",
  ],
  authors: [{ name: "Nexa Digital" }],
  openGraph: {
    title: "Nexa Digital | Tu aliat digital a Catalunya",
    description: "Creació de pàgines web per a autònoms i pimes.",
    url: "https://nexadigital.cat", // Placeholder for actual upcoming domain
    siteName: "Nexa Digital",
    locale: "ca_ES",
    type: "website",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  // Await the params to resolve Next.js 15+ constraints on dynamic APIs, or just destructure if 14
  // We'll safely await standard pattern for future-proofing though Next 14 doesn't strictly require it for layouts
  const { lang } = await params;

  return (
    <html lang={lang} className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        {children}
        <FloatingWhatsApp />
        <Toaster position="bottom-left" richColors />
      </body>
    </html>
  );
}
