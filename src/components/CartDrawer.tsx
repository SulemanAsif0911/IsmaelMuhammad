import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
  onExploreProducts: () => void;
  discountPercent: number;
  setDiscountPercent: (percent: number) => void;
  appliedCoupon: string;
  setAppliedCoupon: (code: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onExploreProducts,
  discountPercent,
  setDiscountPercent,
  appliedCoupon,
  setAppliedCoupon,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.selectedSize.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const freeShippingThreshold = 5000;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 250;
  const total = subtotal - discountAmount + shippingFee;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (code === 'JOURNEY10') {
      setDiscountPercent(10);
      setAppliedCoupon('JOURNEY10');
      setCouponSuccess('10% Journey Discount Applied!');
      setCouponError('');
    } else if (code === 'ISMAEELVIP') {
      setDiscountPercent(15);
      setAppliedCoupon('ISMAEELVIP');
      setCouponSuccess('15% VIP Fragrance Connoisseur Applied!');
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try JOURNEY10');
      setCouponSuccess('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0A100C] text-[#E8E6E1] border-l border-white/10 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-gold-400" />
              <h2 className="font-serif text-xl tracking-[0.15em] uppercase text-white font-light">
                Your Selection ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-white/50 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-[#101A13] px-6 py-3 border-b border-white/5">
            <div className="flex justify-between text-[11px] tracking-wider mb-1.5">
              {amountToFreeShipping > 0 ? (
                <span>Add <strong className="text-gold-300">₨{amountToFreeShipping.toLocaleString()}</strong> for Free Express Delivery</span>
              ) : (
                <span className="text-emerald-400 font-medium">✓ You qualify for Free Express Shipping across Pakistan</span>
              )}
              <span className="text-white/40">{freeShippingProgress}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-gold-400 h-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="font-serif text-lg text-white/70">Your fragrance voyage is currently empty.</p>
                <p className="text-xs text-white/40 max-w-xs mx-auto">
                  Explore our forest, oceanic, and royal attar masterworks to begin.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onExploreProducts();
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full bg-gold-500/20 hover:bg-gold-500/30 border border-gold-400 text-gold-300 text-xs tracking-[0.2em] uppercase transition-all"
                >
                  Discover Fragrances
                </button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div 
                  key={`${item.product.id}-${item.selectedSize.size}-${idx}`}
                  className="flex space-x-4 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-24 object-contain bg-black/40 rounded p-1 border border-white/5"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-sm tracking-widest text-white font-medium uppercase">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="text-white/40 hover:text-red-400 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[10px] tracking-wider text-gold-400 uppercase mt-0.5">
                        {item.product.subtitle}
                      </p>
                      <p className="text-xs text-white/60 mt-1">
                        Size: {item.selectedSize.label}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2 border border-white/10 rounded-full px-2 py-0.5 bg-black/30">
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                          className="text-white/60 hover:text-white px-1.5 text-xs font-mono"
                        >
                          -
                        </button>
                        <span className="text-xs font-mono text-white px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="text-white/60 hover:text-white px-1.5 text-xs font-mono"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-sm font-serif text-gold-200">
                        ₨{(item.selectedSize.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#070C08] space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyCoupon} className="flex space-x-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Coupon (e.g. JOURNEY10)"
                    className="w-full bg-black/40 border border-white/10 rounded-md pl-8 pr-3 py-1.5 text-xs text-white uppercase tracking-wider focus:outline-none focus:border-gold-400 placeholder:text-white/30"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-md border border-white/10 hover:border-gold-400 bg-white/5 text-xs uppercase tracking-wider text-white hover:text-gold-300 transition-colors"
                >
                  Apply
                </button>
              </form>

              {couponSuccess && <p className="text-[11px] text-emerald-400 font-mono">{couponSuccess}</p>}
              {couponError && <p className="text-[11px] text-red-400 font-mono">{couponError}</p>}

              {/* Cost Calculations */}
              <div className="space-y-1.5 text-xs text-white/70 pt-2 border-t border-white/5">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-white">₨{subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({appliedCoupon})</span>
                    <span className="font-mono">-₨{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Shipping</span>
                  <span className="font-mono text-white">
                    {shippingFee === 0 ? <strong className="text-emerald-400">FREE</strong> : `₨${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-medium text-white pt-2 border-t border-white/10">
                  <span className="font-serif tracking-widest uppercase">Estimated Total</span>
                  <span className="font-serif text-lg text-gold-300">₨{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 px-4 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-black font-sans font-semibold text-xs uppercase tracking-[0.25em] flex items-center justify-center space-x-2 transition-all shadow-lg shadow-gold-500/20 active:scale-[0.99]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-white/40 tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                <span>100% Authentic Haute Parfumerie · Cash on Delivery Available</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
