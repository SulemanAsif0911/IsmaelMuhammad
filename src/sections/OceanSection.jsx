import React, { useState } from 'react';
import { ArrowRight, Waves, Droplet, Sparkles, Check, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ParticleCanvas } from '../components/ParticleCanvas';

export const OceanSection = () => {
  const { products, addToCart, navigateTo, setQuickViewProduct, formatPrice } = useShop();
  const oceanProduct = products.find((p) => p.id === 'oceania-nocturne') || products[2];
  const [added, setAdded] = useState(false);

  // Depth markers: Surface, 10m, 20m, 30m, 40m
  const depths = [
    {
      level: 'SURFACE',
      depth: '0m',
      title: 'Sunlit Azure Waters',
      notes: 'Calabrian Bergamot · Wild Sea Salt · Solar Citrus',
      bgGradient: 'from-[#0d3b54] via-[#092a3e] to-[#061d2c]',
      glowColor: 'rgba(56, 189, 248, 0.45)',
    },
    {
      level: '10 M',
      depth: '10m',
      title: 'The Coral Current',
      notes: 'Ocean Spray Accord · Blue Sage · Crushed Mint',
      bgGradient: 'from-[#092a3e] via-[#062030] to-[#041724]',
      glowColor: 'rgba(34, 211, 238, 0.4)',
    },
    {
      level: '20 M',
      depth: '20m',
      title: 'The Twilight Drift',
      notes: 'Salt-Weathered Driftwood · Geranium · Mineral Sands',
      bgGradient: 'from-[#062030] via-[#051724] to-[#03111b]',
      glowColor: 'rgba(14, 165, 233, 0.35)',
    },
    {
      level: '30 M',
      depth: '30m',
      title: 'The Pelagic Vault',
      notes: 'Natural Gray Ambergris · Cold Sea Moss · Ambroxan',
      bgGradient: 'from-[#051724] via-[#04121a] to-[#020b12]',
      glowColor: 'rgba(2, 132, 199, 0.3)',
    },
    {
      level: '40 M',
      depth: '40m',
      title: 'The Abyssal Silence',
      notes: 'Rare Oceanic Ambergris · Dark Mineral Musk · Black Sea Water',
      bgGradient: 'from-[#04121a] via-[#030d14] to-[#01060a]',
      glowColor: 'rgba(56, 189, 248, 0.5)',
    },
  ];

  const [activeDepthIndex, setActiveDepthIndex] = useState(4); // default 40m as shown in MAIN IDEA.png
  const currentDepth = depths[activeDepthIndex];

  const handleAddToCart = () => {
    addToCart(oceanProduct);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section
      id="scene-ocean"
      className={`relative w-full min-h-screen py-24 overflow-hidden flex items-center select-none bg-gradient-to-b ${currentDepth.bgGradient} transition-colors duration-1000 border-t border-cyan-900/30`}
    >
      {/* Ocean Waterline & Light Rays Layer (from OCEAN ON THE CONVERSION.png) */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-top opacity-50 mix-blend-screen pointer-events-none transition-opacity duration-700"
        style={{
          backgroundImage: `url('/images/environments/ocean-waterline.png')`,
        }}
      />

      {/* Atmospheric Caustic Rays */}
      <div className="absolute inset-0 bg-radial-at-t from-cyan-400/15 via-transparent to-black/80 pointer-events-none" />

      {/* Bubble Particle Canvas */}
      <ParticleCanvas mode="ocean" density={40} className="z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading and Details */}
          <div className="lg:col-span-5 space-y-5">
            {/* Scene Index & Category */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm text-white/40">04</span>
              <span className="w-6 h-[1px] bg-white/20" />
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#38bdf8]">
                THE OCEAN
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-serif-luxury text-4xl sm:text-6xl text-white font-light tracking-tight leading-tight">
              BENEATH <br />
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#7dd3fc] via-[#38bdf8] to-[#0284c7]">
                THE SURFACE
              </span>
            </h2>

            {/* Tagline */}
            <p className="font-serif-luxury italic text-xl text-cyan-200/90">
              “Deeper you go, rarer it becomes.”
            </p>

            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed max-w-md pt-1">
              Immerse yourself into crystalline marine depths. Scent molecules distilled with
              pure oceanic ambergris, cold sea salt, and solar bergamot create an indelible aura.
            </p>

            {/* Active Depth Note Readout */}
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-cyan-500/20 backdrop-blur-md space-y-1.5 max-w-sm">
              <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400">
                <span>Depth: {currentDepth.depth}</span>
                <span className="text-white/40">{currentDepth.title}</span>
              </div>
              <p className="text-xs text-white/80 font-serif-luxury tracking-wide">
                {currentDepth.notes}
              </p>
            </div>

            {/* CTA */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigateTo('shop', 'men')}
                className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#0284c7] via-[#38bdf8] to-[#0284c7] text-white font-semibold text-xs tracking-[0.2em] uppercase shadow-xl hover:shadow-cyan-500/30 transition-all duration-300"
              >
                <span>EXPLORE OCEAN COLLECTION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleAddToCart}
                className="p-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors flex items-center justify-center"
                title="Add Oceania Nocturne to Bag"
              >
                {added ? <Check className="w-4 h-4 text-cyan-400" /> : <ShoppingBag className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Center Column: Suspended Floating Blue Bottle */}
          <div className="lg:col-span-5 flex items-center justify-center relative py-12">
            <div
              className="relative cursor-pointer group"
              onClick={() => setQuickViewProduct(oceanProduct)}
            >
              {/* Cyan Volumetric Glow */}
              <div
                className="absolute inset-0 rounded-full filter blur-3xl opacity-50 group-hover:opacity-90 transition-all duration-700 animate-pulse-glow"
                style={{ backgroundColor: currentDepth.glowColor }}
              />

              {/* Sapphire Bottle */}
              <img
                src={oceanProduct.bottleTrans || oceanProduct.bottleImage}
                alt={oceanProduct.name}
                className="w-[270px] sm:w-[330px] md:w-[380px] h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(2,132,199,0.5)] group-hover:scale-105 transition-transform duration-500 animate-float-deep"
              />

              {/* Water Droplet Badge */}
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-cyan-400/40 p-2 rounded-full text-cyan-300 shadow-xl flex items-center gap-1.5 text-[10px] font-mono">
                <Droplet className="w-3 h-3 fill-current" />
                <span>25% Extrait Oil</span>
              </div>
            </div>
          </div>

          {/* Right Column: Vertical Depth Gauge (exact match to MAIN IDEA.png) */}
          <div className="lg:col-span-2 flex flex-col items-start lg:items-end space-y-4">
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/40 mb-2">
              Diving Depth
            </span>

            <div className="flex lg:flex-col gap-4 relative">
              {/* Vertical line indicator */}
              <div className="hidden lg:block absolute right-[5px] top-3 bottom-3 w-[1.5px] bg-white/15" />

              {depths.map((d, index) => {
                const isActive = activeDepthIndex === index;
                return (
                  <button
                    key={d.level}
                    onClick={() => setActiveDepthIndex(index)}
                    className="group flex items-center gap-3 text-right focus:outline-none transition-all py-1"
                  >
                    <span
                      className={`text-xs font-mono tracking-widest transition-colors ${
                        isActive
                          ? 'text-cyan-300 font-semibold'
                          : 'text-white/40 group-hover:text-white/70'
                      }`}
                    >
                      {d.level}
                    </span>

                    {/* Dot */}
                    <div
                      className={`w-3 h-3 rounded-full transition-all duration-300 relative z-10 ${
                        isActive
                          ? 'bg-cyan-400 ring-4 ring-cyan-400/30 shadow-[0_0_12px_#38bdf8]'
                          : 'bg-white/20 group-hover:bg-white/50'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <p className="text-[9px] font-mono tracking-wider uppercase text-white/30 pt-2 hidden lg:block text-right">
              Click depth to explore pressure & notes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
