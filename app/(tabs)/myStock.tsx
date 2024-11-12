import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import StockCard from '@/components/ui/StockCard';
import { useStock } from '@/context/stock';

const MyStocks = () => {
  const [mystockData, setmyStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { chartData, fetchChartData, stockData, fetchReelData } = useStock();
  
  // Helper function to format dates as YYYY-MM-DD
  const formatDate = (date) => date.toISOString().split('T')[0];

  // Calculate today's and yesterday's dates
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Fetch stock data from the API
  const fetchStockData = async () => {
    console.log("Starting fetchStockData");
    try {
      const response = await fetch('http://154.53.166.2:5024/api/Stock', {
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyIiwidW5pcXVlX25hbWUiOiJzYWZhayIsIm5iZiI6MTczMTI2NTQ5NSwiZXhwIjoxNzMzODU3NDk1LCJpYXQiOjE3MzEyNjU0OTV9.ZZLP0COxvpy3pDRvN_eQwXWGT6eaOuHaRYtECNmm7cE`,
        },
      });

      console.log("Response received:", response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched stock data:", data);

      // Fetch the real-time data for each stock using fetchReelData
      data.forEach(async (stock) => {
        await fetchReelData(stock.symbol); // This will update the stockData state with real-time prices
      });

      setmyStockData(data);

      // Fetch chart data for each stock with today's and yesterday's dates
      data.forEach((stock) => {
        fetchChartData(stock.symbol, formatDate(yesterday), formatDate(today), "1h");
      });
    } catch (error) {
      setError("Failed to fetch stock data.");
      console.error("Error fetching stock data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#191a1f' }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Stocks</Text>
        <Text style={styles.companyCount}>{mystockData.length} Companies</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {mystockData.map((stock) => {
          // Find the real-time stock data from stockData based on the symbol
          const realTimeStock = stockData.find((item) => item.symbol === stock.symbol);
          const marketName = realTimeStock ? realTimeStock.name : 'nan';
          const marketCurrentPrice = realTimeStock ? realTimeStock.currentPrice : stock.purchasePrice;
          const marketChange = realTimeStock ? realTimeStock.priceChangePercent.toFixed(2) : 0;
          return (
            <StockCard
              key={stock?.id}
              name={marketName}
              ticker={stock?.symbol}
              price={marketCurrentPrice} // Send the fetched market price here
              change={marketChange}
              chartData={chartData[stock.symbol]} // Access symbol-specific chart data
              iconUrl={`https://img.logo.dev/ticker/${stock.symbol}?token=pk_L243nCyGQ6KNbSvmAhSl0A`}
              width={60}
              height={200}
            />
          );
        })}

        {/* Render the raw data for debugging */}
        <Text style={{ color: 'white', marginTop: 20 }}>Fetched Data:</Text>
        <Text style={{ color: 'white', padding: 10 }}>{JSON.stringify(mystockData, null, 2)}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1f1f1f',
    backgroundColor: '#191a1f',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  companyCount: {
    color: '#888',
    fontSize: 16,
  },
  container: {
    padding: 16,
  },
});

export default MyStocks;
