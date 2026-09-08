import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowRight, Store } from 'lucide-react';

export default function TopBrandsView() {
  const { setActiveShopSubTab } = useApp();

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center max-w-md mx-auto min-h-[45vh]">
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-3 text-[#4338CA]">
        <Store className="w-7 h-7 opacity-80" />
      </div>
      <h2 className="text-base font-bold text-slate-800 mb-1">Top Brands</h2>
      <p className="text-xs text-slate-400 mb-5 leading-relaxed max-w-xs">
        Existing 1Fi native feature. (Blank placeholder per assignment specification).
      </p>
      <button
        onClick={() => setActiveShopSubTab('marketplace')}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4338CA] hover:bg-[#3730A3] text-white font-bold text-xs transition-all shadow-sm"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Explore 1Fi Marketplace</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
