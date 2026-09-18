import React, { useState } from 'react';
import { ArrowRight, Eye, ShoppingBag, Sparkles, Star } from 'lucide-react';
import { Product } from '../types';
import { InteractiveBottle } from '../components/InteractiveBottle';
import { ParticleCanvas } from '../components/ParticleCanvas';

interface MostWantedSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onExploreCollection: () => void;
}

export const MostWantedSection: React.FC<MostWantedSectionProps> = ({
  products,
  onSelectProduct,
  onQuickView,
  onAddToCart,
  onExploreCollection
}) => {
  // Grab the 4 iconic most wanted bottles: Charming, Nine-Five, Five-Nine, Cheerful
  const mostWanted = [
    products.find((p) => p.slug === 'charming') || products[2],
    products.find((p) => p.slug === 'nine-five') || products[1],
    products.find((p) => p.slug === 'five-nine') || products[0],
    products.find((p) => p.slug === 'cheerful') || products[3],
  ];

  const [activeBottleIndex, setActiveBottleIndex] = useState(0);

  return (
    <section
      id="phase-5"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#020d14] py-20"
    >
      {/* Background: Deep Abyss Ambient */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-screen"
        style={{ backgroundImage: `url('/assets/ocean-deep-ambient.png')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#041824] via-transparent to-black pointer-events-none" />

      {/* Bioluminescent Micro-Bubbles */}
      <ParticleCanvas mode="ocean" density={35} className="z-10" />

      {/* Volumetric Spotlight from above */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 15%, rgba(56, 189, 248, 0.18) 0%, rgba(3, 105, 161, 0.05) 50%, transparent 80%)',
        }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-6 border-b border-cyan-900/40">
          <div className="flex items-center space-x-3">
            <span className="font-cinzel text-xs tracking-[0.3em] text-cyan-400 font-bold">
              05
            </span>
            <span className="w-8 h-[1px] bg-cyan-700/40" />
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-cyan-300">
              MOST WANTED
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs text-gold-300 font-mono">
            <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
            <span>Customer Demanded · 5-Star Rated</span>
          </div>
        </div>

        {/* Section Headline */}
        <div className="pt-8 pb-10 text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-cyan-400">
            THE DEEPEST ACCORDS
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl text-white tracking-[0.08em] leading-tight">
            THE DEPTHS REVEAL <br />
            <span className="italic font-serif text-cyan-200">
              WHAT PEOPLE CHOOSE MOST.
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-sans font-light max-w-lg mx-auto">
            Suspended in the tranquil abyss, our most celebrated master creations emerge.
            Each crafted with unwavering devotion to sillage, projection, and soul.
          </p>

          <div className="pt-2">
            <button
              onClick={onExploreCollection}
              className="inline-flex items-center space-x-2 text-xs font-mono tracking-[0.25em] text-gold-300 hover:text-white uppercase transition-colors"
            >
              <span>EXPLORE ALL BESTSELLERS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* The 4 Suspended Floating Bottles (Grid Matching MAIN IDEA.png) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 pb-12">
          {mostWanted.map((bottle, idx) => {
            const isHovered = idx === activeBottleIndex;
            return (
              <div
                key={bottle.id}
                onMouseEnter={() => setActiveBottleIndex(idx)}
                className={`relative group rounded-2xl p-6 transition-all duration-500 flex flex-col justify-between backdrop-blur-md ${
                  isHovered
                    ? 'bg-cyan-950/40 border border-cyan-400/50 shadow-[0_0_30px_rgba(6,182,212,0.25)]'
                    : 'bg-black/40 border border-white/10 hover:border-cyan-500/30'
                }`}
              >
                {/* Floating Suspended Bottle Container */}
                <div
                  className={`relative py-4 flex items-center justify-center transition-transform duration-500 ${
                    idx % 2 === 0 ? 'animate-float-slow' : 'animate-float-subtle'
                  }`}
                  style={{ animationDelay: `${idx * 0.8}s` }}
                >
                  <InteractiveBottle
                    product={bottle}
                    imageSrc={bottle.transparentImage || bottle.image}
                    size="md"
                    glowColor={bottle.accentColor || 'rgba(56, 189, 248, 0.4)'}
                    onClick={() => onSelectProduct(bottle)}
                    showDetailsOnHover={false}
                  />
                </div>

                {/* Product Metadata Card */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-mono tracking-widest text-cyan-400 uppercase block">
                        {bottle.concentration}
                      </span>
                      <h3
                        onClick={() => onSelectProduct(bottle)}
                        className="font-cinzel text-lg text-white font-semibold tracking-wider hover:text-gold-300 cursor-pointer transition-colors"
                      >
                        {bottle.name}
                      </h3>
                    </div>

                    <div className="text-right">
                      <span className="font-cinzel text-sm text-gold-300 font-bold block">
                        ₨{bottle.price.toLocaleString()}
                      </span>
                      <div className="flex items-center text-[10px] text-neutral-400">
                        <Star className="w-2.5 h-2.5 fill-gold-400 text-gold-400 mr-1" />
                        <span>{bottle.rating}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-neutral-300 font-sans line-clamp-2">
                    {bottle.headlineNotes}
                  </p>

                  {/* Quick Action Buttons */}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => onAddToCart(bottle)}
                      className="flex-1 py-2 px-3 rounded bg-white/10 hover:bg-gold-500 hover:text-black text-white text-[10px] font-mono tracking-widest uppercase transition-all duration-200 flex items-center justify-center space-x-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>

                    <button
                      onClick={() => onQuickView(bottle)}
                      className="p-2 rounded border border-white/15 hover:border-gold-400 text-neutral-400 hover:text-gold-300 transition-colors"
                      title="Quick View"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LAYER: Ocean Bed with Starfish, Corals, Shells and Caustics (`oceanbed.png`, RGBA) */}
      <div className="relative w-full z-10 pointer-events-none overflow-hidden -mb-2">
        <img
          src="/assets/oceanbed.png"
          alt="Ocean bed with corals and shells"
          className="w-full h-auto object-cover max-h-[300px] md:max-h-[380px] drop-shadow-[0_-15px_30px_rgba(0,0,0,0.9)]"
        />
        {/* Soft blend shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
      </div>
    </section>
  );
};
