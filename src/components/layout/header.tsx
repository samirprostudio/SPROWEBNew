"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import TiltCard from "../tilt-card";

const navItems = [
  { href: "/#services", label: "Services" },
  { href: "/#videos", label: "Videos" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <TiltCard>
            <Image src="/logo.png" alt="SAMIR PRO STUDIO Logo" width={32} height={32} className="h-8 w-8" />
          </TiltCard>
          <span className="font-bold font-headline sm:inline-block">
            SAMIR PRO STUDIO
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-end">
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname?.startsWith(item.href)
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center justify-end space-x-4 md:hidden">
            {isMounted && (
               <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center mb-8">
                      <Link href="/" className="mr-6 flex items-center space-x-2">
                        <Image src="/logo.png" alt="SAMIR PRO STUDIO Logo" width={32} height={32} className="h-8 w-8" />
                        <span className="font-bold font-headline">SAMIR PRO STUDIO</span>
                      </Link>
                    </div>
                    <div className="flex flex-col space-y-4">
                      {navItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="text-lg font-medium transition-colors hover:text-primary"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
