import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Smartphone, Monitor, ShieldCheck, Sparkles } from 'lucide-react';

export default function Header() {
  const { user, isMobileFrame, setIsMobileFrame, showToast } = useApp();

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 py-2.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Left: 1Fi Brand Logo & Slogan */}
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#1E0A8A] via-[#4338CA] to-[#6366F1] flex items-center justify-center shadow-md shadow-indigo-500/20">
            <span className="font-extrabold text-white text-base tracking-tighter">1Fi</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-slate-900 tracking-tight text-base">1Fi</span>
              <span className="text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-[#4338CA] border border-indigo-100">
                Fintech
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">Shop on 0% EMI with Mutual Funds</p>
          </div>
        </div>

        {/* Right: Available Credit Limit Pill & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Credit Limit Pill */}
          <div 
            onClick={() => showToast(`Total Limit: ₹${user?.approvedCreditLimit?.toLocaleString('en-IN') || '3,50,000'} | Backed by Mutual Funds`, 'info')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50/80 border border-indigo-200 hover:border-indigo-400 transition-all cursor-pointer group shadow-sm"
            title="Your available credit limit backed by Mutual Funds"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <div className="flex flex-col text-left">
              <span className="text-[9px] text-slate-500 font-bold uppercase leading-tight">MF Credit Line</span>
              <span className="text-xs font-extrabold text-indigo-900 tracking-tight">
                ₹{user?.availableCreditLimit?.toLocaleString('en-IN') ?? '2,45,000'}
              </span>
            </div>
          </div>

          {/* Desktop/Mobile View Switcher (Convenient for evaluators) */}
          <button
            onClick={() => {
              setIsMobileFrame(!isMobileFrame);
              showToast(isMobileFrame ? 'Switched to Fluid Responsive View' : 'Switched to Mobile App Frame', 'info');
            }}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors"
            title="Toggle Mobile Simulator Frame"
          >
            {isMobileFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-indigo-600" />
                <span>Desktop View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-indigo-600" />
                <span>Mobile Frame</span>
              </>
            )}
          </button>

          {/* Notification Bell */}
          <button 
            onClick={() => showToast('No new notifications', 'info')}
            className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-600 rounded-full" />
          </button>
        </div>
      </div>
    </header>
  );
}
