import React from 'react';

export const ExnessLogo: React.FC<{ className?: string }> = ({ className = "w-11 h-11" }) => {
  return (
    <div className={`${className} bg-[#ffde00] rounded-lg flex items-center justify-center p-1.5 shadow-sm shrink-0 select-none`}>
      <span className="text-black font-extrabold text-[12px] tracking-tighter leading-none font-sans">
        exness
      </span>
    </div>
  );
};

export const MetaQuotesLogo: React.FC<{ className?: string }> = ({ className = "w-11 h-11" }) => {
  return (
    <div className={`${className} relative flex items-center justify-center shrink-0 select-none`}>
      {/* 5-color petal/ring circles of MetaQuotes MT5 */}
      <svg viewBox="0 0 40 40" className="w-full h-full">
        {/* Top circle */}
        <circle cx="20" cy="9" r="6.5" fill="#4caf50" opacity="0.9" />
        {/* Top-right circle */}
        <circle cx="29" cy="16" r="6.5" fill="#2196f3" opacity="0.9" />
        {/* Bottom-right circle */}
        <circle cx="27" cy="27" r="6.5" fill="#00bcd4" opacity="0.9" />
        {/* Bottom-left circle */}
        <circle cx="13" cy="27" r="6.5" fill="#ffeb3b" opacity="0.9" />
        {/* Top-left circle */}
        <circle cx="11" cy="16" r="6.5" fill="#8bc34a" opacity="0.9" />
        {/* Center circle */}
        <circle cx="20" cy="20" r="9" fill="#ffffff" />
        {/* Number 5 */}
        <text
          x="20"
          y="24"
          textAnchor="middle"
          fill="#1976d2"
          fontSize="13"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          5
        </text>
      </svg>
    </div>
  );
};
