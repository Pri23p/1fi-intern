import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Store, ReceiptText, TrendingUp, User, IndianRupee } from 'lucide-react';

export default function BottomNav() {
  const { activeMainTab, setActiveMainTab } = useApp();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'shop', label: 'Shop', icon: Store, isShop: true },
    { id: 'emi-due', label: 'EMI Due', icon: ReceiptText, isCustomReceipt: true },
    { id: 'limit', label: 'Limit', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] safe-area-inset-bottom">
      <div className="max-w-md mx-auto flex items-center justify-around px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMainTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveMainTab(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 ${
                isActive ? 'text-[#4338CA]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {/* Active top line indicator */}
              {isActive && (
                <span className="absolute -top-1.5 w-7 h-1 rounded-full bg-[#4338CA] shadow-sm shadow-indigo-500/40" />
              )}

              <div className="relative">
                {item.isCustomReceipt ? (
                  <div className="relative flex items-center justify-center">
                    <ReceiptText className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.5]' : 'stroke-2'}`} />
                    <IndianRupee className="w-2.5 h-2.5 absolute text-current top-1.5" />
                  </div>
                ) : (
                  <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.5]' : 'stroke-2'}`} />
                )}
              </div>

              <span className={`text-[10px] mt-1 tracking-tight ${isActive ? 'font-bold text-[#4338CA]' : 'font-medium text-slate-500'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
