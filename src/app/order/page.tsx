import type { Metadata } from 'next';
import OrderForm from '@/components/order-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
    title: 'Order Custom AI Video | SAMIR PRO',
    description: 'Order a custom AI-generated video for your YouTube channel, social media, or personal project. Provide your details and we will bring your vision to life.',
};

export default function OrderPage() {
    return (
        <div className="container max-w-4xl py-12 md:py-24">
            <Card className="shadow-2xl bg-card/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                    <CardTitle className="font-headline text-3xl md:text-4xl">Custom AI Video Order</CardTitle>
                    <CardDescription className="text-base md:text-lg">
                        Fill out the form below with the details of your video request.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <OrderForm />
                </CardContent>
            </Card>
        </div>
    );
}
