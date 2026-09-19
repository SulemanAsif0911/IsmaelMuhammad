import React, { useState } from 'react';
import {
  Star,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Heart,
  Clock,
  Wind,
  Calendar,
  Check,
  Award,
  ChevronRight,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ProductDetailPage = () => {
  const {
    selectedProduct,
    addToCart,
    navigateTo,
    formatPrice,
    wishlist,
    toggleWishlist,
    products,
  } = useShop();

  const [selectedSize, setSelectedSize] = useState(
    selectedProduct.sizes ? selectedProduct.sizes[0] : { size: '50 ML', price: selectedProduct.price }
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('notes'); // 'notes' | 'performance' | 'reviews'

  const isWish = wishlist.includes(selectedProduct.id);

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, selectedSize, quantity);
    navigateTo('checkout');
  };

  // Related products
  const related = products
    .filter((p) => p.id !== selectedProduct.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#060907] text-white pt-28 pb-24">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-8">
        <div className="flex items-center gap-2 text-[11px] font-mono text-white/40 uppercase tracking-widest">
          <button onClick={() => navigateTo('home')} className="hover:text-white">
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-white/20" />
          <button onClick={() => navigateTo('shop')} className="hover:text-white">
            Fragrances
          </button>
          <ChevronRight className="w-3 h-3 text-white/20" />
          <span className="text-[#d4af37]">{selectedProduct.name}</span>
        </div>
      </div>

      {/* Main Product Hero Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Big Flacon Stage */}
          <div className="lg:col-span-6 bg-gradient-to-b from-[#101813] via-[#08100c] to-[#040806] rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden flex items-center justify-center min-h-[500px]">
            {/* Ambient Backlight Halo */}
            <div
              className="absolute inset-0 opacity-25 filter blur-3xl rounded-full scale-90"
              style={{ backgroundColor: selectedProduct.colorTheme.accent }}
            />

            {/* Floating Bottle */}
            <div className="relative z-10 flex flex-col items-center">
              <img
                src={selectedProduct.bottleTrans || selectedProduct.bottleImage}
                alt={selectedProduct.name}
                className="w-[280px] sm:w-[350px] md:w-[400px] h-auto object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.9)] animate-float-slow"
              />

              <div className="mt-6 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-[10px] font-mono tracking-widest uppercase text-white/60">
                <Sparkles className="w-3 h-3 text-[#d4af37]" />
                <span>Extrait de Parfum · 30% Cold-Macerated Oils</span>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Purchase Configuration */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#d4af37]">
                  {selectedProduct.collection}
                </span>

                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className={`p-2 rounded-full border border-white/10 bg-white/5 transition-colors ${
                    isWish ? 'text-red-400' : 'text-white/40 hover:text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWish ? 'fill-current' : ''}`} />
                </button>
              </div>

              <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight">
                {selectedProduct.name}
              </h1>

              <div className="flex items-center gap-3 pt-1">
                <div className="flex text-[#d4af37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="font-mono text-xs text-white/80">{selectedProduct.rating}</span>
                <span className="text-white/20">|</span>
                <span className="font-mono text-xs text-white/50">
                  {selectedProduct.reviewCount} Verified Client Reviews
                </span>
              </div>
            </div>

            {/* Price Readout */}
            <div className="flex items-baseline gap-4 pt-2 border-y border-white/10 py-4">
              <span className="font-mono text-3xl sm:text-4xl text-[#d4af37] font-semibold">
                {formatPrice(selectedSize.price)}
              </span>
              {selectedProduct.priceOriginal && (
                <span className="font-mono text-lg text-white/40 line-through">
                  {formatPrice(selectedProduct.priceOriginal)}
                </span>
              )}
              <span className="text-xs font-mono text-[#22c55e] ml-auto">
                In Stock · Ready to Dispatch in Lahore
              </span>
            </div>

            <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
              {selectedProduct.description}
            </p>

            {/* Accords list */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest uppercase text-white/40 block">
                Primary Accords
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.accords.map((accord) => (
                  <span
                    key={accord}
                    className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-white/80"
                  >
                    {accord}
                  </span>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-3 pt-2">
              <label className="text-[11px] font-mono uppercase tracking-widest text-white/50 block">
                Select Flacon Volume
              </label>
              <div className="flex flex-wrap gap-3">
                {selectedProduct.sizes.map((s) => (
                  <button
                    key={s.size}
                    onClick={() => setSelectedSize(s)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-mono transition-all border ${
                      selectedSize.size === s.size
                        ? 'border-[#d4af37] bg-[#d4af37]/20 text-[#f5e6b3] font-semibold shadow-lg'
                        : 'border-white/15 bg-white/5 text-white/70 hover:text-white'
                    }`}
                  >
                    <div>{s.size}</div>
                    <div className="text-[10px] opacity-60 mt-0.5">{formatPrice(s.price)}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Action Buttons */}
            <div className="space-y-3 pt-4">
              <div className="flex gap-4">
                {/* Quantity */}
                <div className="flex items-center border border-white/15 rounded-xl bg-white/5 px-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-white/60 hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-4 font-mono text-xs">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-white/60 hover:text-white"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 rounded-xl bg-[#d4af37] hover:bg-[#ebd57b] text-black font-semibold text-xs tracking-[0.2em] uppercase transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  {added ? <Check className="w-4 h-4 text-black" /> : <ShoppingBag className="w-4 h-4" />}
                  <span>{added ? 'Added to Fragrance Bag' : 'Add to Bag'}</span>
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs tracking-[0.2em] uppercase transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Express Buy Now (Cash on Delivery / Card)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center">
              <div className="p-2 space-y-1">
                <Truck className="w-4 h-4 text-[#d4af37] mx-auto" />
                <p className="text-[10px] font-mono text-white/60">Free Delivery &gt; ₨ 5,000</p>
              </div>
              <div className="p-2 space-y-1">
                <ShieldCheck className="w-4 h-4 text-[#d4af37] mx-auto" />
                <p className="text-[10px] font-mono text-white/60">100% Authentic Oils</p>
              </div>
              <div className="p-2 space-y-1">
                <RotateCcw className="w-4 h-4 text-[#d4af37] mx-auto" />
                <p className="text-[10px] font-mono text-white/60">Discovery Guarantee</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed In-Depth Information: Notes Pyramid, Longevity Meter, Reviews */}
        <div className="mt-20 border-t border-white/10 pt-12">
          {/* Tabs */}
          <div className="flex items-center justify-center gap-8 border-b border-white/10 pb-4 mb-10">
            <button
              onClick={() => setActiveTab('notes')}
              className={`font-serif-luxury text-xl sm:text-2xl pb-2 transition-colors relative ${
                activeTab === 'notes' ? 'text-[#d4af37]' : 'text-white/50 hover:text-white'
              }`}
            >
              Fragrance Pyramid & Notes
              {activeTab === 'notes' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4af37]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className={`font-serif-luxury text-xl sm:text-2xl pb-2 transition-colors relative ${
                activeTab === 'performance' ? 'text-[#d4af37]' : 'text-white/50 hover:text-white'
              }`}
            >
              Longevity & Occasions
              {activeTab === 'performance' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4af37]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`font-serif-luxury text-xl sm:text-2xl pb-2 transition-colors relative ${
                activeTab === 'reviews' ? 'text-[#d4af37]' : 'text-white/50 hover:text-white'
              }`}
            >
              Client Reviews ({selectedProduct.reviews.length})
              {activeTab === 'reviews' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4af37]" />
              )}
            </button>
          </div>

          {/* TAB 1: Fragrance Pyramid */}
          {activeTab === 'notes' && (
            <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
              <div className="text-center max-w-lg mx-auto">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d4af37]">
                  The Evolution on Skin
                </span>
                <h3 className="font-serif-luxury text-3xl text-white mt-1">Olfactory Pyramid</h3>
                <p className="text-xs text-white/60 mt-1">
                  Experience how the formulation unfolds from first spray to midnight drydown.
                </p>
              </div>

              {/* Pyramid Graphic */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                {/* Top Notes */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#d4af37]/40 transition-colors space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37]">
                      0 — 15 Mins
                    </span>
                    <Clock className="w-3.5 h-3.5 text-white/40" />
                  </div>
                  <h4 className="font-serif-luxury text-2xl text-white">Top Notes</h4>
                  <p className="text-xs text-white/60">
                    The luminous opening impression that awakens the senses upon first spray.
                  </p>
                  <ul className="space-y-1 pt-2">
                    {selectedProduct.notes.top.map((n) => (
                      <li key={n} className="text-xs font-mono text-white/90 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Heart Notes */}
                <div className="p-6 rounded-2xl bg-white/[0.04] border border-[#d4af37]/30 shadow-lg space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#d4af37]/10 rounded-full blur-xl pointer-events-none" />
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37]">
                      15 Mins — 3 Hours
                    </span>
                    <Wind className="w-3.5 h-3.5 text-[#d4af37]" />
                  </div>
                  <h4 className="font-serif-luxury text-2xl text-white">Heart Notes</h4>
                  <p className="text-xs text-white/60">
                    The core soul and character of the fragrance as it warms with your body temperature.
                  </p>
                  <ul className="space-y-1 pt-2">
                    {selectedProduct.notes.heart.map((n) => (
                      <li key={n} className="text-xs font-mono text-white/90 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Base Notes */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#d4af37]/40 transition-colors space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37]">
                      3 — 14+ Hours
                    </span>
                    <Award className="w-3.5 h-3.5 text-white/40" />
                  </div>
                  <h4 className="font-serif-luxury text-2xl text-white">Base Notes</h4>
                  <p className="text-xs text-white/60">
                    The lingering sensual anchor that clings to skin, collars, and memory.
                  </p>
                  <ul className="space-y-1 pt-2">
                    {selectedProduct.notes.base.map((n) => (
                      <li key={n} className="text-xs font-mono text-white/90 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Performance & Occasions */}
          {activeTab === 'performance' && (
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6">
                <h4 className="font-serif-luxury text-2xl text-white">Olfactory Performance</h4>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-white/60">Longevity on Skin</span>
                      <span className="text-[#d4af37] font-semibold">{selectedProduct.performance.longevity}</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#d4af37] h-full w-[94%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-white/60">Sillage & Projection</span>
                      <span className="text-[#22c55e] font-semibold">{selectedProduct.performance.projection}</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#22c55e] h-full w-[88%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-white/60">Concentration</span>
                      <span className="text-cyan-400 font-semibold">{selectedProduct.performance.concentration}</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <div className="bg-cyan-400 h-full w-[90%]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6">
                <h4 className="font-serif-luxury text-2xl text-white">When to Wear</h4>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono uppercase text-white/50 block">Seasonality</span>
                      <p className="text-white/90 text-sm mt-0.5">{selectedProduct.performance.season}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Award className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono uppercase text-white/50 block">Occasion</span>
                      <p className="text-white/90 text-sm mt-0.5">{selectedProduct.performance.occasion}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono uppercase text-white/50 block">Perfumer’s Tip</span>
                      <p className="text-white/70 leading-relaxed mt-0.5">
                        Apply to pulse points on wrists and collarbones directly after a warm shower for optimal absorption and projection.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Reviews */}
          {activeTab === 'reviews' && (
            <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {selectedProduct.reviews.map((rev, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex text-[#d4af37]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono text-white/40">{rev.date}</span>
                    </div>

                    <h5 className="font-serif-luxury text-base text-white font-medium">
                      “{rev.title}”
                    </h5>

                    <p className="text-xs text-white/70 leading-relaxed font-light">
                      {rev.comment}
                    </p>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-[#d4af37]">{rev.author}</span>
                      <span className="text-[9px] font-mono text-[#22c55e] uppercase">
                        ✓ Verified Buyer
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Continue Your Journey: Related Scents */}
        <div className="mt-24 pt-16 border-t border-white/10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-white">
              Continue Your Olfactory Journey
            </h3>
            <button
              onClick={() => navigateTo('shop')}
              className="text-xs font-mono uppercase tracking-widest text-[#d4af37] hover:underline"
            >
              View Full Vault →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((p) => (
              <div
                key={p.id}
                onClick={() => navigateTo('product', p.id)}
                className="group p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#d4af37]/50 cursor-pointer transition-all"
              >
                <div className="h-44 flex items-center justify-center p-2">
                  <img
                    src={p.bottleTrans || p.bottleImage}
                    alt={p.name}
                    className="max-h-40 w-auto object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="space-y-1 pt-3 border-t border-white/5">
                  <span className="text-[10px] font-mono text-white/40 uppercase">
                    {p.collection}
                  </span>
                  <h4 className="font-serif-luxury text-lg text-white group-hover:text-[#d4af37] transition-colors">
                    {p.name}
                  </h4>
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-[#d4af37]">{formatPrice(p.price)}</span>
                    <span className="text-white/40">Discover →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
