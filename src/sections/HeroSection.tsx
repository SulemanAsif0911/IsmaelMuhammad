import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { ParticleCanvas } from '../components/ParticleCanvas';
import { Product } from '../types';

interface HeroSectionProps {
  heroProduct: Product;
  onExplore: () => void;
  onSelectProduct: (product: Product) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  heroProduct,
  onExplore,
  onSelectProduct
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="phase-1"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#040b07]"
    >
      {/* LAYER 1: Deep Ancient Forest Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out scale-105"
        style={{
          backgroundImage: `url('/assets/forest-background.png')`,
          transform: `translate3d(${mousePos.x * -12}px, ${mousePos.y * -8}px, 0) scale(1.04)`,
        }}
      />

      {/* Atmospheric dark gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-forest-950/40 to-black/80 pointer-events-none" />

      {/* LAYER 2: Canvas Volumetric Golden Particles & Spores */}
      <ParticleCanvas mode="forest" density={40} className="z-10" />

      {/* LAYER 3: Volumetric Sunbeam / Mist Glow Effect */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-70"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 65% 30%, rgba(212, 176, 55, 0.15) 0%, rgba(30, 60, 44, 0.1) 45%, transparent 80%)',
          transform: `translate3d(${mousePos.x * 15}px, ${mousePos.y * 10}px, 0)`,
        }}
      />

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full pt-20 pb-16 min-h-screen flex flex-col justify-between">
        {/* Top spacer */}
        <div />

        {/* Middle: Grid with Typography Left, Bottle Center/Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-12">
          {/* Left: Minimal Luxury Typography */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-gold-400" />
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.35em] text-gold-300">
                MORE THAN A SCENT
              </span>
            </div>

            <h1 className="font-cinzel text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-[0.08em] leading-[1.08]">
              A JOURNEY <br />
              <span className="italic font-serif font-normal text-gold-200">
                OF SENSES
              </span>
            </h1>

            <p className="max-w-md text-sm sm:text-base text-neutral-300 font-sans font-light leading-relaxed tracking-wide">
              Crafted for those who seek more — timeless fragrances inspired by nature,
              ancient heritage, and deep emotion.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onExplore}
                className="group relative inline-flex items-center space-x-3 px-7 py-3.5 bg-gradient-to-r from-gold-500/20 to-gold-600/10 hover:from-gold-500/30 hover:to-gold-600/20 border border-gold-400/50 hover:border-gold-300 rounded text-xs tracking-[0.25em] font-medium text-gold-200 uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,176,55,0.15)] hover:shadow-[0_0_30px_rgba(212,176,55,0.3)]"
              >
                <span>EXPLORE FRAGRANCE</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-gold-300" />
              </button>

              <button
                onClick={() => onSelectProduct(heroProduct)}
                className="px-6 py-3.5 text-xs tracking-[0.2em] font-medium text-neutral-400 hover:text-white uppercase transition-colors"
              >
                DISCOVER FIVE-NINE
              </button>
            </div>
          </div>

          {/* Right/Center: Hero Bottle with Interactive 3D Depth */}
          <div className="lg:col-span-6 flex justify-center items-center relative">
            <div
              className="relative cursor-pointer transition-transform duration-300 ease-out transform-gpu"
              style={{
                transform: `translate3d(${mousePos.x * 24}px, ${mousePos.y * 18}px, 0) rotateY(${mousePos.x * 8}deg) rotateX(${mousePos.y * -8}deg)`,
              }}
              onClick={() => onSelectProduct(heroProduct)}
            >
              {/* Warm Golden Glow Behind Bottle */}
              <div className="absolute inset-0 -m-8 rounded-full bg-gradient-to-b from-gold-400/30 via-amber-600/20 to-transparent blur-3xl pointer-events-none animate-pulse-glow" />

              {/* The Hero Amber Flacon */}
              <div className="relative group">
                <img
                  src="/assets/bottle-hero-gold-trans.png"
                  alt="Ismaeel Muhammad Hero Amber Bottle"
                  className="max-h-[380px] sm:max-h-[480px] lg:max-h-[540px] w-auto object-contain mx-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />

                {/* Subtle Interactive Reflection */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-gold-400/40 text-[11px] text-gold-200 tracking-widest font-mono uppercase shadow-2xl">
                  FIVE-NINE · ₨2,600 · TAP TO ENTER
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Scene Indicator Left, Scroll Indicator Right */}
        <div className="flex items-center justify-between text-neutral-400 pt-6 border-t border-white/5">
          <div className="flex items-center space-x-3">
            <span className="font-cinzel text-xs tracking-[0.3em] text-gold-400 font-bold">
              01
            </span>
            <span className="w-6 h-[1px] bg-neutral-700" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
              The Forest
            </span>
          </div>

          <button
            onClick={onExplore}
            className="group flex items-center space-x-2 text-[10px] font-mono tracking-[0.25em] text-neutral-400 hover:text-gold-300 transition-colors uppercase focus:outline-none"
          >
            <span>SCROLL TO ENTER</span>
            <div className="w-5 h-8 rounded-full border border-neutral-600 group-hover:border-gold-400 flex items-start justify-center p-1 transition-colors">
              <div className="w-1 h-2 rounded-full bg-gold-400 animate-bounce" />
            </div>
          </button>
        </div>
      </div>

      {/* LAYER 4: Foreground Moss Trunk & Ferns (MODEL1.png) */}
      <div
        className="absolute -bottom-10 -left-10 w-[55%] max-w-[700px] pointer-events-none z-30 transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * -35}px, ${mousePos.y * -15}px, 0)`,
        }}
      >
        <img
          src="/assets/forest-foliage-left.png"
          alt="Foreground foliage"
          className="w-full h-auto object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] opacity-95"
        />
      </div>

      {/* LAYER 5: Overhead Canopy Foliage (MODEL2.png) */}
      <div
        className="absolute -top-10 left-0 right-0 w-full pointer-events-none z-30 transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 10}px, 0)`,
        }}
      >
        <img
          src="/assets/forest-canopy.png"
          alt="Overhead forest canopy"
          className="w-full h-auto object-cover opacity-85"
        />
      </div>
    </section>
  );
};
