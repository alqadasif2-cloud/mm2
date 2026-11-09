import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { ExnessLogo, MetaQuotesLogo } from '../common/Logos';

export const DrawerMenu: React.FC = () => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    activeAccount,
    setActiveTab,
    unreadCount,
    setAccountInfoModalOpen
  } = useTrading();

  if (!isDrawerOpen) return null;

  const navigateTo = (tab: any) => {
    setActiveTab(tab);
    setIsDrawerOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex select-none animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      ></div>

      {/* Slide-out Menu Panel (Right side in RTL) */}
      <div className="relative w-72 max-w-[80vw] h-full bg-[#181a1e] text-white flex flex-col shadow-2xl z-10 border-l border-[#262930] animate-slideLeft">
        {/* Drawer Header with Active Account ("اسلام") */}
        <div
          onClick={() => {
            setAccountInfoModalOpen(true);
            setIsDrawerOpen(false);
          }}
          className="p-5 bg-[#121417] border-b border-[#252930] cursor-pointer hover:bg-[#15171b] transition-colors"
        >
          <div className="flex items-center justify-between">
            {activeAccount.logoType === 'exness' ? (
              <ExnessLogo className="w-10 h-10" />
            ) : (
              <MetaQuotesLogo className="w-10 h-10" />
            )}
            <span className="w-2.5 h-2.5 rounded-full bg-[#00c853] shadow-[0_0_8px_#00c853]"></span>
          </div>

          <div className="mt-3">
            <h2 className="text-lg font-bold text-white tracking-tight">
              {activeAccount.name}
            </h2>
            <p className="text-xs text-[#3897f0] font-semibold">
              {activeAccount.broker}
            </p>
            <p className="text-xs text-[#8e9aa8] mt-0.5 tabular-nums">
              {activeAccount.accountNumber} — {activeAccount.server}
            </p>
            <div className="mt-2 text-sm font-bold text-white tabular-nums">
              {activeAccount.balance.toFixed(2)} {activeAccount.currency}
            </div>
          </div>
        </div>

        {/* Menu Navigation Links */}
        <div className="flex-1 overflow-y-auto py-2 divide-y divide-[#20232a]">
          <div className="py-1">
            <button
              onClick={() => navigateTo('accounts')}
              className="w-full px-5 py-3 flex items-center justify-between hover:bg-white/5 text-right transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <span className="text-lg">👥</span>
                <span className="text-sm font-bold text-white">إدارة الحسابات</span>
              </div>
              <span className="text-xs text-[#8e9aa8]">›</span>
            </button>

            <button
              onClick={() => navigateTo('quotes')}
              className="w-full px-5 py-3 flex items-center justify-between hover:bg-white/5 text-right transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <span className="text-lg">⇅</span>
                <span className="text-sm font-bold text-white">طلبات الأسعار</span>
              </div>
              <span className="text-xs text-[#8e9aa8]">›</span>
            </button>

            <button
              onClick={() => navigateTo('chart')}
              className="w-full px-5 py-3 flex items-center justify-between hover:bg-white/5 text-right transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <span className="text-lg">📊</span>
                <span className="text-sm font-bold text-white">الرسوم البيانية</span>
              </div>
              <span className="text-xs text-[#8e9aa8]">›</span>
            </button>

            <button
              onClick={() => navigateTo('trade')}
              className="w-full px-5 py-3 flex items-center justify-between hover:bg-white/5 text-right transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <span className="text-lg">📈</span>
                <span className="text-sm font-bold text-white">التداول</span>
              </div>
              <span className="text-xs text-[#8e9aa8]">›</span>
            </button>

            <button
              onClick={() => navigateTo('history')}
              className="w-full px-5 py-3 flex items-center justify-between hover:bg-white/5 text-right transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <span className="text-lg">🕒</span>
                <span className="text-sm font-bold text-white">السجل</span>
              </div>
              <span className="text-xs text-[#8e9aa8]">›</span>
            </button>
          </div>

          <div className="py-1">
            <button
              onClick={() => navigateTo('messages')}
              className="w-full px-5 py-3 flex items-center justify-between hover:bg-white/5 text-right transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <span className="text-lg">💬</span>
                <span className="text-sm font-bold text-white">الرسائل</span>
              </div>
              {unreadCount > 0 && (
                <span className="bg-[#e53935] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                alert('التقويم الاقتصادي: صدور بيانات التضخم ومعدل الفائدة الفيدرالي الأمريكي');
                setIsDrawerOpen(false);
              }}
              className="w-full px-5 py-3 flex items-center justify-between hover:bg-white/5 text-right transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <span className="text-lg">📅</span>
                <span className="text-sm font-bold text-white">التقويم الاقتصادي</span>
              </div>
            </button>

            <button
              onClick={() => {
                alert('دفتر اليومية (Journal): سجل العمليات والاتصال بخادم Exness-MT5Real35 مستقر بنجاح بنسبة 100%');
                setIsDrawerOpen(false);
              }}
              className="w-full px-5 py-3 flex items-center justify-between hover:bg-white/5 text-right transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <span className="text-lg">📓</span>
                <span className="text-sm font-bold text-white">دفتر اليومية</span>
              </div>
            </button>
          </div>

          <div className="py-1">
            <button
              onClick={() => {
                alert('إعدادات MetaTrader 5: تمكين التداول بنقرة واحدة، الإشعارات الفورية، صوت التداول مفعل.');
                setIsDrawerOpen(false);
              }}
              className="w-full px-5 py-3 flex items-center justify-between hover:bg-white/5 text-right transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <span className="text-lg">⚙️</span>
                <span className="text-sm font-bold text-white">الإعدادات</span>
              </div>
            </button>

            <button
              onClick={() => {
                alert('MetaTrader 5 Mobile (Build 3800)\nحقوق النشر © 2000-2026 MetaQuotes Ltd.\nسيرفر العميل: Exness-MT5Real35');
                setIsDrawerOpen(false);
              }}
              className="w-full px-5 py-3 flex items-center justify-between hover:bg-white/5 text-right transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <span className="text-lg">ℹ️</span>
                <span className="text-sm font-bold text-white">حول التطبيق</span>
              </div>
            </button>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-[#101215] border-t border-[#252930] text-center text-xs text-[#707c8b]">
          MetaTrader 5 Mobile — Exness Edition
        </div>
      </div>
    </div>
  );
};
