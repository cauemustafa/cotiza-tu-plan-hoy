import { Resend } from 'resend';
import { z } from 'zod';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Validation schema with Zod
const quoteSchema = z.object({
  fullName: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede superar 100 caracteres')
    .regex(/^[\p{L}\s]+$/u, 'El nombre solo puede contener letras'),
  
  email: z.string()
    .email('Email inválido')
    .toLowerCase(),
  
  phone: z.string()
    .regex(/^(\+56)?[\s]?9[\s]?[0-9]{4}[\s]?[0-9]{4}$/, 'Formato: +56 9 1234 5678'),
  
  message: z.string()
    .max(500, 'El mensaje no puede superar 500 caracteres')
    .optional()
    .nullable(),
});

// TypeScript types
type QuoteFormData = z.infer<typeof quoteSchema>;

// Helper: Clean phone number for WhatsApp
const cleanPhoneNumber = (phone: string): string => {
  return phone.replace(/\D/g, '');
};

// Helper: Generate email HTML template for the broker
const generateEmailTemplateCorretora = (data: QuoteFormData): string => {
  const cleanPhone = cleanPhoneNumber(data.phone);
  
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0066CC 0%, #E61E50 100%); 
                 color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
        .info-row { margin-bottom: 15px; padding: 12px; background: white; border-radius: 6px; }
        .label { font-weight: bold; color: #0066CC; display: block; margin-bottom: 5px; }
        .value { color: #333; }
        .cta-button { display: inline-block; background: #25D366; color: white; 
                     padding: 12px 24px; text-decoration: none; border-radius: 6px; 
                     margin-top: 20px; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎯 Nueva Solicitud de Cotización</h1>
        </div>
        <div class="content">
          <div class="info-row">
            <span class="label">Nombre Completo:</span>
            <span class="value">${data.fullName}</span>
          </div>
          
          <div class="info-row">
            <span class="label">Email:</span>
            <span class="value"><a href="mailto:${data.email}">${data.email}</a></span>
          </div>
          
          <div class="info-row">
            <span class="label">Teléfono:</span>
            <span class="value">
              <a href="tel:${data.phone}">${data.phone}</a><br>
              <a href="https://wa.me/${cleanPhone}" style="color: #25D366;">📱 Abrir en WhatsApp</a>
            </span>
          </div>
          
          ${data.message ? `
          <div class="info-row">
            <span class="label">Mensaje:</span>
            <span class="value">${data.message}</span>
          </div>
          ` : ''}
          
          <div style="text-align: center;">
            <a href="https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hola, recibimos tu solicitud de cotización')}" 
               class="cta-button">
              Contactar por WhatsApp
            </a>
          </div>
        </div>
        <div class="footer">
          <p>Enviado desde cotizatuplanhoy.cl</p>
          <p>Fecha: ${new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' })}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Helper: Generate email HTML template for the client
const generateEmailTemplateCliente = (data: QuoteFormData): string => {
  const cleanPhone = cleanPhoneNumber(data.phone);

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0066CC 0%, #E61E50 100%); 
                 color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .success-icon { font-size: 48px; margin-bottom: 10px; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
        .info-box { background: white; padding: 20px; border-radius: 8px; 
                   border-left: 4px solid #0066CC; margin: 20px 0; }
        .cta-button { display: inline-block; background: #25D366; color: white; 
                     padding: 14px 28px; text-decoration: none; border-radius: 8px; 
                     margin: 20px 0; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="success-icon">✅</div>
          <h1>¡Solicitud Recibida con Éxito!</h1>
        </div>
        <div class="content">
          <p>Hola <strong>${data.fullName}</strong>,</p>
          
          <p>Gracias por confiar en <strong>Cotiza Tu Plan Hoy</strong>.</p>
          
          <p>Hemos recibido tu solicitud de cotización y nos pondremos en contacto contigo en las próximas <strong>24 horas</strong>.</p>
          
          <div class="info-box">
            <h3 style="margin-top: 0; color: #0066CC;">📋 Resumen de tu Solicitud</h3>
            <p><strong>Teléfono:</strong> ${data.phone}</p>
          </div>
          
          <p><strong>¿Necesitas ayuda urgente?</strong></p>
          <p>Si prefieres, puedes contactarnos directamente por WhatsApp:</p>
          
          <div style="text-align: center;">
            <a href="https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hola, necesito ayuda con mi cotización.')}" 
               class="cta-button">
              Contactar por WhatsApp
            </a>
          </div>
        </div>
        <div class="footer">
          <p>Enviado desde cotizatuplanhoy.cl</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export default async function (req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const parsedBody = quoteSchema.parse(req.body);

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return res.status(500).json({ message: 'Server configuration error: RESEND_API_KEY is missing.' });
    }

    // Send email to broker
    await resend.emails.send({
      from: 'Cotiza Tu Plan Hoy <onboarding@resend.dev>', // Replace with your verified domain
      to: 'contacto@cotizatuplanhoy.cl', // Replace with broker's email
      subject: `Nueva Solicitud de Cotización de ${parsedBody.fullName}`,
      html: generateEmailTemplateCorretora(parsedBody),
    });

    // Send confirmation email to client
    await resend.emails.send({
      from: 'Cotiza Tu Plan Hoy <onboarding@resend.dev>', // Replace with your verified domain
      to: parsedBody.email,
      subject: '¡Tu Solicitud de Cotización ha sido Recibida!',
      html: generateEmailTemplateCliente(parsedBody),
    });

    return res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Validation Error', errors: error.errors });
    }
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
