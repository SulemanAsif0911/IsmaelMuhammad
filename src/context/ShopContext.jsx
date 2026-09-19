import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data/products';

const ShopContext = createContext(null);

export const ShopProvider = ({ children }) => {
  // Navigation
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'shop' | 'product' | 'about' | 'journal' | 'contact' | 'checkout'
  const [selectedProductId, setSelectedProductId] = useState('five-nine');
  const [shopCategory, setShopCategory] = useState('all'); // 'all' | 'men' | 'women' | 'attars' | 'discovery' | 'deals'

  // Cart
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('im_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  
  // Currency: PKR or USD
  const [currency, setCurrency] = useState('PKR');
  const usdRate = 0.0036; // 1 PKR = approx 0.0036 USD (278 PKR/USD)

  // Audio ambience
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Active Scene indicator on Home (1..7)
  const [activeScene, setActiveScene] = useState(1);

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('im_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Format price helper
  const formatPrice = (pricePkr) => {
    if (currency === 'USD') {
      const val = (pricePkr * usdRate).toFixed(2);
      return `$${val}`;
    }
    return `₨ ${pricePkr.toLocaleString('en-PK')}`;
  };

  // Add to cart
  const addToCart = (product, selectedSize = null, quantity = 1) => {
    const sizeObj = selectedSize || (product.sizes && product.sizes[0]) || { size: '50 ML', price: product.price };
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.size === sizeObj.size
      );
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            subtitle: product.subtitle,
            price: sizeObj.price,
            size: sizeObj.size,
            image: product.bottleImage,
            quantity: quantity,
          },
        ];
      }
    });
    setIsCartOpen(true);
  };

  // Update item quantity
  const updateCartQuantity = (id, size, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size ? { ...item, quantity: newQty } : item
      )
    );
  };

  // Remove from cart
  const removeFromCart = (id, size) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
  };

  // Clear cart
  const clearCart = () => setCart([]);

  // Wishlist toggle
  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Subtotal calculation
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 5000; // Free shipping over ₨ 5,000 in Pakistan
  const shippingFee = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 250;
  const cartTotal = cartSubtotal + shippingFee;
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Navigation helpers
  const navigateTo = (page, param = null) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (page === 'product' && param) {
      setSelectedProductId(param);
    }
    if (page === 'shop' && param) {
      setShopCategory(param);
    }
  };

  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];

  return (
    <ShopContext.Provider
      value={{
        products,
        currentPage,
        setCurrentPage,
        selectedProductId,
        setSelectedProductId,
        selectedProduct,
        shopCategory,
        setShopCategory,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartTotal,
        cartCount,
        shippingFee,
        freeShippingThreshold,
        wishlist,
        toggleWishlist,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
        currency,
        setCurrency,
        formatPrice,
        isAudioPlaying,
        setIsAudioPlaying,
        activeScene,
        setActiveScene,
        navigateTo,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within ShopProvider');
  return context;
};
