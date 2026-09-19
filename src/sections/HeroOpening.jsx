import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ParticleCanvas } from '../components/ParticleCanvas';

export const HeroOpening = ({ onScrollDown }) => {
  const { navigateTo, setQuickViewProduct, products } = useShop();
  const heroProduct = products.find((p) => p.id === 'ambre-noble') || products[0];

  // Mouse Parallax for pseudo-3D layered depth
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientWidth, clientHeight } = document.documentElement;
    const x = (e.clientX / clientWidth - 0.5) * 2; // -1 to 1
    const y = (e.clientY / clientHeight - 0.5) * 2; // -1 to 1
    setMousePos({ x, y });
  };

  return (
    <section
      id="scene-hero"
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen h-[100vh] overflow-hidden bg-[#050b07] flex items-center justify-between select-none"
    >
      {/* LAYER 01: Distant Ancient Forest Background */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-out scale-105"
        style={{
          backgroundImage: `url('/images/environments/forest-bg.png')`,
          transform: `translate3d(${mousePos.x * -8}px, ${mousePos.y * -6}px, 0) scale(1.04)`,
        }}
      />

      {/* Atmospheric Mist & Volumetric Light Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060c08] via-transparent to-black/50 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-at-c from-amber-500/10 via-transparent to-black/60 pointer-events-none mix-blend-screen" />

      {/* LAYER 02: Floating Golden Dust / Motes Particle Canvas */}
      <ParticleCanvas mode="forest" density={35} className="z-10" />

      {/* LAYER 03 & 04: Hero Perfume Bottle on Foreground Rock */}
      <div className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-24 z-20 pointer-events-none">
        <div
          className="relative pointer-events-auto cursor-pointer group flex flex-col items-center"
          style={{
            transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 10}px, 0)`,
            transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
          onClick={() => setQuickViewProduct(heroProduct)}
        >
          {/* Golden radial ambient halo */}
          <div className="absolute -inset-10 bg-[#d4af37]/20 rounded-full filter blur-3xl opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 animate-pulse-glow pointer-events-none" />

          {/* Perfume Bottle */}
          <div className="relative">
            <img
              src="/images/products/hero-amber-bottle-trans.png"
              alt="Ismaeel Muhammad Ambre Noble Flacon"
              className="w-[280px] sm:w-[340px] md:w-[410px] lg:w-[460px] h-auto object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] group-hover:scale-[1.03] transition-all duration-500 animate-float-slow"
            />

            {/* Interactive Badge on Hover */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 bg-black/80 backdrop-blur-md border border-[#d4af37]/60 px-4 py-2 rounded-full text-center whitespace-nowrap shadow-2xl flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="text-[11px] font-serif-luxury tracking-widest text-[#f5e6b3] uppercase">
                Explore Ambre Noble · 50ml
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* LAYER 05: Foreground Mossy Rock and Low Foliage (MODEL1.png) */}
      <div
        className="absolute inset-x-0 bottom-0 w-full pointer-events-none z-25 transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 18}px, ${mousePos.y * 12}px, 0)`,
        }}
      >
        <img
          src="/images/environments/forest-layer-moss.png"
          alt="Foreground Forest Moss & Foliage"
          className="w-full h-auto object-cover max-h-[48vh] filter brightness-95 contrast-105"
        />
      </div>

      {/* LAYER 06: Overhead Framing Canopy Leaves (MODEL2.png) */}
      <div
        className="absolute inset-x-0 top-0 w-full pointer-events-none z-25 transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 24}px, ${mousePos.y * 16}px, 0)`,
        }}
      >
        <img
          src="/images/environments/forest-layer-canopy.png"
          alt="Overhead Forest Canopy Framing"
          className="w-full h-auto object-cover max-h-[35vh] filter brightness-90"
        />
      </div>

      {/* Section Typography & Editorial Content (Left side, matching MAIN IDEA.png) */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full flex flex-col justify-between h-full pt-32 pb-16 pointer-events-none">
        {/* Top/Middle Left: Main Title */}
        <div className="max-w-xl pointer-events-auto space-y-5">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#d4af37]/70" />
            <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.35em] text-[#d4af37]">
              MORE THAN A SCENT
            </p>
          </div>

          {/* Heading */}
          <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-light text-[#f8f6f0] tracking-tight leading-[1.05]">
            A JOURNEY <br />
            <span className="italic font-normal text-gold-gradient">OF SENSES</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed max-w-md pt-1">
            Crafted for those who seek more — timeless fragrances inspired by nature,
            heritage and emotion.
          </p>

          {/* CTA Buttons */}
          <div className="pt-4 flex items-center gap-4">
            <button
              onClick={() => onScrollDown()}
              className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#ebd57b] to-[#c99a2c] text-black font-semibold text-xs tracking-[0.2em] uppercase shadow-2xl hover:shadow-[#d4af37]/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <span>EXPLORE FRAGRANCE</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigateTo('shop')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-white/80 hover:text-white text-xs tracking-widest uppercase transition-all duration-300 backdrop-blur-md"
            >
              <span>Full Vault</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar: Scene Indicator (01) and Scroll Prompter */}
        <div className="flex items-end justify-between w-full pt-8 pointer-events-auto">
          {/* Left: 01 Scene */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-white/40 tracking-wider">01</span>
            <span className="w-6 h-[1px] bg-white/20" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/50">
              The Forest
            </span>
          </div>

          {/* Right: Scroll to Enter */}
          <button
            onClick={() => onScrollDown()}
            className="group flex flex-col items-center gap-2 text-white/60 hover:text-[#d4af37] transition-colors cursor-pointer"
          >
            {/* Mouse Icon */}
            <div className="w-5 h-8 rounded-full border border-white/40 group-hover:border-[#d4af37] flex items-start justify-center p-1 transition-colors">
              <div className="w-1 h-2 rounded-full bg-[#d4af37] animate-bounce" />
            </div>
            <span className="text-[9px] font-mono tracking-[0.3em] uppercase">
              SCROLL TO ENTER
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
