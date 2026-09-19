import React, { useState } from 'react';
import { ArrowRight, Sparkles, Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ParticleCanvas } from '../components/ParticleCanvas';

export const MostWantedSection = () => {
  const { products, addToCart, navigateTo, setQuickViewProduct, formatPrice } = useShop();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [addedId, setAddedId] = useState(null);

  // The 4 most wanted fragrances as depicted in MAIN IDEA.png
  const mostWantedProducts = [
    {
      ...products.find((p) => p.id === 'ambre-noble') || products[1],
      lightColor: '#eab308',
      bottleImg: '/images/products/bottle-amber-deep.png',
      hdImg: '/images/products/hero-amber-bottle-trans.png',
    },
    {
      ...products.find((p) => p.id === 'oceania-nocturne') || products[2],
      lightColor: '#38bdf8',
      bottleImg: '/images/products/bottle-blue-deep.png',
      hdImg: '/images/products/bottle-ocean-blue-trans.png',
    },
    {
      ...products.find((p) => p.id === 'five-nine') || products[0],
      lightColor: '#22c55e',
      bottleImg: '/images/products/bottle-green-deep.png',
      hdImg: '/images/products/bottle-five-nine-trans.png',
    },
    {
      ...products.find((p) => p.id === 'velvet-sillage') || products[3],
      lightColor: '#f43f5e',
      bottleImg: '/images/products/bottle-ruby-deep.png',
      hdImg: '/images/products/bottle-ruby-rose-trans.png',
    },
  ];

  const handleQuickAdd = (p, e) => {
    e.stopPropagation();
    addToCart(p);
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <section
      id="scene-mostwanted"
      className="relative w-full min-h-screen py-24 bg-[#02090f] overflow-hidden flex flex-col justify-between select-none border-t border-cyan-950"
    >
      {/* Abyssal Ambient Background & Water Rays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020b12] via-[#01060a] to-[#010305] pointer-events-none" />

      {/* Volumetric Spotlights descending on the 4 bottles */}
      <div className="absolute inset-x-0 top-0 h-full flex justify-around pointer-events-none opacity-40">
        <div className="w-48 h-full bg-gradient-to-b from-amber-400/20 via-amber-400/5 to-transparent blur-2xl transform -rotate-6 animate-ray-sway" />
        <div className="w-56 h-full bg-gradient-to-b from-cyan-400/30 via-cyan-400/5 to-transparent blur-2xl transform rotate-2 animate-ray-sway" />
        <div className="w-48 h-full bg-gradient-to-b from-emerald-400/20 via-emerald-400/5 to-transparent blur-2xl transform -rotate-3 animate-ray-sway" />
        <div className="w-48 h-full bg-gradient-to-b from-rose-400/20 via-rose-400/5 to-transparent blur-2xl transform rotate-6 animate-ray-sway" />
      </div>

      <ParticleCanvas mode="ocean" density={35} className="z-10" />

      {/* Top Header: Matching MAIN IDEA.png Section 05 */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full pt-4 pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-xl">
            {/* Scene Index & Category */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm text-white/40">05</span>
              <span className="w-6 h-[1px] bg-white/20" />
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-cyan-400">
                MOST WANTED
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight leading-tight">
              THE DEPTHS REVEAL <br />
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#93c5fd] via-[#e2e8f0] to-[#fef08a]">
                WHAT PEOPLE CHOOSE MOST.
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
              Suspended in the calm abyssal silence, our most requested creations emerge into the light.
            </p>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="group inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] uppercase text-white/80 hover:text-[#d4af37] transition-colors pb-2 self-start md:self-end"
          >
            <span>EXPLORE COLLECTION</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Middle: 4 Floating Suspended Bottles in 3D Space */}
      <div className="relative z-25 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-end">
          {mostWantedProducts.map((product, idx) => {
            const isHovered = hoveredIndex === idx;
            // Float delay for organic gentle wave bobbing
            const floatStyles = [
              'animate-float-slow [animation-delay:0s]',
              'animate-float-deep [animation-delay:1.2s]',
              'animate-float-slow [animation-delay:2.4s]',
              'animate-float-deep [animation-delay:0.8s]',
            ];

            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setQuickViewProduct(product)}
                className="group relative flex flex-col items-center cursor-pointer"
              >
                {/* Overhead Spotlight Beam */}
                <div
                  className="absolute -top-32 w-28 h-64 opacity-25 group-hover:opacity-60 transition-opacity duration-500 rounded-full blur-xl pointer-events-none"
                  style={{ backgroundColor: product.lightColor }}
                />

                {/* Floating Bottle */}
                <div className={`relative transition-all duration-500 ${floatStyles[idx]}`}>
                  {/* Subtle underwater caustic halo */}
                  <div
                    className="absolute inset-0 rounded-full filter blur-2xl opacity-20 group-hover:opacity-60 transition-opacity duration-500"
                    style={{ backgroundColor: product.lightColor }}
                  />

                  <img
                    src={product.hdImg || product.bottleTrans || product.bottleImage}
                    alt={product.name}
                    className="w-36 sm:w-44 md:w-52 lg:w-56 h-auto object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.95)] group-hover:scale-108 transition-transform duration-500"
                  />
                </div>

                {/* Suspended Card Overlay */}
                <div className="mt-4 w-full p-3 rounded-2xl bg-[#061018]/80 backdrop-blur-md border border-white/10 group-hover:border-white/30 transition-all duration-300 text-center shadow-xl">
                  <span className="text-[9px] font-mono tracking-widest uppercase text-cyan-400/80 block">
                    {product.accords[0]}
                  </span>

                  <h3 className="font-serif-luxury text-base sm:text-lg text-white font-medium group-hover:text-[#d4af37] transition-colors truncate">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-center gap-2 mt-1">
                    <span className="font-mono text-xs sm:text-sm text-[#d4af37] font-semibold">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-[10px] text-white/40">50 ML</span>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center justify-center gap-2 mt-3 pt-2 border-t border-white/5">
                    <button
                      onClick={(e) => handleQuickAdd(product, e)}
                      className="flex-1 py-1.5 rounded-lg bg-white/10 hover:bg-[#d4af37] hover:text-black text-white text-[11px] font-mono tracking-wider uppercase transition-colors flex items-center justify-center gap-1"
                    >
                      {addedId === product.id ? (
                        <>
                          <Check className="w-3 h-3 text-[#22c55e]" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3 h-3" />
                          <span>Bag</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateTo('product', product.id);
                      }}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-colors"
                      title="Product Details"
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

      {/* Bottom Seabed: High-Resolution Coral Reef Foreground (oceanbed.png) */}
      <div className="relative w-full z-20 pointer-events-none mt-8 -mb-2">
        <img
          src="/images/environments/oceanbed-corals.png"
          alt="Ocean Floor Coral Reef and Shells"
          className="w-full h-auto object-cover max-h-[30vh] filter brightness-90 contrast-110"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#050907] to-transparent" />
      </div>
    </section>
  );
};
