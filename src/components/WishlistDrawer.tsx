import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
  onSelectProduct
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#090d0b] border-l border-gold-500/20 text-white flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-gold-400 fill-gold-400" />
              <h2 className="font-cinzel text-lg tracking-wider text-white">
                SAVED FRAGRANCES ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-neutral-400 hover:text-white transition-colors"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-white/5">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-neutral-500">
                  <Heart className="w-8 h-8" />
                </div>
                <div className="font-cinzel text-lg text-neutral-300">
                  No Saved Fragrances
                </div>
                <p className="text-xs text-neutral-400 max-w-xs leading-relaxed">
                  Click the heart icon on any perfume in the shop or cinematic journey to save it to your wishlist.
                </p>
              </div>
            ) : (
              wishlist.map((product) => (
                <div key={product.id} className="pt-4 first:pt-0 flex space-x-4">
                  {/* Thumbnail */}
                  <div
                    onClick={() => {
                      onClose();
                      onSelectProduct(product);
                    }}
                    className="w-20 h-24 rounded-lg bg-black/60 border border-white/10 p-1 flex-shrink-0 flex items-center justify-center cursor-pointer hover:border-gold-400/50 transition-colors"
                  >
                    <img
                      src={product.transparentImage || product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4
                          onClick={() => {
                            onClose();
                            onSelectProduct(product);
                          }}
                          className="font-cinzel text-sm text-white font-medium hover:text-gold-300 cursor-pointer"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(product.id)}
                          className="text-neutral-500 hover:text-red-400 p-1 transition-colors"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-mono block">
                        {product.headlineNotes}
                      </span>
                      <span className="font-cinzel text-sm text-gold-300 font-semibold block mt-1">
                        ₨{product.price.toLocaleString()}
                      </span>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          onAddToCart(product);
                          onRemoveFromWishlist(product.id);
                        }}
                        className="w-full py-1.5 px-3 rounded bg-gold-500/20 hover:bg-gold-500 hover:text-black border border-gold-400/40 text-gold-200 text-[10px] font-mono tracking-widest uppercase transition-all flex items-center justify-center space-x-1.5"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
