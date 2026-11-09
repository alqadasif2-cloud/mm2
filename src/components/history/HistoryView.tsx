import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { Deal } from '../../types/mt5';

export const HistoryView: React.FC = () => {
  const {
    historyDeals,
    activeAccount,
    setIsDrawerOpen
  } = useTrading();

  const [filterPeriod, setFilterPeriod] = useState<'today' | 'week' | 'month' | 'all'>('month');
  const [activeSubTab, setActiveSubTab] = useState<'deals' | 'orders' | 'positions'>('deals');
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  const [expandedDealId, setExpandedDealId] = useState<string | null>(null);

  // Financial summary
  const totalProfit = historyDeals.reduce((sum, d) => sum + d.profit, 0);
  const totalCommission = historyDeals.reduce((sum, d) => sum + d.commission, 0);
  const totalSwap = historyDeals.reduce((sum, d) => sum + d.swap, 0);
  const deposit = activeAccount.balance - totalProfit;
  const withdrawal = 0.00;

  return (
    <div className="flex-1 flex flex-col bg-[#000000] text-white overflow-hidden select-none">
      {/* Header */}
      <header className="h-14 px-3.5 flex items-center justify-between border-b border-[#181818] bg-[#000000]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDrawerOpen(true)}
            aria-label="القائمة"
            className="w-10 h-10 flex items-center justify-center text-white active:bg-white/10 rounded-full"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-6 h-6">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <h1 className="text-xl font-bold tracking-wide">السجل</h1>
        </div>

        {/* Calendar period picker button */}
        <div className="relative">
          <button
            onClick={() => setCalendarOpen(!calendarOpen)}
            aria-label="تحديد الفترة الزمنية"
            className="w-9 h-9 flex items-center justify-center active:bg-white/10 rounded-full text-[#d8dfe6]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </button>

          {calendarOpen && (
            <div
              className="absolute left-0 top-11 w-44 bg-[#1f2125] border border-[#2e3238] rounded-xl shadow-2xl py-1.5 z-50 text-xs font-semibold text-right"
              onClick={() => setCalendarOpen(false)}
            >
              {[
                { id: 'today', label: 'اليوم' },
                { id: 'week', label: 'الأسبوع الماضي' },
                { id: 'month', label: 'الشهر الماضي' },
                { id: 'all', label: 'كل السجل (مخصص)' }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setFilterPeriod(p.id as any)}
                  className={`w-full text-right px-4 py-2 hover:bg-white/10 transition-colors ${
                    filterPeriod === p.id ? 'text-[#3897f0] font-bold' : 'text-[#d8dfe6]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Sub Tabs: الصفقات / الأوامر / المراكز */}
      <div className="flex border-b border-[#181a1f] bg-[#0c0e11]">
        {[
          { id: 'deals', label: 'الصفقات' },
          { id: 'orders', label: 'الأوامر' },
          { id: 'positions', label: 'المراكز' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`flex-1 py-2 text-xs font-bold transition-colors border-b-2 ${
              activeSubTab === tab.id
                ? 'border-[#3897f0] text-[#3897f0] bg-[#3897f0]/5'
                : 'border-transparent text-[#8e9aa8] hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Financial Summary Strip (Authentic MT5 Android History) */}
      <div className="bg-[#121417] border-b border-[#1f2227] px-4 py-2.5 text-xs">
        <div className="grid grid-cols-2 gap-x-6 gap-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[#8e9aa8]">الربح:</span>
            <span
              className={`font-bold tabular-nums ${
                totalProfit >= 0 ? 'text-[#64b5f6]' : 'text-[#e57373]'
              }`}
            >
              {totalProfit >= 0 ? `+${totalProfit.toFixed(2)}` : totalProfit.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#8e9aa8]">الإيداع:</span>
            <span className="font-bold text-white tabular-nums">
              {deposit.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#8e9aa8]">المبادلة (Swap):</span>
            <span className="font-bold text-[#c5d0dc] tabular-nums">
              {totalSwap.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#8e9aa8]">السحب:</span>
            <span className="font-bold text-white tabular-nums">
              {withdrawal.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#8e9aa8]">العمولة:</span>
            <span className="font-bold text-[#c5d0dc] tabular-nums">
              {totalCommission.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between border-t border-[#1c1f24] pt-0.5">
            <span className="text-[#8e9aa8] font-bold">الرصيد:</span>
            <span className="font-bold text-white tabular-nums">
              {activeAccount.balance.toFixed(2)} USD
            </span>
          </div>
        </div>
      </div>

      {/* Deals List */}
      <div className="flex-1 overflow-y-auto divide-y divide-[#16181b]">
        {historyDeals.length === 0 ? (
          <div className="h-48 flex items-center justify-center text-xs text-[#8e9aa8]">
            لا توجد صفقات مسجلة في هذه الفترة
          </div>
        ) : (
          historyDeals.map((deal) => {
            const isExpanded = expandedDealId === deal.id;

            return (
              <div
                key={deal.id}
                onClick={() => setExpandedDealId(isExpanded ? null : deal.id)}
                className="p-3.5 hover:bg-[#121418] transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">
                        {deal.symbol}
                      </span>
                      <span
                        className={`text-xs font-bold uppercase px-1.5 py-0.2 rounded ${
                          deal.type === 'buy'
                            ? 'bg-[#1976d2]/20 text-[#64b5f6]'
                            : 'bg-[#d32f2f]/20 text-[#ef5350]'
                        }`}
                      >
                        {deal.type} {deal.lots.toFixed(2)}
                      </span>
                    </div>

                    <div className="text-xs text-[#8e9aa8] mt-1 tabular-nums">
                      <span>{deal.openPrice.toFixed(2)}</span>
                      <span className="mx-1 text-[#5a6572]">→</span>
                      <span className="text-[#c5d0dc]">{deal.closePrice.toFixed(2)}</span>
                    </div>

                    <div className="text-[10px] text-[#707c8b] mt-0.5 tabular-nums">
                      {deal.closeTime}
                    </div>
                  </div>

                  {/* Net Profit in Blue or Red */}
                  <div className="text-left">
                    <span
                      className={`text-base font-extrabold tabular-nums tracking-tight ${
                        deal.profit >= 0 ? 'text-[#64b5f6]' : 'text-[#e57373]'
                      }`}
                    >
                      {deal.profit >= 0 ? `+${deal.profit.toFixed(2)}` : deal.profit.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-[#8e9aa8] block">USD</span>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-2.5 pt-2 border-t border-[#1c1f24] text-[11px] text-[#8e9aa8] grid grid-cols-2 gap-2 bg-[#0d0f12] p-2 rounded-lg tabular-nums animate-fadeIn">
                    <div>التذكرة: <strong className="text-white">#{deal.ticket}</strong></div>
                    <div>فتح: <strong className="text-white">{deal.openTime.split(' ')[1]}</strong></div>
                    <div>العمولة: <strong className="text-white">{deal.commission.toFixed(2)}</strong></div>
                    <div>المبادلة: <strong className="text-white">{deal.swap.toFixed(2)}</strong></div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
