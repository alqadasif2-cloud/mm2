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
            className="w-10 h-10 flex items-center justify-center text-white active:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-6 h-6">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-white tracking-wide">الحسابات</h1>
        </div>

        {/* Left side icons matching screenshot: Certificate, Plus, 3-dots */}
        <div className="flex items-center gap-1 text-[#d8dfe6]">
          {/* Certificate with star / medal icon */}
          <button
            onClick={() => setCertModalOpen(true)}
            aria-label="الشهادات وإدارة المفاتيح"
            title="الشهادات"
            className="w-9 h-9 flex items-center justify-center active:bg-white/10 rounded-full transition-colors cursor-pointer"
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
            className="w-9 h-9 flex items-center justify-center active:bg-white/10 rounded-full transition-colors cursor-pointer"
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
              className="w-9 h-9 flex items-center justify-center active:bg-white/10 rounded-full transition-colors cursor-pointer"
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
                  onClick={() => setOtpModalOpen(true)}
                  className="w-full text-right px-4 py-2 hover:bg-white/10 text-[#d8dfe6]"
                >
                  مولد OTP
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

      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-3 scrollbar-thin">
        {/* Top Connecting Account Card (Exact replica from the user screenshot) */}
        <div className="bg-[#1c1d22] rounded-[24px] p-5 flex flex-col items-center justify-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.5)] border border-[#2b2e36] relative overflow-hidden">
          {/* Centered Yellow Exness Logo */}
          <div className="mb-2">
            <ExnessLogo className="w-13 h-13" />
          </div>

          {/* Broker Name in Light Blue */}
          <h3 className="text-[#3f96f3] text-[15px] font-semibold tracking-wide">
            Exness Technologies Ltd
          </h3>

          {/* Server & Account Number */}
          <p className="text-[#8e9aa8] text-[13px] mt-1 tabular-nums font-normal" dir="ltr">
            252622825 — Exness-MT5Real33
          </p>

          {/* Connecting status label */}
          <div className="text-[#8e9aa8] text-[13px] mt-2 flex items-center justify-center gap-1.5">
            <span className="inline-block animate-pulse">... جارى الأتصال بـ</span>
          </div>
        </div>

        {/* Section Title "الاتصال إلى" */}
        <div className="text-right text-[#8e9aa8] text-[13px] font-medium pt-1 pb-0.5 px-1">
          الاتصال إلى
        </div>

        {/* Accounts List matching screenshot */}
        {accounts.map((acc) => {
          const isActive = activeAccount.id === acc.id;

          return (
            <div
              key={acc.id}
              onClick={() => handleSelectAccount(acc)}
              className={`relative bg-[#1f2125] rounded-[20px] p-4 transition-all duration-200 cursor-pointer overflow-hidden border ${
                isActive
                  ? 'border-[#3897f0]/80 shadow-[0_0_16px_rgba(56,151,240,0.22)] ring-1 ring-[#3897f0]/50'
                  : 'border-[#282b30] hover:border-[#383d44]'
              }`}
            >
              {/* Green "Demo" Ribbon in the TOP-RIGHT corner (matching screenshot) */}
              {acc.type === 'demo' && (
                <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none z-10">
                  <div className="absolute transform rotate-45 bg-[#00c853] text-black font-extrabold text-[11px] py-0.5 right-[-34px] top-[14px] w-[120px] text-center shadow-md tracking-wider">
                    Demo
                  </div>
                </div>
              )}

              {/* Upper Main Row: Account details on the left, Broker Logo on the right */}
              <div className="flex items-start justify-between">
                {/* Left Side: Account Name, Broker, Server (aligned to the left as in screenshot) */}
                <div className="flex flex-col items-start text-left z-0 pr-2">
                  <h2 className="text-[17px] font-bold text-white tracking-tight leading-snug">
                    {acc.name}
                  </h2>
                  <p className="text-[14px] font-medium text-[#3f96f3] mt-0.5">
                    {acc.broker}
                  </p>
                  <p className="text-[13px] font-normal text-[#8e9aa8] mt-0.5 tabular-nums" dir="ltr">
                    {acc.accountNumber} — {acc.server}
                  </p>
                </div>

                {/* Right Side: Broker Logo (Exness yellow square or MetaQuotes 3D logo) */}
                <div className="shrink-0 pl-1 pt-0.5 z-0">
                  {acc.logoType === 'exness' ? (
                    <ExnessLogo className="w-12 h-12" />
                  ) : (
                    <MetaQuotesLogo className="w-12 h-12" />
                  )}
                </div>
              </div>

              {/* Balance Row (aligned on the right side under the logo, as in screenshot) */}
              <div className="mt-2 flex flex-col items-end text-right">
                <div className="text-[25px] font-bold text-white tracking-tight tabular-nums leading-none">
                  {acc.balance.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </div>
                <div className="text-[12px] text-[#8e9aa8] font-normal mt-1">
                  {acc.lastKnownLabel || 'آخر ما عرف، USD'}
                </div>
              </div>

              {/* Card Footer: (i) on the left, QR icon on the right (matching screenshot) */}
              <div className="mt-3 pt-2.5 border-t border-[#292c33] flex items-center justify-between">
                {/* Info (i) icon button on the left */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveAccount(acc);
                    setAccountInfoModalOpen(true);
                  }}
                  aria-label="معلومات الحساب"
                  className="w-7 h-7 rounded-full border border-[#8e9aa8]/60 flex items-center justify-center text-[#8e9aa8] hover:text-white hover:border-white transition-colors cursor-pointer"
                >
                  <span className="text-xs font-serif font-bold italic leading-none">i</span>
                </button>

                {/* QR / Tile Grid icon on the right */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`رمز الاستجابة السريعة (QR) للحساب:\nرقم: ${acc.accountNumber}\nخادم: ${acc.server}\nوسيط: ${acc.broker}`);
                  }}
                  aria-label="QR Code"
                  className="w-7 h-7 flex items-center justify-center text-[#8e9aa8] hover:text-white transition-colors cursor-pointer"
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
              الحساب النشط: <strong className="text-white">{activeAccount.name} ({activeAccount.accountNumber})</strong>
            </p>
            <div className="bg-[#15171a] p-3 rounded-xl border border-[#282b30] text-xs font-mono text-green-400 break-all mb-4" dir="ltr">
              SHA256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
            </div>
            <button
              onClick={() => setCertModalOpen(false)}
              className="w-full py-2.5 bg-[#3897f0] hover:bg-[#2884dc] text-white font-bold rounded-xl transition-colors cursor-pointer"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
