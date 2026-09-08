import React from 'react';
import { useApp } from '../context/AppContext';
import { Star, Heart, Zap, ArrowRight, Sparkles } from 'lucide-react';

export default function ProductCard({ product }) {
  const { openProductDetail, wishlist, toggleWishlist } = useApp();

  const isWishlisted = wishlist.includes(product.id);

  // Calculate lowest EMI (e.g. 24 months tenure)
  const noCostMonthlyEmi = Math.ceil(product.basePrice / 12);

  return (
    <div 
      onClick={() => openProductDetail(product.id)}
      className="group relative flex flex-col rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-300 transition-all duration-300 overflow-hidden cursor-pointer shadow-sm hover:shadow-card-hover"
    >
      {/* Top Image Container */}
      <div className="relative aspect-square w-full bg-slate-50 overflow-hidden flex items-center justify-center p-3">
        {/* Product Badge */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-50 text-[#4338CA] border border-indigo-200/80 shadow-xs">
              <Zap className="w-2.5 h-2.5 fill-[#4338CA]" />
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full bg-white/90 hover:bg-white border border-slate-200 text-slate-400 hover:text-rose-500 transition-all shadow-xs"
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-rose-500 text-rose-500" : ""}`} />
        </button>

        {/* Product Image */}
        <img
          src={product.thumbnail}
          alt={product.name}
          className="w-full h-full object-contain object-center rounded-xl group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Available Colors Dot Swatches */}
        {product.colors && product.colors.length > 1 && (
          <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-white/90 backdrop-blur-md px-1.5 py-0.5 rounded-full border border-slate-200 shadow-xs">
            {product.colors.map((c, i) => (
              <span
                key={i}
                className="w-2 h-2 rounded-full border border-slate-300"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Content Body */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-amber-50 text-[11px] font-bold text-amber-700 border border-amber-200/60">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>{product.rating}</span>
              <span className="text-slate-400 text-[9px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
            {product.tagline}
          </p>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-base font-extrabold text-slate-900 tracking-tight">
              ₹{product.basePrice.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.basePrice && (
              <span className="text-xs text-slate-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            {product.discountPercentage > 0 && (
              <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                {product.discountPercentage}% OFF
              </span>
            )}
          </div>
        </div>

        {/* 1Fi EMI Benefit Callout Card */}
        <div className="pt-2.5 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">0% No Cost EMI</span>
              <span className="font-extrabold text-[#4338CA] text-xs sm:text-sm">
                ₹{noCostMonthlyEmi.toLocaleString('en-IN')}<span className="text-[10px] text-slate-400 font-normal">/mo</span>
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 group-hover:translate-x-0.5 transition-transform">
              <span>View Plans</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
