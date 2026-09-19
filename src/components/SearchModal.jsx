import React, { useState } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, products, navigateTo, formatPrice } = useShop();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const filtered = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.accords.some((a) => a.toLowerCase().includes(q)) ||
          p.notes.top.some((n) => n.toLowerCase().includes(q)) ||
          p.notes.heart.some((n) => n.toLowerCase().includes(q)) ||
          p.notes.base.some((n) => n.toLowerCase().includes(q))
        );
      })
    : [];

  const popularSearches = ['Five-Nine', 'Amber', 'Oud', 'Cedar', 'Marine', 'Rose', 'Attar'];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-2xl bg-[#090f0c] border border-white/15 rounded-2xl p-6 shadow-2xl relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={() => {
            setIsSearchOpen(false);
            setQuery('');
          }}
          className="absolute top-5 right-5 text-white/50 hover:text-white p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-white/15 pb-4">
          <Search className="w-5 h-5 text-[#d4af37]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search fragrances, notes (e.g. Amber, Cedar, Oud, Marine)..."
            className="w-full bg-transparent text-white placeholder-white/35 focus:outline-none text-base sm:text-lg font-serif-luxury tracking-wide"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-white/40 hover:text-white text-xs"
            >
              Clear
            </button>
          )}
        </div>

        {/* Popular Tags */}
        {!query && (
          <div className="mt-6">
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 mb-3">
              Suggested Olfactory Notes & Scents
            </p>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1.5 rounded-full text-xs bg-white/5 hover:bg-white/10 text-white/70 hover:text-[#d4af37] border border-white/10 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {query && (
          <div className="mt-6 max-h-[60vh] overflow-y-auto space-y-3 pr-1">
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 mb-2">
              Found {filtered.length} {filtered.length === 1 ? 'fragrance' : 'fragrances'}
            </p>

            {filtered.length === 0 ? (
              <div className="py-12 text-center">
                <p className="font-serif-luxury text-xl text-white/70">No direct match found</p>
                <p className="text-xs text-white/40 mt-1">
                  Try searching for notes like "Amber", "Cedar", "Oud" or "Rose"
                </p>
              </div>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    navigateTo('product', item.id);
                    setIsSearchOpen(false);
                    setQuery('');
                  }}
                  className="group flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-[#d4af37]/30 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-black/50 overflow-hidden flex items-center justify-center p-1 border border-white/10">
                      <img
                        src={item.bottleImage}
                        alt={item.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif-luxury text-base text-white group-hover:text-[#d4af37] transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-xs text-white/50">{item.accords.slice(0, 3).join(' · ')}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#d4af37]">
                      {formatPrice(item.price)}
                    </span>
                    <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-[#d4af37] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
