'use client';

import Tilt from 'react-parallax-tilt';
import { cn } from '@/lib/utils';

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function TiltCard({ children, className }: TiltCardProps) {
  return (
    <Tilt
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      glareEnable={true}
      glareMaxOpacity={0.15}
      glarePosition="all"
      className={cn('p-0.5 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 transition-all duration-300 hover:from-primary/50 hover:to-accent/50', className)}
    >
      <div className="h-full w-full rounded-md bg-card">
        {children}
      </div>
    </Tilt>
  );
}
