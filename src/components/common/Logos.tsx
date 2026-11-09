import React from 'react';

/**
 * Exact replica of the Exness broker logo as seen in the MT5 mobile app screenshot:
 * A distinctive bright yellow rounded square (#ffd200) with the black lowercase "exness" wordmark.
 */
export const ExnessLogo: React.FC<{ className?: string }> = ({ className = "w-11 h-11" }) => {
  return (
    <div
      className={`${className} shrink-0 select-none relative flex items-center justify-center rounded-[10px] overflow-hidden bg-[#ffd200] shadow-[0_1px_3px_rgba(0,0,0,0.3)]`}
      style={{ aspectRatio: '1 / 1' }}
      title="Exness"
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full p-1"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background rounded rectangle */}
        <rect width="100" height="100" rx="20" fill="#ffd200" />
        
        {/* Crisp vector representation of "exness" logo */}
        <g fill="#000000">
          {/* 'e' */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21 44.5c-4.2 0-7 2.8-7.3 6.8h14.5c-.3-4-3-6.8-7.2-6.8zm7.5 9.5H13.7c.3 4.5 3.3 7.5 7.6 7.5 2.8 0 5-1.2 6.3-3.2l2.6 1.8c-2 2.8-5.3 4.5-9 4.5-6.8 0-11.2-4.9-11.2-11.4 0-6.7 4.5-11.5 11.1-11.5 6.6 0 10.7 4.7 10.7 11 0 .5 0 .9-.1 1.3z"
          />
          {/* 'x' */}
          <path
            d="M31.2 42.5h3.9l3.5 5.5 3.5-5.5H46l-5.6 8.3 6 9.1h-4.1l-3.8-6-3.8 6h-3.9l6-9-4.8-8.4z"
          />
          {/* 'n' */}
          <path
            d="M48.2 42.5h3.4v2.5c1.4-1.8 3.5-2.8 5.8-2.8 4.3 0 6.8 2.8 6.8 7.4v10.8h-3.5v-10c0-3.1-1.6-4.9-4.4-4.9-2.7 0-4.6 1.9-4.6 4.9v10h-3.5V42.5z"
          />
          {/* 'e' */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M72.2 44.5c-4.2 0-7 2.8-7.3 6.8h14.5c-.3-4-3-6.8-7.2-6.8zm7.5 9.5H64.9c.3 4.5 3.3 7.5 7.6 7.5 2.8 0 5-1.2 6.3-3.2l2.6 1.8c-2 2.8-5.3 4.5-9 4.5-6.8 0-11.2-4.9-11.2-11.4 0-6.7 4.5-11.5 11.1-11.5 6.6 0 10.7 4.7 10.7 11 0 .5 0 .9-.1 1.3z"
          />
          {/* 's' */}
          <path
            d="M82.2 59.4l2.5-2c1.4 1.5 3.1 2.4 4.9 2.4 2 0 3.2-1 3.2-2.3 0-1.4-1.1-2-3.8-2.8-3.6-1-5.7-2.3-5.7-5.3 0-3.4 2.7-5.5 6.4-5.5 2.5 0 4.6.8 6.1 2.3l-2.2 2.2c-1.2-1.1-2.5-1.7-4-1.7-1.8 0-2.8.9-2.8 2.1 0 1.3 1 1.9 3.5 2.6 3.9 1.1 6 2.5 6 5.5 0 3.7-2.8 5.7-6.8 5.7-2.8 0-5.3-1.2-7.3-3.2z"
          />
        </g>
      </svg>
    </div>
  );
};

/**
 * Exact replica of the MetaQuotes / MetaTrader 5 (MT5) 3D broker logo
 * as shown in the user's screenshot:
 * Three glossy 3D spheres (Green, Yellow/Amber, Blue) surrounding
 * a central metallic circular medallion with a 3D golden number "5".
 */
export const MetaQuotesLogo: React.FC<{ className?: string }> = ({ className = "w-11 h-11" }) => {
  return (
    <div
      className={`${className} shrink-0 select-none relative flex items-center justify-center`}
      style={{ aspectRatio: '1 / 1' }}
      title="MetaQuotes Ltd."
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 3D Green Sphere Gradients (Top) */}
          <radialGradient id="mt5Green" cx="42%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#81c784" />
            <stop offset="40%" stopColor="#43a047" />
            <stop offset="85%" stopColor="#2e7d32" />
            <stop offset="100%" stopColor="#1b5e20" />
          </radialGradient>
          <radialGradient id="mt5GreenGlow" cx="35%" cy="30%" r="40%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#81c784" stopOpacity="0" />
          </radialGradient>

          {/* 3D Yellow / Amber Sphere Gradients (Bottom Left) */}
          <radialGradient id="mt5Yellow" cx="42%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#fff59d" />
            <stop offset="35%" stopColor="#fbc02d" />
            <stop offset="80%" stopColor="#f57f17" />
            <stop offset="100%" stopColor="#e65100" />
          </radialGradient>
          <radialGradient id="mt5YellowGlow" cx="35%" cy="30%" r="40%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#fff59d" stopOpacity="0" />
          </radialGradient>

          {/* 3D Blue / Cyan Sphere Gradients (Bottom Right) */}
          <radialGradient id="mt5Blue" cx="42%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#80d8ff" />
            <stop offset="35%" stopColor="#00b0ff" />
            <stop offset="80%" stopColor="#0288d1" />
            <stop offset="100%" stopColor="#01579b" />
          </radialGradient>
          <radialGradient id="mt5BlueGlow" cx="35%" cy="30%" r="40%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#80d8ff" stopOpacity="0" />
          </radialGradient>

          {/* Central Silver/Metallic Disc */}
          <linearGradient id="mt5SilverDisc" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#eceff1" />
            <stop offset="85%" stopColor="#cfd8dc" />
            <stop offset="100%" stopColor="#b0bec5" />
          </linearGradient>

          {/* Golden 3D Numeral "5" */}
          <linearGradient id="mt5GoldNumber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffee58" />
            <stop offset="50%" stopColor="#fbc02d" />
            <stop offset="100%" stopColor="#e65100" />
          </linearGradient>

          {/* Connecting Metallic Ribbons */}
          <linearGradient id="mt5ConnectingArm" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e0e0e0" />
            <stop offset="50%" stopColor="#9e9e9e" />
            <stop offset="100%" stopColor="#616161" />
          </linearGradient>

          {/* Drop shadow for 3D elements */}
          <filter id="mt5Shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Connecting Ring / Background Arms */}
        <circle cx="50" cy="50" r="28" stroke="url(#mt5ConnectingArm)" strokeWidth="8" opacity="0.4" />

        {/* 1. Green Sphere (Top) */}
        <g filter="url(#mt5Shadow)">
          <circle cx="50" cy="22" r="16.5" fill="url(#mt5Green)" />
          {/* Specular 3D highlight */}
          <ellipse cx="46" cy="17" rx="8" ry="5.5" fill="url(#mt5GreenGlow)" transform="rotate(-15 46 17)" />
        </g>

        {/* 2. Yellow / Amber Sphere (Bottom Left) */}
        <g filter="url(#mt5Shadow)">
          <circle cx="26" cy="68" r="16.5" fill="url(#mt5Yellow)" />
          {/* Specular 3D highlight */}
          <ellipse cx="22" cy="63" rx="8" ry="5.5" fill="url(#mt5YellowGlow)" transform="rotate(-15 22 63)" />
        </g>

        {/* 3. Blue / Cyan Sphere (Bottom Right) */}
        <g filter="url(#mt5Shadow)">
          <circle cx="74" cy="68" r="16.5" fill="url(#mt5Blue)" />
          {/* Specular 3D highlight */}
          <ellipse cx="70" cy="63" rx="8" ry="5.5" fill="url(#mt5BlueGlow)" transform="rotate(-15 70 63)" />
        </g>

        {/* Central 3D Medallion Button */}
        <g filter="url(#mt5Shadow)">
          {/* Outer Chrome Bevel */}
          <circle cx="50" cy="50" r="21" fill="#90a4ae" />
          <circle cx="50" cy="50" r="19.5" fill="url(#mt5SilverDisc)" />
          <circle cx="50" cy="50" r="18.5" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.9" />

          {/* 3D Golden Numeral "5" */}
          {/* Drop shadow / bevel underneath */}
          <text
            x="50"
            y="57.5"
            textAnchor="middle"
            fill="#b26a00"
            fontSize="22"
            fontWeight="900"
            fontFamily="Arial, -apple-system, sans-serif"
            style={{ filter: 'blur(0.5px)' }}
          >
            5
          </text>
          {/* Main golden 5 */}
          <text
            x="50"
            y="56.5"
            textAnchor="middle"
            fill="url(#mt5GoldNumber)"
            stroke="#b26a00"
            strokeWidth="0.5"
            fontSize="22"
            fontWeight="900"
            fontFamily="Arial, -apple-system, sans-serif"
          >
            5
          </text>
        </g>
      </svg>
    </div>
  );
};
