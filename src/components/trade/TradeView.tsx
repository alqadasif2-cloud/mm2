import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { Position } from '../../types/mt5';

export const TradeView: React.FC = () => {
  const {
    activeAccount,
    positions,
    totalProfit,
    equity,
    margin,
    freeMargin,
    marginLevel,
    closePosition,
    modifyPosition,
    openOrderModal,
    setActiveTab,
    setSelectedSymbol,
    setIsDrawerOpen
  } = useTrading();

  const [expandedPosId, setExpandedPosId] = useState<string | null>(null);
  const [modifyingPos, setModifyingPos] = useState<Position | null>(null);
  const [newSl, setNewSl] = useState<string>('');
  const [newTp, setNewTp] = useState<string>('');

  const handleOpenModify = (pos: Position) => {
    setModifyingPos(pos);
    setNewSl(pos.sl ? String(pos.sl) : '');
    setNewTp(pos.tp ? String(pos.tp) : '');
  };

  const handleSaveModify = () => {
    if (!modifyingPos) return;
    modifyPosition(
      modifyingPos.id,
      newSl ? parseFloat(newSl) : undefined,
      newTp ? parseFloat(newTp) : undefined
    );
    setModifyingPos(null);
  };

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
          <div>
            <h1 className="text-xl font-bold tracking-wide">التداول</h1>
          </div>
        </div>

        {/* Right tools: Sort & New Order (+) */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => openOrderModal()}
            aria-label="صفقة جديدة"
            className="w-9 h-9 flex items-center justify-center bg-[#3897f0] text-white rounded-full shadow-md font-bold text-lg active:scale-95 transition-transform"
          >
            +
          </button>
        </div>
      </header>

      {/* Account Financials Summary Card (Authentic MT5 Android style) */}
      <div className="bg-[#121417] border-b border-[#1f2227] px-4 py-3 text-sm">
        <div className="flex items-center justify-between py-1">
          <span className="text-[#8e9aa8] text-xs font-semibold">الرصيد:</span>
          <span className="font-bold text-white tabular-nums tracking-wide">
            {activeAccount.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {activeAccount.currency}
          </span>
        </div>

        <div className="flex items-center justify-between py-1">
          <span className="text-[#8e9aa8] text-xs font-semibold">حقوق الملكية:</span>
          <span className="font-bold text-white tabular-nums tracking-wide">
            {equity.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {activeAccount.currency}
          </span>
        </div>

        <div className="flex items-center justify-between py-1">
          <span className="text-[#8e9aa8] text-xs font-semibold">الهامش الحر:</span>
          <span className="font-bold text-white tabular-nums tracking-wide">
            {freeMargin.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {activeAccount.currency}
          </span>
        </div>

        <div className="flex items-center justify-between py-1">
          <span className="text-[#8e9aa8] text-xs font-semibold">مستوى الهامش (%):</span>
          <span className="font-bold text-white tabular-nums tracking-wide">
            {marginLevel > 0 ? `${marginLevel.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%` : '—'}
          </span>
        </div>

        <div className="flex items-center justify-between py-1">
          <span className="text-[#8e9aa8] text-xs font-semibold">الهامش المستخدم:</span>
          <span className="font-bold text-white tabular-nums tracking-wide">
            {margin.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {activeAccount.currency}
          </span>
        </div>

        {/* Total Floating Profit Banner */}
        <div className="mt-2 pt-2 border-t border-[#1c1f24] flex items-center justify-between">
          <span className="text-xs text-[#8e9aa8]">إجمالي الربح/الخسارة العائم:</span>
          <span
            className={`font-extrabold text-base tabular-nums ${
              totalProfit >= 0 ? 'text-[#64b5f6]' : 'text-[#e57373]'
            }`}
          >
            {totalProfit >= 0 ? `+${totalProfit.toFixed(2)}` : totalProfit.toFixed(2)} {activeAccount.currency}
          </span>
        </div>
      </div>

      {/* Positions Section Header */}
      <div className="px-4 py-1.5 bg-[#0a0c0e] border-b border-[#16181b] flex items-center justify-between text-xs text-[#8e9aa8] font-bold">
        <span>المراكز المفتوحة ({positions.length})</span>
        <span>الربح</span>
      </div>

      {/* Open Positions List */}
      <div className="flex-1 overflow-y-auto divide-y divide-[#16181b]">
        {positions.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-[#8e9aa8]">
            <div className="w-16 h-16 rounded-full bg-[#16181c] flex items-center justify-center text-2xl mb-3">
              📊
            </div>
            <p className="text-sm font-semibold text-white">لا توجد صفقات مفتوحة حالياً</p>
            <p className="text-xs text-[#707c8b] mt-1">
              افتح صفقة جديدة من الشارت أو قائمة الأسعار لبدء التداول
            </p>
            <button
              onClick={() => openOrderModal()}
              className="mt-4 px-5 py-2 bg-[#3897f0] hover:bg-[#2884dc] text-white text-xs font-bold rounded-xl shadow-md transition-colors"
            >
              فتح صفقة جديدة
            </button>
          </div>
        ) : (
          positions.map((pos) => {
            const isExpanded = expandedPosId === pos.id;

            return (
              <div
                key={pos.id}
                onClick={() => setExpandedPosId(isExpanded ? null : pos.id)}
                className="p-3.5 hover:bg-[#121418] transition-colors cursor-pointer"
              >
                {/* Main Position Row */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white tracking-wide">
                        {pos.symbol}
                      </span>
                      <span
                        className={`text-xs font-extrabold uppercase px-1.5 py-0.2 rounded ${
                          pos.type === 'buy'
                            ? 'bg-[#1976d2]/20 text-[#64b5f6]'
                            : 'bg-[#d32f2f]/20 text-[#ef5350]'
                        }`}
                      >
                        {pos.type} {pos.lots.toFixed(2)}
                      </span>
                    </div>

                    <div className="text-xs text-[#8e9aa8] mt-1 tabular-nums">
                      <span>{pos.openPrice.toFixed(2)}</span>
                      <span className="mx-1 text-[#5a6572]">→</span>
                      <span className="text-[#c5d0dc]">{pos.currentPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Net Profit in Blue or Red */}
                  <div className="text-left">
                    <span
                      className={`text-base font-extrabold tabular-nums tracking-tight ${
                        pos.profit >= 0 ? 'text-[#64b5f6]' : 'text-[#e57373]'
                      }`}
                    >
                      {pos.profit >= 0 ? `+${pos.profit.toFixed(2)}` : pos.profit.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-[#8e9aa8] block">USD</span>
                  </div>
                </div>

                {/* Expanded Details Drawer */}
                {isExpanded && (
                  <div
                    className="mt-3 pt-3 border-t border-[#1c1f24] space-y-2 text-xs text-[#8e9aa8] animate-fadeIn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="grid grid-cols-2 gap-2 text-[11px] tabular-nums bg-[#0e1013] p-2.5 rounded-xl border border-[#1b1e24]">
                      <div>
                        <span>S/L (وقف الخسارة): </span>
                        <strong className="text-white">{pos.sl || 'غير محدد'}</strong>
                      </div>
                      <div>
                        <span>T/P (أخذ الربح): </span>
                        <strong className="text-white">{pos.tp || 'غير محدد'}</strong>
                      </div>
                      <div>
                        <span>التذكرة (Ticket): </span>
                        <strong className="text-white">#{pos.ticket}</strong>
                      </div>
                      <div>
                        <span>المبادلة (Swap): </span>
                        <strong className="text-white">{pos.swap.toFixed(2)}</strong>
                      </div>
                      <div>
                        <span>العمولة: </span>
                        <strong className="text-white">{pos.commission.toFixed(2)}</strong>
                      </div>
                      <div>
                        <span>الوقت: </span>
                        <strong className="text-white">{pos.openTime.split(' ')[1]}</strong>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      {/* Close Position */}
                      <button
                        onClick={() => closePosition(pos.id)}
                        className="py-2 px-2 bg-[#d32f2f] hover:bg-[#c62828] text-white font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-1 shadow-sm"
                      >
                        <span>إغلاق المركز</span>
                      </button>

                      {/* Modify Position */}
                      <button
                        onClick={() => handleOpenModify(pos)}
                        className="py-2 px-2 bg-[#1f242d] hover:bg-[#282f3b] text-[#64b5f6] font-bold rounded-lg text-xs border border-[#2d3542] transition-colors flex items-center justify-center gap-1"
                      >
                        <span>تعديل S/L T/P</span>
                      </button>

                      {/* View Chart */}
                      <button
                        onClick={() => {
                          setSelectedSymbol(pos.symbol);
                          setActiveTab('chart');
                        }}
                        className="py-2 px-2 bg-[#1f242d] hover:bg-[#282f3b] text-white font-bold rounded-lg text-xs border border-[#2d3542] transition-colors flex items-center justify-center gap-1"
                      >
                        <span>الرسم البياني</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Modify Position Modal */}
      {modifyingPos && (
        <div
          className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 z-50"
          onClick={() => setModifyingPos(null)}
        >
          <div
            className="bg-[#1f2125] border border-[#2e3238] rounded-2xl w-full max-w-sm p-5 space-y-4 text-right shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#2e3238]">
              <h3 className="font-bold text-white text-base">
                تعديل الأمر #{modifyingPos.ticket} ({modifyingPos.symbol})
              </h3>
              <span className="text-xs uppercase font-extrabold text-[#64b5f6]">
                {modifyingPos.type} {modifyingPos.lots}
              </span>
            </div>

            <div>
              <label className="text-xs text-[#8e9aa8] block mb-1">وقف الخسارة (Stop Loss):</label>
              <input
                type="number"
                step="0.01"
                placeholder="أدخل سعر وقف الخسارة"
                value={newSl}
                onChange={(e) => setNewSl(e.target.value)}
                className="w-full bg-[#121417] border border-[#2e3238] rounded-xl px-3 py-2 text-white text-sm font-bold outline-none tabular-nums"
              />
            </div>

            <div>
              <label className="text-xs text-[#8e9aa8] block mb-1">أخذ الربح (Take Profit):</label>
              <input
                type="number"
                step="0.01"
                placeholder="أدخل سعر أخذ الربح"
                value={newTp}
                onChange={(e) => setNewTp(e.target.value)}
                className="w-full bg-[#121417] border border-[#2e3238] rounded-xl px-3 py-2 text-white text-sm font-bold outline-none tabular-nums"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleSaveModify}
                className="flex-1 py-2.5 bg-[#3897f0] hover:bg-[#2884dc] text-white font-bold rounded-xl text-xs transition-colors"
              >
                تطبيق التعديل
              </button>
              <button
                onClick={() => setModifyingPos(null)}
                className="px-4 py-2.5 bg-[#282b30] hover:bg-[#34383f] text-[#8e9aa8] font-bold rounded-xl text-xs transition-colors"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
