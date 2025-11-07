import { useState, useEffect } from "react";

// Replace this with your actual API key
const API_KEY = "BmNs8fhXgnTdXcDVlWtCH2I35mTHRuq3";

export const useFinancialData = (symbols = ["NVDA", "AMD", "MSFT", "GOOG", "META", "AAPL", "AMZN", "TSLA", "INTC", "SMCI"]) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://financialmodelingprep.com/api/v3/quote/${symbols.join(
          ","
        )}?apikey=${API_KEY}`;
        const res = await fetch(url);
        const json = await res.json();

        const formatted = json.map((quote) => ({
          symbol: quote.symbol,
          price: quote.price?.toFixed(2),
          change: quote.change?.toFixed(2),
          changesPercentage: quote.changesPercentage?.toFixed(2),
        }));

        setData(formatted);
      } catch (error) {
        console.error("Error fetching financial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 240000); // refresh every 60s
    return () => clearInterval(interval);
  }, [symbols]);

  return { data, loading };
};
