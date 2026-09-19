import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Menu, X, Sparkles, ChevronDown } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { AudioPlayer } from './AudioPlayer';

export const Navbar = () => {
  const {
    currentPage,
    navigateTo,
    cartCount,
    setIsCartOpen,
    setIsSearchOpen,
    currency,
    setCurrency,
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'fragrances', label: 'Fragrances', target: 'shop', param: 'all' },
    { id: 'about', label: 'About' },
    { id: 'journal', label: 'Journal' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#050907]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => navigateTo('home')}
            className="cursor-pointer group flex items-center gap-3 select-none"
          >
            <div className="w-7 h-7 rounded-full border border-[#d4af37]/60 flex items-center justify-center bg-black/40 group-hover:border-[#d4af37] transition-all">
              <span className="text-[#d4af37] font-serif text-sm font-semibold tracking-tighter">IM</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif-luxury text-base sm:text-lg tracking-[0.25em] text-[#f7f5ef] group-hover:text-[#d4af37] transition-colors">
                ISMAEEL MUHAMMAD
              </span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-white/40 -mt-1 font-mono">
                Haute Parfumerie
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive =
                currentPage === link.id ||
                (link.id === 'fragrances' && currentPage === 'shop');
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    if (link.target) {
                      navigateTo(link.target, link.param);
                    } else {
                      navigateTo(link.id);
                    }
                  }}
                  className={`text-xs uppercase tracking-[0.25em] transition-all duration-300 relative py-1 ${
                    isActive
                      ? 'text-[#d4af37] font-medium'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Audio Ambience Toggle */}
            <AudioPlayer />

            {/* Currency Switcher */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 text-[11px] font-mono tracking-wider px-2 py-1 rounded bg-black/30 hover:bg-black/50 border border-white/10 text-white/75 hover:text-white transition-colors"
              >
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3 text-white/50" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-24 bg-[#0a120e] border border-white/15 rounded shadow-2xl py-1 z-50 backdrop-blur-xl">
                  <button
                    onClick={() => {
                      setCurrency('PKR');
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-mono tracking-wider hover:bg-white/10 flex items-center justify-between ${
                      currency === 'PKR' ? 'text-[#d4af37] font-semibold' : 'text-white/70'
                    }`}
                  >
                    <span>PKR</span>
                    <span className="text-[10px] text-white/40">₨</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrency('USD');
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-mono tracking-wider hover:bg-white/10 flex items-center justify-between ${
                      currency === 'USD' ? 'text-[#d4af37] font-semibold' : 'text-white/70'
                    }`}
                  >
                    <span>USD</span>
                    <span className="text-[10px] text-white/40">$</span>
                  </button>
                </div>
              )}
            </div>

            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 text-white/70 hover:text-white transition-colors hover:scale-110 active:scale-95"
              aria-label="Search Fragrances"
              title="Search scents & notes"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 text-white/70 hover:text-white transition-colors hover:scale-110 active:scale-95"
              aria-label="Shopping Cart"
              title="View your basket"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#d4af37] text-black text-[9px] font-bold font-mono w-4 h-4 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-white/80 hover:text-white transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#050907]/95 backdrop-blur-2xl md:hidden pt-24 px-6 flex flex-col justify-between pb-12 animate-fadeIn">
          <div className="space-y-6">
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40">Navigation</p>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    if (link.target) {
                      navigateTo(link.target, link.param);
                    } else {
                      navigateTo(link.id);
                    }
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left font-serif-luxury text-2xl tracking-wider py-1 transition-colors ${
                    currentPage === link.id
                      ? 'text-[#d4af37] font-semibold'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40">Collections</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-white/70">
                <button
                  onClick={() => {
                    navigateTo('shop', 'men');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left py-1 hover:text-[#d4af37]"
                >
                  Men’s Flacons
                </button>
                <button
                  onClick={() => {
                    navigateTo('shop', 'women');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left py-1 hover:text-[#d4af37]"
                >
                  Women’s Flora
                </button>
                <button
                  onClick={() => {
                    navigateTo('shop', 'attars');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left py-1 hover:text-[#d4af37]"
                >
                  Pure Attars
                </button>
                <button
                  onClick={() => {
                    navigateTo('shop', 'discovery');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left py-1 hover:text-[#d4af37]"
                >
                  Discovery Set
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between text-xs text-white/60">
              <span>Currency: {currency}</span>
              <button
                onClick={() => setCurrency(currency === 'PKR' ? 'USD' : 'PKR')}
                className="text-[#d4af37] underline"
              >
                Switch to {currency === 'PKR' ? 'USD ($)' : 'PKR (₨)'}
              </button>
            </div>
            <p className="text-[11px] text-white/40 tracking-wider">
              Haute Parfumerie · Lahore, Pakistan
            </p>
          </div>
        </div>
      )}
    </>
  );
};
