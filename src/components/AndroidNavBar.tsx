import React from 'react';
import { useTrading } from '../context/TradingContext';

export const AndroidNavBar: React.FC = () => {
  const { setActiveTab } = useTrading();

  return (
    <div className="w-full bg-[#000000] h-11 flex items-center justify-around px-8 select-none z-50">
      {/* Recents button (three vertical lines) */}
      <button
        onClick={() => setActiveTab('accounts')}
        aria-label="Recent Apps"
        className="w-10 h-10 flex items-center justify-center text-[#9ea8b3] active:text-white transition-colors"
      >
        <div className="flex items-center gap-1">
          <div className="w-[2.5px] h-4 bg-current rounded-full"></div>
          <div className="w-[2.5px] h-4 bg-current rounded-full"></div>
          <div className="w-[2.5px] h-4 bg-current rounded-full"></div>
        </div>
      </button>

      {/* Home button (Circle) */}
      <button
        onClick={() => setActiveTab('quotes')}
        aria-label="Home"
        className="w-10 h-10 flex items-center justify-center text-[#9ea8b3] active:text-white transition-colors"
      >
        <div className="w-4 h-4 border-2 border-current rounded-full"></div>
      </button>

      {/* Back button (Chevron left / triangle) */}
      <button
        onClick={() => setActiveTab('quotes')}
        aria-label="Back"
        className="w-10 h-10 flex items-center justify-center text-[#9ea8b3] active:text-white transition-colors"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
    </div>
  );
};
