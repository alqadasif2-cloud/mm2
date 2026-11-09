import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { ExnessLogo, MetaQuotesLogo } from '../common/Logos';
import { Account } from '../../types/mt5';

export const AccountsView: React.FC = () => {
  const {
    accounts,
    activeAccount,
    setActiveAccount,
    setIsDrawerOpen,
    setAccountInfoModalOpen,
    setOtpModalOpen,
    setAddAccountModalOpen,
    setActiveTab
  } = useTrading();

  const [menuOpen, setMenuOpen] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);

  const handleSelectAccount = (account: Account) => {
    setActiveAccount(account);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#000000] text-white overflow-hidden select-none">
      {/* Top MT5 Accounts Header matching screenshot */}
      <header className="h-14 px-3 flex items-center justify-between border-b border-[#141517] bg-[#000000] z-20">
        {/* Right side: Hamburger and Title "الحسابات" */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDrawerOpen(true)}
            aria-label="القائمة الرئيسية"
            className="w-10 h-10 flex items-center justify-center text-white active:bg-white/10 rounded-full transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-6 h-6">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-white tracking-wide">الحسابات</h1>
        </div>

        {/* Left side icons matching screenshot: Shield, Certificate, Plus, 3-dots */}
        <div className="flex items-center gap-1 text-[#d8dfe6]">
          {/* OTP Shield Icon */}
          <button
            onClick={() => setOtpModalOpen(true)}
            aria-label="مولد كلمات المرور لمرة واحدة (OTP)"
            title="OTP Shield"
            className="w-9 h-9 flex items-center justify-center active:bg-white/10 rounded-full transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fillOpacity="0.15" />
              <circle cx="12" cy="11" r="2" fill="currentColor" />
              <path d="M12 13v3" strokeWidth="2" />
            </svg>
          </button>

          {/* Certificate with star / medal icon */}
          <button
            onClick={() => setCertModalOpen(true)}
            aria-label="الشهادات وإدارة المفاتيح"
            title="الشهادات"
            className="w-9 h-9 flex items-center justify-center active:bg-white/10 rounded-full transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <circle cx="12" cy="8" r="6" />
              <path d="M15.5 13.5L18 22l-6-3-6 3 2.5-8.5" />
              <path d="M10 7.5l1.5-1 1.5 1-.5 1.8h-2z" fill="currentColor" />
            </svg>
          </button>

          {/* Add Account Plus */}
          <button
            onClick={() => setAddAccountModalOpen(true)}
            aria-label="إضافة حساب جديد"
            title="إضافة حساب"
            className="w-9 h-9 flex items-center justify-center active:bg-white/10 rounded-full transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>

          {/* Three vertical dots menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="خيارات إضافية"
              className="w-9 h-9 flex items-center justify-center active:bg-white/10 rounded-full transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <circle cx="12" cy="5" r="1.8" />
                <circle cx="12" cy="12" r="1.8" />
                <circle cx="12" cy="19" r="1.8" />
              </svg>
            </button>

            {menuOpen && (
              <div
                className="absolute left-0 top-11 w-52 bg-[#202226] border border-[#2e3238] rounded-xl shadow-2xl py-1.5 z-50 text-sm font-medium"
                onClick={() => setMenuOpen(false)}
              >
                <button
                  onClick={() => setActiveTab('trade')}
                  className="w-full text-right px-4 py-2 hover:bg-white/10 text-white flex items-center justify-between"
                >
                  <span>بدء التداول</span>
                  <span className="text-xs text-blue-400">⚡</span>
                </button>
                <button
                  onClick={() => setAccountInfoModalOpen(true)}
                  className="w-full text-right px-4 py-2 hover:bg-white/10 text-[#d8dfe6]"
                >
                  خصائص الحساب
                </button>
                <button
                  onClick={() => setAddAccountModalOpen(true)}
                  className="w-full text-right px-4 py-2 hover:bg-white/10 text-[#d8dfe6]"
                >
                  تسجيل الدخول إلى حساب آخر
                </button>
                <div className="h-px bg-[#2e3238] my-1"></div>
                <button
                  onClick={() => alert('تم مسح كلمات المرور المحفوظة من الذاكرة المؤقتة')}
                  className="w-full text-right px-4 py-2 hover:bg-white/10 text-[#e57373]"
                >
                  مسح كلمات المرور المحفوظة
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Accounts List Container matching screenshot */}
      <div className="flex-1 overflow-y-auto px-3.5 py-2.5 space-y-3.5 scrollbar-thin">
        {accounts.map((acc, index) => {
          const isActive = activeAccount.id === acc.id;
          const isTopPartial = acc.isPartial;

          return (
            <div
              key={acc.id}
              onClick={() => handleSelectAccount(acc)}
              className={`relative bg-[#1f2125] rounded-2xl p-4 transition-all duration-200 cursor-pointer overflow-hidden border ${
                isActive
                  ? 'border-[#3897f0]/80 shadow-[0_0_16px_rgba(56,151,240,0.22)] ring-1 ring-[#3897f0]/50'
                  : 'border-[#282b30] hover:border-[#383d44]'
              } ${isTopPartial ? 'opacity-95' : ''}`}
            >
              {/* Demo Diagonal Corner Ribbon matching screenshot */}
              {acc.type === 'demo' && (
                <div className="absolute top-0 left-0 w-24 h-24 overflow-hidden pointer-events-none z-10">
                  <div className="absolute transform -rotate-45 bg-[#00c853] text-black font-extrabold text-[11px] py-1 right-[-35px] top-[14px] w-[120px] text-center shadow-md tracking-wider">
                    Demo
                  </div>
                </div>
              )}

              {/* Card Header: Name + Logo */}
              <div className="flex items-start justify-between">
                {/* Logo on the left (RTL right) */}
                <div className="flex items-start gap-3">
                  {acc.logoType === 'exness' ? (
                    <ExnessLogo className="w-11 h-11" />
                  ) : (
                    <MetaQuotesLogo className="w-11 h-11" />
                  )}

                  <div>
                    {/* User name: in screenshot, second card was "عرق جبين" and user asked for "اسلام" */}
                    <div className="flex items-center gap-2">
                      <h2 className="text-[17px] font-bold text-white tracking-tight">
                        {acc.name}
                      </h2>
                      {isActive && (
                        <span className="text-[10px] bg-[#3897f0]/20 text-[#64b5f6] border border-[#3897f0]/40 px-2 py-0.5 rounded-full font-semibold">
                          الحساب النشط
                        </span>
                      )}
                    </div>

                    {/* Broker Name in light blue matching screenshot */}
                    <p className="text-[14px] font-medium text-[#4da6ff] mt-0.5">
                      {acc.broker}
                    </p>

                    {/* Account number and server matching screenshot */}
                    <p className="text-[13px] font-normal text-[#8e9aa8] mt-0.5 tracking-tight tabular-nums">
                      {acc.accountNumber} — {acc.server}
                    </p>
                  </div>
                </div>
              </div>

              {/* Balance Section */}
              <div className="mt-3.5 flex flex-col items-center justify-center">
                <div className="text-[26px] font-bold text-white tracking-tight tabular-nums">
                  {acc.balance.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </div>
                <div className="text-[12px] text-[#8e9aa8] font-normal mt-0.5">
                  {acc.lastKnownLabel || 'آخر ما عرف، USD'}
                </div>
              </div>

              {/* Bottom Card Footer: QR/Grid icon & Info (i) icon */}
              <div className="mt-2 pt-2 border-t border-[#292c33] flex items-center justify-between">
                {/* Info (i) icon button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveAccount(acc);
                    setAccountInfoModalOpen(true);
                  }}
                  aria-label="معلومات الحساب"
                  className="w-8 h-8 rounded-full border border-[#8e9aa8]/40 flex items-center justify-center text-[#8e9aa8] hover:text-white hover:border-white transition-colors"
                >
                  <span className="text-sm font-serif font-bold italic">i</span>
                </button>

                {/* QR / Tile Grid icon matching screenshot */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`رمز الاستجابة السريعة (QR) للحساب:\nرقم: ${acc.accountNumber}\nخادم: ${acc.server}\nوسيط: ${acc.broker}`);
                  }}
                  aria-label="QR Code"
                  className="w-8 h-8 flex items-center justify-center text-[#8e9aa8] hover:text-white transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="6" y="6" width="1" height="1" fill="currentColor" />
                    <rect x="17" y="6" width="1" height="1" fill="currentColor" />
                    <rect x="17" y="17" width="1" height="1" fill="currentColor" />
                    <rect x="6" y="17" width="1" height="1" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Certificate Modal */}
      {certModalOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50"
          onClick={() => setCertModalOpen(false)}
        >
          <div
            className="bg-[#1f2125] border border-[#2e3238] rounded-2xl w-full max-w-sm p-5 text-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#2e3238]">
              <h3 className="font-bold text-lg text-white">إدارة الشهادات الرقمية</h3>
              <span className="text-yellow-400 text-xl">🎖️</span>
            </div>
            <p className="text-sm text-[#8e9aa8] my-4 leading-relaxed">
              شهادة أمان الحساب مشفرة ومصادق عليها من قبل شركة Exness و MetaQuotes.
              <br />
              الحساب النشط: <strong className="text-white">اسلام ({activeAccount.accountNumber})</strong>
            </p>
            <div className="bg-[#15171a] p-3 rounded-xl border border-[#282b30] text-xs font-mono text-green-400 break-all mb-4">
              SHA256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
            </div>
            <button
              onClick={() => setCertModalOpen(false)}
              className="w-full py-2.5 bg-[#3897f0] hover:bg-[#2884dc] text-white font-bold rounded-xl transition-colors"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
