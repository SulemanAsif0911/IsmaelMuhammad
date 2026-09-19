import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, Sparkles, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    shippingFee,
    freeShippingThreshold,
    cartTotal,
    formatPrice,
    navigateTo,
  } = useShop();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoError, setPromoError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'JOURNEY10' || promoCode.trim().toUpperCase() === 'ISMAEEL10') {
      const discount = Math.round(cartSubtotal * 0.1);
      setDiscountAmount(discount);
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon. Try code "JOURNEY10" for 10% off');
    }
  };

  const finalTotal = Math.max(0, cartTotal - discountAmount);
  const progressToFreeShipping = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#090f0c] border-l border-white/10 text-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-serif-luxury text-xl tracking-wider text-white">Your Fragrance Bag</span>
              <span className="text-xs font-mono text-white/50">
                ({cart.reduce((a, b) => a + b.quantity, 0)})
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-black/40 px-6 py-3 border-b border-white/5">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 text-white/80">
                <Truck className="w-3.5 h-3.5 text-[#d4af37]" />
                {cartSubtotal >= freeShippingThreshold ? (
                  <span className="text-[#22c55e] font-medium">Free Express Shipping Unlocked!</span>
                ) : (
                  <span>
                    Add <strong className="text-[#d4af37]">{formatPrice(remainingForFreeShipping)}</strong> for Free Delivery
                  </span>
                )}
              </span>
              <span className="text-[10px] font-mono text-white/40">
                {Math.round(progressToFreeShipping)}%
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#d4af37] to-[#22c55e] h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full border border-dashed border-white/20 flex items-center justify-center mb-4 text-white/30">
                  <Sparkles className="w-7 h-7 text-[#d4af37]/40" />
                </div>
                <h3 className="font-serif-luxury text-2xl text-white/80 mb-2">Your Bag is Empty</h3>
                <p className="text-xs text-white/50 max-w-xs mb-6">
                  Begin your journey across the forest and ocean to discover your signature flacon.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('shop');
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#d4af37] text-black text-xs font-semibold uppercase tracking-widest hover:bg-[#e6c250] transition-colors"
                >
                  Explore Fragrances
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-20 rounded-lg bg-black/60 border border-white/10 p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif-luxury text-base text-white">{item.name}</h4>
                        <button
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="text-white/40 hover:text-red-400 p-0.5 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] font-mono text-white/50">{item.size}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-white/15 rounded bg-black/40">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.size, item.quantity - 1)}
                          className="px-2 py-0.5 text-white/60 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.size, item.quantity + 1)}
                          className="px-2 py-0.5 text-white/60 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-mono text-xs text-[#d4af37] font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-black/60 space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-white/40 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder='Promo code (try "JOURNEY10")'
                    className="w-full bg-white/5 border border-white/15 rounded-lg py-1.5 pl-9 pr-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono uppercase tracking-wider text-white transition-colors"
                >
                  Apply
                </button>
              </form>

              {promoError && (
                <p className="text-[10px] text-red-400 font-mono -mt-2">{promoError}</p>
              )}
              {promoApplied && (
                <p className="text-[10px] text-[#22c55e] font-mono -mt-2">
                  ✓ 10% Luxury Journey Discount applied!
                </p>
              )}

              {/* Subtotals */}
              <div className="space-y-1.5 text-xs text-white/70">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-white">{formatPrice(cartSubtotal)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-[#22c55e]">
                    <span>Discount (10%)</span>
                    <span className="font-mono">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span className="font-mono text-white">
                    {shippingFee === 0 ? (
                      <span className="text-[#22c55e]">FREE</span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-serif-luxury text-white pt-2 border-t border-white/10">
                  <span className="font-medium">Total</span>
                  <span className="font-mono text-[#d4af37] text-lg font-bold">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('checkout');
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f3de8a] to-[#d4af37] text-black font-semibold text-xs uppercase tracking-[0.2em] shadow-xl hover:shadow-[#d4af37]/30 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-white/40 tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Authenticity Guaranteed · Safe Cash on Delivery & Card</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
