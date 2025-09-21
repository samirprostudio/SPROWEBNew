'use client';

import { useActionState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { generateAction, type FormState } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { SubmitButton } from '@/components/submit-button';

const initialState: FormState = {
  message: '',
};

export default function BrandStoryForm() {
  const [state, formAction] = useActionState(generateAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.message !== 'success') {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Company Details</CardTitle>
          <CardDescription>
            Provide some information about your brand. The more details, the better the story.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name (Required)</Label>
              <Input
                id="companyName"
                name="companyName"
                placeholder="e.g., Innovate Inc."
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="missionStatement">Mission Statement</Label>
              <Textarea
                id="missionStatement"
                name="missionStatement"
                placeholder="e.g., To empower creators with cutting-edge technology."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="values">Core Values</Label>
              <Input
                id="values"
                name="values"
                placeholder="e.g., Innovation, Integrity, Customer-Centricity"
              />
              <p className="text-sm text-muted-foreground">
                Separate values with commas.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="uniqueSellingProposition">Unique Selling Proposition (USP)</Label>
              <Textarea
                id="uniqueSellingProposition"
                name="uniqueSellingProposition"
                placeholder="e.g., The only platform that combines AI video, audio, and analytics in one place."
              />
            </div>
            <SubmitButton buttonText="Generate Story" />
          </form>
        </CardContent>
      </Card>

      {state.story && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Your Generated Brand Story</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-invert max-w-none text-foreground">
              <p className="text-muted-foreground">{state.story}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
