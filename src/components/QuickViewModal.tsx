import React, { useState } from 'react';
import { X, Star, ShoppingBag, ArrowRight, ShieldCheck, Clock, Waves, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, size?: string) => void;
  onViewDetails: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onViewDetails
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('50 ML');

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedSize);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 bg-black/85 backdrop-blur-md animate-fadeIn flex items-center justify-center">
      <div className="relative w-full max-w-3xl bg-[#090d0b] border border-gold-500/30 rounded-2xl shadow-2xl overflow-hidden text-white my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-neutral-400 hover:text-white transition-colors border border-white/10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          {/* Left Column: Visual */}
          <div className="md:col-span-5 flex flex-col items-center justify-center bg-black/50 rounded-xl p-6 border border-white/5 relative">
            <div
              className="absolute inset-0 rounded-xl opacity-20 pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${product.accentColor} 0%, transparent 70%)`
              }}
            />
            <img
              src={product.transparentImage || product.image}
              alt={product.name}
              className="max-h-[300px] w-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
            />
            <div className="mt-4 text-center">
              <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase">
                {product.concentration}
              </span>
              <div className="text-xs text-neutral-400 font-sans mt-0.5">
                Authentic French Oils · 45-day Maceration
              </div>
            </div>
          </div>

          {/* Right Column: Info & Action */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center space-x-2 text-gold-400 text-xs font-mono mb-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <span>({product.reviewsCount} verified reviews)</span>
              </div>

              <h2 className="font-cinzel text-2xl sm:text-3xl text-white font-semibold tracking-wider">
                {product.name}
              </h2>
              <div className="text-xs font-mono tracking-widest text-gold-300 uppercase mt-1">
                {product.headlineNotes}
              </div>

              <div className="mt-3 flex items-baseline space-x-3">
                <span className="font-cinzel text-2xl text-gold-300 font-bold">
                  ₨{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-neutral-500 line-through">
                    ₨{product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-[10px] font-mono text-emerald-400 uppercase px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-600/30">
                  In Stock · Ready to Dispatch
                </span>
              </div>

              <p className="text-xs text-neutral-300 font-sans font-light mt-3 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Performance Badges */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/10 text-xs font-mono">
                <div className="flex items-center space-x-2 text-neutral-300">
                  <Clock className="w-3.5 h-3.5 text-gold-400" />
                  <span>Longevity: {product.longevity}</span>
                </div>
                <div className="flex items-center space-x-2 text-neutral-300">
                  <Waves className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Sillage: {product.projection}</span>
                </div>
              </div>

              {/* Size Selector */}
              <div className="mt-4">
                <div className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 mb-2">
                  Select Volume
                </div>
                <div className="flex gap-2">
                  {['50 ML', '100 ML (+₨1,800)', '10 ML Discovery'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-colors border ${
                        selectedSize === size
                          ? 'bg-gold-500/20 border-gold-400 text-gold-300'
                          : 'bg-black/40 border-white/15 text-neutral-300 hover:border-white/30'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-white/20 rounded bg-black/50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-neutral-400 hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-mono text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-neutral-400 hover:text-white"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 px-6 rounded bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-black font-cinzel text-xs tracking-[0.2em] uppercase font-bold flex items-center justify-center space-x-2 transition-all shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO CART · ₨{(product.price * quantity).toLocaleString()}</span>
                </button>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onViewDetails(product);
                }}
                className="w-full text-center text-xs font-mono tracking-widest text-gold-400 hover:text-white uppercase transition-colors flex items-center justify-center space-x-1"
              >
                <span>EXPLORE FULL PYRAMID & REVIEWS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
