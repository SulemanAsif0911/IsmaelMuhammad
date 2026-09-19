import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { ActiveView } from '../types';

interface FooterProps {
  setActiveView: (view: ActiveView) => void;
  onNavigateHomeSection?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveView, onNavigateHomeSection }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  const handleNav = (view: ActiveView, sectionId?: string) => {
    setActiveView(view);
    if (view === 'home' && sectionId && onNavigateHomeSection) {
      setTimeout(() => onNavigateHomeSection(sectionId), 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#030604] text-[#E8E6E1] border-t border-white/10 pt-16 pb-12 selection:bg-gold-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-serif text-2xl tracking-[0.25em] text-white uppercase font-light">
              ISMAEEL MUHAMMAD
            </h3>
            <p className="text-xs tracking-[0.2em] text-white/50 uppercase font-sans">
              Fragrances that live with you.
            </p>
            <p className="text-xs text-white/40 max-w-sm leading-relaxed font-sans pt-2">
              Haute Parfumerie house crafting transcendent scents inspired by nature, deep oceans, and rich oriental heritage. Formulated at 25%–33% concentration.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-4 pt-3 text-white/60">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-full border border-white/10 hover:border-gold-400 hover:text-gold-300 transition-colors"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-none stroke-currentColor stroke-2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-full border border-white/10 hover:border-gold-400 hover:text-gold-300 transition-colors"
                title="YouTube"
              >
                <svg className="w-4 h-4 fill-none stroke-currentColor stroke-2" viewBox="0 0 24 24">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-full border border-white/10 hover:border-gold-400 hover:text-gold-300 transition-colors"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-none stroke-currentColor stroke-2" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[10px] uppercase font-mono tracking-[0.3em] text-gold-400 mb-4">
              Explore The World
            </h4>
            <div className="flex flex-col space-y-2.5 text-xs text-white/70">
              <button 
                onClick={() => handleNav('home', 'hero')}
                className="text-left hover:text-gold-300 transition-colors uppercase tracking-wider"
              >
                The Journey
              </button>
              <button 
                onClick={() => handleNav('shop')}
                className="text-left hover:text-gold-300 transition-colors uppercase tracking-wider"
              >
                All Fragrances
              </button>
              <button 
                onClick={() => handleNav('home', 'forest')}
                className="text-left hover:text-gold-300 transition-colors uppercase tracking-wider"
              >
                The Forest Collection
              </button>
              <button 
                onClick={() => handleNav('home', 'ocean')}
                className="text-left hover:text-gold-300 transition-colors uppercase tracking-wider"
              >
                The Ocean Collection
              </button>
              <button 
                onClick={() => handleNav('about')}
                className="text-left hover:text-gold-300 transition-colors uppercase tracking-wider"
              >
                Our Story & Atelier
              </button>
              <button 
                onClick={() => handleNav('journal')}
                className="text-left hover:text-gold-300 transition-colors uppercase tracking-wider"
              >
                The Fragrance Journal
              </button>
              <button 
                onClick={() => handleNav('contact')}
                className="text-left hover:text-gold-300 transition-colors uppercase tracking-wider"
              >
                Contact & Studio
              </button>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[10px] uppercase font-mono tracking-[0.3em] text-gold-400 mb-2">
              Join Our Journey
            </h4>
            <p className="text-xs text-white/60 leading-relaxed">
              Receive private olfactory dispatches, seasonal launch invitations, and complimentary sample vouchers.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-black/60 border border-white/15 rounded-full pl-5 pr-12 py-3 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-gold-400 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-black flex items-center justify-center transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 flex items-center space-x-1 pt-1 font-mono">
                  <Check className="w-3.5 h-3.5" />
                  <span>Welcome to the circle. Check your inbox.</span>
                </p>
              )}
            </form>

            <p className="text-[10px] text-white/40 pt-1">
              Hand-bottled in Lahore, Pakistan · Express Courier Nationwide
            </p>
          </div>

        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40 space-y-4 sm:space-y-0">
          <div>
            © 2026 Ismaeel Muhammad. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms & Conditions</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors">Shipping & Returns</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors">Authentication FAQ</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
