import React, { useState, useMemo } from 'react';
import { Star, ShoppingBag, Eye, Heart, Filter, Sparkles, ArrowRight } from 'lucide-react';
import { Product, Category, FragranceFamily } from '../types';
import { CATEGORIES, SCENT_FAMILIES } from '../data/products';

interface ShopViewProps {
  products: Product[];
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  onQuickView,
  onAddToCart,
  wishlist,
  onToggleWishlist
}) => {
  const [selectedFamily, setSelectedFamily] = useState<FragranceFamily | 'All'>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [hoveredProduct, setHoveredProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory === 'All') return true;
        return p.category === selectedCategory;
      })
      .filter((p) => {
        if (selectedFamily === 'All') return true;
        return p.scentFamily === selectedFamily;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured default
      });
  }, [products, selectedCategory, selectedFamily, sortBy]);

  return (
    <div className="min-h-screen bg-[#050807] text-white pt-28 pb-20 relative overflow-hidden">
      {/* Dynamic Background Atmosphere that reacts on hover */}
      <div
        className="fixed inset-0 pointer-events-none transition-all duration-700 opacity-20 filter blur-3xl scale-110"
        style={{
          background: hoveredProduct
            ? `radial-gradient(circle at 50% 40%, ${hoveredProduct.accentColor} 0%, #050807 70%)`
            : 'radial-gradient(circle at 50% 30%, #152b20 0%, #050807 80%)'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Editorial Shop Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-[0.35em] text-gold-400 uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Maison Collection</span>
          </div>
          <h1 className="font-cinzel text-4xl sm:text-6xl text-white tracking-[0.08em]">
            THE FRAGRANCES
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 font-sans font-light leading-relaxed">
            Every bottle is an invitation to explore. Formulated at 25–30% concentration
            with aged French essences for enduring elegance.
          </p>
        </div>

        {/* Category Tabs (Matches Phase 10 spec: ALL · MEN · WOMEN · ATTARS · DISCOVERY · DEALS) */}
        <div className="flex justify-center border-b border-white/10 mb-8 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex space-x-2 sm:space-x-4">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-full text-xs font-mono uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gold-500/20 text-gold-300 border border-gold-400/60 shadow-[0_0_15px_rgba(212,176,55,0.2)]'
                      : 'text-neutral-400 hover:text-white border border-transparent'
                  }`}
                >
                  {cat.label} ({cat.count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Filters and Sort Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 mb-8 bg-black/40 border border-white/5 rounded-xl px-4 sm:px-6">
          {/* Scent Family Filters */}
          <div className="flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase flex items-center gap-1">
              <Filter className="w-3 h-3 text-gold-400" />
              Accords:
            </span>
            <button
              onClick={() => setSelectedFamily('All')}
              className={`px-2.5 py-1 rounded text-[11px] font-sans transition-colors ${
                selectedFamily === 'All' ? 'bg-white/20 text-white font-medium' : 'text-neutral-400 hover:text-white'
              }`}
            >
              All
            </button>
            {SCENT_FAMILIES.map((family) => (
              <button
                key={family}
                onClick={() => setSelectedFamily(family)}
                className={`px-2.5 py-1 rounded text-[11px] font-sans whitespace-nowrap transition-colors ${
                  selectedFamily === family ? 'bg-white/20 text-white font-medium' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {family}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-black/60 border border-white/15 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-gold-400"
            >
              <option value="featured">Featured Creations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated (5 Stars)</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.some((w) => w.id === product.id);

            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredProduct(product)}
                onMouseLeave={() => setHoveredProduct(null)}
                className="group relative rounded-2xl bg-black/40 border border-white/10 hover:border-gold-400/60 transition-all duration-500 overflow-hidden flex flex-col justify-between p-5 backdrop-blur-sm shadow-xl hover:shadow-2xl"
              >
                {/* Environmental Glow on Hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 40%, ${product.accentColor} 0%, transparent 70%)`
                  }}
                />

                {/* Top Badges: Category & Wishlist */}
                <div className="flex justify-between items-center z-10">
                  <span className="text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded bg-white/5 text-gold-300 border border-white/10">
                    {product.concentration}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product);
                    }}
                    className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                      isWishlisted
                        ? 'bg-gold-500 text-black'
                        : 'bg-black/40 text-neutral-400 hover:text-white border border-white/10'
                    }`}
                    title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-black' : ''}`} />
                  </button>
                </div>

                {/* Product Flacon Image with Smooth Enlarging on Hover */}
                <div
                  onClick={() => onSelectProduct(product)}
                  className="relative py-8 flex items-center justify-center cursor-pointer"
                >
                  <img
                    src={product.transparentImage || product.image}
                    alt={product.name}
                    className="max-h-[220px] w-auto object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                    loading="lazy"
                  />
                </div>

                {/* Info Container */}
                <div className="space-y-3 z-10 pt-2 border-t border-white/5">
                  <div>
                    <div className="flex items-center space-x-1 text-gold-400 text-xs">
                      <Star className="w-3 h-3 fill-gold-400 text-gold-400" />
                      <span className="font-mono text-[11px]">{product.rating}</span>
                      <span className="text-[10px] text-neutral-500">({product.reviewsCount})</span>
                    </div>

                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-cinzel text-lg text-white font-medium tracking-wider group-hover:text-gold-200 cursor-pointer transition-colors mt-1"
                    >
                      {product.name}
                    </h3>
                    <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider line-clamp-1">
                      {product.headlineNotes}
                    </p>
                  </div>

                  <div className="flex items-baseline justify-between pt-1">
                    <div>
                      <span className="font-cinzel text-lg text-gold-300 font-semibold">
                        ₨{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[11px] text-neutral-500 line-through ml-2">
                          ₨{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500">
                      {product.volume}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-5 gap-2 pt-1">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="col-span-4 py-2.5 px-3 rounded bg-white/10 hover:bg-gold-500 hover:text-black text-white text-[10px] font-mono tracking-widest uppercase transition-all duration-200 flex items-center justify-center space-x-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>

                    <button
                      onClick={() => onQuickView(product)}
                      className="col-span-1 p-2.5 rounded border border-white/15 hover:border-gold-400 text-neutral-400 hover:text-gold-300 transition-colors flex items-center justify-center"
                      title="Quick View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
