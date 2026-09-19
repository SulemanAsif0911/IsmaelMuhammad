import React, { useState } from 'react';
import { Search, Filter, ShoppingBag, Eye, Heart, Star, Sparkles, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ShopPage = () => {
  const {
    products,
    shopCategory,
    setShopCategory,
    addToCart,
    navigateTo,
    setQuickViewProduct,
    wishlist,
    toggleWishlist,
    formatPrice,
  } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [addedId, setAddedId] = useState(null);

  const categories = [
    { id: 'all', label: 'All Fragrances' },
    { id: 'men', label: 'Men' },
    { id: 'women', label: 'Women' },
    { id: 'attars', label: 'Pure Attars' },
    { id: 'discovery', label: 'Discovery Sets' },
    { id: 'deals', label: 'Limited Vault Offers' },
  ];

  // Filtering
  const filteredProducts = products
    .filter((p) => {
      if (shopCategory === 'deals') {
        return p.priceOriginal && p.priceOriginal > p.price;
      }
      if (shopCategory !== 'all' && p.category !== shopCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.accords.some((a) => a.toLowerCase().includes(q))
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });

  const handleAdd = (product, e) => {
    e.stopPropagation();
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#060a08] text-white pt-28 pb-24">
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-12">
        <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#d4af37]">
            Haute Parfumerie Vault
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl text-white font-light tracking-tight">
            THE COLLECTION
          </h1>
          <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
            Each composition is hand-poured in limited batches using high-grade essences,
            aged resins, and 90-day cold maturation for peerless projection.
          </p>
        </div>

        {/* Filter Navigation Bar */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/10 pb-6">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setShopCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 uppercase ${
                  shopCategory === cat.id
                    ? 'bg-[#d4af37] text-black font-semibold shadow-lg shadow-[#d4af37]/20'
                    : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-56">
              <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by note..."
                className="w-full bg-white/5 border border-white/15 rounded-full py-1.5 pl-9 pr-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/5 border border-white/15 rounded-full py-1.5 px-3 text-xs font-mono text-white/80 focus:outline-none focus:border-[#d4af37]"
            >
              <option value="featured" className="bg-[#090f0c]">Featured Vault</option>
              <option value="rating" className="bg-[#090f0c]">Highest Rated</option>
              <option value="price-low" className="bg-[#090f0c]">Price: Low to High</option>
              <option value="price-high" className="bg-[#090f0c]">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isWish = wishlist.includes(product.id);
            const isAdded = addedId === product.id;

            return (
              <div
                key={product.id}
                onClick={() => navigateTo('product', product.id)}
                className="group relative rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#d4af37]/50 overflow-hidden transition-all duration-500 cursor-pointer flex flex-col justify-between p-5 hover:shadow-2xl hover:shadow-black"
              >
                {/* Background Environment Glow on Hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none rounded-2xl filter blur-xl"
                  style={{ backgroundColor: product.colorTheme.accent }}
                />

                {/* Top Card Badges & Wishlist */}
                <div className="flex items-center justify-between z-10 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider bg-black/60 border border-white/10 text-[#d4af37]">
                    {product.badge || product.collection}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`p-1.5 rounded-full bg-black/40 hover:bg-black/80 transition-colors ${
                      isWish ? 'text-red-400' : 'text-white/40 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWish ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Bottle Visual with Hover Enlarge */}
                <div className="relative h-64 flex items-center justify-center p-4 my-2">
                  <img
                    src={product.bottleTrans || product.bottleImage}
                    alt={product.name}
                    className="max-h-56 w-auto object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-xl"
                  />

                  {/* Quick View Button on Hover */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuickViewProduct(product);
                    }}
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/80 border border-white/20 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase text-white/90 hover:text-[#d4af37] shadow-xl flex items-center gap-1.5"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Quick View</span>
                  </button>
                </div>

                {/* Info Block */}
                <div className="relative z-10 space-y-2 pt-2 border-t border-white/5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
                      {product.category}
                    </span>
                    <div className="flex items-center text-[#d4af37] text-[11px]">
                      <Star className="w-3 h-3 fill-current mr-1" />
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-serif-luxury text-xl text-white group-hover:text-[#d4af37] transition-colors truncate">
                    {product.name}
                  </h3>

                  <p className="text-[11px] font-mono text-white/50 truncate">
                    {product.accords.slice(0, 3).join(' · ')}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-sm text-[#d4af37] font-semibold">
                        {formatPrice(product.price)}
                      </span>
                      {product.priceOriginal && (
                        <span className="font-mono text-[11px] text-white/40 line-through">
                          {formatPrice(product.priceOriginal)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => handleAdd(product, e)}
                      className="p-2 rounded-xl bg-white/10 hover:bg-[#d4af37] hover:text-black text-white transition-colors flex items-center justify-center"
                      title="Add to Bag"
                    >
                      {isAdded ? <Check className="w-3.5 h-3.5 text-[#22c55e]" /> : <ShoppingBag className="w-3.5 h-3.5" />}
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
