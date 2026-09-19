import React, { useState } from 'react';
import { 
  Star, 
  ShieldCheck, 
  Clock, 
  Wind, 
  Sparkles, 
  Calendar, 
  Check, 
  ArrowLeft, 
  Share2, 
  Heart,
  Droplets,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Product, ProductSizeOption } from '../types';
import { PRODUCTS } from '../data/products';

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, selectedSize: ProductSizeOption, quantity: number) => void;
  onBuyNow: (product: Product, selectedSize: ProductSizeOption, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onBack,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
}) => {
  const [selectedSize, setSelectedSize] = useState<ProductSizeOption>(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'pyramid' | 'performance' | 'reviews'>('pyramid');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Mouse tilt effect for the bottle visual
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Related products (exclude current)
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#060B08] text-[#E8E6E1] pt-24 pb-20 selection:bg-gold-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between pb-8 border-b border-white/5">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-white/60 hover:text-gold-300 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return To Journey</span>
          </button>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`p-2 rounded-full border transition-colors ${
                isWishlisted 
                  ? 'border-red-400/50 bg-red-500/10 text-red-400' 
                  : 'border-white/10 hover:border-gold-400 text-white/50 hover:text-gold-300'
              }`}
              title="Save to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-400' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full border border-white/10 hover:border-gold-400 text-white/50 hover:text-gold-300 transition-colors relative"
              title="Share Fragrance"
            >
              <Share2 className="w-4 h-4" />
              {copiedLink && (
                <span className="absolute -bottom-8 right-0 bg-gold-400 text-black font-sans text-[10px] font-bold px-2 py-0.5 rounded whitespace-nowrap">
                  Link Copied!
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Hero Section: Left Bottle Showcase, Right Purchase & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8 items-start">
          
          {/* Left: Product Visual with 3D Tilt */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full aspect-[4/5] max-w-lg rounded-3xl bg-gradient-to-b from-white/[0.04] to-black/60 border border-white/10 p-8 flex items-center justify-center overflow-hidden group shadow-2xl cursor-crosshair"
              style={{
                perspective: '1000px',
              }}
            >
              {/* Atmospheric Glow behind bottle */}
              <div 
                className="absolute inset-0 bg-radial from-gold-500/20 via-transparent to-transparent pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  transform: `translate(${tilt.x * 2}px, ${tilt.y * 2}px)`,
                }}
              />

              {/* Background environment glimpse */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-screen pointer-events-none"
                style={{
                  backgroundImage: product.environment === 'ocean' || product.environment === 'abyss'
                    ? "url('/images/environments/ocean_conversion_clean.png')"
                    : "url('/images/environments/forest_background.png')",
                }}
              />

              {/* Hero Bottle Graphic */}
              <img
                src={product.image}
                alt={product.name}
                className="relative z-10 max-h-[82%] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)] transition-transform duration-200 ease-out"
                style={{
                  transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(1.05)`,
                }}
              />

              {/* Concentration Tag */}
              <div className="absolute top-6 left-6 z-20">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] uppercase font-mono tracking-widest text-gold-300">
                  {product.concentration}
                </span>
              </div>

              {/* Olfactive Family Tag */}
              <div className="absolute bottom-6 left-6 z-20">
                <span className="text-xs uppercase tracking-[0.25em] text-white/50 font-sans">
                  Environment: <strong className="text-white uppercase font-serif">{product.environment}</strong>
                </span>
              </div>
            </div>

            {/* Micro details bar */}
            <div className="grid grid-cols-3 gap-4 w-full max-w-lg mt-4 text-center">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <Clock className="w-4 h-4 mx-auto text-gold-400 mb-1" />
                <p className="text-[10px] text-white/50 uppercase tracking-wider">Longevity</p>
                <p className="text-xs text-white font-medium">{product.longevity}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <Wind className="w-4 h-4 mx-auto text-gold-400 mb-1" />
                <p className="text-[10px] text-white/50 uppercase tracking-wider">Sillage</p>
                <p className="text-xs text-white font-medium">Heavy Projection</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <Calendar className="w-4 h-4 mx-auto text-gold-400 mb-1" />
                <p className="text-[10px] text-white/50 uppercase tracking-wider">Ideal Season</p>
                <p className="text-xs text-white font-medium truncate">{product.bestSeason.split('/')[0]}</p>
              </div>
            </div>
          </div>

          {/* Right: Product Purchase Controls */}
          <div className="lg:col-span-5 space-y-6">
            
            <div>
              <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-gold-400">
                {product.subtitle}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-white font-light tracking-wide mt-1 uppercase">
                {product.name}
              </h1>
              <p className="text-xs tracking-[0.25em] text-white/60 font-sans uppercase mt-1">
                {product.tagline}
              </p>

              {/* Rating & Review counter */}
              <div className="flex items-center space-x-2 mt-3">
                <div className="flex text-gold-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <span className="text-xs font-mono text-white/80">{product.rating}</span>
                <span className="text-xs text-white/40">({product.reviewsCount} verified reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-3 pt-2 border-t border-white/10">
              <span className="font-serif text-3xl text-gold-300">
                ₨{selectedSize.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm font-serif line-through text-white/40">
                  ₨{product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                In Stock · Ships Within 24 Hours
              </span>
            </div>

            {/* Short Narrative */}
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="space-y-2.5">
              <label className="block text-xs uppercase tracking-[0.2em] text-white/50">
                Select Flacon Size
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    onClick={() => setSelectedSize(s)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedSize.size === s.size
                        ? 'border-gold-400 bg-gold-500/10 text-white shadow-lg'
                        : 'border-white/10 bg-black/30 text-white/60 hover:border-white/20'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono font-bold uppercase">{s.size}</span>
                      {selectedSize.size === s.size && <Check className="w-3.5 h-3.5 text-gold-400" />}
                    </div>
                    <span className="block text-xs font-serif text-gold-300 mt-1">
                      ₨{s.price.toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex space-x-3">
                {/* Quantity */}
                <div className="flex items-center border border-white/10 rounded-full px-4 py-2 bg-black/40">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-white/60 hover:text-white px-2 font-mono text-sm"
                  >
                    -
                  </button>
                  <span className="text-xs font-mono text-white px-3">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-white/60 hover:text-white px-2 font-mono text-sm"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => onAddToCart(product, selectedSize, quantity)}
                  className="flex-1 py-3 px-6 rounded-full border border-gold-400/80 hover:border-gold-300 bg-gold-500/10 hover:bg-gold-500/20 text-gold-300 font-medium text-xs uppercase tracking-[0.2em] transition-all"
                >
                  Add To Selection
                </button>
              </div>

              {/* Buy Now Direct Button */}
              <button
                onClick={() => onBuyNow(product, selectedSize, quantity)}
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-black font-semibold text-xs uppercase tracking-[0.25em] transition-all shadow-xl shadow-gold-500/20 flex items-center justify-center space-x-2"
              >
                <span>Instant Checkout (₨{(selectedSize.price * quantity).toLocaleString()})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Guarantees */}
            <div className="border-t border-white/10 pt-4 space-y-2 text-xs text-white/50">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
                <span>100% Genuine French & Oriental Concentrates · 30-Day Authenticity Guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Complimentary 2ml Extrait tester included with every order</span>
              </div>
            </div>

          </div>

        </div>

        {/* Tabbed Interactive Sections: Scent Pyramid vs Accords vs Reviews */}
        <div className="mt-20 border-t border-white/10 pt-12">
          
          {/* Tab Navigation */}
          <div className="flex justify-center space-x-8 border-b border-white/10 pb-4">
            <button
              onClick={() => setActiveTab('pyramid')}
              className={`pb-3 text-xs uppercase tracking-[0.25em] transition-all font-sans ${
                activeTab === 'pyramid'
                  ? 'text-gold-300 border-b-2 border-gold-400 font-semibold'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              Fragrance Pyramid & Notes
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className={`pb-3 text-xs uppercase tracking-[0.25em] transition-all font-sans ${
                activeTab === 'performance'
                  ? 'text-gold-300 border-b-2 border-gold-400 font-semibold'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              Accords & Performance
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 text-xs uppercase tracking-[0.25em] transition-all font-sans ${
                activeTab === 'reviews'
                  ? 'text-gold-300 border-b-2 border-gold-400 font-semibold'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              Connoisseur Reviews ({product.reviewsCount})
            </button>
          </div>

          {/* Tab 1: Notes Pyramid */}
          {activeTab === 'pyramid' && (
            <div className="py-10 max-w-4xl mx-auto space-y-10">
              <div className="text-center max-w-xl mx-auto">
                <h3 className="font-serif text-2xl text-white">The Olfactory Architecture</h3>
                <p className="text-xs text-white/50 mt-1">
                  How this scent unfolds from initial vaporization to 14-hour skin intimacy.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Top Notes */}
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 text-center space-y-4 hover:border-gold-400/40 transition-colors">
                  <div className="w-10 h-10 mx-auto rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-gold-400 font-mono">0 - 30 Minutes</span>
                    <h4 className="font-serif text-lg text-white font-medium mt-1">Top Notes</h4>
                    <p className="text-xs text-white/40 mt-1">The initial sensory burst upon application.</p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                    {product.topNotes.map((note) => (
                      <span key={note} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-[11px] text-white/80">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Heart Notes */}
                <div className="bg-white/[0.03] border border-gold-500/30 rounded-2xl p-6 text-center space-y-4 hover:border-gold-400 transition-colors shadow-lg shadow-gold-500/5">
                  <div className="w-10 h-10 mx-auto rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-300">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-gold-400 font-mono">30 Min - 4 Hours</span>
                    <h4 className="font-serif text-lg text-white font-medium mt-1">Heart Notes</h4>
                    <p className="text-xs text-white/40 mt-1">The defining soul and signature character.</p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                    {product.heartNotes.map((note) => (
                      <span key={note} className="px-2.5 py-1 rounded-full bg-gold-500/10 border border-gold-400/20 text-[11px] text-gold-200">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Base Notes */}
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 text-center space-y-4 hover:border-gold-400/40 transition-colors">
                  <div className="w-10 h-10 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-gold-400 font-mono">4 - 14+ Hours</span>
                    <h4 className="font-serif text-lg text-white font-medium mt-1">Base Notes</h4>
                    <p className="text-xs text-white/40 mt-1">The deep, lingering sillage on clothes and skin.</p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                    {product.baseNotes.map((note) => (
                      <span key={note} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-[11px] text-white/80">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Scent Story Quote */}
              <div className="bg-black/40 border-l-2 border-gold-400 p-6 rounded-r-2xl max-w-2xl mx-auto italic text-white/70 text-sm font-serif leading-relaxed">
                "{product.story}"
                <span className="block mt-2 text-xs font-sans text-gold-300 not-italic uppercase tracking-widest">
                  — Ismaeel Muhammad, Master Perfumer
                </span>
              </div>
            </div>
          )}

          {/* Tab 2: Accords Breakdown */}
          {activeTab === 'performance' && (
            <div className="py-10 max-w-3xl mx-auto space-y-8">
              <div className="text-center max-w-xl mx-auto">
                <h3 className="font-serif text-2xl text-white">Main Olfactive Accords</h3>
                <p className="text-xs text-white/50 mt-1">
                  Chemical equilibrium and sensory balance across primary note families.
                </p>
              </div>

              {/* Accords Bars */}
              <div className="space-y-4 bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                {product.accords.map((accord) => (
                  <div key={accord.name} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-white/80">{accord.name}</span>
                      <span className="font-mono text-gold-300">{accord.percentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${accord.percentage}%`,
                          backgroundColor: accord.color || '#C99E28',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Wearability Profile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                  <p className="text-[10px] text-gold-400 uppercase tracking-widest font-mono">Best Temperature Range</p>
                  <p className="text-sm font-serif text-white mt-1">10°C to 24°C (Autumn, Winter, Monsoon)</p>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                  <p className="text-[10px] text-gold-400 uppercase tracking-widest font-mono">Suggested Spray Dosage</p>
                  <p className="text-sm font-serif text-white mt-1">2 - 3 Sprays (Due to 30% concentration)</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Reviews */}
          {activeTab === 'reviews' && (
            <div className="py-10 max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-white">Customer Impressions</h3>
                  <p className="text-xs text-white/50">Verified connoisseurs from across Pakistan & the GCC.</p>
                </div>
                <span className="font-serif text-2xl text-gold-300">
                  {product.rating} / 5.0
                </span>
              </div>

              <div className="space-y-4">
                {product.reviews.map((rev) => (
                  <div key={rev.id} className="p-5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-xs text-white">{rev.author}</span>
                        <span className="text-[10px] text-white/40">({rev.city})</span>
                        {rev.verified && (
                          <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-white/40">{rev.date}</span>
                    </div>

                    <div className="flex text-gold-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-gold-400 text-gold-400" />
                      ))}
                    </div>

                    <h5 className="font-serif text-sm text-white font-medium">{rev.title}</h5>
                    <p className="text-xs text-white/70 leading-relaxed font-sans">{rev.comment}</p>
                    <p className="text-[10px] text-gold-400/80 font-mono">Reported Longevity: {rev.longevityRating}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Related Fragrances Section */}
        <div className="mt-20 border-t border-white/10 pt-12">
          <div className="text-center mb-8">
            <span className="text-[10px] tracking-[0.3em] uppercase text-gold-400 font-mono">
              Continue The Voyage
            </span>
            <h3 className="font-serif text-2xl text-white mt-1">Related Fragrances You May Love</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  onSelectProduct(rel);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group cursor-pointer rounded-2xl bg-white/[0.02] border border-white/5 hover:border-gold-400/40 p-5 transition-all flex flex-col justify-between"
              >
                <div className="aspect-[4/5] w-full flex items-center justify-center p-4 bg-black/40 rounded-xl relative overflow-hidden">
                  <img
                    src={rel.image}
                    alt={rel.name}
                    className="max-h-full object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
                  />
                  <span className="absolute top-2 left-2 text-[9px] font-mono uppercase bg-black/60 px-2 py-0.5 rounded text-gold-300">
                    {rel.olfactiveFamily}
                  </span>
                </div>
                <div className="mt-4">
                  <h4 className="font-serif text-base text-white group-hover:text-gold-300 transition-colors uppercase">
                    {rel.name}
                  </h4>
                  <p className="text-xs text-white/50">{rel.tagline}</p>
                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/5">
                    <span className="font-serif text-gold-200">₨{rel.price.toLocaleString()}</span>
                    <span className="text-[10px] uppercase tracking-wider text-white/40 group-hover:text-gold-400 flex items-center space-x-1">
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
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
