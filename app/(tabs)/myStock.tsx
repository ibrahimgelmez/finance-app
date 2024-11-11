import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import StockCard from '@/components/ui/StockCard';
import { useStock } from '@/context/stock';

const MyStocks = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { chartData, fetchChartData } = useStock();

  // Helper function to format dates as YYYY-MM-DD
  const formatDate = (date) => date.toISOString().split('T')[0];

  // Calculate today's and yesterday's dates
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

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
      setStockData(data);

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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Stocks</Text>
        <Text style={styles.companyCount}>{stockData.length} Companies</Text>
      </View>

      {/* Display fetched data on screen */}
      <ScrollView contentContainerStyle={styles.container}>
        {stockData.map((stock) => (
          <StockCard
            key={stock?.id}
            name={stock?.name}
            ticker={stock?.symbol}
            price={stock?.currentPrice ?? stock?.purchasePrice}
            change={stock?.salePrice ? ((stock?.salePrice - stock?.purchasePrice) / stock?.purchasePrice * 100).toFixed(2) : 'N/A'}
            chartData={chartData[stock.symbol]} // Access symbol-specific chart data
            iconUrl={`https://img.logo.dev/ticker/${stock.symbol}?token=pk_L243nCyGQ6KNbSvmAhSl0A`}
            width={60}
            height={200}
          />
        ))}

        {/* Render the raw data for debugging */}
        <Text style={{ color: 'white', marginTop: 20 }}>Fetched Data:</Text>
        <Text style={{ color: 'white', padding: 10 }}>{JSON.stringify(stockData, null, 2)}</Text>
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
    backgroundColor: '#121212',
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
