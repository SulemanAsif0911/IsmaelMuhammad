import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, MessageSquare } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Fragrance Recommendation',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#060A08] text-[#E8E6E1] pt-28 pb-24 selection:bg-gold-500/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-[10px] tracking-[0.35em] uppercase text-gold-400 font-mono">
            Direct Concierge Service
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-white font-light tracking-wide">
            Let's Talk Fragrance
          </h1>
          <p className="text-xs sm:text-sm text-white/60 font-sans">
            Need guidance choosing your signature flacon, layering advice, or international shipping assistance?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Boutique Studio */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-6">
              <h3 className="font-serif text-2xl text-white">Direct Channels</h3>

              <div className="space-y-5 text-xs text-white/70">
                <div className="flex items-start space-x-3.5">
                  <Mail className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-white/40">Email Correspondence</p>
                    <a href="mailto:hello@ismaeelmuhammad.pk" className="text-white hover:text-gold-300 font-medium text-sm">
                      hello@ismaeelmuhammad.pk
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Phone className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-white/40">WhatsApp VIP Concierge</p>
                    <p className="text-white font-medium text-sm">+92 321 8400000</p>
                    <span className="text-[10px] text-emerald-400 font-mono">Available 10 AM - 10 PM PKT</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <MapPin className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-white/40">Lahore Atelier & Studio</p>
                    <p className="text-white font-medium text-sm">Gulberg III, Lahore, Punjab, Pakistan</p>
                    <span className="text-[10px] text-white/40">By private appointment only</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 text-xs text-white/50">
                <p>Standard Pakistan Delivery: 2 to 3 Business Days via Express Courier.</p>
                <p className="mt-1">International Air Express: 5 to 7 Days across GCC, UK, and North America.</p>
              </div>
            </div>

            {/* Quick FAQ Snippet */}
            <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
              <h4 className="font-serif text-lg text-white">Frequently Asked</h4>
              <div className="space-y-2 text-xs text-white/60">
                <p><strong className="text-gold-300">Q:</strong> Are your perfumes original formulas or copies?</p>
                <p><strong className="text-white/40">A:</strong> Every creation is an original artistic formulation developed under Ismaeel Muhammad’s creative direction with 25–33% concentration.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white/[0.02] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
            {formSubmitted ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-white">Message Received</h3>
                <p className="text-xs text-white/60 max-w-sm mx-auto">
                  Thank you for reaching out. A fragrance concierge from our Lahore studio will review your note and respond within a few hours.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 px-6 py-2 rounded-full border border-white/20 text-xs uppercase tracking-widest text-gold-300 hover:border-gold-400 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-serif text-2xl text-white mb-2">Send an Inquiry</h3>

                <div>
                  <label className="block text-[10px] text-white/50 uppercase tracking-widest mb-1.5">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Daniyal Sheikh"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-white/50 uppercase tracking-widest mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-white/50 uppercase tracking-widest mb-1.5">Inquiry Topic</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-gold-400"
                  >
                    <option value="Fragrance Recommendation">Scent Consultation / Recommendation</option>
                    <option value="Order Tracking">Order Status & Tracking</option>
                    <option value="International Order">International Shipping Request</option>
                    <option value="Wholesale / Bespoke">Wholesale & Bespoke Inquiries</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-white/50 uppercase tracking-widest mb-1.5">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what scent notes you enjoy, occasions you need a perfume for, or any question..."
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-gold-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all shadow-lg shadow-gold-500/20 flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Atelier</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
