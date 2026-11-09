import React from 'react';

export const EXNESS_LOGO_URL = '/assets/exness_logo.jpg';
export const METAQUOTES_LOGO_URL = '/assets/metaquotes_logo.jpg';

/**
 * Exact replica of the Exness broker logo using the official image provided by the user.
 */
export const ExnessLogo: React.FC<{ className?: string }> = ({ className = "w-11 h-11" }) => {
  return (
    <div
      className={`${className} shrink-0 select-none relative flex items-center justify-center rounded-[10px] overflow-hidden bg-[#ffd200] shadow-[0_1px_3px_rgba(0,0,0,0.4)]`}
      style={{ aspectRatio: '1 / 1' }}
      title="Exness"
    >
      <img
        src={EXNESS_LOGO_URL}
        alt="Exness"
        className="w-full h-full object-cover rounded-[10px]"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/assets/aistudio/Screenshot_20261109070802_a790f72a.jpg';
        }}
      />
    </div>
  );
};

/**
 * Exact replica of the MetaQuotes MT5 3D broker logo using the official image provided by the user.
 */
export const MetaQuotesLogo: React.FC<{ className?: string }> = ({ className = "w-11 h-11" }) => {
  return (
    <div
      className={`${className} shrink-0 select-none relative flex items-center justify-center rounded-[10px] overflow-hidden bg-transparent`}
      style={{ aspectRatio: '1 / 1' }}
      title="MetaQuotes Ltd."
    >
      <img
        src={METAQUOTES_LOGO_URL}
        alt="MetaQuotes MT5"
        className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/assets/aistudio/Screenshot_20261109070808_c557f327.jpg';
        }}
      />
    </div>
  );
};
