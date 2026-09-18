import React, { useState } from 'react';
import { ArrowLeft, Star, ShoppingBag, Zap, Heart, ShieldCheck, Truck, RefreshCw, Clock, Waves, Calendar, Sparkles, Compass } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailViewProps {
  product: Product;
  allProducts: Product[];
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number, size?: string) => void;
  onBuyNow: (product: Product, quantity: number, size?: string) => void;
  onSelectProduct: (product: Product) => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  allProducts,
  onBack,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
  wishlist,
  onToggleWishlist
}) => {
  const [selectedSize, setSelectedSize] = useState('50 ML');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'notes' | 'story' | 'performance' | 'reviews'>('notes');

  const isWishlisted = wishlist.some((w) => w.id === product.id);

  // Price adjustment for sizes
  const currentPrice = selectedSize === '100 ML' ? product.price + 1800 : product.price;

  // Related products from same family or category
  const related = allProducts
    .filter((p) => p.id !== product.id && (p.scentFamily === product.scentFamily || p.category === product.category))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#050807] text-white pt-24 pb-20 relative overflow-hidden">
      {/* Background Ambience */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20 filter blur-3xl scale-125"
        style={{
          background: `radial-gradient(circle at 40% 30%, ${product.accentColor} 0%, #050807 70%)`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Breadcrumb / Back Button */}
        <div className="py-4 flex items-center justify-between border-b border-white/5 mb-8">
          <button
            onClick={onBack}
            className="group flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 hover:text-gold-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>RETURN TO JOURNEY</span>
          </button>

          <div className="text-[11px] font-mono text-neutral-400 hidden sm:block uppercase">
            Maison Ismaeel Muhammad · {product.category}
          </div>
        </div>

        {/* Hero Section: Left Image, Right Purchase Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Left Column: Interactive Product Showcase */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-8 rounded-3xl bg-black/50 border border-white/10 relative group">
            {/* Ambient Radial Aura */}
            <div
              className="absolute inset-0 rounded-3xl opacity-30 filter blur-2xl pointer-events-none transition-all duration-700 group-hover:opacity-60"
              style={{
                background: `radial-gradient(circle, ${product.accentColor} 0%, transparent 70%)`
              }}
            />

            <img
              src={product.transparentImage || product.image}
              alt={product.name}
              className="max-h-[480px] w-auto object-contain mx-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] transform transition-transform duration-700 group-hover:scale-105"
            />

            <div className="mt-6 flex items-center space-x-3 text-xs font-mono text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Artisanal Small Batch Distillation · Lahore Atelier</span>
            </div>
          </div>

          {/* Right Column: Title, Notes, Sizes, Pricing, Add to Cart */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-gold-400">
                  {product.concentration} · {product.scentFamily}
                </span>

                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-2 rounded-full border transition-colors ${
                    isWishlisted
                      ? 'bg-gold-500 text-black border-gold-400'
                      : 'bg-white/5 text-neutral-400 hover:text-white border-white/10'
                  }`}
                  title={isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-black' : ''}`} />
                </button>
              </div>

              <h1 className="font-cinzel text-4xl sm:text-5xl text-white tracking-[0.06em]">
                {product.name}
              </h1>

              <div className="text-xs font-mono tracking-widest text-gold-300 uppercase">
                {product.headlineNotes}
              </div>

              {/* Star Rating */}
              <div className="flex items-center space-x-2 pt-1 text-xs">
                <div className="flex text-gold-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <span className="font-mono text-white font-semibold">{product.rating}</span>
                <span className="text-neutral-400">({product.reviewsCount} verified reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-4 pt-2">
              <span className="font-cinzel text-3xl sm:text-4xl text-gold-300 font-bold">
                ₨{currentPrice.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-neutral-500 line-through">
                  ₨{(product.originalPrice + (selectedSize === '100 ML' ? 1800 : 0)).toLocaleString()}
                </span>
              )}
              <span className="text-xs text-emerald-400 font-mono">
                Tax Included · Free Express Shipping
              </span>
            </div>

            <p className="text-sm text-neutral-300 font-sans font-light leading-relaxed">
              {product.story}
            </p>

            {/* Size Selector */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs font-mono uppercase text-neutral-400">
                <span>Select Flacon Size</span>
                <span className="text-gold-300">Selected: {selectedSize}</span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { size: '50 ML', desc: 'Standard Flacon', priceTag: `₨${product.price.toLocaleString()}` },
                  { size: '100 ML', desc: 'Connoisseur Flacon', priceTag: `₨${(product.price + 1800).toLocaleString()}` },
                  { size: '10 ML', desc: 'Travel Atomizer', priceTag: '₨1,200' },
                ].map((item) => (
                  <button
                    key={item.size}
                    onClick={() => setSelectedSize(item.size)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedSize === item.size
                        ? 'bg-gold-500/15 border-gold-400 text-white shadow-[0_0_15px_rgba(212,176,55,0.2)]'
                        : 'bg-black/40 border-white/10 text-neutral-400 hover:border-white/30'
                    }`}
                  >
                    <div className="text-xs font-mono font-semibold text-white">{item.size}</div>
                    <div className="text-[10px] text-neutral-400">{item.desc}</div>
                    <div className="text-[11px] font-mono text-gold-300 mt-1">{item.priceTag}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-white/20 rounded-xl bg-black/50 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-neutral-400 hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-mono text-white font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-neutral-400 hover:text-white"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => onAddToCart(product, quantity, selectedSize)}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-cinzel text-xs tracking-[0.2em] uppercase font-bold flex items-center justify-center space-x-2 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO BAG</span>
                </button>

                {/* Buy Now (Direct Checkout) */}
                <button
                  onClick={() => onBuyNow(product, quantity, selectedSize)}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-black font-cinzel text-xs tracking-[0.2em] uppercase font-bold flex items-center justify-center space-x-2 transition-all shadow-xl hover:shadow-gold-500/20"
                >
                  <Zap className="w-4 h-4 fill-black" />
                  <span>BUY NOW (COD)</span>
                </button>
              </div>
            </div>

            {/* Assurance Icons */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center text-[10px] text-neutral-400 font-mono">
              <div className="flex flex-col items-center space-y-1">
                <Truck className="w-4 h-4 text-gold-400" />
                <span>2-4 Days Delivery</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Genuine Oils</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <RefreshCw className="w-4 h-4 text-cyan-400" />
                <span>7-Day Return Policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Fragrance Pyramid & Notes Breakdown */}
        <div className="py-16 border-t border-white/10">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
            <span className="text-[10px] font-mono tracking-[0.35em] text-gold-400 uppercase">
              OLFACTIVE ARCHITECTURE
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl text-white tracking-wider">
              FRAGRANCE PYRAMID
            </h2>
            <p className="text-xs text-neutral-400 font-sans">
              Formulated to unfold organically over 14 hours on warm skin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Top Notes */}
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4 text-center backdrop-blur-sm">
              <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-400/40 text-gold-400 flex items-center justify-center mx-auto text-xs font-mono font-bold">
                01
              </div>
              <div>
                <h3 className="font-cinzel text-lg text-white font-semibold">TOP NOTES</h3>
                <span className="text-[10px] font-mono text-neutral-400 uppercase">First 15–30 Minutes</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {product.topNotes.map((note) => (
                  <span
                    key={note}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-200"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Heart Notes */}
            <div className="p-6 rounded-2xl bg-black/40 border border-gold-500/30 space-y-4 text-center backdrop-blur-sm shadow-[0_0_20px_rgba(212,176,55,0.1)]">
              <div className="w-10 h-10 rounded-full bg-gold-500/20 border border-gold-400 text-gold-300 flex items-center justify-center mx-auto text-xs font-mono font-bold">
                02
              </div>
              <div>
                <h3 className="font-cinzel text-lg text-gold-200 font-semibold">HEART NOTES</h3>
                <span className="text-[10px] font-mono text-neutral-400 uppercase">Hours 1–6 (The Core Identity)</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {product.heartNotes.map((note) => (
                  <span
                    key={note}
                    className="px-3 py-1 rounded-full bg-gold-950/40 border border-gold-500/40 text-xs text-gold-200"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Base Notes */}
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4 text-center backdrop-blur-sm">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/20 text-neutral-300 flex items-center justify-center mx-auto text-xs font-mono font-bold">
                03
              </div>
              <div>
                <h3 className="font-cinzel text-lg text-white font-semibold">BASE NOTES</h3>
                <span className="text-[10px] font-mono text-neutral-400 uppercase">Hours 6–14+ (The Sillage Trail)</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {product.baseNotes.map((note) => (
                  <span
                    key={note}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-200"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Performance, Longevity, Projection & Occasions */}
        <div className="py-14 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/5 space-y-2">
              <div className="flex items-center space-x-2 text-gold-400">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-mono uppercase tracking-widest">Longevity</span>
              </div>
              <div className="font-cinzel text-xl text-white font-semibold">{product.longevity}</div>
              <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-gold-400 rounded-full"
                  style={{ width: `${(product.longevityScore / 10) * 100}%` }}
                />
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/5 space-y-2">
              <div className="flex items-center space-x-2 text-cyan-400">
                <Waves className="w-4 h-4" />
                <span className="text-xs font-mono uppercase tracking-widest">Projection & Sillage</span>
              </div>
              <div className="font-cinzel text-xl text-white font-semibold">{product.projection}</div>
              <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-cyan-400 rounded-full"
                  style={{ width: `${(product.projectionScore / 10) * 100}%` }}
                />
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/5 space-y-2">
              <div className="flex items-center space-x-2 text-amber-400">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-mono uppercase tracking-widest">Recommended Seasons</span>
              </div>
              <div className="font-cinzel text-lg text-white font-semibold">{product.bestSeason}</div>
              <p className="text-[11px] text-neutral-400 font-sans">Ideal performance in Pakistani weather</p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/5 space-y-2">
              <div className="flex items-center space-x-2 text-emerald-400">
                <Compass className="w-4 h-4" />
                <span className="text-xs font-mono uppercase tracking-widest">Occasion</span>
              </div>
              <div className="font-cinzel text-lg text-white font-semibold">{product.occasion}</div>
              <p className="text-[11px] text-neutral-400 font-sans">Guaranteed compliments & presence</p>
            </div>
          </div>
        </div>

        {/* Section 4: Customer Reviews */}
        <div className="py-14 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="font-cinzel text-2xl text-white font-semibold tracking-wider">
                CONNOISSEUR REVIEWS ({product.reviewsCount})
              </h3>
              <p className="text-xs text-neutral-400 font-sans">
                Real feedback from Pakistani fragrance collectors
              </p>
            </div>

            <div className="flex items-center space-x-2 text-gold-400 font-cinzel text-xl font-bold">
              <span>{product.rating}</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.reviews.length > 0 ? (
              product.reviews.map((rev) => (
                <div key={rev.id} className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-white text-sm">{rev.author}</div>
                      <div className="text-[10px] font-mono text-neutral-400">{rev.city}, Pakistan · {rev.date}</div>
                    </div>
                    <div className="flex text-gold-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-gold-400" />
                      ))}
                    </div>
                  </div>
                  <h4 className="font-cinzel text-sm text-gold-200 font-semibold">{rev.title}</h4>
                  <p className="text-xs text-neutral-300 font-sans font-light leading-relaxed">
                    "{rev.comment}"
                  </p>
                  <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 pt-1">
                    ✓ Verified Customer Purchase
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 py-8 text-center text-xs text-neutral-400 bg-white/5 rounded-xl border border-white/5">
                Be the first to leave a review for {product.name} after testing your complimentary discovery vial!
              </div>
            )}
          </div>
        </div>

        {/* Section 5: Continue Your Journey / Related Fragrances */}
        {related.length > 0 && (
          <div className="py-14 border-t border-white/10">
            <div className="text-center space-y-2 mb-10">
              <span className="text-[10px] font-mono tracking-[0.3em] text-gold-400 uppercase">
                HARMONIC DISCOVERIES
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl text-white tracking-wider">
                RELATED CREATIONS
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectProduct(rel)}
                  className="group p-6 rounded-2xl bg-black/40 border border-white/10 hover:border-gold-400/60 transition-all cursor-pointer flex flex-col items-center text-center space-y-3"
                >
                  <img
                    src={rel.transparentImage || rel.image}
                    alt={rel.name}
                    className="h-44 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div>
                    <h4 className="font-cinzel text-base text-white font-semibold group-hover:text-gold-200 transition-colors">
                      {rel.name}
                    </h4>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase block">
                      {rel.headlineNotes}
                    </span>
                    <span className="font-cinzel text-sm text-gold-300 font-bold block mt-1">
                      ₨{rel.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Continue Journey Button */}
        <div className="text-center pt-8 pb-12">
          <button
            onClick={onBack}
            className="px-8 py-3.5 rounded-full bg-gold-500/20 hover:bg-gold-500 hover:text-black border border-gold-400/50 text-gold-300 font-mono text-xs tracking-[0.25em] uppercase transition-all duration-300 shadow-xl"
          >
            CONTINUE CINEMATIC JOURNEY →
          </button>
        </div>
      </div>
    </div>
  );
};
