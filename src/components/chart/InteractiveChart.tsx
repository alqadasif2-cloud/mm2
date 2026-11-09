import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useTrading } from '../../context/TradingContext';
import { Candle, Timeframe } from '../../types/mt5';

export const InteractiveChart: React.FC = () => {
  const {
    selectedSymbol,
    setSelectedSymbol,
    quotes,
    timeframe,
    setTimeframe,
    openTrade,
    openOrderModal,
    setIsDrawerOpen
  } = useTrading();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [crosshairActive, setCrosshairActive] = useState<boolean>(false);
  const [crosshairPos, setCrosshairPos] = useState<{ x: number; y: number } | null>(null);
  const [showIndicators, setShowIndicators] = useState<boolean>(true);
  const [showOneClick, setShowOneClick] = useState<boolean>(true);
  const [lotSize, setLotSize] = useState<number>(0.10);
  const [showRadialMenu, setShowRadialMenu] = useState<boolean>(false);
  const [radialPos, setRadialPos] = useState<{ x: number; y: number }>({ x: 180, y: 260 });
  const [tradeSuccessToast, setTradeSuccessToast] = useState<string | null>(null);

  // Current live quote for selected symbol
  const currentQuote = quotes.find((q) => q.symbol === selectedSymbol) || quotes[0];

  // Generate initial historical candles for the symbol & timeframe
  const [candles, setCandles] = useState<Candle[]>(() => {
    const list: Candle[] = [];
    const basePrice = currentQuote ? currentQuote.bid : 4106.00;
    const now = Date.now();
    const intervalMs = timeframe === 'M1' ? 60000 : timeframe === 'M5' ? 300000 : 900000;
    let prevClose = basePrice - 15;

    for (let i = 60; i >= 0; i--) {
      const time = now - i * intervalMs;
      const volatility = basePrice * 0.0015;
      const change = (Math.random() - 0.48) * volatility;
      const open = prevClose;
      const close = open + change;
      const high = Math.max(open, close) + Math.random() * volatility * 0.7;
      const low = Math.min(open, close) - Math.random() * volatility * 0.7;
      const volume = Math.floor(Math.random() * 450) + 50;

      list.push({ time, open, high, low, close, volume });
      prevClose = close;
    }
    return list;
  });

  // Regenerate candles when symbol changes
  useEffect(() => {
    if (!currentQuote) return;
    const list: Candle[] = [];
    const basePrice = currentQuote.bid;
    const now = Date.now();
    const intervalMs = 60000;
    let prevClose = basePrice * 0.995;

    for (let i = 60; i >= 0; i--) {
      const time = now - i * intervalMs;
      const volatility = basePrice * 0.0012;
      const change = (Math.random() - 0.48) * volatility;
      const open = prevClose;
      const close = open + change;
      const high = Math.max(open, close) + Math.random() * volatility * 0.6;
      const low = Math.min(open, close) - Math.random() * volatility * 0.6;
      const volume = Math.floor(Math.random() * 300) + 40;

      list.push({ time, open, high, low, close, volume });
      prevClose = close;
    }
    setCandles(list);
  }, [selectedSymbol]);

  // Live update the last candle with current ticking price
  useEffect(() => {
    if (!currentQuote) return;
    setCandles((prev) => {
      if (prev.length === 0) return prev;
      const last = { ...prev[prev.length - 1] };
      const currentPrice = currentQuote.bid;
      last.close = currentPrice;
      last.high = Math.max(last.high, currentPrice);
      last.low = Math.min(last.low, currentPrice);
      last.volume += 1;
      return [...prev.slice(0, prev.length - 1), last];
    });
  }, [currentQuote?.bid]);

  // Draw chart on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas to match display size
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Background: Deep MT5 black
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);

    if (candles.length === 0) return;

    // Margin for axes: Price axis on right
    const rightMargin = 68;
    const bottomMargin = 26;
    const topMargin = showOneClick ? 58 : 12;
    const chartWidth = width - rightMargin;
    const chartHeight = height - bottomMargin - topMargin;

    // Visible candles count
    const visibleCount = Math.min(candles.length, 45);
    const visibleCandles = candles.slice(-visibleCount);

    // Compute min and max price
    let minPrice = Infinity;
    let maxPrice = -Infinity;
    visibleCandles.forEach((c) => {
      if (c.low < minPrice) minPrice = c.low;
      if (c.high > maxPrice) maxPrice = c.high;
    });

    // Pad price range
    const priceRange = maxPrice - minPrice || 1;
    const paddedMin = minPrice - priceRange * 0.08;
    const paddedMax = maxPrice + priceRange * 0.08;
    const fullRange = paddedMax - paddedMin;

    const getY = (price: number) => {
      return topMargin + (1 - (price - paddedMin) / fullRange) * chartHeight;
    };

    // Draw Grid Lines
    ctx.strokeStyle = '#16191d';
    ctx.lineWidth = 1;

    // Horizontal price grid lines (5 lines)
    const gridSteps = 6;
    for (let i = 0; i <= gridSteps; i++) {
      const priceVal = paddedMin + (fullRange / gridSteps) * i;
      const y = getY(priceVal);

      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(chartWidth, y);
      ctx.stroke();

      // Price labels on right axis
      ctx.fillStyle = '#7a8694';
      ctx.font = '10px "JetBrains Mono", sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(priceVal.toFixed(currentQuote?.digits || 2), width - 6, y + 3);
    }

    // Vertical time grid lines
    const candleWidth = chartWidth / visibleCount;
    const timeStep = Math.max(1, Math.floor(visibleCount / 5));
    for (let i = 0; i < visibleCount; i += timeStep) {
      const x = i * candleWidth + candleWidth / 2;
      ctx.beginPath();
      ctx.moveTo(x, topMargin);
      ctx.lineTo(x, height - bottomMargin);
      ctx.stroke();

      // Time labels on bottom axis
      const c = visibleCandles[i];
      if (c) {
        const date = new Date(c.time);
        const timeStr = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
        ctx.fillStyle = '#7a8694';
        ctx.font = '10px "JetBrains Mono", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(timeStr, x, height - 8);
      }
    }

    // Draw Moving Averages if enabled
    if (showIndicators && visibleCandles.length > 10) {
      // MA 20 (Red line)
      ctx.strokeStyle = '#f44336';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      let started = false;

      for (let i = 0; i < visibleCount; i++) {
        // Calculate moving average over 10 points
        const windowSize = 8;
        if (i >= windowSize) {
          const slice = visibleCandles.slice(i - windowSize, i);
          const avg = slice.reduce((s, item) => s + item.close, 0) / windowSize;
          const x = i * candleWidth + candleWidth / 2;
          const y = getY(avg);
          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else {
            ctx.lineTo(x, y);
          }
        }
      }
      ctx.stroke();

      // MA 50 (Blue line)
      ctx.strokeStyle = '#2196f3';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      started = false;
      for (let i = 0; i < visibleCount; i++) {
        const windowSize = 16;
        if (i >= windowSize) {
          const slice = visibleCandles.slice(i - windowSize, i);
          const avg = slice.reduce((s, item) => s + item.close, 0) / windowSize;
          const x = i * candleWidth + candleWidth / 2;
          const y = getY(avg);
          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else {
            ctx.lineTo(x, y);
          }
        }
      }
      ctx.stroke();
    }

    // Draw Japanese Candlesticks
    visibleCandles.forEach((c, i) => {
      const isBullish = c.close >= c.open;
      const x = i * candleWidth + candleWidth / 2;
      const yOpen = getY(c.open);
      const yClose = getY(c.close);
      const yHigh = getY(c.high);
      const yLow = getY(c.low);

      const barWidth = Math.max(candleWidth * 0.72, 3);
      const topY = Math.min(yOpen, yClose);
      const bodyHeight = Math.max(Math.abs(yClose - yOpen), 1.5);

      // Candlestick Colors (classic MT5 Bull green #00c853, Bear red #e53935)
      const color = isBullish ? '#00c853' : '#e53935';

      // Draw wick
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(x, yHigh);
      ctx.lineTo(x, yLow);
      ctx.stroke();

      // Draw body
      ctx.fillStyle = color;
      ctx.fillRect(x - barWidth / 2, topY, barWidth, bodyHeight);
    });

    // Draw Ask & Bid Price Horizontal Lines
    if (currentQuote) {
      // Ask Line (Red dashed)
      const yAsk = getY(currentQuote.ask);
      ctx.strokeStyle = '#e53935';
      ctx.setLineDash([3, 3]);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(0, yAsk);
      ctx.lineTo(chartWidth, yAsk);
      ctx.stroke();

      // Ask Pill on right axis
      ctx.setLineDash([]);
      ctx.fillStyle = '#e53935';
      ctx.fillRect(chartWidth + 1, yAsk - 9, rightMargin - 4, 18);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px "JetBrains Mono", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(currentQuote.ask.toFixed(currentQuote.digits), chartWidth + (rightMargin - 4) / 2, yAsk + 3.5);

      // Bid Line (Blue dashed)
      const yBid = getY(currentQuote.bid);
      ctx.strokeStyle = '#2196f3';
      ctx.setLineDash([3, 3]);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(0, yBid);
      ctx.lineTo(chartWidth, yBid);
      ctx.stroke();

      // Bid Pill on right axis
      ctx.setLineDash([]);
      ctx.fillStyle = '#2196f3';
      ctx.fillRect(chartWidth + 1, yBid - 9, rightMargin - 4, 18);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px "JetBrains Mono", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(currentQuote.bid.toFixed(currentQuote.digits), chartWidth + (rightMargin - 4) / 2, yBid + 3.5);
    }

    // Draw Crosshair if active
    if (crosshairActive && crosshairPos) {
      ctx.strokeStyle = '#90a4ae';
      ctx.setLineDash([2, 2]);
      ctx.lineWidth = 1;

      // Vertical line
      ctx.beginPath();
      ctx.moveTo(crosshairPos.x, topMargin);
      ctx.lineTo(crosshairPos.x, height - bottomMargin);
      ctx.stroke();

      // Horizontal line
      ctx.beginPath();
      ctx.moveTo(0, crosshairPos.y);
      ctx.lineTo(chartWidth, crosshairPos.y);
      ctx.stroke();

      ctx.setLineDash([]);

      // Price at crosshair Y
      const priceAtY = paddedMin + (1 - (crosshairPos.y - topMargin) / chartHeight) * fullRange;
      ctx.fillStyle = '#37474f';
      ctx.fillRect(chartWidth + 1, crosshairPos.y - 9, rightMargin - 4, 18);
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px "JetBrains Mono", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(priceAtY.toFixed(currentQuote?.digits || 2), chartWidth + (rightMargin - 4) / 2, crosshairPos.y + 3.5);
    }
  }, [candles, crosshairActive, crosshairPos, showIndicators, showOneClick, currentQuote]);

  // Handle canvas touch / click for crosshair or radial menu
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (crosshairActive) {
      setCrosshairPos({ x, y });
    } else {
      // Toggle MT5 radial wheel menu
      setRadialPos({ x: Math.min(Math.max(x, 100), rect.width - 100), y: Math.min(Math.max(y, 100), rect.height - 100) });
      setShowRadialMenu(!showRadialMenu);
    }
  };

  const handleExecuteQuickTrade = (type: 'buy' | 'sell') => {
    const ok = openTrade(selectedSymbol, type, lotSize);
    if (ok) {
      setTradeSuccessToast(`تم فتح صفقة ${type === 'buy' ? 'شراء' : 'بيع'} ${lotSize} لوت على ${selectedSymbol}`);
      setTimeout(() => setTradeSuccessToast(null), 3000);
    }
  };

  const timeframes: Timeframe[] = ['M1', 'M5', 'M15', 'M30', 'H1', 'H4', 'D1'];

  return (
    <div
      ref={containerRef}
      className="flex-1 flex flex-col bg-[#000000] text-white overflow-hidden relative select-none"
    >
      {/* Top Floating Chart Toolbar */}
      <div className="h-13 bg-[#0a0c0e]/95 border-b border-[#181a1f] px-3 flex items-center justify-between z-30">
        {/* Symbol and Timeframe Selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDrawerOpen(true)}
            aria-label="القائمة"
            className="w-8 h-8 flex items-center justify-center text-[#d8dfe6] active:bg-white/10 rounded-full"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-5 h-5">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Symbol Dropdown */}
          <select
            value={selectedSymbol}
            onChange={(e) => setSelectedSymbol(e.target.value)}
            className="bg-[#191b20] text-white font-bold text-sm px-2.5 py-1 rounded-lg border border-[#2a2d34] outline-none cursor-pointer"
          >
            {quotes.map((q) => (
              <option key={q.symbol} value={q.symbol}>
                {q.symbol} ({q.name})
              </option>
            ))}
          </select>

          {/* Timeframe Chip */}
          <button
            onClick={() => {
              const idx = timeframes.indexOf(timeframe);
              const next = timeframes[(idx + 1) % timeframes.length];
              setTimeframe(next);
            }}
            className="px-2 py-0.5 text-xs font-bold bg-[#1c2229] text-[#64b5f6] border border-[#2a3848] rounded-md"
          >
            {timeframe}
          </button>

          {currentQuote?.source && (
            <span className="hidden sm:flex text-[10px] bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 px-1.5 py-0.5 rounded font-mono font-bold items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></span>
              {currentQuote.source}
            </span>
          )}
        </div>

        {/* Right Side Tools: Crosshair, Indicator 'f', Shapes, One-Click Toggle, New Order */}
        <div className="flex items-center gap-1 text-[#c0cad6]">
          {/* Crosshair tool */}
          <button
            onClick={() => {
              setCrosshairActive(!crosshairActive);
              setCrosshairPos(null);
            }}
            aria-label="أداة التقاطع"
            title="Crosshair"
            className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
              crosshairActive ? 'bg-[#3897f0] text-white' : 'hover:bg-white/10'
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="2" x2="12" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" />
            </svg>
          </button>

          {/* Indicators 'f' button */}
          <button
            onClick={() => setShowIndicators(!showIndicators)}
            aria-label="المؤشرات الفنية"
            title="المؤشرات"
            className={`w-8 h-8 flex items-center justify-center font-serif italic font-bold rounded-lg transition-colors ${
              showIndicators ? 'bg-[#1c2838] text-[#3897f0]' : 'hover:bg-white/10'
            }`}
          >
            ƒ
          </button>

          {/* One-Click Trading Panel Toggle */}
          <button
            onClick={() => setShowOneClick(!showOneClick)}
            aria-label="التداول بنقرة واحدة"
            title="One-Click Trading"
            className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
              showOneClick ? 'bg-[#1c2838] text-[#3897f0]' : 'hover:bg-white/10'
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <rect x="3" y="3" width="8" height="18" rx="1" fill="#e53935" fillOpacity="0.3" stroke="#e53935" />
              <rect x="13" y="3" width="8" height="18" rx="1" fill="#2196f3" fillOpacity="0.3" stroke="#2196f3" />
            </svg>
          </button>

          {/* New Order (+) */}
          <button
            onClick={() => openOrderModal(selectedSymbol)}
            aria-label="صفقة جديدة"
            title="New Order"
            className="w-8 h-8 flex items-center justify-center bg-[#3897f0] text-white rounded-lg shadow-sm font-bold"
          >
            +
          </button>
        </div>
      </div>

      {/* One-Click Trading Top Bar */}
      {showOneClick && currentQuote && (
        <div className="bg-[#121418] border-b border-[#20242b] px-3 py-1.5 flex items-center justify-between z-20">
          {/* SELL Button (Red) */}
          <button
            onClick={() => handleExecuteQuickTrade('sell')}
            className="flex-1 max-w-[120px] bg-[#d32f2f] hover:bg-[#c62828] active:scale-95 text-white py-1 px-2 rounded-lg flex flex-col items-center justify-center transition-all shadow-sm"
          >
            <span className="text-[10px] font-bold tracking-wider leading-none">SELL</span>
            <span className="text-[13px] font-extrabold tabular-nums leading-tight mt-0.5">
              {currentQuote.bid.toFixed(currentQuote.digits)}
            </span>
          </button>

          {/* Lot Size Stepper */}
          <div className="flex items-center gap-1 mx-2">
            <button
              onClick={() => setLotSize((prev) => Math.max(0.01, parseFloat((prev - 0.01).toFixed(2))))}
              className="w-6 h-6 bg-[#1f232a] hover:bg-[#2b303a] rounded text-xs font-bold text-[#8e9aa8]"
            >
              -
            </button>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={lotSize}
              onChange={(e) => setLotSize(parseFloat(e.target.value) || 0.01)}
              className="w-14 text-center bg-[#181b22] text-white font-bold text-xs py-1 rounded border border-[#2e333d] outline-none tabular-nums"
            />
            <button
              onClick={() => setLotSize((prev) => parseFloat((prev + 0.01).toFixed(2)))}
              className="w-6 h-6 bg-[#1f232a] hover:bg-[#2b303a] rounded text-xs font-bold text-[#8e9aa8]"
            >
              +
            </button>
          </div>

          {/* BUY Button (Blue) */}
          <button
            onClick={() => handleExecuteQuickTrade('buy')}
            className="flex-1 max-w-[120px] bg-[#1976d2] hover:bg-[#1565c0] active:scale-95 text-white py-1 px-2 rounded-lg flex flex-col items-center justify-center transition-all shadow-sm"
          >
            <span className="text-[10px] font-bold tracking-wider leading-none">BUY</span>
            <span className="text-[13px] font-extrabold tabular-nums leading-tight mt-0.5">
              {currentQuote.ask.toFixed(currentQuote.digits)}
            </span>
          </button>
        </div>
      )}

      {/* Main Canvas Area */}
      <div className="flex-1 relative cursor-crosshair">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="w-full h-full block"
        />

        {/* OHLC Overlay when Crosshair is Active */}
        {crosshairActive && (
          <div className="absolute top-2 left-2 bg-[#121418]/90 border border-[#2a2f38] rounded-md px-2.5 py-1 text-[10px] text-[#a0aab5] font-mono flex items-center gap-2 pointer-events-none z-20">
            <span>O: <strong className="text-white">{candles[candles.length - 1]?.open.toFixed(currentQuote?.digits || 2)}</strong></span>
            <span>H: <strong className="text-green-400">{candles[candles.length - 1]?.high.toFixed(currentQuote?.digits || 2)}</strong></span>
            <span>L: <strong className="text-red-400">{candles[candles.length - 1]?.low.toFixed(currentQuote?.digits || 2)}</strong></span>
            <span>C: <strong className="text-white">{candles[candles.length - 1]?.close.toFixed(currentQuote?.digits || 2)}</strong></span>
          </div>
        )}

        {/* MT5 Iconic Radial Timeframe Wheel Menu */}
        {showRadialMenu && (
          <div
            className="absolute z-40 pointer-events-auto"
            style={{
              left: `${radialPos.x - 75}px`,
              top: `${radialPos.y - 75}px`
            }}
          >
            {/* Radial Menu Backdrop Click-off */}
            <div
              className="fixed inset-0 z-30"
              onClick={() => setShowRadialMenu(false)}
            ></div>

            {/* The MT5 Radial Ring */}
            <div className="relative w-[150px] h-[150px] rounded-full bg-[#1b1e24]/95 border-2 border-[#3897f0]/70 shadow-2xl flex items-center justify-center z-40 animate-scaleIn">
              {/* Center close button */}
              <button
                onClick={() => setShowRadialMenu(false)}
                className="w-10 h-10 rounded-full bg-[#3897f0] text-white font-bold flex items-center justify-center text-xs shadow-md z-50 hover:bg-[#2884dc]"
              >
                {timeframe}
              </button>

              {/* Surrounding buttons around circle */}
              {timeframes.map((tf, idx) => {
                const angle = (idx / timeframes.length) * 2 * Math.PI - Math.PI / 2;
                const radius = 55;
                const bx = 75 + radius * Math.cos(angle) - 15;
                const by = 75 + radius * Math.sin(angle) - 15;

                return (
                  <button
                    key={tf}
                    onClick={() => {
                      setTimeframe(tf);
                      setShowRadialMenu(false);
                    }}
                    style={{ left: `${bx}px`, top: `${by}px` }}
                    className={`absolute w-7 h-7 rounded-full text-[10px] font-bold flex items-center justify-center transition-all ${
                      timeframe === tf
                        ? 'bg-[#3897f0] text-white shadow-sm'
                        : 'bg-[#252a33] text-[#d0d8e2] hover:bg-[#3897f0]/40'
                    }`}
                  >
                    {tf}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Trade Success Toast Notification */}
        {tradeSuccessToast && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#00c853] text-black font-bold text-xs px-4 py-2 rounded-xl shadow-2xl flex items-center gap-2 z-50 animate-bounce">
            <span>✓</span>
            <span>{tradeSuccessToast}</span>
          </div>
        )}
      </div>
    </div>
  );
};
