import React, { useEffect, useRef } from 'react';

export const ParticleCanvas = ({ mode = 'forest', density = 45, className = '' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle objects
    const particles = [];
    const count = Math.min(density, Math.floor((width * height) / 25000));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.6,
        alpha: Math.random() * 0.6 + 0.2,
        speedX: mode === 'ocean' ? (Math.random() - 0.5) * 0.4 : (Math.random() - 0.5) * 0.3,
        speedY: mode === 'ocean' ? -(Math.random() * 0.9 + 0.3) : -(Math.random() * 0.3 + 0.1),
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulseVal: Math.random() * Math.PI,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.pulseVal += p.pulseSpeed;
        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulseVal));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (mode === 'ocean') {
          // Ocean bubbles: cyan/white with slight glow
          ctx.fillStyle = `rgba(180, 235, 255, ${currentAlpha})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = 'rgba(56, 189, 248, 0.4)';
        } else {
          // Forest particles: golden amber / warm white dust motes
          ctx.fillStyle = `rgba(255, 225, 140, ${currentAlpha})`;
          ctx.shadowBlur = 5;
          ctx.shadowColor = 'rgba(212, 175, 55, 0.35)';
        }

        ctx.fill();

        // Update positions
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around edges
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode, density]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
    />
  );
};
