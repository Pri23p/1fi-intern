import React from 'react';
import { useApp } from '../context/AppContext';
import { Wifi, Battery, Signal } from 'lucide-react';

export default function DeviceFrameWrapper({ children }) {
  const { isMobileFrame } = useApp();

  if (!isMobileFrame) {
    return <div className="min-h-screen bg-[#F6F8FC] flex flex-col">{children}</div>;
  }

  // Mobile Mockup Frame View
  return (
    <div className="min-h-screen bg-slate-900 py-6 px-4 flex items-center justify-center">
      <div className="relative w-full max-w-[412px] h-[880px] bg-[#F6F8FC] rounded-[48px] border-[10px] border-slate-800 shadow-2xl shadow-indigo-950/40 overflow-hidden flex flex-col ring-1 ring-slate-700">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ml-auto mr-2" />
        </div>

        {/* Mobile Status Bar matching 1Fi app */}
        <div className="pt-2 px-7 pb-1 flex items-center justify-between text-[11px] font-bold text-slate-700 z-30 bg-white/95 border-b border-slate-100">
          <span>4:13</span>
          <div className="flex items-center gap-1.5 text-slate-700">
            <span className="text-[10px] font-mono">63.0 KB/s</span>
            <Signal className="w-3 h-3" />
            <span className="text-[10px] font-bold">5G</span>
            <Battery className="w-3.5 h-3.5 fill-slate-700" />
            <span className="text-[10px]">66%</span>
          </div>
        </div>

        {/* Scrollable Mobile Viewport */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col no-scrollbar">
          {children}
        </div>

        {/* Home Indicator Bar */}
        <div className="h-4 bg-white flex items-center justify-center z-40 border-t border-slate-100">
          <div className="w-32 h-1 bg-slate-300 rounded-full" />
        </div>
      </div>
    </div>
  );
}
