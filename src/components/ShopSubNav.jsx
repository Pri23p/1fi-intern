import React from 'react';
import { useApp } from '../context/AppContext';

export default function ShopSubNav() {
  const { activeShopSubTab, setActiveShopSubTab } = useApp();

  const tabs = [
    {
      id: 'top-brands',
      label: 'Top Brands',
      badge: null
    },
    {
      id: 'nearby-stores',
      label: 'Nearby Stores',
      badge: null
    },
    {
      id: 'marketplace',
      label: '1Fi Marketplace',
      badge: 'New'
    }
  ];

  return (
    <div className="sticky top-[60px] z-20 pb-3 pt-1">
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center p-1.5 bg-[#EEEDFA] rounded-full border border-indigo-100 shadow-sm w-full max-w-md">
          {tabs.map((tab) => {
            const isActive = activeShopSubTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveShopSubTab(tab.id)}
                className={`relative flex-1 py-2.5 px-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  isActive
                    ? 'bg-white text-[#4338CA] shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase ${
                    isActive ? 'bg-[#4338CA] text-white' : 'bg-indigo-200 text-[#4338CA]'
                  }`}>
                    {tab.badge}
                  </span>
                )}
                {/* Active indicator bar */}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-[2.5px] rounded-full bg-[#4338CA]" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
