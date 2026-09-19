import React, { useState } from 'react';
import { ArrowRight, Compass, Droplet, Eye, ShieldCheck, ShoppingBag } from 'lucide-react';
import { ParticleCanvas } from '../components/ParticleCanvas';
import { InteractiveBottle } from '../components/InteractiveBottle';
import { Product } from '../types';

interface OceanSectionProps {
  oceanProduct: Product;
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onExploreCollection: () => void;
}

const DEPTHS = [
  { depth: 'SURFACE', label: 'Sunlight & Salt Spray', meters: 0, darkness: 0.1, bubbles: 25 },
  { depth: '10 M', label: 'Sun Rays & Kelp Forests', meters: 10, darkness: 0.3, bubbles: 40 },
  { depth: '20 M', label: 'Azure Mineral Depths', meters: 20, darkness: 0.5, bubbles: 55 },
  { depth: '30 M', label: 'Dark Navy Undercurrents', meters: 30, darkness: 0.7, bubbles: 70 },
  { depth: '40 M', label: 'Abyssal Bioluminescence', meters: 40, darkness: 0.9, bubbles: 85 },
];

export const OceanSection: React.FC<OceanSectionProps> = ({
  oceanProduct,
  onSelectProduct,
  onQuickView,
  onAddToCart,
  onExploreCollection
}) => {
  const [selectedDepthIndex, setSelectedDepthIndex] = useState(2); // default 20M
  const currentDepth = DEPTHS[selectedDepthIndex];

  return (
    <section
      id="phase-4"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden transition-colors duration-1000 py-24"
      style={{
        backgroundColor: `rgba(4, 24, 36, ${1 - currentDepth.darkness * 0.2})`,
      }}
    >
      {/* Background: Ocean Surface and Submerged Realm */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 filter"
        style={{
          backgroundImage: `url('/assets/ocean-conversion-raw.png')`,
          filter: `brightness(${1 - currentDepth.darkness * 0.55}) contrast(1.1)`,
          transform: `scale(${1 + selectedDepthIndex * 0.03})`,
        }}
      />

      {/* Surface Water Line Overlay (with transparency) */}
      <div className="absolute top-0 left-0 right-0 h-48 pointer-events-none opacity-80 mix-blend-screen overflow-hidden">
        <img
          src="/assets/ocean-surface-alpha.png"
          alt="Ocean water line"
          className="w-full h-full object-cover object-top filter brightness-125"
        />
      </div>

      {/* Depth Darkening Overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(8, 40, 61, ${currentDepth.darkness * 0.5}) 0%, rgba(2, 13, 20, ${0.4 + currentDepth.darkness * 0.5}) 100%)`,
        }}
      />

      {/* Volumetric Sunbeams / Caustic Rays */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60 transition-opacity duration-700"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 10%, rgba(56, 189, 248, 0.22) 0%, rgba(14, 116, 144, 0.1) 40%, transparent 80%)',
          opacity: 1 - currentDepth.darkness * 0.6,
        }}
      />

      {/* Rising Bubbles & Water Particles */}
      <ParticleCanvas mode="ocean" density={currentDepth.bubbles} className="z-10" />

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-8 border-b border-cyan-800/30">
          <div className="flex items-center space-x-3">
            <span className="font-cinzel text-xs tracking-[0.3em] text-cyan-400 font-bold">
              04
            </span>
            <span className="w-8 h-[1px] bg-cyan-700/40" />
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-cyan-300">
              THE OCEAN
            </span>
          </div>

          <div className="text-[10px] font-mono tracking-widest text-cyan-300/80 uppercase">
            Current Depth: <span className="text-white font-bold">{currentDepth.depth}</span> ({currentDepth.meters}m)
          </div>
        </div>

        {/* 3-Column Layout: Copy Left, Hero Bottle Center, Depth Gauge Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-12">
          {/* Left Column: Typography */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-cyan-400">
                Olfactive Immersion
              </span>
              <h2 className="font-cinzel text-3xl sm:text-5xl text-white tracking-[0.08em] leading-tight">
                BENEATH <br />
                <span className="italic font-serif text-cyan-200">THE SURFACE</span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-cyan-100/90 font-sans font-light leading-relaxed">
              Deeper you go, rarer it becomes. Pure ambergris and marine mineral accords
              drift through cold crystal currents, illuminated only by shafts of descending sunlight.
            </p>

            <div className="p-4 rounded-lg bg-cyan-950/40 border border-cyan-500/20 backdrop-blur-md space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-cyan-300 uppercase">{oceanProduct.name}</span>
                <span className="text-white font-semibold">₨{oceanProduct.price.toLocaleString()}</span>
              </div>
              <div className="text-[11px] text-cyan-200/70 font-sans">
                {oceanProduct.headlineNotes}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreCollection}
                className="group inline-flex items-center space-x-3 px-6 py-3 rounded bg-cyan-600/80 hover:bg-cyan-500 text-white text-xs tracking-[0.2em] uppercase font-medium transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
              >
                <span>EXPLORE OCEAN COLLECTION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onAddToCart(oceanProduct)}
                className="px-5 py-3 rounded border border-cyan-400/40 hover:border-cyan-300 text-cyan-200 hover:text-white text-xs tracking-[0.2em] uppercase transition-colors flex items-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>

          {/* Center Column: Floating Submerged Bottle */}
          <div className="lg:col-span-5 flex justify-center items-center py-6">
            <div className="relative animate-float-slow">
              {/* Cyan Caustic Halo */}
              <div
                className="absolute inset-0 -m-8 rounded-full blur-3xl pointer-events-none transition-all duration-700"
                style={{
                  background: 'radial-gradient(circle, rgba(14, 165, 233, 0.4) 0%, rgba(6, 78, 119, 0.2) 50%, transparent 80%)',
                }}
              />

              <InteractiveBottle
                product={oceanProduct}
                imageSrc={oceanProduct.transparentImage || oceanProduct.image}
                size="hero"
                glowColor="rgba(56, 189, 248, 0.35)"
                depthBadge={currentDepth.depth}
                onClick={() => onSelectProduct(oceanProduct)}
              />
            </div>
          </div>

          {/* Right Column: Interactive Depth Gauge (Matches MAIN IDEA.png) */}
          <div className="lg:col-span-2 flex flex-col items-center lg:items-end">
            <div className="bg-black/60 backdrop-blur-md border border-cyan-800/40 rounded-2xl p-5 w-full max-w-[200px] space-y-4">
              <div className="text-[10px] font-mono tracking-[0.25em] text-cyan-400 uppercase text-center border-b border-cyan-900/50 pb-2">
                DEPTH METER
              </div>

              <div className="space-y-3">
                {DEPTHS.map((item, index) => {
                  const isSelected = index === selectedDepthIndex;
                  return (
                    <button
                      key={item.depth}
                      onClick={() => setSelectedDepthIndex(index)}
                      className={`w-full flex items-center justify-between text-left py-1.5 px-2 rounded transition-all duration-200 group focus:outline-none ${
                        isSelected
                          ? 'bg-cyan-950/80 border border-cyan-400/60 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                          : 'hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span
                          className={`w-2 h-2 rounded-full transition-all ${
                            isSelected
                              ? 'bg-cyan-400 scale-125 shadow-[0_0_8px_#38bdf8]'
                              : 'bg-cyan-900 group-hover:bg-cyan-600'
                          }`}
                        />
                        <span
                          className={`text-xs font-mono tracking-widest ${
                            isSelected ? 'text-white font-bold' : 'text-neutral-400 group-hover:text-neutral-200'
                          }`}
                        >
                          {item.depth}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-cyan-400/70">
                        {item.meters}m
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="text-[9px] text-cyan-300/60 text-center italic border-t border-cyan-900/40 pt-2">
                {currentDepth.label}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
