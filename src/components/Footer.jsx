import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer = () => {
  const { navigateTo } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="relative bg-[#030604] border-t border-white/10 text-white select-none">
      {/* Top Newsletter & Manifesto Banner */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-12 border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center justify-between">
          <div className="lg:col-span-6 space-y-3">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#d4af37]">
              JOIN OUR JOURNEY
            </span>
            <h3 className="font-serif-luxury text-3xl sm:text-4xl text-white font-light">
              Receive Private Vault Announcements
            </h3>
            <p className="text-xs text-white/60 max-w-md font-light leading-relaxed">
              Be the first to access limited distillation runs, private attar macerations,
              and masterclass insights directly from Ismaeel Muhammad.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md ml-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-white/5 border border-white/15 rounded-full px-5 py-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#d4af37] font-mono tracking-wider"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#d4af37] hover:bg-[#e4bf46] text-black font-semibold text-xs tracking-widest uppercase transition-colors flex items-center justify-center flex-shrink-0"
              >
                {subscribed ? <Check className="w-4 h-4 text-black" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] font-mono text-[#22c55e] text-right mt-2 mr-2">
                ✓ Welcome to the private circle.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => navigateTo('home')}
              className="cursor-pointer inline-flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full border border-[#d4af37] flex items-center justify-center bg-black/40">
                <span className="text-[#d4af37] font-serif text-sm font-semibold">IM</span>
              </div>
              <span className="font-serif-luxury text-xl tracking-[0.2em] text-[#f7f5ef]">
                ISMAEEL MUHAMMAD
              </span>
            </div>

            <p className="font-serif-luxury italic text-sm text-white/60 max-w-sm">
              “Fragrances that live with you.”
            </p>

            <p className="text-xs text-white/50 leading-relaxed max-w-sm">
              Artisanal Haute Parfumerie crafted in Lahore, Pakistan. Pure botanical extracts,
              precious resins, and 90-day cold maturation for unforgettable sillage.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-[#d4af37] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-[#d4af37] transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-[#d4af37] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Col */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40">
              EXPLORE
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="text-white/70 hover:text-[#d4af37] transition-colors"
                >
                  The Cinematic Journey
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'all')}
                  className="text-white/70 hover:text-[#d4af37] transition-colors"
                >
                  Full Fragrance Vault
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'men')}
                  className="text-white/70 hover:text-[#d4af37] transition-colors"
                >
                  Men’s Flacons
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'women')}
                  className="text-white/70 hover:text-[#d4af37] transition-colors"
                >
                  Women’s Flora
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'attars')}
                  className="text-white/70 hover:text-[#d4af37] transition-colors"
                >
                  Pure Attar Oils
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'discovery')}
                  className="text-white/70 hover:text-[#d4af37] transition-colors"
                >
                  Discovery Set
                </button>
              </li>
            </ul>
          </div>

          {/* Maison Col */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40">
              THE MAISON
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="text-white/70 hover:text-[#d4af37] transition-colors"
                >
                  About Ismaeel Muhammad
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="text-white/70 hover:text-[#d4af37] transition-colors"
                >
                  Philosophy & Extraction
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('journal')}
                  className="text-white/70 hover:text-[#d4af37] transition-colors"
                >
                  Fragrance Journal
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="text-white/70 hover:text-[#d4af37] transition-colors"
                >
                  Boutique & Concierge
                </button>
              </li>
            </ul>
          </div>

          {/* Client Service Col */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40">
              CLIENT CARE
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>Cash on Delivery across Pakistan</li>
              <li>Express Delivery (2-4 Working Days)</li>
              <li>14-Day Discovery Guarantee</li>
              <li>Complimentary Gift Coffret Box</li>
              <li>
                <a
                  href="mailto:concierge@ismaeelmuhammad.pk"
                  className="hover:text-[#d4af37] transition-colors"
                >
                  concierge@ismaeelmuhammad.pk
                </a>
              </li>
              <li className="font-mono text-[11px] text-[#d4af37]">
                WhatsApp: +92 300 0000000
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-white/40">
        <p>© 2026 Ismaeel Muhammad. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-6">
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer">Terms & Conditions</span>
          <span className="hover:text-white cursor-pointer">Shipping & Delivery</span>
          <span className="hover:text-white cursor-pointer">Returns Policy</span>
          <span className="hover:text-white cursor-pointer">FAQ</span>
        </div>
      </div>
    </footer>
  );
};
