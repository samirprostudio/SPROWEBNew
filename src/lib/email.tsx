
'use server';

import { render } from '@react-email/render';
import { Resend } from 'resend';

interface ContactEmailProps {
  name: string;
  email: string;
  inquiry: string;
  whatsapp?: string;
  message: string;
}

interface OrderEmailProps {
    name: string;
    email: string;
    whatsapp?: string;
    topic: string;
    videoLength: string;
    targetAudience: string;
    idea: string;
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

const OrderReceiptEmail = ({ data }: { data: OrderEmailProps }) => (
    <body style={{fontFamily: 'Arial, sans-serif', margin: '0', padding: '20px', backgroundColor: '#f4f4f4'}}>
      <div style={{maxWidth: '600px', margin: 'auto', backgroundColor: '#ffffff', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
        <div style={{background: 'linear-gradient(135deg, #3f51b5, #2196f3)', color: '#ffffff', padding: '20px', textAlign: 'center', borderBottom: '1px solid #ddd', borderTopLeftRadius: '8px', borderTopRightRadius: '8px'}}>
          <h1 style={{margin: '0', fontSize: '24px'}}>New Custom Video Order</h1>
        </div>
        <div style={{padding: '20px'}}>
          <h2 style={{fontSize: '18px', color: '#333', borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '20px'}}>Order Details</h2>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <tbody>
              <tr style={{borderBottom: '1px solid #eee'}}>
                <td style={{padding: '10px 0', fontWeight: 'bold', color: '#555', width: '150px'}}>Topic:</td>
                <td style={{padding: '10px 0'}}>{data.topic}</td>
              </tr>
              <tr style={{borderBottom: '1px solid #eee'}}>
                <td style={{padding: '10px 0', fontWeight: 'bold', color: '#555'}}>Video Length:</td>
                <td style={{padding: '10px 0'}}>{data.videoLength}</td>
              </tr>
              <tr style={{borderBottom: '1px solid #eee'}}>
                <td style={{padding: '10px 0', fontWeight: 'bold', color: '#555'}}>Target Audience:</td>
                <td style={{padding: '10px 0'}}>{data.targetAudience}</td>
              </tr>
            </tbody>
          </table>
          
          <h2 style={{fontSize: '18px', color: '#333', borderBottom: '2px solid #eee', paddingBottom: '10px', marginTop: '30px', marginBottom: '20px'}}>Idea Description</h2>
          <div style={{backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '4px', whiteSpace: 'pre-wrap', lineHeight: 1.6}}>
            {data.idea}
          </div>
  
          <h2 style={{fontSize: '18px', color: '#333', borderBottom: '2px solid #eee', paddingBottom: '10px', marginTop: '30px', marginBottom: '20px'}}>Customer Information</h2>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <tbody>
                <tr style={{borderBottom: '1px solid #eee'}}>
                  <td style={{padding: '10px 0', fontWeight: 'bold', color: '#555', width: '150px'}}>Name:</td>
                  <td style={{padding: '10px 0'}}>{data.name}</td>
                </tr>
                <tr style={{borderBottom: '1px solid #eee'}}>
                  <td style={{padding: '10px 0', fontWeight: 'bold', color: '#555'}}>Email:</td>
                  <td style={{padding: '10px 0'}}><a href={`mailto:${data.email}`} style={{color: '#2196f3', textDecoration: 'none'}}>{data.email}</a></td>
                </tr>
                {data.whatsapp ? (
                <tr style={{borderBottom: '1px solid #eee'}}>
                  <td style={{padding: '10px 0', fontWeight: 'bold', color: '#555'}}>WhatsApp:</td>
                  <td style={{padding: '10px 0'}}><a href={`https://wa.me/${data.whatsapp.replace(/\\D/g, '')}`} style={{color: '#2196f3', textDecoration: 'none'}}>{data.whatsapp}</a></td>
                </tr>
                ) : null}
              </tbody>
          </table>
        </div>
        <div style={{textAlign: 'center', padding: '20px', fontSize: '12px', color: '#aaa', backgroundColor: '#fafafa', borderTop: '1px solid #ddd', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px'}}>
          This is an automated notification from samirprostudio.site
        </div>
      </div>
    </body>
  );

/**
 * Sends the order form details to the site administrator.
 */
export async function sendOrderEmailToAdmin(data: OrderEmailProps) {
    const emailHtml = render(<OrderReceiptEmail data={data} />);

    try {
      await resend.emails.send({
        from: fromAddress,
        to: adminEmail,
        subject: `New Custom Video Order: ${data.topic}`,
        html: emailHtml,
      });
    } catch(error) {
      console.error("Failed to send order email:", error);
      throw new Error("Failed to send order email.");
    }
  }

/**
 * Sends a confirmation email to the user who submitted the form.
 */
export async function sendConfirmationEmailToUser({ name, email, message }: ConfirmationEmailProps) {
    try {
        await resend.emails.send({
            from: fromAddress,
            to: email,
            subject: "We've Received Your Request!",
            html: `
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; margin: 0; padding: 20px; background-color: #F8C8DC;">
              <div style="max-width: 520px; margin: 20px auto; background-color: #1a1a1a; border-radius: 12px; border: 1px solid #333; overflow: hidden;">
                <div style="padding: 24px; text-align: center; border-bottom: 1px solid #333;">
                  <h1 style="margin: 0 0 8px 0; font-size: 28px; color: #ffffff; font-weight: 600;">Thank You, ${name}!</h1>
                  <p style="margin: 0; font-size: 16px; color: #999999;">We've received your request and will be in touch soon.</p>
                </div>
                <div style="padding: 24px;">
                  <div style="background-color: #262626; border-radius: 8px; padding: 20px; border: 1px solid #444;">
                    <p style="margin: 0 0 12px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #aaaaaa;">Summary:</p>
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
