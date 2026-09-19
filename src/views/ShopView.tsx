import React, { useState } from 'react';
import { Filter, SlidersHorizontal, ShoppingBag, Eye, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { Product, ProductSizeOption } from '../types';
import { PRODUCTS } from '../data/products';

interface ShopViewProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: ProductSizeOption) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  onSelectProduct,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFamily, setSelectedFamily] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const categories = ['All', 'Men', 'Women', 'Attars', 'Discovery', 'Deals'];
  const families = ['All', 'Woody', 'Aquatic', 'Amber', 'Floral', 'Oriental'];

  // Filter products
  const filtered = PRODUCTS.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory || (selectedCategory === 'Men' && p.category === 'Unisex');
    const matchesFamily = selectedFamily === 'All' || p.olfactiveFamily === selectedFamily;
    const matchesSearch = !searchFilter || 
      p.name.toLowerCase().includes(searchFilter.toLowerCase()) || 
      p.tagline.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesFamily && matchesSearch;
  });

  // Sort products
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured
  });

  return (
    <div className="min-h-screen bg-[#050A07] text-[#E8E6E1] pt-28 pb-24 selection:bg-gold-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Shop Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-[10px] tracking-[0.35em] uppercase text-gold-400 font-mono">
            Haute Parfumerie Flacons
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-white font-light uppercase tracking-wider">
            The Fragrance Collection
          </h1>
          <p className="text-xs sm:text-sm text-white/60 font-sans max-w-xl mx-auto">
            From terrestrial cedar groves to abyssal ocean currents and royal court attars. 
            Formulated with 25%–33% raw perfume concentrate for unrivaled longevity.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="border-y border-white/10 py-5 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-[0.2em] transition-all ${
                  selectedCategory === cat
                    ? 'bg-gold-500 text-black font-semibold shadow-md shadow-gold-500/20'
                    : 'text-white/60 hover:text-white hover:bg-white/5 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Right Tools: Olfactive Family & Sort */}
          <div className="flex items-center space-x-3 text-xs">
            {/* Olfactive Family Select */}
            <div className="flex items-center space-x-1.5 bg-black/40 border border-white/10 rounded-full px-3 py-1.5">
              <span className="text-white/40 uppercase tracking-wider text-[10px]">Family:</span>
              <select
                value={selectedFamily}
                onChange={(e) => setSelectedFamily(e.target.value)}
                className="bg-transparent text-white focus:outline-none text-xs cursor-pointer"
              >
                {families.map((fam) => (
                  <option key={fam} value={fam} className="bg-black text-white">
                    {fam}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Select */}
            <div className="flex items-center space-x-1.5 bg-black/40 border border-white/10 rounded-full px-3 py-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-gold-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-white focus:outline-none text-xs cursor-pointer"
              >
                <option value="featured" className="bg-black text-white">Featured</option>
                <option value="price-asc" className="bg-black text-white">Price: Low to High</option>
                <option value="price-desc" className="bg-black text-white">Price: High to Low</option>
                <option value="rating" className="bg-black text-white">Highest Rated</option>
              </select>
            </div>
          </div>

        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sorted.map((product) => (
            <div
              key={product.id}
              className="group relative rounded-3xl bg-gradient-to-b from-white/[0.03] to-black/60 border border-white/5 hover:border-gold-500/40 transition-all duration-500 p-6 flex flex-col justify-between overflow-hidden shadow-xl"
            >
              {/* Atmospheric Background on hover */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none mix-blend-screen"
                style={{
                  backgroundImage: product.environment === 'ocean' || product.environment === 'abyss'
                    ? "url('/images/environments/ocean_conversion_clean.png')"
                    : "url('/images/environments/forest_background.png')",
                }}
              />

              {/* Top Badges */}
              <div className="flex justify-between items-start z-10 relative">
                <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-gold-400 bg-black/50 border border-white/10 px-2.5 py-0.5 rounded-full">
                  {product.concentration.split(' ')[0]}
                </span>
                {product.isBestseller && (
                  <span className="text-[9px] uppercase font-mono tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    Bestseller
                  </span>
                )}
              </div>

              {/* Product Visual */}
              <div 
                onClick={() => onSelectProduct(product)}
                className="cursor-pointer relative aspect-square my-4 flex items-center justify-center p-4 z-10"
              >
                <div className="absolute inset-0 bg-radial from-gold-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-[85%] object-contain drop-shadow-2xl group-hover:scale-108 transition-transform duration-500"
                />
              </div>

              {/* Details and Actions */}
              <div className="z-10 relative space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-mono">
                    {product.category}
                  </span>
                  <span className="text-[10px] text-white/50 font-mono">
                    {product.longevity.split(' ')[0]} {product.longevity.split(' ')[1]}
                  </span>
                </div>

                <h3 
                  onClick={() => onSelectProduct(product)}
                  className="font-serif text-xl text-white group-hover:text-gold-300 transition-colors uppercase cursor-pointer"
                >
                  {product.name}
                </h3>

                <p className="text-xs text-white/50 tracking-wider">
                  {product.tagline}
                </p>

                {/* Accords Pills */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {product.accords.slice(0, 3).map((a) => (
                    <span key={a.name} className="text-[10px] text-white/70 bg-white/5 px-2 py-0.5 rounded">
                      {a.name}
                    </span>
                  ))}
                </div>

                {/* Price and Cart Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-3">
                  <div>
                    <span className="font-serif text-xl text-gold-200">
                      ₨{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs line-through text-white/40 ml-2 font-serif">
                        ₨{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="p-2 rounded-full border border-white/10 hover:border-gold-400 hover:bg-gold-500/10 text-white/70 hover:text-gold-300 transition-colors"
                      title="Quick View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onAddToCart(product, product.sizes[0])}
                      className="px-4 py-2 rounded-full bg-gold-500/20 hover:bg-gold-500 border border-gold-400 text-gold-300 hover:text-black text-xs font-semibold uppercase tracking-wider transition-all flex items-center space-x-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
