import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import StockCard from '@/components/ui/StockCard';
import { useStock } from '@/context/stock';

const MyPositions = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = 'fb4d2eb4d3msh79aa725ac9fba7bp1ea1ecjsn0973925282e4';

  const { chartData, fetchChartData } = useStock();
  const navigation = useNavigation();

  const fetchStockData = async () => {
    console.log('Starting fetchStockData'); // Log the start of the function
    try {
      const response = await fetch('http://154.53.166.2:5024/api/Stock', {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyIiwidW5pcXVlX25hbWUiOiJzYWZhayIsIm5iZiI6MTczMzk1MDEyNSwiZXhwIjoxNzM2NjI4NTI1LCJpYXQiOjE3MzM5NTAxMjV9.hjTa7V8ubqvgdpzLK88miptRS_MtPntCnoX14bixnNY`,
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
    const fetchStocks = async () => {
      try {
        const response = await axios.get(
          'https://yahoo-finance166.p.rapidapi.com/api/stock/get-price',
          {
            params: {
              region: 'US',
              symbol: 'TSLA',
            },
            headers: {
              'x-rapidapi-key': API_KEY,
              'x-rapidapi-host': 'yahoo-finance166.p.rapidapi.com',
            },
          }
        );

        const stockData = response.data.quoteSummary.result.map((item) => ({
          symbol: item.price.symbol,
          name: item.price.longName,
          price: item.price.regularMarketPrice.raw,
          changePercent: item.price.regularMarketChangePercent.raw,
          image: `https://img.logo.dev/ticker/${item.price.symbol}?token=pk_L243nCyGQ6KNbSvmAhSl0A`,
        }));

        setStocks(stockData);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {stocks.map((stock, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate('StockDetails', { stock })} // Detay ekranına yönlendir
          >
            <Image source={{ uri: stock.image }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.stockName}>{stock.name}</Text>
              <Text style={styles.stockSymbol}>{stock.symbol}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.stockPrice}>${stock.price}</Text>
              <Text
                style={[
                  styles.changePercent,
                  { color: stock.changePercent >= 0 ? 'green' : 'red' },
                ]}
              >
                {stock.changePercent >= 0 ? '+' : ''}
                {(stock.changePercent * 100).toFixed(2)}%
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Render the raw data for debugging */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
    marginTop: 12,
  },
  header: {
    color: '#ffffff',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  stockName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stockSymbol: {
    color: '#888888',
    fontSize: 14,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  stockPrice: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  changePercent: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default MyPositions;
