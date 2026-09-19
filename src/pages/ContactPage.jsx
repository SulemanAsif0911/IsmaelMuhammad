import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Check, ChevronDown } from 'lucide-react';

export const ContactPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Fragrance Recommendation',
    message: '',
  });

  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Fragrance Recommendation',
        message: '',
      });
    }, 4000);
  };

  const faqs = [
    {
      q: 'How long do Ismaeel Muhammad fragrances typically project and last?',
      a: 'All our creations are formulated at Extrait de Parfum strength (25% to 32% pure oil concentration) and undergo 60-90 days of cold maceration. You can reliably expect 10 to 14+ hours on skin and up to 48 hours on natural fabrics like wool and cotton.',
    },
    {
      q: 'Do you offer Cash on Delivery (COD) across Pakistan?',
      a: 'Yes, we provide Cash on Delivery across all cities in Pakistan (Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Peshawar, Multan, Quetta, and beyond) via express courier. Delivery is free on orders above ₨ 5,000.',
    },
    {
      q: 'Can I test the fragrances before committing to a full bottle?',
      a: 'We highly recommend The Discovery Set (5 x 10ml flacons). Every Discovery Set order includes a complimentary ₨ 1,000 gift voucher redeemable on any 50ml or 100ml full bottle purchase within 60 days.',
    },
    {
      q: 'Are your attars 100% alcohol-free?',
      a: 'Yes. Our artisanal Attar line (such as Dehn Al Oud Royal) contains zero denatured alcohol or chemical carrier solvents. They are 100% pure steam-distilled perfume oils.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#070b09] text-white pt-28 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-16">
        <div className="max-w-2xl space-y-4">
          <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#d4af37]">
            Private Concierge & Atelier
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl text-white font-light tracking-tight">
            LET’S TALK
          </h1>
          <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
            Questions regarding notes, custom bridal scenting, or personalized recommendations?
            Our olfactory concierge is at your service.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Boutique Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 flex items-center justify-center text-[#d4af37] flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif-luxury text-lg text-white">Direct Correspondence</h4>
                  <p className="text-xs text-white/50 mt-0.5">Response within 12 hours</p>
                  <a
                    href="mailto:concierge@ismaeelmuhammad.pk"
                    className="text-xs font-mono text-[#d4af37] hover:underline block mt-1"
                  >
                    concierge@ismaeelmuhammad.pk
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-[#22c55e]/15 flex items-center justify-center text-[#22c55e] flex-shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif-luxury text-lg text-white">WhatsApp VIP Concierge</h4>
                  <p className="text-xs text-white/50 mt-0.5">Mon — Sat (10:00 AM — 10:00 PM PKT)</p>
                  <a
                    href="https://wa.me/923000000000"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-[#22c55e] hover:underline block mt-1"
                  >
                    +92 300 0000000 (Chat Now)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-[#38bdf8]/15 flex items-center justify-center text-[#38bdf8] flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif-luxury text-lg text-white">Private Atelier & Showroom</h4>
                  <p className="text-xs text-white/70 mt-1 leading-relaxed">
                    Gulberg III / Old City Atelier<br />
                    Lahore, Punjab, Pakistan
                  </p>
                  <span className="text-[10px] font-mono text-white/40 block mt-1">
                    Private consultations by appointment only
                  </span>
                </div>
              </div>
            </div>

            {/* Atelier hours */}
            <div className="p-6 rounded-2xl bg-[#0c130f] border border-[#d4af37]/20">
              <h5 className="font-serif-luxury text-base text-[#d4af37]">
                Dispatch & Delivery Schedule
              </h5>
              <div className="space-y-1.5 mt-3 text-xs text-white/70 font-mono">
                <div className="flex justify-between">
                  <span>Lahore Orders:</span>
                  <span className="text-white">Same-day / Next-day dispatch</span>
                </div>
                <div className="flex justify-between">
                  <span>Major PK Cities:</span>
                  <span className="text-white">2 - 3 Business Days</span>
                </div>
                <div className="flex justify-between">
                  <span>International DHL:</span>
                  <span className="text-white">4 - 7 Business Days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-white/[0.02] border border-white/10 rounded-3xl p-8 sm:p-10">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-white mb-2">
              Send an Olfactory Inquiry
            </h3>
            <p className="text-xs text-white/60 mb-6 font-light">
              We guide clients in selecting bespoke scent trails tailored to their personality and climate.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-white/50 block mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Asad Malik"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-white/50 block mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. asad@gmail.com"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-white/50 block mb-1.5">
                    Phone / WhatsApp (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0300-1234567"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-white/50 block mb-1.5">
                    Inquiry Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#0a100d] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="Fragrance Recommendation">Fragrance Recommendation</option>
                    <option value="Order Tracking">Order Status & Tracking</option>
                    <option value="Wholesale & Bridal Gifting">Bespoke Gifting & Weddings</option>
                    <option value="International Shipping">International Shipping Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-white/50 block mb-1.5">
                  Your Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what fragrances you currently enjoy or the occasion you are preparing for..."
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#d4af37] hover:bg-[#e4bf46] text-black font-semibold text-xs tracking-widest uppercase transition-all shadow-xl flex items-center justify-center gap-2"
              >
                {formSubmitted ? (
                  <>
                    <Check className="w-4 h-4 text-black" />
                    <span>Inquiry Received · Concierge Notified</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Transmit Message to Atelier</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="mt-24 pt-16 border-t border-white/10 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#d4af37]">
              Common Queries
            </span>
            <h3 className="font-serif-luxury text-3xl text-white mt-1">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 text-white hover:text-[#d4af37] transition-colors"
                  >
                    <span className="font-serif-luxury text-lg">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#d4af37] transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-white/70 leading-relaxed font-light border-t border-white/5 pt-3 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
