import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import StockCard from '@/components/ui/StockCard';
import { useStock } from '@/context/stock';

const MyWishlist = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { chartData, fetchChartData } = useStock();

  const formatDate = (date) => date.toISOString().split('T')[0];

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
console.log(stockData.currentPrice)
  const fetchStockData = async () => {
    try {
      const response = await fetch('http://154.53.166.2:5024/api/Wishlist', {
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyIiwidW5pcXVlX25hbWUiOiJzYWZhayIsIm5iZiI6MTczMTI2NTQ5NSwiZXhwIjoxNzMzODU3NDk1LCJpYXQiOjE3MzEyNjU0OTV9.ZZLP0COxvpy3pDRvN_eQwXWGT6eaOuHaRYtECNmm7cE`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setStockData(data);

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
    const interval = setInterval(() => {
      fetchStockData(); // Her 60 saniyede bir hisse fiyatlarını güncelleyin
    }, 60000);

    return () => clearInterval(interval); // Bileşen kapandığında interval'i temizleyin
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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {stockData.map((stock) => (
          <StockCard
            key={stock?.id}
            name={stock?.stockName}
            ticker={stock?.symbol}
            price={stock?.currentPrice ?? stock?.currentPrice}
            change={stock?.salePrice ? ((stock?.salePrice - stock?.purchasePrice) / stock?.purchasePrice * 100).toFixed(2) : 'N/A'}
            chartData={chartData[stock.symbol]}
            iconUrl={`https://img.logo.dev/ticker/${stock.symbol}?token=pk_L243nCyGQ6KNbSvmAhSl0A`}
            width={60}
            height={200}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default MyWishlist;
