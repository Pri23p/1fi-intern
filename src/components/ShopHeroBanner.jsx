import React from 'react';
import { Sparkles } from 'lucide-react';

export default function ShopHeroBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E0A8A] via-[#2D0E9E] to-[#4318B4] text-white p-5 sm:p-7 shadow-xl shadow-indigo-950/20 mb-4 border border-indigo-500/20">
      {/* Decorative ambient lighting */}
      <div className="absolute top-0 -right-10 w-60 h-60 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Column: Authentic Copy */}
        <div className="w-full md:max-w-[58%] text-left">
          {/* Tag Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-3.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-[11px] font-bold tracking-wider uppercase text-white">
              NO-COST EMIs
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-white mb-2.5">
            <span>Shop today,</span>
            <br />
            <span className="italic font-serif font-normal text-indigo-100 opacity-95">Pay later using</span>
            <br />
            <span className="text-white font-extrabold">Mutual funds.</span>
          </h1>

          {/* Subtext */}
          <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed font-normal max-w-sm">
            No credit score required. No interest.
            <br />
            Backed by your investments.
          </p>
        </div>

        {/* Right Column: 3D Shopping Bag Illustration */}
        <div className="w-full md:w-[42%] flex items-center justify-center relative">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
            {/* Soft backdrop glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/20 to-purple-400/30 rounded-full blur-xl transform scale-90" />
            <img
              src="/hero-banner-bag.jpg"
              alt="1Fi Shop No Cost EMIs with Mutual Funds"
              className="w-full h-full object-contain rounded-2xl relative z-10 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)] transform hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                // Fallback if local file fails to load
                e.currentTarget.src = 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&auto=format&fit=crop&q=80';
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
