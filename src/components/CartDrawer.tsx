import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

const FREE_SHIPPING_THRESHOLD = 3500;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 250;
  const total = subtotal - discountAmount + shipping;

  const progressToFreeShipping = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'JOURNEY10') {
      setDiscountPercent(10);
      setPromoSuccess('10% Olfactive Welcome discount applied!');
    } else if (code === 'ISMAEEL15') {
      setDiscountPercent(15);
      setPromoSuccess('15% VIP Connoisseur discount applied!');
    } else {
      setPromoError('Invalid promotion code. Try JOURNEY10');
    }
  };

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
              <ShoppingBag className="w-5 h-5 text-gold-400" />
              <h2 className="font-cinzel text-lg tracking-wider text-white">
                YOUR SELECTIONS ({cart.reduce((c, i) => c + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-neutral-400 hover:text-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-black/40 px-6 py-3.5 border-b border-white/5">
            <div className="flex justify-between text-xs font-mono mb-1.5">
              {remainingForFreeShipping > 0 ? (
                <span>
                  Add <span className="text-gold-300 font-bold">₨{remainingForFreeShipping.toLocaleString()}</span> for <span className="text-emerald-400 font-bold">FREE Shipping</span> across Pakistan
                </span>
              ) : (
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  ✓ You've unlocked FREE Express Shipping!
                </span>
              )}
              <span className="text-neutral-400">{progressToFreeShipping}%</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gold-500 to-emerald-400 transition-all duration-500 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-white/5">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-neutral-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="font-cinzel text-lg text-neutral-300">
                  Your Olfactive Bag is Empty
                </div>
                <p className="text-xs text-neutral-400 max-w-xs leading-relaxed">
                  Explore our cinematic journey or browse the shop to find your signature fragrance.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2.5 rounded border border-gold-400/40 text-gold-300 hover:bg-gold-500/10 text-xs font-mono tracking-widest uppercase transition-colors"
                >
                  START JOURNEY
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="pt-4 first:pt-0 flex space-x-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-24 rounded-lg bg-black/60 border border-white/10 p-1 flex-shrink-0 flex items-center justify-center">
                    <img
                      src={item.product.transparentImage || item.product.image}
                      alt={item.product.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-cinzel text-sm text-white font-medium">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-neutral-500 hover:text-red-400 p-1 transition-colors"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-mono block">
                        {item.selectedSize || item.product.volume} · {item.product.concentration}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-white/15 rounded bg-black/40">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 px-2 text-neutral-400 hover:text-white transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 px-2 text-neutral-400 hover:text-white transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-cinzel text-sm text-gold-300 font-semibold">
                          ₨{(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with totals and checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-black/70 space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={applyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Voucher: JOURNEY10"
                    className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded text-xs uppercase font-mono tracking-wider focus:outline-none focus:border-gold-400 text-white placeholder:text-neutral-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-white/10 hover:bg-gold-500 hover:text-black rounded text-xs font-mono uppercase tracking-wider transition-colors"
                >
                  Apply
                </button>
              </form>

              {promoSuccess && <div className="text-[10px] text-emerald-400 font-mono">{promoSuccess}</div>}
              {promoError && <div className="text-[10px] text-red-400 font-mono">{promoError}</div>}

              {/* Cost Summary */}
              <div className="space-y-1.5 text-xs text-neutral-300 font-sans">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono">₨{subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="font-mono">-₨{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery across Pakistan</span>
                  <span className="font-mono">
                    {shipping === 0 ? <span className="text-emerald-400">FREE</span> : `₨${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-white pt-2 border-t border-white/10">
                  <span className="font-cinzel tracking-wider">TOTAL (PKR)</span>
                  <span className="font-cinzel text-gold-300 text-base">₨{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full py-3.5 rounded bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-black font-cinzel font-semibold text-xs tracking-[0.25em] uppercase flex items-center justify-center space-x-2 transition-all shadow-xl hover:shadow-gold-500/20"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-neutral-400 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                <span>Cash on Delivery (COD) · Card · JazzCash · EasyPaisa</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
