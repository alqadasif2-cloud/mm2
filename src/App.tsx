import React from 'react';
import { TradingProvider, useTrading } from './context/TradingContext';
import { AndroidStatusBar } from './components/AndroidStatusBar';
import { AndroidNavBar } from './components/AndroidNavBar';
import { BottomTabBar } from './components/BottomTabBar';
import { AccountsView } from './components/accounts/AccountsView';
import { QuotesView } from './components/quotes/QuotesView';
import { InteractiveChart } from './components/chart/InteractiveChart';
import { TradeView } from './components/trade/TradeView';
import { HistoryView } from './components/history/HistoryView';
import { MessagesView } from './components/messages/MessagesView';
import { DrawerMenu } from './components/drawer/DrawerMenu';
import { NewOrderModal } from './components/modals/NewOrderModal';
import { AccountInfoModal } from './components/modals/AccountInfoModal';
import { OtpModal } from './components/modals/OtpModal';
import { AddAccountModal } from './components/modals/AddAccountModal';

const MT5AppContent: React.FC = () => {
  const { activeTab, isSimulatorFrame, setIsSimulatorFrame } = useTrading();

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'accounts':
        return <AccountsView />;
      case 'quotes':
        return <QuotesView />;
      case 'chart':
        return <InteractiveChart />;
      case 'trade':
        return <TradeView />;
      case 'history':
        return <HistoryView />;
      case 'messages':
        return <MessagesView />;
      default:
        return <AccountsView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-white flex flex-col items-center justify-center p-0 md:p-4">
      {/* Top Floating Control Bar for Frame Switcher & Quick Navigation */}
      <aside aria-label="شريط التحكم الإضافي" className="hidden md:flex items-center justify-between w-full max-w-[440px] mb-2 px-3 py-1.5 bg-[#14161b] rounded-xl border border-[#252830] text-xs text-[#8e9aa8]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00c853] animate-pulse"></span>
          <span className="font-bold text-white text-[11px]">MetaTrader 5 Mobile (Exness)</span>
        </div>

        <button
          onClick={() => setIsSimulatorFrame(!isSimulatorFrame)}
          className="text-xs px-2.5 py-1 bg-[#1e2229] hover:bg-[#282d36] text-[#64b5f6] font-semibold rounded-lg transition-colors border border-[#2a303c]"
        >
          {isSimulatorFrame ? 'وضع ملء الشاشة' : 'وضع إطار الهاتف'}
        </button>
      </aside>

      {/* Main App Container (Mobile Frame or Full Responsive) */}
      <div
        className={`w-full flex flex-col bg-[#000000] relative overflow-hidden transition-all duration-300 ${
          isSimulatorFrame
            ? 'max-w-[430px] h-[932px] max-h-[96vh] rounded-[44px] shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_2px_1px_#333a44] border-[7px] border-[#1f2228]'
            : 'h-screen max-w-full rounded-none border-none'
        }`}
      >
        {/* Phone Notch/Speaker simulation in frame mode */}
        {isSimulatorFrame && (
          <div className="w-full bg-black pt-2 pb-1 flex justify-center items-center relative z-50">
            <div className="w-20 h-4 bg-[#14161a] rounded-full flex items-center justify-center gap-2 border border-[#22262d]">
              <div className="w-2 h-2 rounded-full bg-[#0d0f12]"></div>
              <div className="w-8 h-1 bg-[#2b3039] rounded-full"></div>
            </div>
          </div>
        )}

        {/* 1. Android Status Bar (Exact replica of top bar: %12, wifi, 3:58 time, notifications) */}
        <AndroidStatusBar />

        {/* 2. Main Screen Area */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {renderActiveScreen()}
        </main>

        {/* 3. Bottom Tab Bar (Quotes, Chart, Trade, History, Messages with badge 2) */}
        <BottomTabBar />

        {/* 4. Android Bottom Nav Bar (||| O <) */}
        <AndroidNavBar />

        {/* Modals & Overlays */}
        <DrawerMenu />
        <NewOrderModal />
        <AccountInfoModal />
        <OtpModal />
        <AddAccountModal />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <TradingProvider>
      <MT5AppContent />
    </TradingProvider>
  );
}
