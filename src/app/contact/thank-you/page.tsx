
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Youtube, Home } from "lucide-react";
import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Thank You! | SAMIR PRO',
    description: 'Thank you for contacting SAMIR PRO. We have received your message.',
};

type ThankYouPageProps = {
    searchParams?: {
        from?: string;
    };
};

export default function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const isFromOrder = searchParams?.from === 'order';

  const titleText = isFromOrder ? "Order Received!" : "Thank You!";
  const descriptionText = isFromOrder
    ? "Your order has been successfully submitted. Our team will review it and get back to you as soon as possible."
    : "Your message has been successfully sent. Our team will review it and get back to you as soon as possible.";


  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-14rem)] py-12">
      <Card className="max-w-2xl w-full text-center p-4 sm:p-8 shadow-2xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <div className="mx-auto bg-primary/20 text-primary h-16 w-16 rounded-full flex items-center justify-center mb-4 border-2 border-primary/50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <CardTitle className="font-headline text-2xl md:text-4xl">{titleText}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground text-base md:text-lg">
            {descriptionText}
          </p>
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-headline text-lg font-semibold mb-2">While you wait...</h3>
            <p className="text-muted-foreground mb-4 text-sm sm:text-base">
              Why not check out our latest videos on YouTube? We share tutorials, insights, and entertaining content about AI and technology.
            </p>
            <Button asChild className="group transition-transform transform hover:scale-105">
                <Link href="https://www.youtube.com/@SamirProStudio/videos" target="_blank" rel="noopener noreferrer">
                    Watch on YouTube
                    <Youtube className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
                </Link>
            </Button>
          </div>
          <div className="pt-4">
            <Button asChild variant="outline">
                <Link href="/">
                    <Home className="mr-2 h-4 w-4"/>
                    Return to Homepage
                </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
