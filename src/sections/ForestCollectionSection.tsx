import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Eye, ShoppingBag, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { InteractiveBottle } from '../components/InteractiveBottle';

interface ForestCollectionSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ForestCollectionSection: React.FC<ForestCollectionSectionProps> = ({
  products,
  onSelectProduct,
  onQuickView,
  onAddToCart
}) => {
  // Forest scents: Five-Nine, Charming, Smokey, Sophisticated
  const forestProducts = products.filter(
    (p) => p.scentFamily === 'Woody' || p.scentFamily === 'Smoky' || p.slug === 'five-nine' || p.slug === 'charming'
  ).slice(0, 4);

  const [activeIndex, setActiveIndex] = useState(0);
  const currentProduct = forestProducts[activeIndex] || forestProducts[0];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % forestProducts.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + forestProducts.length) % forestProducts.length);
  };

  return (
    <section
      id="phase-2"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#07130d] py-24 transition-colors duration-1000"
    >
      {/* Background with deep forest atmosphere */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-45 mix-blend-luminosity filter blur-[1px]"
        style={{ backgroundImage: `url('/assets/forest-background.png')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#040b07] via-transparent to-[#18291c] pointer-events-none" />

      {/* Floating botanical & mist elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-emerald-900/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-amber-900/15 blur-3xl pointer-events-none" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-8 border-b border-emerald-900/30">
          <div className="flex items-center space-x-3">
            <span className="font-cinzel text-xs tracking-[0.3em] text-emerald-400 font-bold">
              02
            </span>
            <span className="w-8 h-[1px] bg-emerald-700/40" />
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-emerald-300/80">
              THE FOREST COLLECTION
            </span>
          </div>

          <div className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase hidden sm:block">
            Botanical Maceration · 25% Concentration
          </div>
        </div>

        {/* Main Section Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-12">
          {/* Left Column: Product Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-emerald-400">
                SCENE REVEAL
              </span>
              <h2 className="font-cinzel text-3xl sm:text-5xl text-white tracking-[0.08em]">
                {currentProduct.name}
              </h2>
              <div className="text-xs tracking-[0.25em] font-medium text-gold-300 font-sans uppercase">
                {currentProduct.headlineNotes}
              </div>
            </div>

            <p className="text-sm text-neutral-300 font-sans font-light leading-relaxed">
              {currentProduct.shortDescription}
            </p>

            {/* Scent Notes Badges */}
            <div className="pt-2">
              <div className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 mb-2">
                Olfactive Accords
              </div>
              <div className="flex flex-wrap gap-2">
                {currentProduct.topNotes.slice(0, 3).map((note) => (
                  <span
                    key={note}
                    className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-600/30 text-emerald-200 text-xs tracking-wider"
                  >
                    {note}
                  </span>
                ))}
                {currentProduct.heartNotes.slice(0, 2).map((note) => (
                  <span
                    key={note}
                    className="px-3 py-1 rounded-full bg-amber-950/40 border border-amber-600/30 text-amber-200 text-xs tracking-wider"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Price and CTA */}
            <div className="pt-4 flex items-center space-x-6">
              <div>
                <span className="text-xs text-neutral-400 uppercase tracking-widest block">Price</span>
                <span className="font-cinzel text-2xl text-gold-300 font-semibold">
                  ₨{currentProduct.price.toLocaleString()}
                </span>
                {currentProduct.originalPrice && (
                  <span className="text-xs text-neutral-500 line-through ml-2">
                    ₨{currentProduct.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <button
                onClick={() => onAddToCart(currentProduct)}
                className="px-5 py-3 rounded bg-emerald-800/80 hover:bg-emerald-700 text-white text-xs tracking-[0.2em] uppercase font-medium flex items-center space-x-2 transition-all shadow-lg hover:shadow-emerald-900/50"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={() => onQuickView(currentProduct)}
                className="p-3 rounded border border-white/20 hover:border-white/50 text-neutral-300 hover:text-white transition-colors"
                title="Quick View"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>

            <div>
              <button
                onClick={() => onSelectProduct(currentProduct)}
                className="group inline-flex items-center space-x-2 text-xs font-mono tracking-[0.25em] text-gold-300 hover:text-gold-200 uppercase transition-colors pt-2"
              >
                <span>DISCOVER COMPLETE PYRAMID</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Center Column: Big Interactive Hero Bottle */}
          <div className="lg:col-span-4 flex justify-center items-center py-6">
            <InteractiveBottle
              product={currentProduct}
              imageSrc={currentProduct.transparentImage || currentProduct.image}
              size="lg"
              glowColor="rgba(34, 197, 94, 0.25)"
              onClick={() => onSelectProduct(currentProduct)}
            />
          </div>

          {/* Right Column: Collection Thumbnails Carousel (Matches MAIN IDEA.png) */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-end space-y-4">
            <div className="flex items-center space-x-2 text-xs text-neutral-400 mb-2">
              <span>EXPLORE SCENTS</span>
              <div className="flex space-x-1">
                <button
                  onClick={handlePrev}
                  className="p-1.5 rounded-full border border-white/20 hover:border-gold-400 hover:text-gold-300 text-neutral-300 transition-colors"
                  aria-label="Previous fragrance"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-1.5 rounded-full border border-white/20 hover:border-gold-400 hover:text-gold-300 text-neutral-300 transition-colors"
                  aria-label="Next fragrance"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Thumbnails Row */}
            <div className="grid grid-cols-4 gap-3 w-full max-w-sm">
              {forestProducts.map((prod, idx) => {
                const isSelected = idx === activeIndex;
                return (
                  <button
                    key={prod.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`relative p-2 rounded-lg transition-all duration-300 flex flex-col items-center group text-left ${
                      isSelected
                        ? 'bg-emerald-950/80 border border-emerald-400/80 shadow-[0_0_15px_rgba(52,211,153,0.25)]'
                        : 'bg-black/40 border border-white/10 hover:border-white/30'
                    }`}
                  >
                    <img
                      src={prod.transparentImage || prod.image}
                      alt={prod.name}
                      className="h-16 w-auto object-contain mx-auto transition-transform group-hover:scale-105"
                    />
                    <span className="text-[9px] font-mono tracking-wider text-neutral-300 mt-1 uppercase text-center line-clamp-1">
                      {prod.name}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="text-[11px] text-neutral-400/80 text-right font-sans pt-2">
              <span className="text-gold-300">{activeIndex + 1}</span> of {forestProducts.length} Fragrances
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
