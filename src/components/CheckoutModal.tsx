import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, Banknote, Smartphone, ArrowRight, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onClearCart: () => void;
}

const PAKISTANI_CITIES = [
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
  'Bahawalpur',
  'Abbottabad',
  'Other City'
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onClearCart
}) => {
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Lahore',
    postalCode: '',
    paymentMethod: 'cod', // cod | card | jazzcash | easypaisa
    specialInstructions: ''
  });
  const [orderId, setOrderId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 3500 || subtotal === 0 ? 0 : 250;
  const total = subtotal + shipping;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `IM-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setIsSubmitting(false);
      setStep('success');

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }

      onClearCart();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 bg-black/90 backdrop-blur-md animate-fadeIn flex justify-center items-center">
      <div className="relative w-full max-w-4xl bg-[#090d0b] border border-gold-500/30 rounded-2xl shadow-2xl overflow-hidden text-white my-8">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-cinzel tracking-[0.25em] text-white text-base font-bold">
              ISMAEEL MUHAMMAD
            </span>
            <span className="text-neutral-500">|</span>
            <span className="text-xs font-mono uppercase tracking-widest text-gold-400">
              {step === 'details' ? 'Secure Olfactive Checkout' : 'Order Confirmed'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-neutral-400 hover:text-white transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'details' ? (
          <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {/* Left Column: Customer and Shipping Info */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="font-cinzel text-lg text-white font-semibold tracking-wider mb-1">
                  Delivery Destination
                </h3>
                <p className="text-xs text-neutral-400 font-sans">
                  Express courier delivery to your doorstep across Pakistan (2-4 business days).
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono tracking-wider text-neutral-300 uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Asad Farooq"
                      className="w-full px-3.5 py-2.5 rounded bg-black/60 border border-white/15 focus:border-gold-400 focus:outline-none text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono tracking-wider text-neutral-300 uppercase mb-1">
                      WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0300 1234567"
                      className="w-full px-3.5 py-2.5 rounded bg-black/60 border border-white/15 focus:border-gold-400 focus:outline-none text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono tracking-wider text-neutral-300 uppercase mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full px-3.5 py-2.5 rounded bg-black/60 border border-white/15 focus:border-gold-400 focus:outline-none text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono tracking-wider text-neutral-300 uppercase mb-1">
                    Complete Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House/Plot No, Street, Sector, Area"
                    className="w-full px-3.5 py-2.5 rounded bg-black/60 border border-white/15 focus:border-gold-400 focus:outline-none text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono tracking-wider text-neutral-300 uppercase mb-1">
                      City *
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded bg-black/80 border border-white/15 focus:border-gold-400 focus:outline-none text-xs text-white"
                    >
                      {PAKISTANI_CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono tracking-wider text-neutral-300 uppercase mb-1">
                      Postal / ZIP Code
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      placeholder="e.g. 54000"
                      className="w-full px-3.5 py-2.5 rounded bg-black/60 border border-white/15 focus:border-gold-400 focus:outline-none text-xs text-white"
                    />
                  </div>
                </div>

                {/* Payment Methods Selection */}
                <div className="pt-4 border-t border-white/10">
                  <label className="block text-[11px] font-mono tracking-wider text-gold-400 uppercase mb-3">
                    Payment Method
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      className={`p-3 rounded-xl border flex items-center space-x-3 cursor-pointer transition-all ${
                        formData.paymentMethod === 'cod'
                          ? 'bg-gold-500/15 border-gold-400 text-white'
                          : 'bg-black/40 border-white/10 text-neutral-400 hover:border-white/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="hidden"
                      />
                      <Banknote className="w-5 h-5 text-gold-400" />
                      <div>
                        <div className="text-xs font-semibold text-white">Cash on Delivery</div>
                        <div className="text-[10px] text-neutral-400">Pay when you receive</div>
                      </div>
                    </label>

                    <label
                      className={`p-3 rounded-xl border flex items-center space-x-3 cursor-pointer transition-all ${
                        formData.paymentMethod === 'card'
                          ? 'bg-gold-500/15 border-gold-400 text-white'
                          : 'bg-black/40 border-white/10 text-neutral-400 hover:border-white/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="hidden"
                      />
                      <CreditCard className="w-5 h-5 text-gold-400" />
                      <div>
                        <div className="text-xs font-semibold text-white">Credit / Debit Card</div>
                        <div className="text-[10px] text-neutral-400">Visa / Mastercard / PayPak</div>
                      </div>
                    </label>

                    <label
                      className={`p-3 rounded-xl border flex items-center space-x-3 cursor-pointer transition-all ${
                        formData.paymentMethod === 'jazzcash'
                          ? 'bg-gold-500/15 border-gold-400 text-white'
                          : 'bg-black/40 border-white/10 text-neutral-400 hover:border-white/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="jazzcash"
                        checked={formData.paymentMethod === 'jazzcash'}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="hidden"
                      />
                      <Smartphone className="w-5 h-5 text-red-400" />
                      <div>
                        <div className="text-xs font-semibold text-white">JazzCash</div>
                        <div className="text-[10px] text-neutral-400">Mobile wallet transfer</div>
                      </div>
                    </label>

                    <label
                      className={`p-3 rounded-xl border flex items-center space-x-3 cursor-pointer transition-all ${
                        formData.paymentMethod === 'easypaisa'
                          ? 'bg-gold-500/15 border-gold-400 text-white'
                          : 'bg-black/40 border-white/10 text-neutral-400 hover:border-white/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="easypaisa"
                        checked={formData.paymentMethod === 'easypaisa'}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="hidden"
                      />
                      <Smartphone className="w-5 h-5 text-emerald-400" />
                      <div>
                        <div className="text-xs font-semibold text-white">EasyPaisa</div>
                        <div className="text-[10px] text-neutral-400">Instant QR / Number</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Review & Submit */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-black/40 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="font-cinzel text-lg text-white font-semibold tracking-wider">
                  Order Summary
                </h3>

                <div className="max-h-60 overflow-y-auto divide-y divide-white/5 space-y-3 pr-2">
                  {cart.map((item) => (
                    <div key={item.product.id} className="pt-3 first:pt-0 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.product.transparentImage || item.product.image}
                          alt={item.product.name}
                          className="w-10 h-12 object-contain rounded bg-black/60 p-1 border border-white/10"
                        />
                        <div>
                          <div className="font-medium text-white">{item.product.name}</div>
                          <div className="text-[10px] text-neutral-400">
                            Qty: {item.quantity} · {item.selectedSize || item.product.volume}
                          </div>
                        </div>
                      </div>
                      <div className="font-mono text-gold-300 font-semibold">
                        ₨{(item.product.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotals */}
                <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-neutral-300">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono text-white">₨{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping across Pakistan</span>
                    <span className="font-mono">
                      {shipping === 0 ? <span className="text-emerald-400">FREE</span> : `₨${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                    <span className="font-cinzel">TOTAL</span>
                    <span className="font-cinzel text-gold-300 text-lg">₨{total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-[11px] text-neutral-300 space-y-1">
                  <div className="flex items-center space-x-1.5 text-gold-400 font-medium">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Express Dispatch from Lahore</span>
                  </div>
                  <p className="text-[10px] text-neutral-400">
                    Includes 2ml complimentary discovery vial to test before unboxing.
                  </p>
                </div>
              </div>

              {/* Confirm Button */}
              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full py-4 rounded bg-gradient-to-r from-gold-500 via-amber-500 to-gold-600 hover:from-gold-400 hover:to-amber-400 text-black font-cinzel text-xs tracking-[0.25em] uppercase font-bold flex items-center justify-center space-x-2 transition-all shadow-xl hover:shadow-gold-500/20 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>CONFIRMING WITH MAISON...</span>
                ) : (
                  <>
                    <span>CONFIRM ORDER · ₨{total.toLocaleString()}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Success Screen */
          <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-gold-500/20 border border-gold-400/60 flex items-center justify-center text-gold-400 shadow-[0_0_30px_rgba(212,176,55,0.4)] animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-gold-400">
                Olfactive Commission Received
              </span>
              <h2 className="font-cinzel text-3xl sm:text-4xl text-white font-semibold">
                Thank You, {formData.fullName || 'Connoisseur'}
              </h2>
              <p className="text-sm text-neutral-300 max-w-md mx-auto">
                Your order <span className="text-gold-300 font-mono font-bold">{orderId}</span> has been confirmed.
                Our perfumers are preparing your flacons for express dispatch to {formData.city}.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-white/10 max-w-sm w-full text-left space-y-2 text-xs font-sans">
              <div className="flex justify-between text-neutral-400">
                <span>Payment Method:</span>
                <span className="text-white font-mono uppercase">{formData.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Estimated Arrival:</span>
                <span className="text-emerald-400 font-mono">2-3 Business Days</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>WhatsApp Tracking:</span>
                <span className="text-white font-mono">{formData.phone}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3.5 rounded bg-white/10 hover:bg-gold-500 hover:text-black text-white text-xs font-cinzel tracking-[0.25em] uppercase font-bold transition-all"
            >
              CONTINUE YOUR JOURNEY
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
