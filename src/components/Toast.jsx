import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function Toast() {
  const { toasts } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed top-16 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold backdrop-blur-lg border animate-in slide-in-from-top-2 duration-200 pointer-events-auto ${
            toast.type === 'success'
              ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/40 shadow-emerald-950/40'
              : toast.type === 'error'
              ? 'bg-rose-950/90 text-rose-300 border-rose-500/40 shadow-rose-950/40'
              : 'bg-slate-900/90 text-slate-200 border-slate-700/60 shadow-slate-950/40'
          }`}
        >
          {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />}
          {toast.type === 'info' && <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />}
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
