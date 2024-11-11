import React, { createContext, useContext, useState } from 'react';

// Create the context
const StockContext = createContext();

// Provider component
export const StockProvider = ({ children }) => {
  const [stockData, setStockData] = useState([]);
  const [chartData, setChartData] = useState({}); // Changed to an object to store data per symbol
  const [error, setError] = useState(null);

  // Function to fetch stocks by symbol
  const fetchStocksData = async (symbols) => {
    if (!Array.isArray(symbols) || symbols.length === 0) {
      setError('Geçerli bir semboller listesi girin.');
      return;
    }

    try {
      const response = await fetch(`http://154.53.166.2:5000/api/stocks-by-symbol?symbols=${symbols.join(',')}`);
      const data = await response.json();
      setStockData(data);
      setError(null); // Reset error if the fetch is successful
    } catch (err) {
      setError(`Hata: ${err.message}`);
    }
  };

  // Function to fetch stocks by name
  const fetchStocksDataByName = async (name) => {
    if (!name) {
      setError('Geçerli bir hisse senedi adı girin.');
      return;
    }

    try {
      const response = await fetch(`http://154.53.166.2:5000/api/stocks-by-name?names=${name}`);
      const data = await response.json();
      setStockData(data);
      setError(null); // Reset error if the fetch is successful
    } catch (err) {
      setError(`Hata: ${err.message}`);
    }
  };

  // Function to fetch chart data by symbol and date range
  const fetchChartData = async (symbol, period1, period2, interval) => {
    if (!symbol || !period1 || !period2 || !interval) {
      setError('Geçerli bir sembol ve tarih aralığı girin.');
      return;
    }

    try {
      const response = await fetch(`http://154.53.166.2:5000/api/chart-data?symbol=${symbol}&period1=${period1}&period2=${period2}&interval=${interval}`);
      const data = await response.json();
      
      // Store chart data by symbol
      setChartData((prevChartData) => ({
        ...prevChartData,
        [symbol]: data.quotes || [], // Store the quotes array under the symbol key
      }));
      setError(null); // Reset error if the fetch is successful
    } catch (err) {
      setError(`Hata: ${err.message}`);
    }
  };

  // Fetch Trending Stocks
  const fetchTrendingStocks = async () => {
    const options = {
      method: 'GET',
      headers: {
        'X-Mboum-Secret': '9wcVbbUiv1oHZSnlmCcdrpQLLFFQhWuNgIUXZ1oddnqGaXdRArQYEnffCv10'
      }
    };

    try {
      const response = await fetch('https://mboum.com/api/v1/tr/trending', options);
      const result = await response.json();

      if (result?.data?.[0]?.quotes) {
        setStockData(result.data[0].quotes);
        setError(null);
      } else {
        setError('Trending verileri alınamadı.');
      }
    } catch (error) {
      setError(`Hata: ${error.message}`);
    }
  };

  return (
    <StockContext.Provider value={{ stockData, chartData, fetchStocksData, fetchStocksDataByName, fetchChartData, fetchTrendingStocks, error }}>
      {children}
    </StockContext.Provider>
  );
};

// Custom hook for easier access to context
export const useStock = () => useContext(StockContext);
