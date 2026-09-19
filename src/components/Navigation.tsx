import React, { useState } from 'react';
import { ShoppingBag, Search, Volume2, VolumeX, Sparkles, Menu, X } from 'lucide-react';
import { ActiveView } from '../types';
import { soundEngine } from '../audio/soundEngine';

interface NavigationProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  cartCount: number;
  openCart: () => void;
  openScentQuiz: () => void;
  openSearch: () => void;
  onNavigateHomeSection?: (sectionId: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeView,
  setActiveView,
  cartCount,
  openCart,
  openScentQuiz,
  openSearch,
  onNavigateHomeSection,
}) => {
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToggleSound = () => {
    const isPlaying = soundEngine.toggleMute();
    setIsPlayingSound(isPlaying);
  };

  const handleNavClick = (view: ActiveView, sectionId?: string) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    if (view === 'home' && sectionId && onNavigateHomeSection) {
      setTimeout(() => {
        onNavigateHomeSection(sectionId);
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#050906]/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex flex-col text-left group focus:outline-none"
          >
            <span className="font-serif text-lg sm:text-2xl tracking-[0.25em] text-[#E8E6E1] group-hover:text-gold-300 transition-colors uppercase font-light">
              ISMAEEL MUHAMMAD
            </span>
            <span className="text-[9px] tracking-[0.35em] text-white/40 uppercase font-sans -mt-1 group-hover:text-gold-400/70 transition-colors">
              HAUTE PARFUMERIE · LAHORE
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-xs tracking-[0.25em] font-medium text-white/70">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-gold-300 transition-colors uppercase ${
                activeView === 'home' ? 'text-gold-300 border-b border-gold-400/50 pb-1' : ''
              }`}
            >
              Journey
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className={`hover:text-gold-300 transition-colors uppercase ${
                activeView === 'shop' ? 'text-gold-300 border-b border-gold-400/50 pb-1' : ''
              }`}
            >
              Shop
            </button>
            <button
              onClick={() => handleNavClick('home', 'forest')}
              className="hover:text-gold-300 transition-colors uppercase"
            >
              The Forest
            </button>
            <button
              onClick={() => handleNavClick('home', 'ocean')}
              className="hover:text-gold-300 transition-colors uppercase"
            >
              The Ocean
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`hover:text-gold-300 transition-colors uppercase ${
                activeView === 'about' ? 'text-gold-300 border-b border-gold-400/50 pb-1' : ''
              }`}
            >
              Story
            </button>
            <button
              onClick={() => handleNavClick('journal')}
              className={`hover:text-gold-300 transition-colors uppercase ${
                activeView === 'journal' ? 'text-gold-300 border-b border-gold-400/50 pb-1' : ''
              }`}
            >
              Journal
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`hover:text-gold-300 transition-colors uppercase ${
                activeView === 'contact' ? 'text-gold-300 border-b border-gold-400/50 pb-1' : ''
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Action Tools: Sound, Scent Finder, Search, Cart */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            
            {/* Ambient Sound Toggle */}
            <button
              onClick={handleToggleSound}
              title={isPlayingSound ? 'Mute Atmospheric Audio' : 'Play Atmospheric Audio'}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full border border-white/10 hover:border-gold-400/40 bg-white/5 hover:bg-gold-500/10 text-white/80 hover:text-gold-300 text-[11px] tracking-wider transition-all"
            >
              {isPlayingSound ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-gold-400" />
                  <span className="hidden lg:inline text-[10px] tracking-widest uppercase">Atmosphere</span>
                  <span className="flex space-x-0.5 items-end h-3 w-3">
                    <span className="w-0.5 bg-gold-400 animate-pulse h-2"></span>
                    <span className="w-0.5 bg-gold-400 animate-pulse h-3"></span>
                    <span className="w-0.5 bg-gold-400 animate-pulse h-1.5"></span>
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-white/50" />
                  <span className="hidden lg:inline text-[10px] tracking-widest uppercase text-white/50">Sound Off</span>
                </>
              )}
            </button>

            {/* Scent Finder Quiz Button */}
            <button
              onClick={openScentQuiz}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-gold-500/30 hover:border-gold-400 bg-gold-500/10 hover:bg-gold-500/20 text-gold-300 text-[10px] uppercase tracking-[0.2em] transition-all"
            >
              <Sparkles className="w-3 h-3 text-gold-400" />
              <span>Scent Finder</span>
            </button>

            {/* Search Trigger */}
            <button
              onClick={openSearch}
              className="p-2 text-white/70 hover:text-gold-300 transition-colors"
              title="Search Fragrances"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={openCart}
              className="relative p-2 text-white/80 hover:text-gold-300 transition-colors flex items-center"
              title="View Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-500 text-black font-sans font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white/80 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#050906]/95 backdrop-blur-xl md:hidden pt-24 px-6 flex flex-col justify-between pb-10">
          <div className="space-y-6 flex flex-col items-center text-center">
            <button
              onClick={() => handleNavClick('home')}
              className="font-serif text-2xl tracking-[0.2em] text-white hover:text-gold-300 uppercase"
            >
              Cinematic Journey
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className="font-serif text-2xl tracking-[0.2em] text-white hover:text-gold-300 uppercase"
            >
              All Fragrances & Shop
            </button>
            <button
              onClick={() => handleNavClick('home', 'forest')}
              className="font-serif text-2xl tracking-[0.2em] text-white hover:text-gold-300 uppercase"
            >
              The Forest Collection
            </button>
            <button
              onClick={() => handleNavClick('home', 'ocean')}
              className="font-serif text-2xl tracking-[0.2em] text-white hover:text-gold-300 uppercase"
            >
              The Ocean Collection
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="font-serif text-2xl tracking-[0.2em] text-white hover:text-gold-300 uppercase"
            >
              Our Story & Atelier
            </button>
            <button
              onClick={() => handleNavClick('journal')}
              className="font-serif text-2xl tracking-[0.2em] text-white hover:text-gold-300 uppercase"
            >
              Fragrance Journal
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="font-serif text-2xl tracking-[0.2em] text-white hover:text-gold-300 uppercase"
            >
              Contact & Boutique
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openScentQuiz();
              }}
              className="mt-4 flex items-center space-x-2 px-6 py-2.5 rounded-full border border-gold-400 bg-gold-500/20 text-gold-300 tracking-[0.2em] text-xs uppercase"
            >
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>Take Scent Finder Quiz</span>
            </button>
          </div>

          <div className="text-center text-white/40 text-xs tracking-widest uppercase">
            Ismaeel Muhammad Haute Parfumerie · Pakistan
          </div>
        </div>
      )}
    </>
  );
};
