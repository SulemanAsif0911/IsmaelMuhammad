import React, { useState } from 'react';
import { ArrowRight, Check, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { PageView, Category } from '../types';

interface FooterProps {
  setCurrentView: (view: PageView) => void;
  onSelectCategory?: (category: Category) => void;
}

export const Footer: React.FC<FooterProps> = ({
  setCurrentView,
  onSelectCategory
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="relative bg-[#040605] border-t border-white/10 text-neutral-400 font-sans text-xs pt-16 pb-12">
      {/* Trust Badges */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-14 border-b border-white/10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/5">
            <ShieldCheck className="w-8 h-8 text-gold-400 flex-shrink-0" />
            <div>
              <div className="font-cinzel text-sm text-white font-semibold">100% Authentic Haute Parfumerie</div>
              <div className="text-[11px] text-neutral-400">Pure French fragrance oils with 25-30% concentration</div>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/5">
            <Truck className="w-8 h-8 text-gold-400 flex-shrink-0" />
            <div>
              <div className="font-cinzel text-sm text-white font-semibold">Nationwide Express Delivery</div>
              <div className="text-[11px] text-neutral-400">2–4 business days across Pakistan via TCS & Leopards</div>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/5">
            <RefreshCw className="w-8 h-8 text-gold-400 flex-shrink-0" />
            <div>
              <div className="font-cinzel text-sm text-white font-semibold">Risk-Free Scent Guarantee</div>
              <div className="text-[11px] text-neutral-400">Includes free 2ml tester vial with every full bottle</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="space-y-1">
              <span className="font-cinzel text-xl tracking-[0.25em] text-white font-semibold block">
                ISMAEEL MUHAMMAD
              </span>
              <span className="text-[9px] font-mono tracking-[0.35em] uppercase text-gold-400 block">
                Haute Parfumerie · Lahore
              </span>
            </div>

            <p className="text-neutral-400 text-xs font-light max-w-sm leading-relaxed">
              Fragrances that live with you. Uncompromising artisanal perfumery marrying
              noble French ingredients with profound Eastern soul and heritage.
            </p>

            {/* Social SVGs matching MAIN IDEA.png */}
            <div className="flex items-center space-x-3 pt-2 text-neutral-400">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold-300 transition-colors p-2.5 bg-white/5 rounded-full"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold-300 transition-colors p-2.5 bg-white/5 rounded-full"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold-300 transition-colors p-2.5 bg-white/5 rounded-full"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold-300 transition-colors p-2.5 bg-white/5 rounded-full"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.25 1.19 2.29 2.41 2.55.97.23 2.01.07 2.85-.48.7-.44 1.19-1.17 1.34-1.98.11-.7.1-1.42.1-2.13.02-4.8.01-9.61.02-14.41z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-white font-cinzel text-xs tracking-widest uppercase">
              SHOP
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory?.('All');
                    setCurrentView('shop');
                  }}
                  className="hover:text-gold-300 transition-colors"
                >
                  All Fragrances
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory?.('Men');
                    setCurrentView('shop');
                  }}
                  className="hover:text-gold-300 transition-colors"
                >
                  For Men
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory?.('Women');
                    setCurrentView('shop');
                  }}
                  className="hover:text-gold-300 transition-colors"
                >
                  For Women
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory?.('Attars');
                    setCurrentView('shop');
                  }}
                  className="hover:text-gold-300 transition-colors"
                >
                  Pure Attars
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory?.('Discovery Set');
                    setCurrentView('shop');
                  }}
                  className="hover:text-gold-300 transition-colors"
                >
                  Discovery Set
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory?.('Deals');
                    setCurrentView('shop');
                  }}
                  className="hover:text-gold-300 transition-colors text-gold-400"
                >
                  Curated Deals
                </button>
              </li>
            </ul>
          </div>

          {/* Maison Links */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-white font-cinzel text-xs tracking-widest uppercase">
              MAISON
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setCurrentView('about')}
                  className="hover:text-gold-300 transition-colors"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('journal')}
                  className="hover:text-gold-300 transition-colors"
                >
                  Fragrance Journal
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('contact')}
                  className="hover:text-gold-300 transition-colors"
                >
                  Contact & Atelier
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('faq')}
                  className="hover:text-gold-300 transition-colors"
                >
                  FAQs & Delivery
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Box matching MAIN IDEA.png */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-white font-cinzel text-xs tracking-widest uppercase">
              JOIN OUR JOURNEY
            </div>
            <p className="text-neutral-400 text-xs">
              Receive private invitations, olfactory essays, and early access to limited edition seasonal drops.
            </p>

            <form onSubmit={handleSubscribe} className="pt-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded bg-black/60 border border-white/20 focus:border-gold-400 focus:outline-none text-white text-xs placeholder:text-neutral-500 pr-12"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-gold-500/20 hover:bg-gold-500 text-gold-300 hover:text-black rounded transition-all flex items-center justify-center"
                  aria-label="Subscribe"
                >
                  {subscribed ? <Check className="w-4 h-4 text-emerald-400" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
              {subscribed && (
                <div className="text-[10px] text-emerald-400 mt-2 font-mono">
                  Welcome to the journey. Check your inbox shortly.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar matching MAIN IDEA.png */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-4">
        <div>
          © 2026 Ismaeel Muhammad Haute Parfumerie. All rights reserved.
        </div>

        <div className="flex flex-wrap gap-4 text-neutral-400">
          <button onClick={() => setCurrentView('faq')} className="hover:text-white transition-colors">
            Privacy Policy
          </button>
          <span>·</span>
          <button onClick={() => setCurrentView('faq')} className="hover:text-white transition-colors">
            Terms & Conditions
          </button>
          <span>·</span>
          <button onClick={() => setCurrentView('faq')} className="hover:text-white transition-colors">
            Shipping
          </button>
          <span>·</span>
          <button onClick={() => setCurrentView('faq')} className="hover:text-white transition-colors">
            Returns
          </button>
          <span>·</span>
          <button onClick={() => setCurrentView('faq')} className="hover:text-white transition-colors">
            FAQ
          </button>
        </div>
      </div>
    </footer>
  );
};
