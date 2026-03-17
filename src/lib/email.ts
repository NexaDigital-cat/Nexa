import nodemailer from "nodemailer";
import type { LeadFormValues } from "./schemas";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false otherwise
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendLeadEmail(data: LeadFormValues) {
  const { nom, telefon, email, servei, pressupost, urgencia, descripcio } = data;

  const html = `
    <!DOCTYPE html>
    <html lang="ca">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: 'Inter', sans-serif; background-color: #F7FAFC; color: #2D3748; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .header { background-color: #1A365D; padding: 20px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; font-size: 24px; }
        .header span { color: #4FD1C5; }
        .content { padding: 30px; }
        .content h2 { color: #1A365D; margin-top: 0; border-bottom: 2px solid #ED8936; padding-bottom: 10px; display: inline-block; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #E2E8F0; }
        th { width: 35%; color: #4A5568; font-weight: 600; }
        td { color: #2D3748; }
        .footer { background-color: #F7FAFC; padding: 15px; text-align: center; font-size: 12px; color: #718096; border-top: 1px solid #E2E8F0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Nexa<span>Digital</span></h1>
        </div>
        <div class="content">
          <h2>Nou Lead rebut!</h2>
          <p>S'ha rebut una nova sol·licitud a través de la pàgina web. A continuació, els detalls:</p>
          <table>
            <tr><th>Nom:</th><td>${nom}</td></tr>
            <tr><th>Telèfon:</th><td>${telefon}</td></tr>
            <tr><th>Email:</th><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><th>Servei d'interès:</th><td>${servei}</td></tr>
            <tr><th>Pressupost:</th><td>${pressupost}</td></tr>
            <tr><th>Urgència:</th><td>${urgencia}</td></tr>
            <tr><th>Més detalls:</th><td>${descripcio.replace(/\n/g, '<br/>')}</td></tr>
          </table>
        </div>
        <div class="footer">
          Aquest és un correu automàtic generat per la web de Nexa Digital. Si us plau, no respongueu directament a aquest missatge sense canviar el destinatari al client.
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"Nexa Digital Web" <${process.env.SMTP_USER}>`,
    to: "nexainforma@gmail.com",
    subject: `💥 Nou Lead: ${servei} de ${nom}`,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("No s'ha pogut enviar el correu. Intenta-ho de nou més tard.");
  }
}
