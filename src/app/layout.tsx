
'use client';

import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { MagicCursor } from '@/components/magic-cursor';
import { Orbitron, Inter, Space_Grotesk } from 'next/font/google';
import FireBackground from '@/components/fire-background';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
});

// export const metadata: Metadata = {
//   title: 'SAMIR PRO - AI Powered Solutions',
//   description: 'Welcome to SAMIR PRO. We build innovative AI-powered solutions.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <title>SAMIR PRO - AI Powered Solutions</title>
        <meta name="description" content="Welcome to SAMIR PRO. We build innovative AI-powered solutions." />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased', inter.variable, spaceGrotesk.variable, orbitron.variable)}>
        <FireBackground />
        <MagicCursor />
        <div className="relative flex min-h-dvh flex-col bg-transparent backdrop-blur-sm">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
