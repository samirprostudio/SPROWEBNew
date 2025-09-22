
'use client';

import 'react-phone-number-input/style.css';
import { useEffect, useRef, useState, useTransition } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';

import { submitOrderForm, type FormState } from '@/lib/actions';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { Label } from './ui/label';

const OrderFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email.'),
  whatsapp: z.string().optional().refine(
    (value) => !value || isValidPhoneNumber(value), 
    'Please enter a valid phone number.'
  ),
  topic: z.string().min(3, 'Topic must be at least 3 characters.'),
  videoLength: z.string().min(1, 'Please select a video length.'),
  targetAudience: z.string().min(3, 'Target audience must be at least 3 characters.'),
  idea: z.string().min(20, 'Idea description must be at least 20 characters.'),
  honeypot: z.string().optional(),
});

type OrderFormInputs = z.infer<typeof OrderFormSchema>;

const initialState: FormState = {
  message: '',
  status: 'idle',
};

export default function OrderForm() {
  const [state, setState] = useState<FormState>(initialState);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { toast } = useToast();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrderFormInputs>({
    resolver: zodResolver(OrderFormSchema),
    defaultValues: {
      name: '',
      email: '',
      whatsapp: '',
      topic: '',
      videoLength: '',
      targetAudience: '',
      idea: '',
      honeypot: '',
    },
  });

  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: 'Order Submitted!',
        description: 'We have received your request and will be in touch soon.',
      });
      reset();
      router.push('/contact/thank-you?from=order');
    } else if (state.status === 'error' && state.message) {
      toast({
        title: 'An Error Occurred',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast, router, reset]);
  
  const onFormSubmit = (data: OrderFormInputs) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value as string);
      }
    });

    startTransition(async () => {
      const result = await submitOrderForm(formData);
      setState(result);
    });
  };

  return (
    <form 
      ref={formRef} 
      onSubmit={handleSubmit(onFormSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Column 1 */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" type="text" placeholder="Your Name" {...register('name')} />
          {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" placeholder="your.email@example.com" {...register('email')} />
          {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="whatsapp">WhatsApp Number (Optional)</Label>
          <Controller
              name="whatsapp"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  id="whatsapp"
                  placeholder="Enter phone number"
                  international
                  defaultCountry="US"
                  className={cn(
                    'phone-input-dark flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                    errors.whatsapp && 'border-destructive'
                  )}
                />
              )}
            />
          {errors.whatsapp && <p className="text-destructive text-sm mt-1">{errors.whatsapp.message}</p>}
        </div>
      </div>

      {/* Column 2 */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="topic">Video Topic</Label>
          <Input id="topic" type="text" placeholder="e.g., 'History of AI'" {...register('topic')} />
          {errors.topic && <p className="text-destructive text-sm mt-1">{errors.topic.message}</p>}
        </div>
        <div>
            <Label>Target Video Length</Label>
            <Controller
            name="videoLength"
            control={control}
            render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                    <SelectValue placeholder="Select a duration" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="< 1 minute (Short)">Under 1 minute (Short)</SelectItem>
                    <SelectItem value="1-3 minutes">1-3 minutes</SelectItem>
                    <SelectItem value="3-5 minutes">3-5 minutes</SelectItem>
                    <SelectItem value="5-10 minutes">5-10 minutes</SelectItem>
                    <SelectItem value="10+ minutes">10+ minutes</SelectItem>
                </SelectContent>
                </Select>
            )}
            />
            {errors.videoLength && <p className="text-destructive text-sm mt-1">{errors.videoLength.message}</p>}
        </div>
        <div>
          <Label htmlFor="targetAudience">Target Audience</Label>
          <Input id="targetAudience" type="text" placeholder="e.g., 'Tech Enthusiasts, Students'" {...register('targetAudience')} />
          {errors.targetAudience && <p className="text-destructive text-sm mt-1">{errors.targetAudience.message}</p>}
        </div>
      </div>

      {/* Full Width */}
      <div className="md:col-span-2">
        <Label htmlFor="idea">Describe Your Idea</Label>
        <Textarea
          id="idea"
          placeholder="Please provide a detailed description of your video concept. Include any specific scenes, characters, narrative points, style references, or other important details."
          {...register('idea')}
          className="min-h-[150px]"
        />
        {errors.idea && <p className="text-destructive text-sm mt-1">{errors.idea.message}</p>}
      </div>
      
      {/* Honeypot field */}
      <input type="text" {...register('honeypot')} className="hidden" aria-hidden="true" />

      <div className="md:col-span-2 text-center">
        <Button type="submit" disabled={isPending} size="lg" className="w-full max-w-md transition-transform transform hover:scale-105">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting Order...
            </>
          ) : (
            "Place Custom Video Order"
          )}
        </Button>
      </div>
    </form>
  );
}
