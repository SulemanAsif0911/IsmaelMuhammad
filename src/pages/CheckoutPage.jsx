import React, { useState } from 'react';
import { ShieldCheck, Truck, CreditCard, Banknote, CheckCircle, ArrowRight, Lock, Sparkles, ChevronLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';

export const CheckoutPage = () => {
  const { cart, cartSubtotal, shippingFee, cartTotal, formatPrice, clearCart, navigateTo } = useShop();

  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' | 'card' | 'jazzcash' | 'bank'
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Lahore',
    postalCode: '',
    notes: '',
  });

  const pkCities = [
    'Lahore',
    'Karachi',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Quetta',
    'Sialkot',
    'Gujranwala',
    'Hyderabad',
    'Abbottabad',
    'Other International',
  ];

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const generatedId = `IM-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderComplete(true);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#22c55e', '#38bdf8', '#ffffff'],
      });
    } catch {}

    clearCart();
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-[#070b09] text-white pt-32 pb-24 flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-[#0a120e] border border-[#d4af37]/40 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden animate-fadeIn">
          <div className="w-20 h-20 rounded-full bg-[#d4af37]/15 border border-[#d4af37] flex items-center justify-center mx-auto text-[#d4af37]">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#d4af37]">
              Order Confirmed & Sealed
            </span>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl text-white font-light">
              Welcome to the Maison
            </h1>
            <p className="text-xs text-white/70 max-w-md mx-auto leading-relaxed">
              Your fragrance selection has been reserved in our Lahore atelier. Our dispatch team is
              preparing your flacon in a signature presentation coffret.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs font-mono space-y-2 text-left">
            <div className="flex justify-between">
              <span className="text-white/40">Order Reference:</span>
              <span className="text-[#d4af37] font-bold">{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Recipient:</span>
              <span className="text-white">
                {formData.firstName} {formData.lastName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Destination City:</span>
              <span className="text-white">{formData.city}, Pakistan</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Payment Selected:</span>
              <span className="text-[#22c55e] uppercase">
                {paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod}
              </span>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-2 text-sm">
              <span className="text-white/60">Amount Payable:</span>
              <span className="text-[#d4af37] font-bold">{formatPrice(cartTotal)}</span>
            </div>
          </div>

          <p className="text-[11px] text-white/50 font-mono">
            A confirmation SMS & email have been dispatched to {formData.email || 'your inbox'}.
          </p>

          <button
            onClick={() => navigateTo('home')}
            className="w-full py-3.5 rounded-full bg-[#d4af37] hover:bg-[#ebd57b] text-black font-semibold text-xs tracking-widest uppercase transition-colors shadow-lg"
          >
            Return to Fragrance Journey
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#070b09] text-white pt-36 pb-24 text-center px-4">
        <div className="max-w-md mx-auto space-y-4">
          <h2 className="font-serif-luxury text-3xl">No Fragrances in Bag</h2>
          <p className="text-xs text-white/60">
            Please add your desired perfume flacon to checkout.
          </p>
          <button
            onClick={() => navigateTo('shop')}
            className="px-8 py-3 rounded-full bg-[#d4af37] text-black text-xs font-semibold uppercase tracking-widest"
          >
            Browse Vault
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b09] text-white pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-8">
        <button
          onClick={() => navigateTo('shop')}
          className="text-xs font-mono text-white/50 hover:text-white uppercase tracking-widest flex items-center gap-1 mb-4"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Shop
        </button>
        <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#d4af37]">
          Secure Haute Checkout
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl text-white font-light tracking-tight mt-1">
          COMPLETE YOUR ORDER
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Customer & Shipping Details (Left Col) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Contact Details */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
              <h3 className="font-serif-luxury text-2xl text-white">1. Contact & Recipient</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase text-white/50 block mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-white/50 block mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase text-white/50 block mb-1">
                    Email Address (for order tracking) *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-white/50 block mb-1">
                    Mobile Phone (for courier delivery SMS) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0300-1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
              <h3 className="font-serif-luxury text-2xl text-white">2. Shipping Destination</h3>

              <div>
                <label className="text-[10px] font-mono uppercase text-white/50 block mb-1">
                  Complete Street Address (House / Apt / Street / Sector) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. House 42-B, Street 14, Phase 5 DHA"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase text-white/50 block mb-1">
                    City *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#0a100d] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    {pkCities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-white/50 block mb-1">
                    Postal Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    placeholder="e.g. 54000"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-white/50 block mb-1">
                  Delivery Special Instructions (Optional)
                </label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Please ring doorbell twice or call before arriving"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
              <h3 className="font-serif-luxury text-2xl text-white">3. Payment Method</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#d4af37] bg-[#d4af37]/10 text-white'
                      : 'border-white/10 bg-white/5 text-white/60 hover:text-white'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-serif-luxury text-base text-white">Cash on Delivery (COD)</h5>
                    <p className="text-[10px] text-white/50 mt-0.5">Pay in cash when courier arrives</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#d4af37] bg-[#d4af37]/10 text-white'
                      : 'border-white/10 bg-white/5 text-white/60 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#38bdf8] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-serif-luxury text-base text-white">Credit / Debit Card</h5>
                    <p className="text-[10px] text-white/50 mt-0.5">Visa / Mastercard / UnionPay</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('jazzcash')}
                  className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                    paymentMethod === 'jazzcash'
                      ? 'border-[#d4af37] bg-[#d4af37]/10 text-white'
                      : 'border-white/10 bg-white/5 text-white/60 hover:text-white'
                  }`}
                >
                  <div className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    J
                  </div>
                  <div>
                    <h5 className="font-serif-luxury text-base text-white">JazzCash / EasyPaisa</h5>
                    <p className="text-[10px] text-white/50 mt-0.5">Mobile wallet instant transfer</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                    paymentMethod === 'bank'
                      ? 'border-[#d4af37] bg-[#d4af37]/10 text-white'
                      : 'border-white/10 bg-white/5 text-white/60 hover:text-white'
                  }`}
                >
                  <ShieldCheck className="w-5 h-5 text-[#22c55e] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-serif-luxury text-base text-white">Direct Bank Wire</h5>
                    <p className="text-[10px] text-white/50 mt-0.5">Meezan Bank / HBL / SCB</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary (Right Col) */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#090f0c] border border-white/15 sticky top-28 space-y-6 shadow-2xl">
              <h3 className="font-serif-luxury text-2xl text-white border-b border-white/10 pb-4">
                Order Summary
              </h3>

              {/* Items */}
              <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex items-center gap-3">
                    <div className="w-12 h-14 rounded-lg bg-black/60 border border-white/10 p-1 flex-shrink-0 flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-serif-luxury text-sm text-white">{item.name}</h5>
                      <span className="text-[10px] font-mono text-white/40">
                        {item.size} × {item.quantity}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[#d4af37] font-semibold">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financials */}
              <div className="space-y-2 border-t border-white/10 pt-4 text-xs font-mono">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal</span>
                  <span className="text-white">{formatPrice(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Express Courier Shipping</span>
                  <span className={shippingFee === 0 ? 'text-[#22c55e]' : 'text-white'}>
                    {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-serif-luxury text-white pt-2 border-t border-white/10">
                  <span>Total Amount</span>
                  <span className="text-[#d4af37] font-mono text-xl font-bold">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f3de8a] to-[#d4af37] text-black font-semibold text-xs tracking-[0.2em] uppercase transition-all shadow-xl hover:shadow-[#d4af37]/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Confirm & Place Order</span>
              </button>

              <div className="text-center space-y-1 text-[10px] text-white/40 font-mono">
                <p>Protected by 256-bit SSL encryption</p>
                <p>Complimentary sample vial included with every delivery</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
