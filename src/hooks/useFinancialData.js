import { useState, useEffect } from "react";

// Replace this with your actual API key
const apiKey = import.meta.env.VITE_FMP_API_KEY;


export default function useFinancialData(symbols = []) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = import.meta.env.VITE_FMP_API_KEY || "demo";
        const res = await fetch(
          `https://financialmodelingprep.com/api/v3/quote/${symbols.join(",")}?apikey=${apiKey}`
        );
        const json = await res.json();
        console.log("Fetched:", json);     // 👈 add this
        setData(json);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [symbols]);

  return { data, loading };
}
