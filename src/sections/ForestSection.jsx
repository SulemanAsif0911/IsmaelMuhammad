import React, { useState } from 'react';
import { ArrowRight, ShoppingBag, Sparkles, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ParticleCanvas } from '../components/ParticleCanvas';

export const ForestSection = () => {
  const { products, addToCart, navigateTo, setQuickViewProduct, formatPrice } = useShop();

  // 4 curated forest / botanical fragrances
  const forestItems = [
    products.find((p) => p.id === 'five-nine') || products[0],
    products.find((p) => p.id === 'ambre-noble') || products[1],
    products.find((p) => p.id === 'oceania-nocturne') || products[2],
    products.find((p) => p.id === 'velvet-sillage') || products[3],
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = forestItems[activeIndex];
  const [added, setAdded] = useState(false);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % forestItems.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + forestItems.length) % forestItems.length);

  const handleAddToCart = () => {
    addToCart(activeProduct);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section
      id="scene-forest"
      className="relative w-full min-h-screen py-24 bg-[#07130d] overflow-hidden flex items-center select-none border-t border-white/5"
    >
      {/* Background Forest Layer with subtle zoom and darkness */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-40 mix-blend-luminosity filter blur-[1px]"
        style={{ backgroundImage: `url('/images/environments/forest-bg.png')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#07130d] via-[#07130d]/80 to-[#07130d] pointer-events-none" />

      {/* Dynamic ambient color glow based on active product */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-25 filter blur-[120px] pointer-events-none transition-all duration-700"
        style={{ backgroundColor: activeProduct.colorTheme.accent }}
      />

      <ParticleCanvas mode="forest" density={25} className="z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Fragrance Information (matching MAIN IDEA.png) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Scene Index & Category */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm text-white/40">02</span>
              <span className="w-6 h-[1px] bg-white/20" />
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#22c55e]">
                THE FOREST
              </span>
            </div>

            {/* Product Title */}
            <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight transition-all duration-500">
              {activeProduct.name}
            </h2>

            {/* Accords Bar */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#d4af37]">
                {activeProduct.accords.slice(0, 3).join(' · ')}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed max-w-sm pt-1">
              {activeProduct.description}
            </p>

            {/* Notes Pills */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-mono tracking-widest uppercase text-white/40 block">
                Olfactory Highlights
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeProduct.notes.heart.map((n) => (
                  <span
                    key={n}
                    className="px-2.5 py-1 rounded text-[11px] font-mono bg-white/5 border border-white/10 text-white/80"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>

            {/* Price & Action CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-white/40 uppercase">Flacon 50 ML</span>
                <span className="font-mono text-xl text-[#d4af37] font-semibold">
                  {formatPrice(activeProduct.price)}
                </span>
              </div>

              <button
                onClick={() => navigateTo('product', activeProduct.id)}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#d4af37] hover:bg-[#ebd57b] text-black font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-xl"
              >
                <span>DISCOVER</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleAddToCart}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors"
                title="Add to Bag"
              >
                {added ? <Check className="w-4 h-4 text-[#22c55e]" /> : <ShoppingBag className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Center Column: Large Interactive Hero Bottle on Forest Moss */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative py-8">
            <div
              className="relative cursor-pointer group"
              onClick={() => setQuickViewProduct(activeProduct)}
            >
              {/* Radial Glass Reflections */}
              <div
                className="absolute inset-0 rounded-full filter blur-2xl opacity-40 group-hover:opacity-80 transition-all duration-500 scale-110"
                style={{ backgroundColor: activeProduct.colorTheme.accent }}
              />

              <img
                src={activeProduct.bottleTrans || activeProduct.bottleImage}
                alt={activeProduct.name}
                key={activeProduct.id}
                className="w-[260px] sm:w-[320px] md:w-[360px] h-auto object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.95)] animate-float-slow group-hover:scale-105 transition-transform duration-500"
              />

              {/* Click to inspect prompt */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 border border-white/20 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase text-white/80 whitespace-nowrap shadow-xl">
                Click to Quick View
              </div>
            </div>
          </div>

          {/* Right Column: Mini Bottle Switcher Carousel (as shown in MAIN IDEA.png) */}
          <div className="lg:col-span-3 flex flex-col items-start lg:items-end space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/40">
                Fragrance Carousel
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrev}
                  className="p-1 rounded bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-colors"
                  aria-label="Previous Fragrance"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-1 rounded bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-colors"
                  aria-label="Next Fragrance"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Horizontal Mini Bottle Cards */}
            <div className="flex lg:flex-col gap-3 w-full overflow-x-auto pb-2 lg:pb-0">
              {forestItems.map((item, idx) => {
                const isCurrent = idx === activeIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all duration-300 text-left w-full min-w-[170px] ${
                      isCurrent
                        ? 'bg-white/[0.08] border-[#d4af37]/70 shadow-lg'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="w-10 h-12 rounded bg-black/60 flex items-center justify-center p-0.5 border border-white/10 flex-shrink-0">
                      <img
                        src={item.bottleImage}
                        alt={item.name}
                        className={`w-full h-full object-contain transition-transform duration-300 ${
                          isCurrent ? 'scale-110' : 'opacity-70'
                        }`}
                      />
                    </div>
                    <div>
                      <h4
                        className={`font-serif-luxury text-sm ${
                          isCurrent ? 'text-[#d4af37] font-semibold' : 'text-white/80'
                        }`}
                      >
                        {item.name}
                      </h4>
                      <p className="text-[10px] font-mono text-white/40">
                        {item.accords[0]} · {formatPrice(item.price)}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
