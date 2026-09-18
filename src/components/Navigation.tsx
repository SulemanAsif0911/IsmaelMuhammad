import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, Volume2, VolumeX, Menu, X } from 'lucide-react';
import { PageView } from '../types';
import { ambience } from '../utils/audio';

interface NavigationProps {
  currentView: PageView;
  setCurrentView: (view: PageView) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onSelectCategory?: (category: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentView,
  setCurrentView,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onSelectCategory
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAudio = () => {
    const state = ambience.toggle();
    setIsAudioPlaying(state);
  };

  const navItems: { label: string; view: PageView; category?: string }[] = [
    { label: 'HOME', view: 'home' },
    { label: 'SHOP', view: 'shop', category: 'All' },
    { label: 'FRAGRANCES', view: 'shop', category: 'Men' },
    { label: 'ATTARS', view: 'shop', category: 'Attars' },
    { label: 'ABOUT', view: 'about' },
    { label: 'JOURNAL', view: 'journal' },
    { label: 'CONTACT', view: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-md border-b border-gold-500/15 py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex flex-col text-left focus:outline-none"
          >
            <span className="font-cinzel tracking-[0.28em] text-lg sm:text-xl font-medium text-white transition-colors duration-300 group-hover:text-gold-300">
              ISMAEEL MUHAMMAD
            </span>
            <span className="text-[9px] tracking-[0.4em] uppercase text-gold-400/80 font-sans -mt-0.5">
              Haute Parfumerie · Lahore
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-9">
            {navItems.map((item) => {
              const isActive =
                currentView === item.view &&
                (!item.category || item.category === 'All');

              return (
                <button
                  key={item.label}
                  onClick={() => {
                    if (item.category && onSelectCategory) {
                      onSelectCategory(item.category);
                    }
                    setCurrentView(item.view);
                    if (item.view === 'home') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className={`text-xs tracking-[0.25em] font-medium transition-all duration-300 relative py-1 focus:outline-none ${
                    isActive
                      ? 'text-gold-300 font-semibold'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4 sm:space-x-5">
            {/* Audio Ambience Toggle */}
            <button
              onClick={toggleAudio}
              className={`p-2 rounded-full transition-all duration-300 flex items-center gap-1.5 focus:outline-none ${
                isAudioPlaying
                  ? 'bg-gold-500/20 text-gold-300 border border-gold-500/40 shadow-[0_0_15px_rgba(212,176,55,0.3)]'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
              title={isAudioPlaying ? 'Mute Ambience Soundscape' : 'Play Cinematic Ambience'}
              aria-label="Toggle audio ambience"
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 className="w-4 h-4 animate-pulse" />
                  <span className="hidden lg:inline text-[9px] font-mono tracking-widest text-gold-300">
                    SOUND ON
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="hidden lg:inline text-[9px] font-mono tracking-widest text-neutral-400">
                    SOUND OFF
                  </span>
                </>
              )}
            </button>

            {/* Instant Search */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-neutral-300 hover:text-gold-300 hover:bg-white/5 rounded-full transition-colors focus:outline-none"
              title="Search Fragrances"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-neutral-300 hover:text-gold-300 hover:bg-white/5 rounded-full transition-colors focus:outline-none"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold-500 text-black text-[9px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Drawer */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-neutral-300 hover:text-gold-300 hover:bg-white/5 rounded-full transition-colors focus:outline-none"
              title="Shopping Cart"
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold-400 text-black text-[9px] font-bold flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-300 hover:text-white focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden pt-24 px-6 pb-10 flex flex-col justify-between animate-fadeIn">
          <div className="space-y-6">
            <div className="text-[10px] tracking-[0.3em] uppercase text-gold-400 font-mono">
              Olfactive Navigation
            </div>
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    if (item.category && onSelectCategory) {
                      onSelectCategory(item.category);
                    }
                    setCurrentView(item.view);
                    setMobileMenuOpen(false);
                  }}
                  className="text-left font-cinzel text-xl tracking-[0.2em] text-neutral-200 hover:text-gold-300 py-1 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 space-y-4">
            <div className="text-xs text-neutral-400">
              Ismaeel Muhammad Haute Parfumerie · Lahore, Pakistan
            </div>
            <div className="text-[11px] text-gold-400/80">
              WhatsApp Support: +92 300 8456789
            </div>
          </div>
        </div>
      )}
    </>
  );
};
