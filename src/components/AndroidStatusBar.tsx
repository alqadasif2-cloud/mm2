import React from 'react';
import { Wifi, Signal, Key, ShieldCheck } from 'lucide-react';

export const AndroidStatusBar: React.FC = () => {
  return (
    <div className="w-full bg-[#000000] text-[#cfd3d8] px-4 py-1.5 flex items-center justify-between text-xs font-sans tracking-wide border-b border-black select-none z-50">
      {/* Right side (RTL left visual, but in Android Arabic layout: Time on right, Battery on left) */}
      <div className="flex items-center gap-1.5 font-medium">
        <span className="text-[13px] font-semibold text-white tracking-tighter">٧:٠١</span>
        {/* Small app icons like Snapchat and YouTube */}
        <div className="flex items-center gap-1 text-[#a0aab4] ml-1">
          {/* YouTube play icon */}
          <span className="w-3.5 h-2.5 bg-red-600 rounded-sm flex items-center justify-center text-[7px] text-white font-bold leading-none">
            ▶
          </span>
          {/* Snapchat-like ghost icon or small dot */}
          <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full flex items-center justify-center text-[8px] text-black font-black">
            👻
          </span>
          <span className="w-1.5 h-1.5 bg-white/70 rounded-full"></span>
        </div>
      </div>

      {/* Left side in RTL (Battery, Wifi, WhatsApp, Key) */}
      <div className="flex items-center gap-2">
        {/* Key icon */}
        <Key className="w-3 h-3 text-[#a0aab4] rotate-90" />
        {/* WhatsApp icon mimic */}
        <span className="w-3 h-3 bg-[#25D366] rounded-full flex items-center justify-center text-[8px] text-white font-bold">
          💬
        </span>
        {/* Wifi */}
        <Wifi className="w-3.5 h-3.5 text-[#e0e4e8]" />
        {/* Cellular Signal */}
        <Signal className="w-3.5 h-3.5 text-[#e0e4e8]" />
        {/* Battery & %8 */}
        <div className="flex items-center gap-1">
          <span className="text-[11px] font-bold text-white tracking-tight">%٨</span>
          {/* Battery pill */}
          <div className="w-4 h-2.5 border border-[#e0e4e8] rounded-[2px] p-[1px] flex items-center relative">
            <div className="h-full bg-red-500 rounded-[1px] w-[14%]"></div>
            <div className="w-[1.5px] h-1 bg-[#e0e4e8] absolute -left-[2.5px] top-[2px] rounded-r-[1px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
