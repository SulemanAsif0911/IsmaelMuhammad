import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, PageView, Category } from './types';
import { Navigation } from './components/Navigation';
import { JourneyProgress } from './components/JourneyProgress';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';

// Cinematic Journey Sections
import { HeroSection } from './sections/HeroSection';
import { ForestCollectionSection } from './sections/ForestCollectionSection';
import { TransitionSection } from './sections/TransitionSection';
import { OceanSection } from './sections/OceanSection';
import { MostWantedSection } from './sections/MostWantedSection';
import { BrandStorySection } from './sections/BrandStorySection';
import { CollectionsSection } from './sections/CollectionsSection';
import { TestimonialsSection } from './sections/TestimonialsSection';

// Page Views
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { AboutView } from './views/AboutView';
import { JournalView } from './views/JournalView';
import { ContactView } from './views/ContactView';
import { FAQView } from './views/FAQView';

export function App() {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [activePhase, setActivePhase] = useState<number>(1);
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Cart & Wishlist State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('im_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('im_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal open states
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('im_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('im_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  // Scroll spy to update activePhase when on home page
  useEffect(() => {
    if (currentView !== 'home') return;

    const handleScroll = () => {
      const phases = [1, 2, 3, 4, 5, 6, 7];
      const scrollY = window.scrollY + window.innerHeight * 0.4;

      for (let i = phases.length; i >= 1; i--) {
        const el = document.getElementById(`phase-${i}`);
        if (el && el.offsetTop <= scrollY) {
          setActivePhase(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const scrollToPhase = (phaseNum: number) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(`phase-${phaseNum}`);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(`phase-${phaseNum}`);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add to cart handler
  const handleAddToCart = (product: Product, quantity: number = 1, size: string = '50 ML') => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedSize: size }];
    });
    showToast(`Added ${product.name} to your olfactive bag`);
    setCartOpen(true);
  };

  const handleBuyNow = (product: Product, quantity: number = 1, size: string = '50 ML') => {
    handleAddToCart(product, quantity, size);
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist handler
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed ${product.name} from wishlist`);
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Saved ${product.name} to your wishlist`);
        return [...prev, product];
      }
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  // Product detail view navigation
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategoryFromNav = (cat: string) => {
    setSelectedCategory(cat as Category);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#050807] text-white overflow-x-hidden">
      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl bg-black/90 border border-gold-400/50 text-white text-xs font-mono tracking-wider shadow-2xl flex items-center space-x-2 animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Luxury Navigation */}
      <Navigation
        currentView={currentView}
        setCurrentView={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={cart.reduce((c, i) => c + i.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onSelectCategory={handleSelectCategoryFromNav}
      />

      {/* View Router */}
      {currentView === 'home' && (
        <main className="relative">
          {/* Floating Left Journey Timeline */}
          <JourneyProgress
            activePhase={activePhase}
            onSelectPhase={scrollToPhase}
          />

          {/* PHASE 01: THE OPENING / FOREST HERO */}
          <HeroSection
            heroProduct={PRODUCTS[0]} // Five-Nine
            onExplore={() => scrollToPhase(2)}
            onSelectProduct={handleSelectProduct}
          />

          {/* PHASE 02: THE FOREST COLLECTION */}
          <ForestCollectionSection
            products={PRODUCTS}
            onSelectProduct={handleSelectProduct}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={(p) => handleAddToCart(p, 1)}
          />

          {/* PHASE 03: THE TRANSITION (FOREST TO OCEAN) */}
          <TransitionSection
            onDiveDeeper={() => scrollToPhase(4)}
          />

          {/* PHASE 04: THE OCEAN (BENEATH THE SURFACE) */}
          <OceanSection
            oceanProduct={PRODUCTS[1]} // Nine-Five
            onSelectProduct={handleSelectProduct}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onExploreCollection={() => {
              setSelectedCategory('Men');
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* PHASE 05: MOST WANTED FRAGRANCES */}
          <MostWantedSection
            products={PRODUCTS}
            onSelectProduct={handleSelectProduct}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onExploreCollection={() => {
              setSelectedCategory('All');
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* PHASE 06: OUR STORY (WHERE LOVE BECOMES PASSION) */}
          <BrandStorySection
            onLearnMore={() => {
              setCurrentView('about');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* PHASE 07: COLLECTIONS (EDITORIAL PORTALS) */}
          <CollectionsSection
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onViewAll={() => {
              setSelectedCategory('All');
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* CUSTOMER VOICES / PRAISE */}
          <TestimonialsSection />
        </main>
      )}

      {currentView === 'shop' && (
        <ShopView
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onSelectProduct={handleSelectProduct}
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      {currentView === 'product' && (
        <ProductDetailView
          product={selectedProduct}
          allProducts={PRODUCTS}
          onBack={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onSelectProduct={handleSelectProduct}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      {currentView === 'about' && (
        <AboutView
          onStartJourney={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {currentView === 'journal' && <JournalView />}

      {currentView === 'contact' && <ContactView />}

      {currentView === 'faq' && <FAQView />}

      {/* Global Luxury Footer */}
      <Footer
        setCurrentView={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setCurrentView('shop');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Interactive Modals and Drawers */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => setCheckoutOpen(true)}
      />

      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={(p) => handleAddToCart(p, 1)}
        onSelectProduct={handleSelectProduct}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={handleSelectProduct}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onViewDetails={handleSelectProduct}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
