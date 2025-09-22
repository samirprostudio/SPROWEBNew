
'use client';

import 'react-phone-number-input/style.css';
import { useEffect, useRef, useState, useTransition } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';

import { submitContactForm, type ContactFormState } from '@/lib/actions';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

const ContactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email.'),
  whatsapp: z.string().optional().refine(
    (value) => !value || isValidPhoneNumber(value), 
    'Please enter a valid phone number.'
  ),
  inquiry: z.string().min(1, 'Please select an inquiry type.'),
  customInquiry: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
  honeypot: z.string().optional(), // Honeypot field
}).refine(data => {
    if (data.inquiry === 'Other' && (!data.customInquiry || data.customInquiry.length < 3)) {
        return false;
    }
    return true;
}, {
    message: 'Custom inquiry must be at least 3 characters long.',
    path: ['customInquiry'],
});

type ContactFormInputs = z.infer<typeof ContactFormSchema>;

const initialState: ContactFormState = {
  message: '',
  status: 'idle',
};

const inquiryPlaceholders: Record<string, string> = {
  'General Inquiry': 'Tell us how we can help...',
  'Project Request': 'Please describe your project, including the scope, timeline, and budget...',
  'AI Services': 'What kind of AI service are you interested in? (e.g., custom agents, video generation)...',
  'Web Development': 'What are you looking to build? (e.g., marketing site, e-commerce, web app)...',
  'Other': 'Please describe your inquiry...',
}

export default function ContactForm() {
  const [state, setState] = useState<ContactFormState>(initialState);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { toast } = useToast();
  
  const [showCustomInquiry, setShowCustomInquiry] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      whatsapp: '',
      inquiry: '',
      customInquiry: '',
      message: '',
      honeypot: '',
    },
  });

  const watchedInquiry = watch('inquiry');

  useEffect(() => {
    if (watchedInquiry === 'Other') {
        setShowCustomInquiry(true);
    } else {
        setShowCustomInquiry(false);
    }
  }, [watchedInquiry]);

  useEffect(() => {
    if (state.status === 'success') {
      reset();
      router.push('/contact/thank-you');
    } else if (state.status === 'error' && state.message) {
      toast({
        title: 'An Error Occurred',
        description: state.message,
        variant: 'destructive',
      });
      if (state.issues) {
        console.error('Validation Issues:', state.issues);
      }
    }
  }, [state, toast, router, reset]);
  
  const onFormSubmit = (data: ContactFormInputs) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            formData.append(key, value as string);
        }
    });

    startTransition(async () => {
        const result = await submitContactForm(formData);
        setState(result);
    });
  };

  return (
    <form 
      ref={formRef} 
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex flex-col space-y-4"
    >
      <div>
        <Input
          type="text"
          placeholder="Name"
          {...register('name')}
          className={cn(
            'transition-all transform hover:scale-105 hover:border-accent',
            errors.name && 'border-destructive'
          )}
        />
        {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <Input
          type="email"
          placeholder="Email"
          {...register('email')}
          className={cn(
            'transition-all transform hover:scale-105 hover:border-accent',
            errors.email && 'border-destructive'
          )}
        />
        {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <Controller
          name="whatsapp"
          control={control}
          render={({ field }) => (
            <PhoneInput
              {...field}
              placeholder="WhatsApp Number (Optional)"
              international
              defaultCountry="US"
              className={cn(
                'phone-input-dark flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all transform hover:scale-105 hover:border-accent',
                 errors.whatsapp && 'border-destructive'
              )}
            />
          )}
        />
        {errors.whatsapp && <p className="text-destructive text-sm mt-1">{errors.whatsapp.message}</p>}
      </div>
      <div>
        <Controller
          name="inquiry"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className={cn(
                  'transition-all transform hover:scale-105 hover:border-accent',
                  errors.inquiry && 'border-destructive'
                )}>
                <SelectValue placeholder="Select Inquiry Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                <SelectItem value="Project Request">Project Request</SelectItem>
                <SelectItem value="AI Services">AI Services</SelectItem>
                <SelectItem value="Web Development">Web Development</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.inquiry && <p className="text-destructive text-sm mt-1">{errors.inquiry.message}</p>}
      </div>

      {showCustomInquiry && (
        <div>
            <Input
              type="text"
              placeholder="Your Inquiry Subject"
              {...register('customInquiry')}
              className={cn(
                'transition-all transform hover:scale-105 hover:border-accent',
                errors.customInquiry && 'border-destructive'
              )}
            />
            {errors.customInquiry && <p className="text-destructive text-sm mt-1">{errors.customInquiry.message}</p>}
        </div>
      )}

      <div>
        <Textarea
          placeholder={inquiryPlaceholders[watchedInquiry] || 'Please select an inquiry type first'}
          {...register('message')}
          className={cn(
            'transition-all transform hover:scale-105 hover:border-accent',
            errors.message && 'border-destructive'
          )}
          disabled={!watchedInquiry}
        />
        {errors.message && <p className="text-destructive text-sm mt-1">{errors.message.message}</p>}
      </div>
      
      {/* Honeypot field */}
      <input type="text" {...register('honeypot')} className="hidden" aria-hidden="true" />

      <Button type="submit" disabled={isPending} className="w-full transition-transform transform hover:scale-105">
          {isPending ? (
              <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
              </>
          ) : (
              "Send Message"
          )}
      </Button>
    </form>
  );
}
