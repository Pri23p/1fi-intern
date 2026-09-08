import React from 'react';
import { useApp } from '../context/AppContext';
import ProductCard from './ProductCard';
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  Zap,
  TrendingUp,
  ShieldCheck,
  Percent,
  X,
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Tablet,
  RefreshCw
} from 'lucide-react';

export default function MarketplaceView() {
  const {
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
    loadProducts
  } = useApp();

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Smartphone':
        return Smartphone;
      case 'Laptop':
        return Laptop;
      case 'Headphones':
        return Headphones;
      case 'Watch':
        return Watch;
      case 'Tablet':
        return Tablet;
      case 'Sparkles':
      default:
        return Sparkles;
    }
  };

  return (
    <div className="space-y-4 pb-16">
      {/* 1Fi Marketplace Fintech Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E0A8A] via-[#3114B8] to-[#4338CA] text-white p-5 sm:p-6 shadow-md border border-indigo-500/20">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-60 h-60 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-40 h-40 bg-purple-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[11px] font-bold mb-3 backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            <span>1Fi Advantage • Zero Capital Gains Tax</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
            Shop flagship electronics on <span className="text-amber-300 underline decoration-indigo-400">0% No Cost EMI</span>
          </h2>

          <p className="text-xs sm:text-sm text-indigo-100/90 mt-2 leading-relaxed">
            Pledge your existing Mutual Funds to unlock instant credit. Your investments keep earning ~14% CAGR while you enjoy your favorite gadgets!
          </p>

          {/* Quick Stats Badges */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4 pt-3.5 border-t border-white/15">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center text-amber-300 flex-shrink-0">
                <Percent className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-extrabold text-white block leading-none">0% Interest</span>
                <span className="text-[10px] text-indigo-200">No Cost EMI</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center text-emerald-300 flex-shrink-0">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-extrabold text-white block leading-none">100% Growth</span>
                <span className="text-[10px] text-indigo-200">MF Continues</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center text-cyan-300 flex-shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-extrabold text-white block leading-none">SEBI Regulated</span>
                <span className="text-[10px] text-indigo-200">CAMS / KFintech</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Sort Controls Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Apple, Samsung, MacBook, Sony, Headphones..."
            className="w-full pl-10 pr-9 py-3 bg-white border border-slate-200 rounded-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-sm transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-48">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 py-3 px-3.5 pr-8 rounded-full focus:outline-none focus:border-indigo-500 shadow-sm cursor-pointer font-medium"
            >
              <option value="popular">🔥 Most Popular</option>
              <option value="price-low">💰 Price: Low to High</option>
              <option value="price-high">💎 Price: High to Low</option>
              <option value="discount">🏷️ Highest Discount</option>
              <option value="rating">⭐ Highest Rated</option>
            </select>
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Category Pills Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => {
          const Icon = getCategoryIcon(cat.icon);
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 border ${
                isSelected
                  ? 'bg-[#4338CA] border-[#4338CA] text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Products Grid & State Handlers */}
      <div>
        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-3 px-1">
          <span>
            Showing <strong className="text-slate-900">{products.length}</strong> items in 1Fi Marketplace
          </span>
          {searchQuery && (
            <span className="text-[#4338CA] font-semibold">
              Query: "{searchQuery}"
            </span>
          )}
        </div>

        {/* Loading Skeleton */}
        {isProductsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-2xl bg-white border border-slate-200 p-4 space-y-3 animate-pulse shadow-sm">
                <div className="aspect-square w-full rounded-xl bg-slate-100" />
                <div className="h-4 bg-slate-100 rounded w-1/3" />
                <div className="h-5 bg-slate-200 rounded w-4/5" />
                <div className="h-4 bg-slate-100 rounded w-2/3" />
                <div className="pt-3 border-t border-slate-100 flex justify-between">
                  <div className="h-4 bg-slate-100 rounded w-1/3" />
                  <div className="h-4 bg-slate-100 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : productsError ? (
          /* Error State */
          <div className="p-8 text-center rounded-2xl bg-white border border-rose-200 max-w-md mx-auto my-8 shadow-sm">
            <p className="text-sm text-rose-600 font-semibold mb-3">{productsError}</p>
            <button
              onClick={loadProducts}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retry
            </button>
          </div>
        ) : products.length === 0 ? (
          /* Empty State */
          <div className="py-16 text-center rounded-2xl bg-white border border-slate-200 p-8 max-w-md mx-auto shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6 opacity-60" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No products found</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              We couldn't find any products matching your search criteria. Try a different keyword or category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSortBy('popular');
              }}
              className="px-4 py-2 rounded-xl bg-[#4338CA] text-white font-bold text-xs hover:bg-[#3730A3] transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
