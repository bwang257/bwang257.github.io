import React from "react";
import { TrendingUp } from "lucide-react";
import { useFinancialData } from "../hooks/useFinancialData";

/* ===============================================================
   1. TICKER ITEM
================================================================ */
const TickerItem = ({ symbol, price, change, changesPercentage }) => {
  const isPositive = parseFloat(change) >= 0;
  const colorClass = isPositive ? "text-green-400" : "text-red-400";

  return (
    <div className="flex items-center gap-4 px-8 flex-shrink-0">
      {/* Symbol */}
      <span className="text-gray-200 font-medium tracking-tight">{symbol}</span>

      {/* Price */}
      <span className="text-gray-100 font-semibold">${price}</span>

      {/* Change */}
      <span className={`flex items-center text-sm ${colorClass}`}>
        <TrendingUp
          size={14}
          className={`mr-1 ${isPositive ? "" : "rotate-180"}`}
        />
        {change} ({changesPercentage}%)
      </span>
    </div>
  );
};

/* ===============================================================
   2. FINANCIAL TICKER
================================================================ */
export const FinancialTicker = () => {
  const { data, loading } = useFinancialData(["NVDA", "AMD", "MSFT", "GOOG", "META", "AAPL", "AMZN", "TSLA", "INTC", "SMCI"]);

  // Duplicate data for infinite loop scroll
  const items = [...data, ...data];

  return (
    <div className="fixed top-0 left-0 right-0 h-12 bg-slate-950/80 text-white border-b border-slate-800 z-50 overflow-hidden">
      <div className="absolute top-0 left-0 flex items-center h-full animate-scroll-left whitespace-nowrap">
        {loading ? (
          <div className="px-6 text-gray-400">Loading market data...</div>
        ) : (
          items.map((item, i) => <TickerItem key={i} {...item} />)
        )}
      </div>
    </div>
  );
};
