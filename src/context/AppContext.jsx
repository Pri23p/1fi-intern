import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Navigation & Sub-tabs
  const [activeMainTab, setActiveMainTab] = useState('shop'); // 'home' | 'shop' | 'emi-due' | 'limit' | 'profile'
  const [activeShopSubTab, setActiveShopSubTab] = useState('marketplace'); // 'top-brands' | 'nearby-stores' | 'marketplace'
  
  // Device view mode
  const [isMobileFrame, setIsMobileFrame] = useState(false); // Mobile frame toggle for reviewer convenience

  // User state
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  // Products & Filter state
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(null);

  // Active Modals & Flows
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedEmiPlan, setSelectedEmiPlan] = useState(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  // Wishlist
  const [wishlist, setWishlist] = useState(['prod-iphone-16-pro']);

  // Orders
  const [orders, setOrders] = useState([]);

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info', duration = 3500) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from saved items', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to wishlist!', 'success');
        return [...prev, productId];
      }
    });
  };

  // Initial user load
  useEffect(() => {
    async function loadUser() {
      try {
        const userData = await api.getUserProfile();
        setUser(userData);
      } catch (err) {
        console.error('Error loading user profile:', err);
      } finally {
        setUserLoading(false);
      }
    }
    loadUser();
  }, []);

  // Load categories
  useEffect(() => {
    async function loadCategories() {
      try {
        const catData = await api.getCategories();
        setCategories(catData);
      } catch (err) {
        console.error('Error loading categories:', err);
      }
    }
    loadCategories();
  }, []);

  // Fetch products whenever filters/search/sort changes
  const loadProducts = async () => {
    setIsProductsLoading(true);
    setProductsError(null);
    try {
      const data = await api.getProducts({
        category: selectedCategory,
        search: searchQuery,
        sortBy: sortBy
      });
      setProducts(data);
    } catch (err) {
      setProductsError('Failed to fetch products. Please try again.');
    } finally {
      setIsProductsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, searchQuery, sortBy]);

  // Open product detail
  const openProductDetail = (productId) => {
    setSelectedProductId(productId);
    setIsDetailModalOpen(true);
  };

  const closeProductDetail = () => {
    setIsDetailModalOpen(false);
    setSelectedProductId(null);
  };

  // Initiate checkout flow
  const startCheckout = ({ product, variant, color, emiPlan }) => {
    setCheckoutProduct(product);
    setSelectedVariant(variant);
    setSelectedColor(color);
    setSelectedEmiPlan(emiPlan);
    setIsDetailModalOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutModalOpen(false);
    setCheckoutProduct(null);
  };

  const completeOrder = (orderConfirmation) => {
    setOrders((prev) => [orderConfirmation, ...prev]);
    // Deduct available credit limit
    if (user) {
      setUser((prev) => ({
        ...prev,
        availableCreditLimit: Math.max(0, prev.availableCreditLimit - orderConfirmation.finalAmount),
        activeLoansCount: prev.activeLoansCount + 1
      }));
    }
  };

  return (
    <AppContext.Provider
      value={{
        activeMainTab,
        setActiveMainTab,
        activeShopSubTab,
        setActiveShopSubTab,
        isMobileFrame,
        setIsMobileFrame,
        user,
        userLoading,
        products,
        categories,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        isProductsLoading,
        productsError,
        loadProducts,
        selectedProductId,
        isDetailModalOpen,
        openProductDetail,
        closeProductDetail,
        checkoutProduct,
        selectedVariant,
        selectedColor,
        selectedEmiPlan,
        isCheckoutModalOpen,
        startCheckout,
        closeCheckout,
        completeOrder,
        wishlist,
        toggleWishlist,
        orders,
        toasts,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
