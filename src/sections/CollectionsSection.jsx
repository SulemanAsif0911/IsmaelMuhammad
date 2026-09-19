import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CollectionsSection = () => {
  const { navigateTo } = useShop();

  const collections = [
    {
      id: 'men',
      category: 'men',
      title: 'MEN',
      tagline: 'BOLD & TIMELESS',
      description: 'Commanding woods, smoked leathers, and deep amber designed for enduring presence.',
      image: '/images/collections/men.jpg',
      count: '4 Fragrances',
    },
    {
      id: 'women',
      category: 'women',
      title: 'WOMEN',
      tagline: 'ELEGANT & RADIANT',
      description: 'Luminous damask rose, velvety praline, and seductive night-blooming white florals.',
      image: '/images/collections/women.jpg',
      count: '3 Fragrances',
    },
    {
      id: 'attars',
      category: 'attars',
      title: 'ATTARS',
      tagline: 'TRADITIONAL & PURE',
      description: '100% alcohol-free concentrated perfume oils distilled over slow copper stills.',
      image: '/images/collections/attars.jpg',
      count: 'Pure Oil Vault',
    },
    {
      id: 'discovery',
      category: 'discovery',
      title: 'DISCOVERY SET',
      tagline: 'EXPLORE THE SPECTRUM',
      description: 'Curated 5 x 10ml travel flacons to journey through the entire olfactory archive.',
      image: '/images/collections/discovery.jpg',
      count: 'Limited Coffret',
    },
  ];

  return (
    <section
      id="scene-collections"
      className="relative w-full py-24 bg-[#050806] overflow-hidden select-none border-t border-white/5"
    >
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
        {/* Header (matching MAIN IDEA.png) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm text-white/40">07</span>
              <span className="w-6 h-[1px] bg-white/20" />
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#d4af37]">
                EXPLORE OUR
              </span>
            </div>

            <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight">
              COLLECTIONS
            </h2>
          </div>

          <button
            onClick={() => navigateTo('shop', 'all')}
            className="group inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] uppercase text-white/80 hover:text-[#d4af37] transition-colors"
          >
            <span>VIEW ALL</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col) => (
            <div
              key={col.id}
              onClick={() => navigateTo('shop', col.category)}
              className="group relative h-[380px] rounded-2xl overflow-hidden border border-white/10 hover:border-[#d4af37]/60 cursor-pointer shadow-xl transition-all duration-500 flex flex-col justify-end p-6"
            >
              {/* Card Image */}
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-108 transition-transform duration-700 filter brightness-85 group-hover:brightness-95"
                style={{ backgroundImage: `url('${col.image}')` }}
              />

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-[#d4af37]/0 group-hover:bg-[#d4af37]/10 transition-colors duration-500 pointer-events-none" />

              {/* Top Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider bg-black/60 backdrop-blur-md border border-white/15 text-white/70">
                  {col.count}
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10 space-y-2">
                <h3 className="font-serif-luxury text-2xl text-white group-hover:text-[#d4af37] transition-colors tracking-wide">
                  {col.title}
                </h3>

                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#d4af37]">
                  {col.tagline}
                </p>

                <p className="text-xs text-white/60 font-light leading-relaxed line-clamp-2 pt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {col.description}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/80 group-hover:text-white">
                  <span>Enter Gallery</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
