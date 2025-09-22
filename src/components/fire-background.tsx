
'use client';

import { useEffect, useState } from 'react';

const FireBackground = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const isClient = typeof window !== 'undefined';
    if (!isClient) return;

    const newParticles = Array.from({ length: 50 }).map((_, i) => {
        const size = Math.random() * 50 + 20; // 20px to 70px
        return {
            id: `particle-${i}`,
            style: {
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                bottom: `-${size}px`,
                animation: `fire-animation ${Math.random() * 2 + 1.5}s linear ${Math.random() * 2}s infinite`,
            },
        };
    });
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden bg-background">
      <div className="fire-container absolute w-full h-full bottom-0">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={particle.style}
          />
        ))}
      </div>
    </div>
  );
};

export default FireBackground;
