import React from 'react';
import { useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';
import { ScentFinderModal } from './components/ScentFinderModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { JournalPage } from './pages/JournalPage';
import { ContactPage } from './pages/ContactPage';
import { CheckoutPage } from './pages/CheckoutPage';

export const App = () => {
  const {
    currentPage,
    isScentFinderOpen,
    setIsScentFinderOpen,
    isWishlistOpen,
    setIsWishlistOpen,
  } = useShop();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'product':
        return <ProductDetailPage />;
      case 'about':
        return <AboutPage />;
      case 'journal':
        return <JournalPage />;
      case 'contact':
        return <ContactPage />;
      case 'checkout':
        return <CheckoutPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050907] text-[#e8ebe7] flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1 w-full">
        {renderPage()}
      </main>

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <SearchModal />
      <QuickViewModal />
      <ScentFinderModal
        isOpen={isScentFinderOpen}
        onClose={() => setIsScentFinderOpen(false)}
      />
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
      />

      {/* Global Footer (shown on all pages except checkout) */}
      {currentPage !== 'checkout' && <Footer />}
    </div>
  );
};
