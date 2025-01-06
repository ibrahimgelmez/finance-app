import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStock } from '@/context/stock';
import BigStockCard from '@/components/bigStockCard';

const MyWishlist = () => {
  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = 'fb4d2eb4d3msh79aa725ac9fba7bp1ea1ecjsn0973925282e4';

  const navigation = useNavigation(); // Access navigation
  const { chartData, fetchChartData, stockData, fetchReelData } = useStock();

  const formatDate = (date) => date.toISOString().split('T')[0];

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const fetchWishlistData = async () => {
    try {
      const response = await fetch('http://154.53.166.2:5024/api/Wishlist', {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyIiwidW5pcXVlX25hbWUiOiJzYWZhayIsIm5iZiI6MTczNjE1MDIyMSwiZXhwIjoxNzM4ODI4NjIxLCJpYXQiOjE3MzYxNTAyMjF9.QQ_4V4LhDOx_FkQaHcqQ3vcrodzYq0Qs1CBqzA2VjQE`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      data.forEach(async (stock) => {
        await fetchReelData(stock.symbol);
      });

      setWishlistData(data);

      data.forEach((stock) => {
        fetchChartData(
          stock.symbol,
          formatDate(yesterday),
          formatDate(today),
          '1h'
        );
      });
    } catch (error) {
      setError('Failed to fetch wishlist data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlistData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text style={{ color: 'red' }}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#191a1f' }}>
      <ScrollView horizontal contentContainerStyle={styles.container}>
        {wishlistData.map((stock) => {
          const realTimeStock = stockData.find(
            (item) => item.symbol === stock.symbol
          );
          const marketName = realTimeStock ? realTimeStock.name : stock.symbol;
          const marketCurrentPrice = realTimeStock
            ? realTimeStock.currentPrice
            : 'nan';
          const marketChange = realTimeStock?.priceChangePercent?.toFixed(2);
          const chartDataForStock = chartData[stock.symbol] || [];

          return (
            <TouchableOpacity
              key={stock?.id}
              onPress={() =>
                navigation.navigate('StockDetails', {
                  stock: {
                    ...stock,
                    price: marketCurrentPrice, // Include price
                    name: marketName,
                    change: marketChange,
                  },
                })
              }
            >
              <BigStockCard
                name={marketName}
                title={marketName}
                ticker={stock?.symbol}
                price={marketCurrentPrice}
                change={marketChange}
                chartData={chartDataForStock}
                iconUrl={`https://img.logo.dev/ticker/${stock.symbol}?token=pk_L243nCyGQ6KNbSvmAhSl0A`}
                width={60}
                height={200}
              />
            </TouchableOpacity>
          );
        })}
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
    backgroundColor: '#191a1f',
  },
});

export default MyWishlist;
