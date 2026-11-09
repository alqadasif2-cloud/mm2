import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Account, SymbolQuote, Position, Deal, MessageItem, TabType, Timeframe } from '../types/mt5';

interface TradingContextType {
  activeAccount: Account;
  accounts: Account[];
  setActiveAccount: (account: Account) => void;
  quotes: SymbolQuote[];
  selectedSymbol: string;
  setSelectedSymbol: (symbol: string) => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  timeframe: Timeframe;
  setTimeframe: (tf: Timeframe) => void;
  positions: Position[];
  historyDeals: Deal[];
  openTrade: (symbol: string, type: 'buy' | 'sell', lots: number, sl?: number, tp?: number) => boolean;
  closePosition: (positionId: string) => void;
  modifyPosition: (positionId: string, sl?: number, tp?: number) => void;
  messages: MessageItem[];
  markMessageAsRead: (id: string) => void;
  unreadCount: number;
  totalProfit: number;
  equity: number;
  margin: number;
  freeMargin: number;
  marginLevel: number;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  isSimulatorFrame: boolean;
  setIsSimulatorFrame: (show: boolean) => void;
  openOrderModal: (symbol?: string) => void;
  orderModalSymbol: string | null;
  closeOrderModal: () => void;
  accountInfoModalOpen: boolean;
  setAccountInfoModalOpen: (open: boolean) => void;
  otpModalOpen: boolean;
  setOtpModalOpen: (open: boolean) => void;
  addAccountModalOpen: boolean;
  setAddAccountModalOpen: (open: boolean) => void;
  addNewAccount: (account: Partial<Account>) => void;
  isBinanceConnected: boolean;
}

const INITIAL_ACCOUNTS: Account[] = [
  {
    id: 'exness-trial-16',
    name: 'Standard',
    broker: 'Exness Technologies Ltd',
    server: 'Exness-MT5Trial16',
    accountNumber: '472970564',
    balance: 29.35,
    currency: 'USD',
    type: 'demo',
    leverage: '1:2000',
    logoType: 'exness',
    lastKnownLabel: 'آخر ما عرف، USD'
  },
  {
    id: 'metaquotes-demo-50',
    name: 'Eslam Alqadasi',
    broker: 'MetaQuotes Ltd.',
    server: 'MetaQuotes-Demo',
    accountNumber: '5057410470',
    balance: 97370.33,
    currency: 'USD',
    type: 'demo',
    leverage: '1:100',
    logoType: 'metaquotes',
    lastKnownLabel: 'آخر ما عرف، USD'
  },
  {
    id: 'exness-real-35',
    name: 'طارق',
    broker: 'Exness Technologies Ltd',
    server: 'Exness-MT5Real35',
    accountNumber: '256476260',
    balance: 1026.87,
    currency: 'USD',
    type: 'real',
    leverage: '1:2000',
    logoType: 'exness',
    lastKnownLabel: 'آخر ما عرف، USD'
  }
];

const INITIAL_QUOTES: SymbolQuote[] = [
  {
    symbol: 'XAUUSD',
    name: 'الذهب مقابل الدولار الأمريكي',
    digits: 2,
    bid: 4132.77,
    ask: 4132.97,
    spread: 20,
    high: 4133.60,
    low: 4054.85,
    time: '15:58:22',
    change: 1.64,
    category: 'metals',
    source: 'Twelve Data API'
  },
  {
    symbol: 'XAGUSD',
    name: 'الفضة مقابل الدولار الأمريكي',
    digits: 3,
    bid: 46.870,
    ask: 46.885,
    spread: 15,
    high: 47.130,
    low: 46.340,
    time: '15:58:22',
    change: -0.13,
    category: 'metals',
    source: 'Twelve Data API'
  },
  {
    symbol: 'EURUSD',
    name: 'اليورو مقابل الدولار الأمريكي',
    digits: 5,
    bid: 1.08425,
    ask: 1.08437,
    spread: 12,
    high: 1.08740,
    low: 1.08210,
    time: '15:58:21',
    change: -0.18,
    category: 'forex'
  },
  {
    symbol: 'GBPUSD',
    name: 'الجنيه الإسترليني مقابل الدولار',
    digits: 5,
    bid: 1.27180,
    ask: 1.27196,
    spread: 16,
    high: 1.27650,
    low: 1.26890,
    time: '15:58:19',
    change: 0.32,
    category: 'forex'
  },
  {
    symbol: 'USDJPY',
    name: 'الدولار مقابل الين الياباني',
    digits: 3,
    bid: 154.215,
    ask: 154.229,
    spread: 14,
    high: 154.800,
    low: 153.750,
    time: '15:58:20',
    change: 0.44,
    category: 'forex'
  },
  {
    symbol: 'BTCUSD',
    name: 'البيتكوين مقابل الدولار (Binance)',
    digits: 2,
    bid: 67450.00,
    ask: 67475.00,
    spread: 2500,
    high: 68100.00,
    low: 66250.00,
    time: '15:58:22',
    change: 1.82,
    category: 'crypto',
    source: 'Binance Live'
  },
  {
    symbol: 'US30',
    name: 'مؤشر داو جونز الأمريكي',
    digits: 1,
    bid: 39420.5,
    ask: 39423.5,
    spread: 30,
    high: 39650.0,
    low: 39210.0,
    time: '15:58:15',
    change: -0.25,
    category: 'indices'
  },
  {
    symbol: 'USDCHF',
    name: 'الدولار مقابل الفرنك السويسري',
    digits: 5,
    bid: 0.90820,
    ask: 0.90835,
    spread: 15,
    high: 0.91200,
    low: 0.90550,
    time: '15:58:12',
    change: 0.08,
    category: 'forex'
  },
  {
    symbol: 'AUDUSD',
    name: 'الدولار الأسترالي مقابل الأمريكي',
    digits: 5,
    bid: 0.66240,
    ask: 0.66254,
    spread: 14,
    high: 0.66580,
    low: 0.65920,
    time: '15:58:18',
    change: 0.12,
    category: 'forex'
  },
  {
    symbol: 'USDCAD',
    name: 'الدولار مقابل الدولار الكندي',
    digits: 5,
    bid: 1.36850,
    ask: 1.36868,
    spread: 18,
    high: 1.37200,
    low: 1.36500,
    time: '15:58:09',
    change: -0.15,
    category: 'forex'
  }
];

const INITIAL_POSITIONS: Position[] = [];

const INITIAL_HISTORY: Deal[] = [];

const INITIAL_MESSAGES: MessageItem[] = [
  {
    id: 'msg-1',
    title: 'إشعار أمان Exness: تسجيل دخول ناجح',
    content: 'تم تسجيل الدخول بنجاح إلى حساب MT5 الخاص بك رقم 256476260 على الخادم Exness-MT5Real35 من عنوان IP موثوق.',
    sender: 'Exness Security',
    time: 'منذ 15 دقيقة',
    read: false,
    type: 'security'
  },
  {
    id: 'msg-2',
    title: 'تحليل فني: مستويات دعم ومقاومة الذهب XAUUSD',
    content: 'يختبر الذهب حالياً مستوى 4106$ للأونصة مدعوماً بتوقعات خفض الفائدة. مستويات المقاومة التالية عند 4125$ والدعم عند 4090$.',
    sender: 'MQL5 Financial News',
    time: 'منذ ساعتين',
    read: false,
    type: 'news'
  },
  {
    id: 'msg-3',
    title: 'تحديث منصة MetaTrader 5 للهاتف المحمول',
    content: 'إصدار جديد برقم 5.0.3800 يتضمن تحسينات في سرعة تنفيذ الأوامر ورسوم بيانية أسرع ودعم مؤشرات متقدمة.',
    sender: 'MetaQuotes Support',
    time: 'أمس 18:30',
    read: true,
    type: 'system'
  }
];

const TradingContext = createContext<TradingContextType | undefined>(undefined);

export const TradingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Primary active account is the Exness Real 35 account under the name "اسلام" (First in list)
  const [accounts, setAccounts] = useState<Account[]>(INITIAL_ACCOUNTS);
  const [activeAccount, setActiveAccountState] = useState<Account>(INITIAL_ACCOUNTS[0]);
  const [quotes, setQuotes] = useState<SymbolQuote[]>(INITIAL_QUOTES);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('XAUUSD');
  const [isBinanceConnected, setIsBinanceConnected] = useState<boolean>(false);
  // Initial tab matches user request and screenshot
  const [activeTab, setActiveTab] = useState<TabType>('accounts');
  const [timeframe, setTimeframe] = useState<Timeframe>('M15');
  const [positions, setPositions] = useState<Position[]>(INITIAL_POSITIONS);
  const [historyDeals, setHistoryDeals] = useState<Deal[]>(INITIAL_HISTORY);
  const [messages, setMessages] = useState<MessageItem[]>(INITIAL_MESSAGES);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isSimulatorFrame, setIsSimulatorFrame] = useState<boolean>(true);
  
  // Modals
  const [orderModalSymbol, setOrderModalSymbol] = useState<string | null>(null);
  const [accountInfoModalOpen, setAccountInfoModalOpen] = useState<boolean>(false);
  const [otpModalOpen, setOtpModalOpen] = useState<boolean>(false);
  const [addAccountModalOpen, setAddAccountModalOpen] = useState<boolean>(false);

  // Switch active account and adjust balance
  const setActiveAccount = (account: Account) => {
    setActiveAccountState(account);
  };

  // Live Binance WebSocket + REST Connection for BTCUSD
  useEffect(() => {
    let ws: WebSocket | null = null;
    let reconnectTimeout: any = null;
    let isCancelled = false;

    const connectBinance = () => {
      try {
        // 1. Initial snapshot from Binance REST API immediately
        fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT')
          .then((res) => res.json())
          .then((data) => {
            if (isCancelled || !data || !data.lastPrice) return;
            const price = parseFloat(data.lastPrice);
            const bid = parseFloat(data.bidPrice) || price;
            const ask = parseFloat(data.askPrice) || price + 1.0;
            const high = parseFloat(data.highPrice) || price;
            const low = parseFloat(data.lowPrice) || price;
            const change = parseFloat(data.priceChangePercent) || 0;
            const now = new Date();
            const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

            setQuotes((prev) =>
              prev.map((q) =>
                q.symbol === 'BTCUSD'
                  ? {
                      ...q,
                      bid,
                      ask,
                      high,
                      low,
                      change,
                      time: timeStr
                    }
                  : q
              )
            );
            setIsBinanceConnected(true);
          })
          .catch((err) => {
            console.log('Binance REST fetch fallback', err);
          });

        // 2. Connect to Binance live ticker WebSocket stream
        ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');

        ws.onopen = () => {
          setIsBinanceConnected(true);
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (!data || !data.c) return;

            const newBid = parseFloat(data.b || data.c);
            const newAsk = parseFloat(data.a || (parseFloat(data.c) + 1.5).toFixed(2));
            const newHigh = parseFloat(data.h || data.c);
            const newLow = parseFloat(data.l || data.c);
            const change = parseFloat(data.P || 0);

            const now = new Date();
            const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

            setQuotes((prev) =>
              prev.map((q) => {
                if (q.symbol !== 'BTCUSD') return q;
                const isUp = newBid >= q.bid;
                return {
                  ...q,
                  bid: newBid,
                  ask: newAsk,
                  high: newHigh,
                  low: newLow,
                  change,
                  time: timeStr,
                  tickDirection: isUp ? 'up' : 'down'
                };
              })
            );
          } catch (e) {
            // ignore JSON parse error
          }
        };

        ws.onerror = () => {
          // silently handle socket error
        };

        ws.onclose = () => {
          if (!isCancelled) {
            setIsBinanceConnected(false);
            reconnectTimeout = setTimeout(connectBinance, 3000);
          }
        };
      } catch (err) {
        if (!isCancelled) {
          reconnectTimeout = setTimeout(connectBinance, 5000);
        }
      }
    };

    connectBinance();

    return () => {
      isCancelled = true;
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
      if (ws) {
        ws.close();
      }
    };
  }, []);

  // Live Twelve Data API feed for Gold (XAUUSD) & Silver (XAGUSD)
  useEffect(() => {
    const TWELVE_DATA_KEY = 'f348542a01f64309aeb042123ffccf54';
    let isCancelled = false;

    const fetchMetals = () => {
      fetch(`https://api.twelvedata.com/quote?symbol=XAU/USD,SLV&apikey=${TWELVE_DATA_KEY}`)
        .then((res) => res.json())
        .then((data) => {
          if (isCancelled || !data) return;

          const now = new Date();
          const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

          setQuotes((prev) =>
            prev.map((q) => {
              // 1. Gold XAUUSD from Twelve Data
              if (q.symbol === 'XAUUSD' && data['XAU/USD'] && data['XAU/USD'].close) {
                const gold = data['XAU/USD'];
                const price = parseFloat(gold.close);
                const isUp = price >= q.bid;
                const high = parseFloat(gold.high) || Math.max(q.high, price);
                const low = parseFloat(gold.low) || Math.min(q.low, price);
                const change = parseFloat(gold.percent_change) || q.change;
                return {
                  ...q,
                  bid: parseFloat(price.toFixed(2)),
                  ask: parseFloat((price + 0.20).toFixed(2)),
                  high,
                  low,
                  change,
                  time: timeStr,
                  tickDirection: isUp ? 'up' : 'down'
                };
              }

              // 2. Silver XAGUSD from Twelve Data (SLV / Silver Spot)
              if (q.symbol === 'XAGUSD' && data['SLV'] && data['SLV'].close) {
                const silver = data['SLV'];
                const price = parseFloat(silver.close);
                const isUp = price >= q.bid;
                const high = parseFloat(silver.high) || Math.max(q.high, price);
                const low = parseFloat(silver.low) || Math.min(q.low, price);
                const change = parseFloat(silver.percent_change) || q.change;
                return {
                  ...q,
                  bid: parseFloat(price.toFixed(3)),
                  ask: parseFloat((price + 0.015).toFixed(3)),
                  high,
                  low,
                  change,
                  time: timeStr,
                  tickDirection: isUp ? 'up' : 'down'
                };
              }

              return q;
            })
          );
        })
        .catch((err) => {
          console.log('Twelve Data metals fetch error:', err);
        });
    };

    fetchMetals();
    // Poll every 30 seconds to respect Twelve Data free limits
    const intervalId = setInterval(fetchMetals, 30000);

    return () => {
      isCancelled = true;
      clearInterval(intervalId);
    };
  }, []);

  // Live ticking simulation for forex/metals (BTCUSD excluded as it has Binance live feed!)
  useEffect(() => {
    const interval = setInterval(() => {
      setQuotes((prevQuotes) =>
        prevQuotes.map((q) => {
          // BTCUSD is connected live to Binance WebSocket!
          if (q.symbol === 'BTCUSD') return q;

          // 40% chance of ticking
          if (Math.random() > 0.45) return q;

          const isUp = Math.random() > 0.49;
          const pipSize = Math.pow(10, -q.digits);
          const delta = (isUp ? 1 : -1) * (Math.floor(Math.random() * 3) + 1) * pipSize;
          
          let newBid = parseFloat((q.bid + delta).toFixed(q.digits));
          let newAsk = parseFloat((newBid + q.spread * pipSize).toFixed(q.digits));

          const newHigh = Math.max(q.high, newAsk);
          const newLow = Math.min(q.low, newBid);

          const now = new Date();
          const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

          return {
            ...q,
            bid: newBid,
            ask: newAsk,
            high: newHigh,
            low: newLow,
            time: timeStr,
            tickDirection: isUp ? 'up' : 'down'
          };
        })
      );
    }, 850);

    return () => clearInterval(interval);
  }, []);

  // Update open positions' current prices and P&L based on live quotes
  useEffect(() => {
    setPositions((prevPositions) =>
      prevPositions.map((pos) => {
        const quote = quotes.find((q) => q.symbol === pos.symbol);
        if (!quote) return pos;

        const currentPrice = pos.type === 'buy' ? quote.bid : quote.ask;
        let profit = 0;

        if (pos.symbol === 'XAUUSD') {
          // Gold: 1 lot = 100 oz. Difference * 100 * lots
          profit = pos.type === 'buy'
            ? (currentPrice - pos.openPrice) * 100 * pos.lots
            : (pos.openPrice - currentPrice) * 100 * pos.lots;
        } else if (pos.symbol === 'XAGUSD') {
          // Silver: 1 lot = 5000 oz. Difference * 5000 * lots
          profit = pos.type === 'buy'
            ? (currentPrice - pos.openPrice) * 5000 * pos.lots
            : (pos.openPrice - currentPrice) * 5000 * pos.lots;
        } else if (pos.symbol === 'BTCUSD') {
          // BTC: 1 lot = 1 BTC
          profit = pos.type === 'buy'
            ? (currentPrice - pos.openPrice) * pos.lots
            : (pos.openPrice - currentPrice) * pos.lots;
        } else if (pos.symbol === 'USDJPY') {
          profit = pos.type === 'buy'
            ? ((currentPrice - pos.openPrice) / currentPrice) * 100000 * pos.lots
            : ((pos.openPrice - currentPrice) / currentPrice) * 100000 * pos.lots;
        } else {
          // Standard forex pair: 1 lot = 100,000 units
          profit = pos.type === 'buy'
            ? (currentPrice - pos.openPrice) * 100000 * pos.lots
            : (pos.openPrice - currentPrice) * 100000 * pos.lots;
        }

        const netProfit = parseFloat((profit + pos.swap + pos.commission).toFixed(2));

        return {
          ...pos,
          currentPrice,
          profit: netProfit
        };
      })
    );
  }, [quotes]);

  // Financial calculations
  const totalProfit = positions.reduce((sum, p) => sum + p.profit, 0);
  const equity = parseFloat((activeAccount.balance + totalProfit).toFixed(2));
  
  // Calculate margin used (assuming 1:2000 leverage for Real Exness, 1:100 for Demo)
  const leverageRatio = activeAccount.leverage === '1:2000' ? 2000 : 100;
  const margin = parseFloat(
    positions
      .reduce((sum, p) => {
        const notional =
          p.symbol === 'XAUUSD'
            ? p.lots * 100 * p.openPrice
            : p.symbol === 'XAGUSD'
            ? p.lots * 5000 * p.openPrice
            : p.lots * 100000;
        return sum + notional / leverageRatio;
      }, 0)
      .toFixed(2)
  );

  const freeMargin = parseFloat((equity - margin).toFixed(2));
  const marginLevel = margin > 0 ? parseFloat(((equity / margin) * 100).toFixed(2)) : 0;

  // Open a new trade
  const openTrade = useCallback(
    (symbol: string, type: 'buy' | 'sell', lots: number, sl?: number, tp?: number) => {
      const quote = quotes.find((q) => q.symbol === symbol);
      if (!quote) return false;

      const openPrice = type === 'buy' ? quote.ask : quote.bid;
      const commission = -parseFloat((lots * 7).toFixed(2));
      const now = new Date();
      const openTime = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      const newPos: Position = {
        id: `pos-${Date.now()}`,
        ticket: Math.floor(80000000 + Math.random() * 19999999),
        symbol,
        type,
        lots,
        openPrice,
        currentPrice: openPrice,
        sl,
        tp,
        swap: 0,
        commission,
        profit: commission, // initially minus commission
        openTime
      };

      setPositions((prev) => [newPos, ...prev]);
      return true;
    },
    [quotes]
  );

  // Close position and record deal in history
  const closePosition = useCallback(
    (positionId: string) => {
      const pos = positions.find((p) => p.id === positionId);
      if (!pos) return;

      const now = new Date();
      const closeTime = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      const newDeal: Deal = {
        id: `deal-${Date.now()}`,
        ticket: pos.ticket,
        symbol: pos.symbol,
        type: pos.type,
        lots: pos.lots,
        openPrice: pos.openPrice,
        closePrice: pos.currentPrice,
        sl: pos.sl,
        tp: pos.tp,
        swap: pos.swap,
        commission: pos.commission,
        profit: pos.profit,
        openTime: pos.openTime,
        closeTime
      };

      // Add to history
      setHistoryDeals((prev) => [newDeal, ...prev]);

      // Remove from active positions
      setPositions((prev) => prev.filter((p) => p.id !== positionId));

      // Update active account balance
      setActiveAccountState((prev) => {
        const newBalance = parseFloat((prev.balance + pos.profit).toFixed(2));
        const updated = { ...prev, balance: newBalance };
        // Sync in accounts list
        setAccounts((accs) =>
          accs.map((a) => (a.id === updated.id ? updated : a))
        );
        return updated;
      });
    },
    [positions]
  );

  // Modify SL / TP
  const modifyPosition = useCallback((positionId: string, sl?: number, tp?: number) => {
    setPositions((prev) =>
      prev.map((p) => (p.id === positionId ? { ...p, sl, tp } : p))
    );
  }, []);

  const markMessageAsRead = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m))
    );
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  const openOrderModal = (symbol?: string) => {
    setOrderModalSymbol(symbol || selectedSymbol);
  };

  const closeOrderModal = () => {
    setOrderModalSymbol(null);
  };

  const addNewAccount = (acc: Partial<Account>) => {
    const newAcc: Account = {
      id: `acc-${Date.now()}`,
      name: acc.name || 'إسلام',
      broker: acc.broker || 'Exness Technologies Ltd',
      server: acc.server || 'Exness-MT5Real35',
      accountNumber: acc.accountNumber || String(Math.floor(200000000 + Math.random() * 99999999)),
      balance: acc.balance ?? 1000,
      currency: 'USD',
      type: acc.type || 'demo',
      leverage: acc.leverage || '1:2000',
      logoType: acc.logoType || (acc.broker?.toLowerCase().includes('exness') ? 'exness' : 'metaquotes'),
      lastKnownLabel: 'آخر ما عرف، USD'
    };
    setAccounts((prev) => [newAcc, ...prev]);
    setActiveAccountState(newAcc);
    setAddAccountModalOpen(false);
  };

  return (
    <TradingContext.Provider
      value={{
        activeAccount,
        accounts,
        setActiveAccount,
        quotes,
        selectedSymbol,
        setSelectedSymbol,
        activeTab,
        setActiveTab,
        timeframe,
        setTimeframe,
        positions,
        historyDeals,
        openTrade,
        closePosition,
        modifyPosition,
        messages,
        markMessageAsRead,
        unreadCount,
        totalProfit,
        equity,
        margin,
        freeMargin,
        marginLevel,
        isDrawerOpen,
        setIsDrawerOpen,
        isSimulatorFrame,
        setIsSimulatorFrame,
        openOrderModal,
        orderModalSymbol,
        closeOrderModal,
        accountInfoModalOpen,
        setAccountInfoModalOpen,
        otpModalOpen,
        setOtpModalOpen,
        addAccountModalOpen,
        setAddAccountModalOpen,
        addNewAccount,
        isBinanceConnected
      }}
    >
      {children}
    </TradingContext.Provider>
  );
};

export const useTrading = () => {
  const context = useContext(TradingContext);
  if (!context) {
    throw new Error('useTrading must be used within a TradingProvider');
  }
  return context;
};
