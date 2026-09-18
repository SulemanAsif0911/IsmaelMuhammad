import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

const SUGGESTIONS = ['Five-Nine', 'Nine-Five', 'Charming', 'Oud', 'Saffron', 'Aquatic', 'Attar', 'Discovery Set'];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.headlineNotes.toLowerCase().includes(q) ||
        p.scentFamily.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.topNotes.some((n) => n.toLowerCase().includes(q)) ||
        p.heartNotes.some((n) => n.toLowerCase().includes(q)) ||
        p.baseNotes.some((n) => n.toLowerCase().includes(q))
      );
    });
  }, [query, products]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 bg-black/85 backdrop-blur-md animate-fadeIn flex justify-center items-start">
      <div className="w-full max-w-2xl bg-[#090d0b] border border-gold-500/30 rounded-2xl shadow-2xl overflow-hidden text-white mt-10">
        {/* Search Bar Input */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center space-x-3">
          <Search className="w-5 h-5 text-gold-400 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search fragrances, olfactive notes (oud, amber, cedar)..."
            className="w-full bg-transparent text-sm sm:text-base font-sans text-white placeholder:text-neutral-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-neutral-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white px-2 py-1 rounded bg-white/5"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="px-6 py-3 bg-black/40 border-b border-white/5 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-gold-400" />
            Popular:
          </span>
          {SUGGESTIONS.map((sug) => (
            <button
              key={sug}
              onClick={() => setQuery(sug)}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-gold-500/20 hover:text-gold-300 border border-white/10 text-neutral-300 text-[11px] whitespace-nowrap transition-colors"
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 divide-y divide-white/5">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-xs text-neutral-400">
              Type fragrance name, notes (e.g. "saffron", "amber", "bergamot"), or family to discover creations.
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-8 text-center text-xs text-neutral-400">
              No fragrances match "<span className="text-gold-300">{query}</span>". Try another note or keyword.
            </div>
          ) : (
            filteredProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => {
                  onSelectProduct(prod);
                  onClose();
                }}
                className="py-3 px-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-16 rounded-lg bg-black/50 border border-white/10 p-1 flex items-center justify-center">
                    <img
                      src={prod.transparentImage || prod.image}
                      alt={prod.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="font-cinzel text-sm text-white font-semibold group-hover:text-gold-300 transition-colors">
                      {prod.name}
                    </h4>
                    <span className="text-[10px] font-mono text-neutral-400 block">
                      {prod.headlineNotes}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      {prod.concentration} · {prod.volume}
                    </span>
                  </div>
                </div>

                <div className="text-right flex items-center space-x-3">
                  <span className="font-cinzel text-sm text-gold-300 font-bold">
                    ₨{prod.price.toLocaleString()}
                  </span>
                  <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-gold-300 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
