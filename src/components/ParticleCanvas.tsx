import React, { useEffect, useRef } from 'react';

interface ParticleCanvasProps {
  mode?: 'forest' | 'ocean' | 'transition';
  className?: string;
  density?: number;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({
  mode = 'forest',
  className = '',
  density = 45
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      alpha: number;
      pulseSpeed: number;
      hue: number;
    }

    const particles: Particle[] = [];
    const count = Math.min(density, Math.floor((width * height) / 25000));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * (mode === 'ocean' ? 3.5 : 2.5) + 0.8,
        speedX: (Math.random() - 0.5) * (mode === 'ocean' ? 0.3 : 0.4),
        speedY: mode === 'ocean' ? -(Math.random() * 0.7 + 0.2) : (Math.random() - 0.5) * 0.3 - 0.1,
        alpha: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        hue: mode === 'forest' ? 42 : mode === 'ocean' ? 195 : 35
      });
    }

    let t = 0;
    const render = () => {
      t += 0.02;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX + Math.sin(t + i) * 0.2;
        p.y += p.speedY;

        // Wrap around
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentAlpha = Math.max(0.1, p.alpha + Math.sin(t * 2 + i) * 0.2);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        if (mode === 'forest') {
          // Warm golden amber pollen & forest dust
          ctx.fillStyle = `rgba(225, 190, 110, ${currentAlpha * 0.85})`;
          ctx.shadowBlur = p.size * 3;
          ctx.shadowColor = 'rgba(212, 176, 55, 0.4)';
        } else if (mode === 'ocean') {
          // Cyan-white bubbles with subtle highlight
          ctx.fillStyle = `rgba(165, 235, 255, ${currentAlpha * 0.7})`;
          ctx.shadowBlur = p.size * 2;
          ctx.shadowColor = 'rgba(56, 189, 248, 0.5)';
        } else {
          // Warm beige stone/sunset dust
          ctx.fillStyle = `rgba(245, 230, 200, ${currentAlpha * 0.75})`;
          ctx.shadowBlur = p.size * 2;
          ctx.shadowColor = 'rgba(245, 200, 150, 0.3)';
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mode, density]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
};
