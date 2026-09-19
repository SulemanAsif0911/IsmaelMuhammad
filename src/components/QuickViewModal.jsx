import React, { useState } from 'react';
import { X, Star, ShoppingBag, Eye, Check, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const QuickViewModal = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, formatPrice, navigateTo } = useShop();
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!quickViewProduct) return null;

  const currentSize = selectedSize || quickViewProduct.sizes[0];

  const handleAdd = () => {
    addToCart(quickViewProduct, currentSize, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-[#090f0c] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-10 max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 text-white/50 hover:text-white bg-black/40 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Visual */}
        <div className="md:w-1/2 bg-gradient-to-b from-[#121a14] via-[#09110d] to-black p-8 flex items-center justify-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-20 filter blur-3xl rounded-full"
            style={{ backgroundColor: quickViewProduct.colorTheme.accent }}
          />
          <img
            src={quickViewProduct.bottleImage}
            alt={quickViewProduct.name}
            className="max-h-72 object-contain relative z-10 drop-shadow-2xl animate-float-slow"
          />
          <span className="absolute bottom-4 left-4 text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded bg-black/50 border border-white/10 text-white/70">
            {quickViewProduct.collection}
          </span>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d4af37]">
                {quickViewProduct.category.toUpperCase()}
              </span>
              <span className="text-white/20">|</span>
              <div className="flex items-center text-xs text-[#d4af37]">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="ml-1 font-mono font-medium">{quickViewProduct.rating}</span>
                <span className="ml-1 text-white/40">({quickViewProduct.reviewCount})</span>
              </div>
            </div>

            <h3 className="font-serif-luxury text-2xl md:text-3xl text-white">
              {quickViewProduct.name}
            </h3>
            <p className="text-xs text-white/60 italic">{quickViewProduct.tagline}</p>

            <div className="flex items-baseline gap-3 pt-1">
              <span className="font-mono text-2xl text-[#d4af37] font-semibold">
                {formatPrice(currentSize.price)}
              </span>
              {quickViewProduct.priceOriginal && (
                <span className="font-mono text-sm text-white/40 line-through">
                  {formatPrice(quickViewProduct.priceOriginal)}
                </span>
              )}
            </div>

            <p className="text-xs text-white/70 leading-relaxed pt-2">
              {quickViewProduct.description}
            </p>

            {/* Accords */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {quickViewProduct.accords.map((accord) => (
                <span
                  key={accord}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-white/75"
                >
                  {accord}
                </span>
              ))}
            </div>

            {/* Size Selector */}
            <div className="pt-3">
              <label className="text-[11px] font-mono uppercase tracking-wider text-white/50 block mb-2">
                Select Flacon Volume
              </label>
              <div className="flex gap-2">
                {quickViewProduct.sizes.map((s) => (
                  <button
                    key={s.size}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                      currentSize.size === s.size
                        ? 'border-[#d4af37] bg-[#d4af37]/15 text-[#f5e6b3]'
                        : 'border-white/10 bg-white/5 text-white/60 hover:text-white'
                    }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 space-y-3">
            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                className="flex-1 py-3 rounded-xl bg-[#d4af37] hover:bg-[#e2bd46] text-black font-semibold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                <span>{added ? 'Added to Bag' : 'Add to Bag'}</span>
              </button>

              <button
                onClick={() => {
                  setQuickViewProduct(null);
                  navigateTo('product', quickViewProduct.id);
                }}
                className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 text-white text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                title="Full Product Story"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Details</span>
              </button>
            </div>

            <p className="text-[10px] text-center text-white/40 font-mono">
              Includes complimentary gift box & velvet travel pouch
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
