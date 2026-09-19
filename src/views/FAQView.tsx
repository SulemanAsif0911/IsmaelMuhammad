import React, { useState } from 'react';
import { ChevronDown, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

const FAQS = [
  {
    q: 'How long does delivery take across Pakistan?',
    a: 'We dispatch all orders from our Lahore atelier via express courier (TCS, Leopards, or Trax). Deliveries to Lahore take 1–2 business days; Karachi, Islamabad, Rawalpindi, and major cities take 2–3 business days. Remote or Northern areas typically take 3–4 business days.'
  },
  {
    q: 'Do you offer Cash on Delivery (COD)?',
    a: 'Yes, Cash on Delivery is available nationwide across Pakistan without extra surcharge on orders over ₨3,500. You pay cash to the rider only upon receiving your package.'
  },
  {
    q: 'What is your Risk-Free 2ml Tester Vial policy?',
    a: 'Every 50ml or 100ml full bottle purchase comes accompanied by a separate 2ml sample vial. Before unsealing the luxury plastic-wrapped full bottle box, you can test the 2ml vial on your skin for 48 hours. If the scent does not suit your chemistry, return the unopened full bottle for a 100% refund or exchange.'
  },
  {
    q: 'What concentration are your fragrances?',
    a: 'Our creations are formulated at Eau de Parfum and Extrait de Parfum concentrations (25% to 35% pure perfume oil), compared to standard designer brands which use 12–15%. This guarantees extraordinary projection and 10–14+ hours of longevity even in hot weather.'
  },
  {
    q: 'Are your Attars non-alcoholic?',
    a: 'Yes! All Ismaeel Muhammad Attars are 100% pure concentrated perfume oils formulated without alcohol, using traditional hydro-distilled sandalwood and floral bases suitable for daily wear and prayer.'
  },
  {
    q: 'Can I purchase from outside Pakistan?',
    a: 'Yes, we provide international courier dispatch via DHL Express to UAE, Saudi Arabia, UK, USA, and Canada. Please contact us via WhatsApp (+92 300 8456789) or email for international freight rates.'
  }
];

export const FAQView: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#050807] text-white pt-28 pb-20 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        <div className="text-center space-y-4">
          <span className="text-[10px] font-mono tracking-[0.35em] text-gold-400 uppercase">
            Client Assistance & Policies
          </span>
          <h1 className="font-cinzel text-4xl sm:text-5xl text-white tracking-[0.08em]">
            FREQUENTLY ASKED
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 font-sans font-light max-w-lg mx-auto">
            Everything you need to know about our formulations, nationwide shipping across Pakistan, and risk-free policy.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="rounded-xl bg-black/40 border border-white/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-cinzel text-base text-white hover:text-gold-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gold-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 font-sans font-light leading-relaxed border-t border-white/5 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
