import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import ShopHeroBanner from './components/ShopHeroBanner';
import ShopSubNav from './components/ShopSubNav';
import MarketplaceView from './components/MarketplaceView';
import TopBrandsView from './components/TopBrandsView';
import NearbyStoresView from './components/NearbyStoresView';
import OtherTabsView from './components/OtherTabsView';
import BottomNav from './components/BottomNav';
import ProductDetailModal from './components/ProductDetailModal';
import CheckoutModal from './components/CheckoutModal';
import Toast from './components/Toast';
import DeviceFrameWrapper from './components/DeviceFrameWrapper';

function AppContent() {
  const { activeMainTab, activeShopSubTab } = useApp();

  return (
    <DeviceFrameWrapper>
      {/* Global Header */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
        {activeMainTab === 'shop' ? (
          <>
            {/* Top 1Fi Promotional Hero Banner */}
            <ShopHeroBanner />

            {/* Sub-navigation: Top Brands | Nearby Stores | 1Fi Marketplace */}
            <ShopSubNav />

            {/* Active Sub-tab View */}
            <div className="mt-2">
              {activeShopSubTab === 'top-brands' && <TopBrandsView />}
              {activeShopSubTab === 'nearby-stores' && <NearbyStoresView />}
              {activeShopSubTab === 'marketplace' && <MarketplaceView />}
            </div>
          </>
        ) : (
          <OtherTabsView tabId={activeMainTab} />
        )}
      </main>

      {/* Authentic Bottom Navigation */}
      <BottomNav />

      {/* Modals and Overlays */}
      <ProductDetailModal />
      <CheckoutModal />
      <Toast />
    </DeviceFrameWrapper>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
