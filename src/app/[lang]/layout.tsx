import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Toaster } from "sonner";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { JsonLd } from "@/components/seo/JsonLd";
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

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await import(`../../i18n/dictionaries/${lang}.json`).then((m) => m.default);
  
  const baseUrl = "https://nexadigital.cat";
  
  return {
    title: {
      default: dict.metadata.title,
      template: "%s | Nexa Digital",
    },
    description: dict.metadata.description,
    keywords: dict.metadata.keywords,
    authors: [{ name: "Nexa Digital" }],
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${lang}`,
      languages: {
        ca: "/ca",
        es: "/es",
      },
    },
    icons: {
      icon: [
        { url: "/icon.png" },
        { url: "/favicon.ico", sizes: "any" },
      ],
      apple: "/apple-icon.png",
    },
    openGraph: {
      title: dict.metadata.openGraph.title,
      description: dict.metadata.openGraph.description,
      url: `${baseUrl}/${lang}`,
      siteName: "Nexa Digital",
      locale: lang === "ca" ? "ca_ES" : "es_ES",
      type: "website",
      images: [
        {
          url: "/icon.png",
          width: 800,
          height: 600,
          alt: "Nexa Digital Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.openGraph.title,
      description: dict.metadata.openGraph.description,
      images: ["/icon.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

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
        <JsonLd lang={lang} />
        {children}
        <FloatingWhatsApp />
        <Toaster position="bottom-left" richColors />
      </body>
    </html>
  );
}
