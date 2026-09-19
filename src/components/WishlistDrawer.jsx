import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const WishlistDrawer = ({ isOpen, onClose }) => {
  const { wishlist, toggleWishlist, products, addToCart, formatPrice, navigateTo } = useShop();

  if (!isOpen) return null;

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div onClick={onClose} className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#090f0c] border-l border-white/10 text-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-400 fill-current" />
              <span className="font-serif-luxury text-xl tracking-wider">Your Saved Flacons</span>
              <span className="text-xs font-mono text-white/50">({wishlistProducts.length})</span>
            </div>
            <button onClick={onClose} className="p-1 text-white/50 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <Heart className="w-12 h-12 text-white/20 mx-auto" />
                <h4 className="font-serif-luxury text-2xl text-white/80">No Saved Fragrances</h4>
                <p className="text-xs text-white/50 max-w-xs mx-auto">
                  Click the heart icon on any creation to curate your personal olfactory collection.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    navigateTo('shop');
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#d4af37] text-black text-xs font-semibold uppercase tracking-widest"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all"
                >
                  <div className="w-16 h-20 rounded-lg bg-black/50 border border-white/10 p-1 flex items-center justify-center flex-shrink-0">
                    <img
                      src={product.bottleImage}
                      alt={product.name}
                      className="max-h-16 object-contain"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h5 className="font-serif-luxury text-base text-white">{product.name}</h5>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-white/40 hover:text-red-400 p-0.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[10px] font-mono text-white/40">
                        {product.accords[0]} · {product.collection}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="font-mono text-xs text-[#d4af37] font-semibold">
                        {formatPrice(product.price)}
                      </span>
                      <button
                        onClick={() => addToCart(product)}
                        className="px-3 py-1 rounded-lg bg-[#d4af37] text-black text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistProducts.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-black/40">
              <button
                onClick={() => {
                  wishlistProducts.forEach((p) => addToCart(p));
                  onClose();
                }}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-[#d4af37] hover:text-black text-white text-xs font-mono uppercase tracking-widest transition-all"
              >
                Add All Saved Items to Bag
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
