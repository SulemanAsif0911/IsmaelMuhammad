import React, { useState, useRef } from 'react';
import { Product } from '../types';

interface InteractiveBottleProps {
  product: Product;
  imageSrc: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  glowColor?: string;
  onClick?: () => void;
  className?: string;
  showDetailsOnHover?: boolean;
  depthBadge?: string;
}

export const InteractiveBottle: React.FC<InteractiveBottleProps> = ({
  product,
  imageSrc,
  size = 'md',
  glowColor = 'rgba(212, 176, 55, 0.4)',
  onClick,
  className = '',
  showDetailsOnHover = true,
  depthBadge
}) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Max 14 degree tilt
    const rotateY = (x / (rect.width / 2)) * 12;
    const rotateX = -(y / (rect.height / 2)) * 12;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const sizeClasses = {
    sm: 'max-h-[220px] max-w-[160px]',
    md: 'max-h-[320px] max-w-[240px]',
    lg: 'max-h-[440px] max-w-[320px]',
    hero: 'max-h-[520px] max-w-[380px] md:max-h-[620px] md:max-w-[460px]',
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative cursor-pointer select-none transition-transform duration-300 ease-out group perspective-1000 ${className}`}
      style={{ perspective: '1000px' }}
    >
      {/* Dynamic ambient back-glow */}
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-30 transition-all duration-700 pointer-events-none group-hover:opacity-75 group-hover:scale-110"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
        }}
      />

      {/* Floating bottle container with 3D transform */}
      <div
        className="relative transition-transform duration-150 ease-out transform-gpu"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${isHovered ? 1.04 : 1})`,
          transformStyle: 'preserve-3d',
        }}
      >
        <img
          src={imageSrc}
          alt={product.name}
          className={`w-auto object-contain mx-auto drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] filter transition-all duration-300 ${sizeClasses[size]}`}
          loading="eager"
        />

        {/* Shimmer light sweep on hover */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"
        />

        {/* Optional Depth Badge (e.g. 10M, 40M) */}
        {depthBadge && (
          <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-cyan-500/30 text-cyan-300 text-[10px] tracking-widest font-mono uppercase">
            {depthBadge}
          </div>
        )}
      </div>

      {/* Hover preview tooltip */}
      {showDetailsOnHover && isHovered && (
        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 z-30 pointer-events-none w-max px-4 py-2 rounded bg-black/85 backdrop-blur-md border border-gold-500/30 shadow-2xl text-center transform transition-all duration-200 animate-fadeIn">
          <div className="text-[10px] tracking-[0.25em] text-gold-400 font-cinzel uppercase">
            {product.name}
          </div>
          <div className="text-[11px] text-[#c5c2b8] font-sans">
            ₨{product.price.toLocaleString()} · <span className="text-gold-200/80">Click to Explore</span>
          </div>
        </div>
      )}
    </div>
  );
};
