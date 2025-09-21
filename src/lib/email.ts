
'use server';

import { Resend } from 'resend';

interface ContactEmailProps {
  name: string;
  email: string;
  inquiry: string;
  whatsapp?: string;
  message: string;
}

interface ConfirmationEmailProps {
  name:string;
  email: string;
  message: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);
const adminEmail = 'samirpro.info@gmail.com';
const fromAddress = 'SAMIR PRO STUDIO <contact@samirprostudio.site>';

/**
 * Sends the contact form details to the site administrator.
 * 
 * @param {ContactEmailProps} data The contact form data.
 */
export async function sendContactEmailToAdmin({ name, email, inquiry, whatsapp, message }: ContactEmailProps) {
  try {
    await resend.emails.send({
      from: fromAddress,
      to: adminEmail,
      subject: `New Inquiry: ${inquiry} from ${name}`,
      html: `
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4; color: #333;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); overflow: hidden;">
            <div style="background: linear-gradient(135deg, #fd7e14, #ff5722); color: #ffffff; padding: 30px 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; text-shadow: 0 1px 2px rgba(0,0,0,0.2);">New Contact Submission</h1>
            </div>
            <div style="padding: 30px 20px;">
              <div style="margin-bottom: 20px;">
                <p style="font-weight: bold; margin: 0 0 5px; color: #555; text-transform: uppercase; font-size: 12px;">Inquiry Type:</p>
                <p style="margin: 0; font-size: 16px;">${inquiry}</p>
              </div>
              <div style="margin-bottom: 20px;">
                <p style="font-weight: bold; margin: 0 0 5px; color: #555; text-transform: uppercase; font-size: 12px;">From:</p>
                <p style="margin: 0; font-size: 16px;">${name} (<a href="mailto:${email}" style="color: #ff5722; text-decoration: none;">${email}</a>)</p>
              </div>
              ${whatsapp ? `
              <div style="margin-bottom: 20px;">
                <p style="font-weight: bold; margin: 0 0 5px; color: #555; text-transform: uppercase; font-size: 12px;">WhatsApp:</p>
                <p style="margin: 0; font-size: 16px;"><a href="https://wa.me/${whatsapp.replace(/\\D/g, '')}" style="color: #ff5722; text-decoration: none;">${whatsapp}</a></p>
              </div>
              ` : ''}
              <div style="background-color: #fff8f5; border-left: 4px solid #fd7e14; padding: 15px; margin-top: 20px; border-radius: 4px;">
                <p style="font-weight: bold; margin: 0 0 10px; color: #555; text-transform: uppercase; font-size: 12px;">Message:</p>
                <p style="margin: 0; font-size: 16px; line-height: 1.6; white-space: pre-wrap; font-style: italic;">"${message}"</p>
              </div>
            </div>
            <div style="text-align: center; padding: 20px; font-size: 12px; color: #aaa; background-color: #f9f9f9; border-top: 1px solid #eee;">
              This is an automated notification from samirprostudio.site
            </div>
          </div>
        </body>
      `
    });
  } catch(error) {
    console.error("Failed to send admin email:", error);
    throw new Error("Failed to send admin email.");
  }
}

/**
 * Sends a confirmation email to the user who submitted the form.
 * 
 * @param {ConfirmationEmailProps} data The user's details.
 */
export async function sendConfirmationEmailToUser({ name, email, message }: ConfirmationEmailProps) {
    try {
        await resend.emails.send({
            from: fromAddress,
            to: email,
            subject: "We've Received Your Message!",
            html: `
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; margin: 0; padding: 20px; background-color: #F8C8DC;">
              <div style="max-width: 520px; margin: 20px auto; background-color: #1a1a1a; border-radius: 12px; border: 1px solid #333; overflow: hidden;">
                <div style="padding: 24px; text-align: center; border-bottom: 1px solid #333;">
                  <h1 style="margin: 0 0 8px 0; font-size: 28px; color: #ffffff; font-weight: 600;">Thank You, ${name}!</h1>
                  <p style="margin: 0; font-size: 16px; color: #999999;">We've received your message and will be in touch soon.</p>
                </div>
                <div style="padding: 24px;">
                  <div style="background-color: #262626; border-radius: 8px; padding: 20px; border: 1px solid #444;">
                    <p style="margin: 0 0 12px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #aaaaaa;">Your message summary:</p>
                    <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #dddddd; font-style: italic;">"${message}"</p>
                  </div>
                </div>
                <div style="text-align: center; padding: 0 24px 24px 24px;">
                  <p style="font-size: 14px; color: #999999; margin: 0 0 16px 0;">While you wait, check out our latest AI creations:</p>
                  <a href="https://www.youtube.com/@SamirProStudio/videos" target="_blank" style="display: inline-block; background-color: #e5007a; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; box-shadow: 0 4px 15px rgba(229, 0, 122, 0.3);">
                    Watch on YouTube
                  </a>
                </div>
                <div style="text-align: center; padding: 20px; font-size: 12px; color: #666; border-top: 1px solid #333;">
                  &copy; ${new Date().getFullYear()} SAMIR PRO STUDIO
                </div>
              </div>
            </body>
            `
          });
    } catch(error) {
        console.error("Failed to send confirmation email:", error);
        // We don't throw an error here because the user submission was successful
        // even if the confirmation email fails.
    }
}
