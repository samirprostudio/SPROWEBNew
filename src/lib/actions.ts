
'use server';

import { z } from 'zod';
import { sendContactEmailToAdmin, sendConfirmationEmailToUser, sendOrderEmailToAdmin } from '@/lib/email.tsx';
import { redirect } from 'next/navigation';

// This is a simplified check for the server. The robust validation happens on the client.
const optionalPhoneValidation = z.string().optional().refine(value => {
    if (!value) return true; // It's optional
    // Basic check for plus sign and digits, since the detailed validation is on the client.
    return /^\+?[1-9]\d{1,14}$/.test(value);
}, {
    message: 'Please enter a valid phone number.'
});

// Schema for the general contact form
const ContactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  inquiry: z.string().min(1, { message: 'Please select an inquiry type.' }),
  customInquiry: z.string().optional(),
  whatsapp: optionalPhoneValidation,
  message: z.string().min(10, { message: 'Message must be at least 10 characters long.' }),
  honeypot: z.string().optional(),
}).refine(data => {
    if (data.inquiry === 'Other' && (!data.customInquiry || data.customInquiry.length < 3)) {
        return false;
    }
    return true;
}, {
    message: 'Custom inquiry must be at least 3 characters long.',
    path: ['customInquiry'],
});

// Schema for the detailed order form
const OrderFormSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters.'),
    email: z.string().email('Please enter a valid email.'),
    whatsapp: optionalPhoneValidation,
    topic: z.string().min(3, 'Topic must be at least 3 characters.'),
    videoLength: z.string().min(1, 'Please select a video length.'),
    targetAudience: z.string().min(3, 'Target audience must be at least 3 characters.'),
    idea: z.string().min(20, 'Idea description must be at least 20 characters.'),
    honeypot: z.string().optional(),
});


export type ContactFormState = {
  message: string;
  status: 'error' | 'success' | 'idle';
  issues?: string[];
};

export type FormState = {
  message: string;
  status: 'error' | 'success' | 'idle';
  issues?: string[];
};

export async function submitContactForm(
  formData: FormData,
): Promise<ContactFormState> {
  const validatedFields = ContactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    inquiry: formData.get('inquiry'),
    customInquiry: formData.get('customInquiry'),
    whatsapp: formData.get('whatsapp'),
    message: formData.get('message'),
    honeypot: formData.get('honeypot'),
  });

  if (!validatedFields.success) {
    const issues = validatedFields.error.flatten().fieldErrors;
    console.log(issues)
    return {
      message: 'Invalid form data. Please check the fields and try again.',
      status: 'error',
      issues: validatedFields.error.flatten().fieldErrors.message,
    };
  }

  if (validatedFields.data.honeypot) {
    return { status: 'success', message: 'Submission successful.' };
  }
  
  const { name, email, inquiry, customInquiry, whatsapp, message } = validatedFields.data;
  const finalInquiry = inquiry === 'Other' ? customInquiry : inquiry;

  try {
    await sendContactEmailToAdmin({ name, email, inquiry: finalInquiry as string, whatsapp, message });
    await sendConfirmationEmailToUser({ name, email, message: `Your inquiry about "${finalInquiry}" has been received.` });
  } catch (error) {
    console.error('Failed to send email:', error);
    return {
      message: 'An unexpected error occurred on our end. Please try again later.',
      status: 'error',
    };
  }

  redirect('/contact/thank-you');
}


export async function submitOrderForm(
    formData: FormData,
  ): Promise<FormState> {
    const validatedFields = OrderFormSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      whatsapp: formData.get('whatsapp'),
      topic: formData.get('topic'),
      videoLength: formData.get('videoLength'),
      targetAudience: formData.get('targetAudience'),
      idea: formData.get('idea'),
      honeypot: formData.get('honeypot'),
    });
  
    if (!validatedFields.success) {
      return {
        message: 'Invalid form data. Please check the fields and try again.',
        status: 'error',
        issues: validatedFields.error.flatten().fieldErrors.message,
      };
    }
  
    if (validatedFields.data.honeypot) {
      return { status: 'success', message: 'Submission successful.' };
    }
    
    const orderData = validatedFields.data;
  
    try {
      // First, send the data to Google Sheets
      if (process.env.GOOGLE_SHEET_WEB_APP_URL) {
        await fetch(process.env.GOOGLE_SHEET_WEB_APP_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });
      }

      // Then, send the notification emails
      await sendOrderEmailToAdmin(orderData);
      await sendConfirmationEmailToUser({
        name: orderData.name,
        email: orderData.email,
        message: `Your custom video order for the topic "${orderData.topic}" has been received. We will review the details and get back to you shortly.`
      });
    } catch (error) {
      console.error('Failed to process order:', error);
      return {
        message: 'An unexpected error occurred while submitting your order. Please try again later.',
        status: 'error',
      };
    }
  
    redirect('/contact/thank-you?from=order');
  }
