# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)
## PROYECTO: Nexa Digital - Lead Generation Platform
**Versión:** 1.0.0
**Target Framework:** Next.js 14+ (App Router)
**Objetivo del Sistema:** Plataforma de captación de leads B2B de alta conversión para servicios de digitalización local, con procesamiento serverless e integración de notificaciones por email.

---

## 1. ARQUITECTURA DEL SISTEMA
* **Patrón Arquitectónico:** Serverless Frontend/Backend unificado (Monorepo vía Next.js).
* **Paradigma de Componentes:** React Server Components (RSC) por defecto. `"use client"` estrictamente limitado a los nodos hojas (leaf nodes) que requieran interactividad (formularios, toggles, animaciones).
* **Flujo de Datos (Mutaciones):** Next.js Server Actions. Cero uso de `pages/api` o `app/api` a menos que se requiera un webhook externo.
* **Gestión de Estado:** React Hook Form (estado local) + `useFormStatus` / `useActionState` (estado de mutación del servidor).

---

## 2. STACK TECNOLÓGICO ESTRICTO
| Capa | Tecnología | Justificación |
| :--- | :--- | :--- |
| **Core Framework** | Next.js 14+ | SSR optimizado, Server Actions, App Router. |
| **Lenguaje** | TypeScript (`strict: true`) | Seguridad de tipos en tiempo de compilación. |
| **Estilizado** | Tailwind CSS + `tailwind-merge` | Utility-first, sin CSS runtime overhead. |
| **Componentes UI** | shadcn/ui + Radix UI | Accesibilidad nativa (WAI-ARIA), headles components. |
| **Validación** | Zod | Validación isomórfica (cliente y servidor). |
| **Gestor de Email** | Nodemailer | Conexión directa SMTP con Gmail. |
| **Iconografía** | Lucide React | SVG optimizados, renderizado dinámico. |
| **Notificaciones** | Sonner | Toast notifications ligeras y accesibles. |

---

## 3. REQUISITOS FUNCIONALES (FR)

### FR1: Renderizado de la Landing Page
* El sistema debe servir una *Single Page Application* con navegación por anclas suaves (`scroll-behavior: smooth`).
* Todas las secciones estáticas (Hero, Servicios, Proceso) deben ser **Server Components** para maximizar la velocidad de carga (Lighthouse score > 90) y SEO.
* El idioma de los contenidos (harcodeados en los componentes) será **Catalán**.

### FR2: Motor de Captación de Leads (Formulario)
* El sistema debe presentar un formulario interactivo en el frontend (`ContactForm`).
* **Regla de Validación UI:** El formulario no debe permitir el envío si los campos obligatorios no cumplen con el esquema Zod. Los errores deben mostrarse debajo de cada campo en tiempo real tras el primer intento de *submit*.
* **Estado Pending:** Al enviar, el botón de *submit* debe deshabilitarse y mostrar un indicador visual (spinner) para evitar dobles envíos.

### FR3: Procesamiento en el Servidor (Server Action)
* El Server Action `sendLeadAction` debe recibir el objeto inyectado por el formulario.
* **Seguridad (Paridad de Validación):** El servidor DEBE re-validar el payload recibido usando exactamente el mismo esquema Zod del frontend mediante `schema.safeParse()`.
* Si la validación falla en el servidor, debe retornar un objeto de error estructurado: `{ success: false, errors: [...] }`.

### FR4: Sistema de Notificaciones por Email
* Si la validación en el servidor es exitosa, el sistema debe compilar una plantilla HTML con los datos del lead.
* El email debe enviarse a la variable de entorno `CONTACT_EMAIL` (nexainforma@gmail.com).
* Debe gestionar fallos del proveedor SMTP. Si Nodemailer falla, el Server Action debe capturar la excepción y retornar `{ success: false, message: "Error del servidor de correos" }`.

---

## 4. MODELO DE DATOS Y VALIDACIÓN (ZOD SCHEMAS)

El sistema debe implementar un archivo `lib/schemas.ts` que actúe como la única fuente de la verdad para las estructuras de datos.

```typescript
import * as z from 'zod';

export const LeadFormSchema = z.object({
  nom: z.string().min(2, { message: "El nom ha de tenir almenys 2 caràcters." }),
  empresa: z.string().optional(),
  telefon: z.string().regex(/^[0-9\-\+]{9,15}$/, { message: "Format de telèfon invàlid." }),
  email: z.string().email({ message: "Correu electrònic invàlid." }),
  tipusNegoci: z.string().min(3, { message: "Aquest camp és obligatori." }),
  servei: z.enum(['Nova pàgina web', 'Redisseny web', 'Digitalització del negoci', 'No ho tinc clar']),
  pressupost: z.enum(['< 1000€', '1000-3000€', '3000-5000€', '> 5000€']),
  urgencia: z.enum(['Urgent', 'Aquest mes', 'Sense pressa']),
  descripcio: z.string().min(10, { message: "Sisplau, detalla una mica més el teu projecte." })
});

export type LeadFormValues = z.infer<typeof LeadFormSchema>;
5. REQUISITOS NO FUNCIONALES (NFR)
NFR1 - Rendimiento: Las imágenes deben servirse mediante next/image con formatos modernos (WebP/AVIF). LCP (Largest Contentful Paint) < 2.5s.

NFR2 - SEO: Se debe exportar el objeto estático metadata en app/layout.tsx definiendo title, description, y openGraph optimizados para búsquedas locales ("Disseny web a [Ciudad], Cataluña"). Se requiere atributo lang="ca" en la etiqueta <html>.

NFR3 - Accesibilidad: Todos los inputs deben tener <label> asociados (o aria-label). Los contrastes de color deben cumplir la normativa WCAG 2.1 AA.

NFR4 - Seguridad: Sanitización implícita vía React/Next.js (prevención XSS). Las credenciales SMTP deben residir exclusivamente en el servidor (.env.local), nunca expuestas al cliente con el prefijo NEXT_PUBLIC_.

6. TOKENS DE DISEÑO Y UI (UI GUIDELINES)
Configuración obligatoria en tailwind.config.ts:

Primary: #1A365D (Usado para títulos H1/H2, backgrounds de secciones oscuras, logo).

Secondary: #4FD1C5 (Usado para acentos visuales, iconos en tarjetas de servicio).

Accent: #ED8936 (Reservado ESTRICTAMENTE para botones de llamada a la acción y hovers interactivos).

Background: #F7FAFC (Color de fondo por defecto del <body/>).

Typography: Inter para cuerpos de texto (font-sans), Poppins para titulares (font-display).

7. ESTRUCTURA DE CARPETAS EXPECTADA PARA DESPLIEGUE
Plaintext
/src
  /actions
    send-lead.ts
  /app
    layout.tsx
    page.tsx
    globals.css
  /components
    /ui             # (Botones, inputs generados por shadcn)
    /layout         # Header.tsx, Footer.tsx
    /sections       # HeroSection.tsx, ServicesSection.tsx, ContactForm.tsx
  /lib
    schemas.ts
    email.ts
    5. REQUISITOS NO FUNCIONALES (NFR)
NFR1 - Rendimiento: Las imágenes deben servirse mediante next/image con formatos modernos (WebP/AVIF). LCP (Largest Contentful Paint) < 2.5s.

NFR2 - SEO: Se debe exportar el objeto estático metadata en app/layout.tsx definiendo title, description, y openGraph optimizados para búsquedas locales ("Disseny web a [Ciudad], Cataluña"). Se requiere atributo lang="ca" en la etiqueta <html>.

NFR3 - Accesibilidad: Todos los inputs deben tener <label> asociados (o aria-label). Los contrastes de color deben cumplir la normativa WCAG 2.1 AA.

NFR4 - Seguridad: Sanitización implícita vía React/Next.js (prevención XSS). Las credenciales SMTP deben residir exclusivamente en el servidor (.env.local), nunca expuestas al cliente con el prefijo NEXT_PUBLIC_.

6. TOKENS DE DISEÑO Y UI (UI GUIDELINES)
Configuración obligatoria en tailwind.config.ts:

Primary: #1A365D (Usado para títulos H1/H2, backgrounds de secciones oscuras, logo).

Secondary: #4FD1C5 (Usado para acentos visuales, iconos en tarjetas de servicio).

Accent: #ED8936 (Reservado ESTRICTAMENTE para botones de llamada a la acción y hovers interactivos).

Background: #F7FAFC (Color de fondo por defecto del <body/>).

Typography: Inter para cuerpos de texto (font-sans), Poppins para titulares (font-display).

7. ESTRUCTURA DE CARPETAS EXPECTADA PARA DESPLIEGUE
Plaintext
/src
  /actions
    send-lead.ts
  /app
    layout.tsx
    page.tsx
    globals.css
  /components
    /ui             # (Botones, inputs generados por shadcn)
    /layout         # Header.tsx, Footer.tsx
    /sections       # HeroSection.tsx, ServicesSection.tsx, ContactForm.tsx
  /lib
    schemas.ts
    email.ts
    utils.ts
INSTRUCCIONES DE PARSEO PARA ANTIGRAVITY
Lee este documento e interioriza la arquitectura, el stack y los tokens de diseño.

No inventes requerimientos fuera de este documento.

Todo código generado a partir de ahora debe cumplir con las restricciones técnicas descritas aquí, especialmente el flujo de Server Actions y la validación Zod.