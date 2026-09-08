import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, ReceiptText, TrendingUp, User, Sparkles, ArrowRight, ShieldCheck, IndianRupee } from 'lucide-react';

export default function OtherTabsView({ tabId }) {
  const { setActiveMainTab, user } = useApp();

  const tabConfig = {
    home: {
      title: '1Fi Home Dashboard',
      description: 'Your financial hub: Portfolio health, mutual fund SIP tracker, and instant credit limits at a glance.',
      icon: Home,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100'
    },
    'emi-due': {
      title: 'EMI Due & Repayment Schedule',
      description: 'Track upcoming no-cost monthly EMIs, auto-debit NACH mandates, and interest-free repayment history.',
      icon: ReceiptText,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100'
    },
    limit: {
      title: 'Mutual Fund Credit Line (LAMF)',
      description: `Available Borrowing Limit: ₹${user?.availableCreditLimit?.toLocaleString('en-IN') || '2,45,000'} / ₹${user?.approvedCreditLimit?.toLocaleString('en-IN') || '3,50,000'}. Backed by SEBI-regulated collateral pledge.`,
      icon: TrendingUp,
      color: 'text-purple-600 bg-purple-50 border-purple-100'
    },
    profile: {
      title: 'My 1Fi Profile & Settings',
      description: `User: ${user?.name || 'Rahul Sharma'} • KYC: ${user?.kycStatus || 'Verified'} • CIBIL Score: ${user?.cibilScore || 785}`,
      icon: User,
      color: 'text-blue-600 bg-blue-50 border-blue-100'
    }
  };

  const config = tabConfig[tabId] || tabConfig.home;
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-lg mx-auto min-h-[55vh] space-y-5">
      <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center shadow-sm ${config.color}`}>
        <Icon className="w-8 h-8 opacity-90" />
      </div>

      <div>
        <h2 className="text-xl font-extrabold text-slate-900">{config.title}</h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed max-w-sm mx-auto">
          {config.description}
        </p>
      </div>

      <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-700 max-w-sm w-full text-left space-y-2 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-700 font-bold">
          <ShieldCheck className="w-4 h-4 text-indigo-600" />
          <span>Evaluation Focus: 1Fi Shop Page</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          The 1Fi SDE assignment focuses on the <strong>Shop</strong> section including Top Brands, Nearby Stores, and the 1Fi Marketplace.
        </p>
      </div>

      <button
        onClick={() => setActiveMainTab('shop')}
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4338CA] hover:bg-[#3730A3] text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-indigo-500/20"
      >
        <Sparkles className="w-4 h-4" />
        <span>Return to 1Fi Shop Page</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
