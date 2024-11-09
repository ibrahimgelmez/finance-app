import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import StockCard from '@/components/ui/StockCard';
import { useStock } from '@/context/stock';

const MyPositions = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { chartData, fetchChartData } = useStock();

  const fetchStockData = async () => {
    console.log('Starting fetchStockData'); // Log the start of the function
    try {
      const response = await fetch('http://154.53.166.2:5024/api/Stock', {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIzIiwidW5pcXVlX25hbWUiOiJzYWZhayIsIm5iZiI6MTczMDk4MzY1OCwiZXhwIjoxNzMzNTc1NjU4LCJpYXQiOjE3MzA5ODM2NTh9.cI3kBx-JXWbnBJjNFQCW7EEj_yKdFNCVNWy9SUlaFFk`,
        },
      });

      console.log('Response received:', response); // Log the raw response object

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched stock data:', data); // Log the fetched data
      setStockData(data);

      // Fetch chart data for each stock after fetching stock data
      data.forEach((stock) => {
        fetchChartData(stock.symbol, '2024-10-08', '2024-10-09', '1h');
      });
    } catch (error) {
      setError('Failed to fetch stock data.');
      console.error('Error fetching stock data:', error); // Log the error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockData();
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
    <SafeAreaView style={{ flex: 1 }}>
      {/* Display fetched data on screen */}
      <ScrollView contentContainerStyle={styles.container}>
        {stockData.map((stock) => (
          <StockCard
            key={stock?.id}
            name={stock?.name}
            ticker={stock?.symbol}
            price={stock?.currentPrice ?? stock?.purchasePrice} // Use currentPrice if available, otherwise purchasePrice
            change={
              stock?.salePrice
                ? (
                    ((stock?.salePrice - stock?.purchasePrice) /
                      stock?.purchasePrice) *
                    100
                  ).toFixed(2)
                : 'N/A'
            }
            chartData={chartData} // Pass the actual chart data
            iconUrl={`https://assets.parqet.com/logos/symbol/${stock?.symbol}?format=jpg`}
            width={60}
            height={200}
          />
        ))}

        {/* Render the raw data for debugging */}
        <Text style={{ color: 'white', marginTop: 20 }}>Fetched Data:</Text>
        <Text style={{ color: 'white', padding: 10 }}>
          {JSON.stringify(stockData, null, 2)}
        </Text>
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

export default MyPositions;
