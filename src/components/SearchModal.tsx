import React, { useState } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const normalized = searchTerm.toLowerCase().trim();
  const results = normalized
    ? PRODUCTS.filter((p) => {
        return (
          p.name.toLowerCase().includes(normalized) ||
          p.tagline.toLowerCase().includes(normalized) ||
          p.category.toLowerCase().includes(normalized) ||
          p.olfactiveFamily.toLowerCase().includes(normalized) ||
          p.topNotes.some((n) => n.toLowerCase().includes(normalized)) ||
          p.heartNotes.some((n) => n.toLowerCase().includes(normalized)) ||
          p.baseNotes.some((n) => n.toLowerCase().includes(normalized)) ||
          p.description.toLowerCase().includes(normalized)
        );
      })
    : PRODUCTS.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-[#080E0A] text-[#E8E6E1] border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl z-10 p-6">
        
        {/* Search Bar */}
        <div className="relative border-b border-white/10 pb-4">
          <Search className="w-5 h-5 absolute left-3 top-2.5 text-white/40" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by perfume, note (Amber, Oud, Sea Salt, Rose)..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-10 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-400 font-sans"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-3 text-white/40 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap gap-2 py-3 text-[11px] text-white/60">
          <span className="text-white/40 self-center">Popular:</span>
          {['Five-Nine', 'Oceanic Sillage', 'Cambodian Oud', 'Amber', 'Attar', 'Taif Rose'].map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchTerm(tag)}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-white/70 hover:text-gold-300 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="mt-3 max-h-80 overflow-y-auto space-y-2 divide-y divide-white/5">
          {results.length === 0 ? (
            <p className="text-center py-8 text-xs text-white/40">
              No fragrances matched "{searchTerm}". Try exploring by category or scent notes.
            </p>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group pt-3"
              >
                <div className="flex items-center space-x-3.5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-14 object-contain bg-black/40 rounded p-1 border border-white/5 group-hover:border-gold-400/40 transition-colors"
                  />
                  <div>
                    <span className="text-[10px] tracking-wider text-gold-400 font-mono uppercase">
                      {product.subtitle}
                    </span>
                    <h5 className="font-serif text-base text-white group-hover:text-gold-300 transition-colors">
                      {product.name}
                    </h5>
                    <p className="text-xs text-white/50">{product.tagline}</p>
                  </div>
                </div>

                <div className="text-right flex items-center space-x-3">
                  <span className="font-serif text-sm text-gold-200">
                    ₨{product.price.toLocaleString()}
                  </span>
                  <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-gold-300 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
