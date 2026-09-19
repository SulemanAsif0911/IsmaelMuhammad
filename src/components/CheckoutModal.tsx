import React, { useState } from 'react';
import { X, CheckCircle, Truck, CreditCard, Banknote, ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discountPercent: number;
  appliedCoupon: string;
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discountPercent,
  appliedCoupon,
  onOrderCompleted,
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: 'Lahore',
    postalCode: '54000',
    notes: '',
    paymentMethod: 'cod', // cod | card | bank
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.selectedSize.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const shippingFee = subtotal >= 5000 || subtotal === 0 ? 0 : 250;
  const total = subtotal - discountAmount + shippingFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedOrderNum = `IM-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrderNum);
      setIsSubmitting(false);
      setOrderPlaced(true);
      onOrderCompleted();

      // Trigger celebratory confetti
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#DAB64A', '#C99E28', '#FFFFFF', '#3D5C43'],
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={() => {
          if (!isSubmitting) onClose();
        }}
      />

      <div className="relative bg-[#080E0A] text-[#E8E6E1] border border-white/10 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4 text-gold-400" />
            <h3 className="font-serif text-lg tracking-[0.2em] uppercase text-white font-light">
              {orderPlaced ? 'Fragrance Order Confirmed' : 'Haute Parfumerie Secure Checkout'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white p-1 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {orderPlaced ? (
            /* Order Success View */
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle className="w-9 h-9" />
              </div>

              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-gold-400 font-mono">
                  Thank You For Traveling With Us
                </span>
                <h2 className="font-serif text-3xl text-white mt-1">
                  Your Scent Journey Has Begun
                </h2>
                <p className="text-sm text-white/60 mt-2 max-w-md mx-auto">
                  Order <strong className="text-gold-300 font-mono">#{orderNumber}</strong> has been logged in our Lahore atelier. We will reach you at{' '}
                  <strong className="text-white">{formData.phone || '+92 3XX-XXXXXXX'}</strong> for delivery confirmation.
                </p>
              </div>

              {/* Order Receipt Card */}
              <div className="bg-black/40 border border-white/10 rounded-xl p-5 max-w-md mx-auto text-left text-xs space-y-3">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/50">Recipient</span>
                  <span className="text-white font-medium">{formData.firstName} {formData.lastName}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/50">Destination</span>
                  <span className="text-white text-right max-w-[200px] truncate">{formData.address}, {formData.city}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/50">Payment Mode</span>
                  <span className="text-gold-300 font-mono uppercase">
                    {formData.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : formData.paymentMethod === 'card' ? 'Online Card' : 'Bank Transfer'}
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-white/70 font-medium">Total Amount Due</span>
                  <span className="text-gold-300 font-serif text-base font-bold">₨{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all"
                >
                  Return to Journey
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* Left Column: Form Fields */}
              <div className="md:col-span-7 space-y-5">
                
                {/* Contact Information */}
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-gold-400 font-medium mb-3 flex items-center space-x-1.5">
                    <span>1. Contact Information</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-white/50 uppercase tracking-wider mb-1">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="e.g. Asad"
                        className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-white/50 uppercase tracking-wider mb-1">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="e.g. Malik"
                        className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] text-white/50 uppercase tracking-wider mb-1">WhatsApp / Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+92 300 1234567"
                        className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] text-white/50 uppercase tracking-wider mb-1">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="fragrance.lover@example.com"
                        className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="pt-2">
                  <h4 className="text-xs uppercase tracking-[0.2em] text-gold-400 font-medium mb-3 flex items-center space-x-1.5">
                    <span>2. Delivery Address</span>
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] text-white/50 uppercase tracking-wider mb-1">Street Address *</label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="House / Plaza / Street No."
                        className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-white/50 uppercase tracking-wider mb-1">City *</label>
                        <select
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                        >
                          <option value="Lahore">Lahore</option>
                          <option value="Karachi">Karachi</option>
                          <option value="Islamabad">Islamabad</option>
                          <option value="Rawalpindi">Rawalpindi</option>
                          <option value="Faisalabad">Faisalabad</option>
                          <option value="Peshawar">Peshawar</option>
                          <option value="Multan">Multan</option>
                          <option value="Sialkot">Sialkot</option>
                          <option value="Quetta">Quetta</option>
                          <option value="Gujranwala">Gujranwala</option>
                          <option value="International">International (UAE, UK, USA)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] text-white/50 uppercase tracking-wider mb-1">Postal Code</label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Options */}
                <div className="pt-2">
                  <h4 className="text-xs uppercase tracking-[0.2em] text-gold-400 font-medium mb-3 flex items-center space-x-1.5">
                    <span>3. Payment Selection</span>
                  </h4>
                  <div className="space-y-2">
                    
                    {/* COD */}
                    <label 
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                        formData.paymentMethod === 'cod' 
                          ? 'border-gold-400 bg-gold-500/10' 
                          : 'border-white/10 bg-black/30 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={formData.paymentMethod === 'cod'}
                          onChange={handleInputChange}
                          className="accent-gold-400"
                        />
                        <div className="flex items-center space-x-2">
                          <Banknote className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs font-medium text-white">Cash on Delivery (COD)</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-white/50 tracking-wider">Pay at doorstep</span>
                    </label>

                    {/* Card */}
                    <label 
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                        formData.paymentMethod === 'card' 
                          ? 'border-gold-400 bg-gold-500/10' 
                          : 'border-white/10 bg-black/30 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={formData.paymentMethod === 'card'}
                          onChange={handleInputChange}
                          className="accent-gold-400"
                        />
                        <div className="flex items-center space-x-2">
                          <CreditCard className="w-4 h-4 text-gold-400" />
                          <span className="text-xs font-medium text-white">Debit / Credit Card (Visa / MC)</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-white/50 tracking-wider">Secure Gateway</span>
                    </label>

                    {/* Bank Transfer */}
                    <label 
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                        formData.paymentMethod === 'bank' 
                          ? 'border-gold-400 bg-gold-500/10' 
                          : 'border-white/10 bg-black/30 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="bank"
                          checked={formData.paymentMethod === 'bank'}
                          onChange={handleInputChange}
                          className="accent-gold-400"
                        />
                        <div className="flex items-center space-x-2">
                          <Truck className="w-4 h-4 text-blue-400" />
                          <span className="text-xs font-medium text-white">Direct Bank / Raast Transfer</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-white/50 tracking-wider">Meezan / HBL</span>
                    </label>
                  </div>
                </div>

              </div>

              {/* Right Column: Order Summary */}
              <div className="md:col-span-5 bg-black/40 border border-white/5 rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-white font-serif mb-4 pb-2 border-b border-white/10">
                    Order Items ({items.length})
                  </h4>

                  <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
                    {items.map((it, i) => (
                      <div key={i} className="flex items-center justify-between text-xs py-1">
                        <div className="flex items-center space-x-2 truncate">
                          <img 
                            src={it.product.image} 
                            alt={it.product.name} 
                            className="w-9 h-11 object-contain bg-white/5 rounded p-0.5" 
                          />
                          <div className="truncate">
                            <p className="text-white font-medium truncate">{it.product.name}</p>
                            <p className="text-[10px] text-white/40">{it.selectedSize.label} × {it.quantity}</p>
                          </div>
                        </div>
                        <span className="font-mono text-gold-300">
                          ₨{(it.selectedSize.price * it.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/10 mt-4 pt-3 space-y-2 text-xs">
                    <div className="flex justify-between text-white/60">
                      <span>Subtotal</span>
                      <span className="font-mono text-white">₨{subtotal.toLocaleString()}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Discount ({appliedCoupon})</span>
                        <span className="font-mono">-₨{discountAmount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-white/60">
                      <span>Express Courier</span>
                      <span className="font-mono text-white">
                        {shippingFee === 0 ? <strong className="text-emerald-400">FREE</strong> : `₨${shippingFee}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold text-white pt-2 border-t border-white/10">
                      <span className="font-serif tracking-widest uppercase">Total Payable</span>
                      <span className="font-serif text-lg text-gold-300">₨{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-black font-semibold text-xs uppercase tracking-[0.2em] flex items-center justify-center space-x-2 transition-all shadow-lg shadow-gold-500/20 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Processing Order...</span>
                    ) : (
                      <>
                        <span>Confirm & Place Order (₨{total.toLocaleString()})</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center space-x-2 text-[10px] text-white/40">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                    <span>Secure 256-Bit SSL Encrypted Order</span>
                  </div>
                </div>

              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
