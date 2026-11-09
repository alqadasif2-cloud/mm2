import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';

export const AddAccountModal: React.FC = () => {
  const { addAccountModalOpen, setAddAccountModalOpen, addNewAccount } = useTrading();

  const [broker, setBroker] = useState<string>('Exness Technologies Ltd');
  const [server, setServer] = useState<string>('Exness-MT5Real35');
  const [accountType, setAccountType] = useState<'demo' | 'real'>('demo');
  const [accountName, setAccountName] = useState<string>('إسلام');
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [deposit, setDeposit] = useState<number>(3000);

  if (!addAccountModalOpen) return null;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addNewAccount({
      name: accountName || 'إسلام',
      broker,
      server,
      type: accountType,
      accountNumber: accountNumber || String(Math.floor(250000000 + Math.random() * 9999999)),
      balance: accountType === 'demo' ? deposit : 500,
      currency: 'USD',
      leverage: '1:2000'
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 select-none animate-fadeIn"
      onClick={() => setAddAccountModalOpen(false)}
    >
      <div
        className="bg-[#1b1e24] border border-[#2e333d] rounded-2xl w-full max-w-sm overflow-hidden text-right shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 bg-[#14161b] border-b border-[#262b34] flex items-center justify-between">
          <button
            onClick={() => setAddAccountModalOpen(false)}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#8e9aa8] hover:text-white"
          >
            ✕
          </button>
          <h3 className="text-base font-bold text-white">إضافة حساب تداول جديد</h3>
          <div className="w-8"></div>
        </div>

        <form onSubmit={handleCreate} className="p-4 space-y-3.5 text-xs">
          <div>
            <label className="text-[#8e9aa8] block mb-1">الشركة الوسيطة (Broker):</label>
            <select
              value={broker}
              onChange={(e) => {
                setBroker(e.target.value);
                if (e.target.value.includes('Exness')) {
                  setServer('Exness-MT5Real35');
                } else {
                  setServer('MetaQuotes-Demo');
                }
              }}
              className="w-full bg-[#121418] border border-[#2c313a] rounded-xl px-3 py-2 text-white font-bold outline-none"
            >
              <option value="Exness Technologies Ltd">Exness Technologies Ltd</option>
              <option value="MetaQuotes Ltd.">MetaQuotes Ltd.</option>
              <option value="IC Markets Global">IC Markets Global</option>
              <option value="XM Global Limited">XM Global Limited</option>
            </select>
          </div>

          <div>
            <label className="text-[#8e9aa8] block mb-1">اسم صاحب الحساب:</label>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="اسم صاحب الحساب (مثلاً: إسلام)"
              className="w-full bg-[#121418] border border-[#2c313a] rounded-xl px-3 py-2 text-white font-bold outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[#8e9aa8] block mb-1">نوع الحساب:</label>
              <select
                value={accountType}
                onChange={(e) => setAccountType(e.target.value as any)}
                className="w-full bg-[#121418] border border-[#2c313a] rounded-xl px-3 py-2 text-white font-bold outline-none"
              >
                <option value="demo">تجريبي (Demo)</option>
                <option value="real">حقيقي (Real)</option>
              </select>
            </div>

            <div>
              <label className="text-[#8e9aa8] block mb-1">الخادم (Server):</label>
              <input
                type="text"
                value={server}
                onChange={(e) => setServer(e.target.value)}
                className="w-full bg-[#121418] border border-[#2c313a] rounded-xl px-3 py-2 text-white font-bold outline-none"
              />
            </div>
          </div>

          {accountType === 'demo' ? (
            <div>
              <label className="text-[#8e9aa8] block mb-1">رصيد الإيداع التجريبي (USD):</label>
              <select
                value={deposit}
                onChange={(e) => setDeposit(Number(e.target.value))}
                className="w-full bg-[#121418] border border-[#2c313a] rounded-xl px-3 py-2 text-white font-bold outline-none tabular-nums"
              >
                <option value={1000}>1,000 USD</option>
                <option value={3000}>3,000 USD</option>
                <option value={5000}>5,000 USD</option>
                <option value={10000}>10,000 USD</option>
              </select>
            </div>
          ) : (
            <div>
              <label className="text-[#8e9aa8] block mb-1">رقم تسجيل الدخول (Login):</label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="256476260"
                className="w-full bg-[#121418] border border-[#2c313a] rounded-xl px-3 py-2 text-white font-bold outline-none tabular-nums"
              />
            </div>
          )}

          <div className="pt-2 flex gap-2">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-[#3897f0] hover:bg-[#2884dc] text-white font-bold rounded-xl transition-colors text-xs"
            >
              حفظ وتسجيل الدخول
            </button>
            <button
              type="button"
              onClick={() => setAddAccountModalOpen(false)}
              className="px-4 py-2.5 bg-[#282b30] hover:bg-[#34383f] text-[#8e9aa8] font-bold rounded-xl transition-colors text-xs"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
