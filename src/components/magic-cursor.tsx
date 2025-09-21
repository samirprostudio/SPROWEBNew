'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function MagicCursor() {
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const [isTapped, setIsTapped] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => {
      setIsTapped(true);
    };

    const handleMouseUp = () => {
      setIsTapped(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div
      className={cn("magic-cursor", { tapped: isTapped })}
      style={{
        transform: `translate(${position.x - 160}px, ${position.y - 160}px)`,
      }}
    />
  );
}
