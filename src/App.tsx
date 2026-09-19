import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { SceneHUD } from './components/SceneHUD';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ScentFinderModal } from './components/ScentFinderModal';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';

import { CinematicHome } from './views/CinematicHome';
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { AboutView } from './views/AboutView';
import { JournalView } from './views/JournalView';
import { ContactView } from './views/ContactView';

import { Product, ProductSizeOption, CartItem, ActiveView } from './types';
import { PRODUCTS } from './data/products';

export const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  
  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ismaeel_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isScentQuizOpen, setIsScentQuizOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Discount & coupon
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState('');

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Scene state
  const [currentScene, setCurrentScene] = useState(1);
  const [scrollPercent, setScrollPercent] = useState(0);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ismaeel_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Track overall page scroll percent
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const pct = Math.round((window.scrollY / totalScroll) * 100);
        setScrollPercent(pct);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (product: Product, size?: ProductSizeOption, quantity = 1) => {
    const selectedSize = size || product.sizes[0];
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize.size === selectedSize.size
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, selectedSize, quantity }];
      }
    });

    showToast(`Added ${quantity} × ${product.name} (${selectedSize.size}) to selection`);
    setIsCartOpen(true);
  };

  const handleBuyNow = (product: Product, size: ProductSizeOption, quantity: number) => {
    handleAddToCart(product, size, quantity);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
    } else {
      setCart((prev) => {
        const updated = [...prev];
        updated[index].quantity = newQty;
        return updated;
      });
    }
  };

  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJumpToScene = (sceneIndex: number) => {
    if (activeView !== 'home') {
      setActiveView('home');
      setTimeout(() => {
        const target = document.getElementById(`scene-0${sceneIndex}`);
        target?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const target = document.getElementById(`scene-0${sceneIndex}`);
      target?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateHomeSection = (sectionId: string) => {
    if (sectionId === 'hero') handleJumpToScene(1);
    else if (sectionId === 'forest') handleJumpToScene(2);
    else if (sectionId === 'ocean') handleJumpToScene(4);
    else if (sectionId === 'story') handleJumpToScene(6);
    else if (sectionId === 'collections') handleJumpToScene(7);
  };

  const handleOrderCompleted = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#050906] text-[#E8E6E1] flex flex-col font-sans relative selection:bg-gold-500/30 selection:text-gold-200">
      
      {/* Top Header Navigation */}
      <Navigation
        activeView={activeView}
        setActiveView={setActiveView}
        cartCount={cartCount}
        openCart={() => setIsCartOpen(true)}
        openScentQuiz={() => setIsScentQuizOpen(true)}
        openSearch={() => setIsSearchOpen(true)}
        onNavigateHomeSection={handleNavigateHomeSection}
      />

      {/* Floating HUD on Cinematic Home View */}
      {activeView === 'home' && (
        <SceneHUD
          currentScene={currentScene}
          scrollPercent={scrollPercent}
          onJumpToScene={handleJumpToScene}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0E1711] text-gold-200 border border-gold-500/40 px-5 py-2.5 rounded-full shadow-2xl text-xs uppercase tracking-wider font-mono flex items-center space-x-2 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {activeView === 'home' && (
          <CinematicHome
            onSelectProduct={handleSelectProduct}
            onAddToCart={(prod, size) => handleAddToCart(prod, size, 1)}
            setActiveView={setActiveView}
            currentScene={currentScene}
            setCurrentScene={setCurrentScene}
          />
        )}

        {activeView === 'shop' && (
          <ShopView
            onSelectProduct={handleSelectProduct}
            onAddToCart={(prod, size) => handleAddToCart(prod, size, 1)}
          />
        )}

        {activeView === 'product-detail' && (
          <ProductDetailView
            product={selectedProduct}
            onBack={() => setActiveView('home')}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {activeView === 'about' && (
          <AboutView onExploreFragrances={() => setActiveView('shop')} />
        )}

        {activeView === 'journal' && <JournalView />}

        {activeView === 'contact' && <ContactView />}
      </main>

      {/* Footer */}
      <Footer
        setActiveView={setActiveView}
        onNavigateHomeSection={handleNavigateHomeSection}
      />

      {/* Slide-in Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onExploreProducts={() => {
          setIsCartOpen(false);
          setActiveView('shop');
        }}
        discountPercent={discountPercent}
        setDiscountPercent={setDiscountPercent}
        appliedCoupon={appliedCoupon}
        setAppliedCoupon={setAppliedCoupon}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        discountPercent={discountPercent}
        appliedCoupon={appliedCoupon}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Scent Finder Quiz Modal */}
      <ScentFinderModal
        isOpen={isScentQuizOpen}
        onClose={() => setIsScentQuizOpen(false)}
        onSelectProduct={handleSelectProduct}
        onAddToCart={(prod) => handleAddToCart(prod, prod.sizes[0], 1)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
      />

    </div>
  );
};
