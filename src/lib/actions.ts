'use server';

import { z } from 'zod';
import { sendContactEmailToAdmin, sendConfirmationEmailToUser } from '@/lib/email';
import { redirect } from 'next/navigation';

const ContactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  inquiry: z.string().min(1, { message: 'Please select an inquiry type.' }),
  customInquiry: z.string().optional(),
  whatsapp: z.string().optional(),
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

export type ContactFormState = {
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

  // Honeypot check
  if (validatedFields.data.honeypot) {
    // Silently fail for bots but return success to not alert them.
    return { status: 'success', message: 'Submission successful.' };
  }
  
  const { name, email, inquiry, customInquiry, whatsapp, message } = validatedFields.data;
  const finalInquiry = inquiry === 'Other' ? customInquiry : inquiry;

  try {
    await sendContactEmailToAdmin({ name, email, inquiry: finalInquiry as string, whatsapp, message });
    await sendConfirmationEmailToUser({ name, email, message });
  } catch (error) {
    console.error('Failed to send email:', error);
    return {
      message: 'An unexpected error occurred on our end. Please try again later.',
      status: 'error',
    };
  }

  return { status: 'success', message: 'Submission successful.' };
}
