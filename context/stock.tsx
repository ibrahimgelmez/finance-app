import React, { createContext, useContext, useState } from 'react';

// Create the context
const StockContext = createContext();

// Provider component
export const StockProvider = ({ children }) => {
  const [stockData, setStockData] = useState([]);
  const [chartData, setChartData] = useState({}); // Store chart data per symbol
  const [error, setError] = useState(null);

  // Function to fetch stock prices by symbols
  const fetchStocksData = async (symbols) => {
    if (!Array.isArray(symbols) || symbols.length === 0) {
      setError('Geçerli bir semboller listesi girin.');
      return;
    }

    try {
      const response = await fetch(`http://154.53.166.2:5000/api/stocks-by-symbol?symbols=${symbols.join(',')}`);
      const data = await response.json();

      if (data && Array.isArray(data)) {
        const formattedData = data.map((stock) => ({
          symbol: stock.symbol,
          name: stock.shortName,
          currentPrice: stock.regularMarketPrice,
          priceChangePercent: stock.regularMarketChangePercent, // Percent change
          marketTime: stock.regularMarketTime,
          preMarketPrice: stock.preMarketPrice, // Pre-market price
          preMarketChange: stock.preMarketChange || stock.symbol, // Pre-market change
          preMarketChangePercent: stock.preMarketChangePercent, // Pre-market percent change
          regularMarketDayHigh: stock.regularMarketDayHigh, // Daily high
          regularMarketDayLow: stock.regularMarketDayLow, // Daily low
          marketCap: stock.marketCap, // Market capitalization
          fiftyTwoWeekHigh: stock.fiftyTwoWeekHigh, // 52-week high
          fiftyTwoWeekLow: stock.fiftyTwoWeekLow, // 52-week low
          dividendYield: stock.dividendYield, // Dividend yield
        }));
        setStockData(formattedData);
        setError(null); // Reset error if fetch is successful
      } else {
        setError('Fiyat verileri alınamadı.');
      }
    } catch (err) {
      setError(`Hata: ${err.message}`);
    }
  };

  // Function to fetch a single stock's data
  const fetchReelData = async (symbol) => {
    if (!symbol) {
      setError('Please provide a valid stock symbol.');
      return;
    }

    try {
      const response = await fetch(`http://154.53.166.2:5000/api/stocks-by-symbol?symbols=${symbol}`);
      const data = await response.json();

      if (data && Array.isArray(data)) {
        const reelData = data[0]; // Assuming the API returns an array with one item for the symbol
        console.log(reelData.displayName); // Debugging line
        const formattedStockData = {
          symbol: reelData.symbol,
          name: reelData.shortName,
          longName: reelData.longName,
          currentPrice: reelData.regularMarketPrice,
          priceChangePercent: reelData.regularMarketChangePercent,
          marketTime: reelData.regularMarketTime,
          preMarketPrice: reelData.preMarketPrice || reelData,
          preMarketChange: reelData.preMarketChange,
          preMarketChangePercent: reelData.preMarketChangePercent,
          regularMarketDayHigh: reelData.regularMarketDayHigh,
          regularMarketDayLow: reelData.regularMarketDayLow,
          marketCap: reelData.marketCap,
          fiftyTwoWeekHigh: reelData.fiftyTwoWeekHigh,
          fiftyTwoWeekLow: reelData.fiftyTwoWeekLow,
          dividendYield: reelData.dividendYield,
        };

        // Update stock data state
        setStockData((prevStockData) => {
          const existingData = prevStockData.filter(stock => stock.symbol !== symbol);
          return [...existingData, formattedStockData];
        });

        setError(null); // Reset error if fetch is successful
      } else {
        setError('No data found for the provided symbol.');
      }
    } catch (err) {
      setError(`Error fetching reel data: ${err.message}`);
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

 

  // Function to fetch stock data by name
  const fetchStocksDataByName = async (name) => {
    if (!name) {
      setError('Please provide a valid stock name.');
      return;
    }

    try {
      const response = await fetch(`http://154.53.166.2:5000/api/stocks-by-name?name=${name}`);
      const data = await response.json();

      if (data && Array.isArray(data)) {
        const formattedData = data.map((stock) => ({
          symbol: stock.symbol,
          name: stock.shortName,
          currentPrice: stock.regularMarketPrice,
          priceChangePercent: stock.regularMarketChangePercent, // Percent change
          marketTime: stock.regularMarketTime,
          preMarketPrice: stock.preMarketPrice, // Pre-market price
          preMarketChange: stock.preMarketChange || stock.symbol, // Pre-market change
          preMarketChangePercent: stock.preMarketChangePercent, // Pre-market percent change
          regularMarketDayHigh: stock.regularMarketDayHigh, // Daily high
          regularMarketDayLow: stock.regularMarketDayLow, // Daily low
          marketCap: stock.marketCap, // Market capitalization
          fiftyTwoWeekHigh: stock.fiftyTwoWeekHigh, // 52-week high
          fiftyTwoWeekLow: stock.fiftyTwoWeekLow, // 52-week low
          dividendYield: stock.dividendYield, // Dividend yield
        }));
        setStockData(formattedData);
        setError(null); // Reset error if fetch is successful
      } else {
        setError('Fiyat verileri alınamadı.');
      }
    } catch (err) {
      setError(`Hata: ${err.message}`);
    }
  };

  return (
    <StockContext.Provider value={{ stockData, chartData, fetchStocksData, fetchChartData, fetchReelData, fetchStocksDataByName, error }}>
      {children}
    </StockContext.Provider>
  );
};

// Custom hook for easier access to context
export const useStock = () => useContext(StockContext);
