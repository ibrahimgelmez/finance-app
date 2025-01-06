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
import StockCard from '@/components/ui/StockCard';
import { useNavigation } from 'expo-router';

const fetchStockPrice = async (symbol) => {
  const options = {
    method: 'GET',
    url: `https://yahoo-finance166.p.rapidapi.com/api/stock/get-price`,
    params: { region: 'US', symbol },
    headers: {
      'x-rapidapi-key': 'fb4d2eb4d3msh79aa725ac9fba7bp1ea1ecjsn0973925282e4',
      'x-rapidapi-host': 'yahoo-finance166.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(
      `${options.url}?region=${options.params.region}&symbol=${symbol}`,
      {
        method: 'GET',
        headers: options.headers,
      }
    );

    const data = await response.json();

    console.log(`Response for ${symbol}:`, JSON.stringify(data, null, 2));

    const priceData = data?.quoteSummary?.result?.[0]?.price || {};

    return {
      symbol,
      name: priceData.shortName || priceData.longName || symbol,
      price: priceData.regularMarketPrice?.raw || null,
      change: priceData.regularMarketChange?.raw || null,
      high: priceData.regularMarketDayHigh?.raw || null,
      low: priceData.regularMarketDayLow?.raw || null,
    };
  } catch (error) {
    console.error(`Error fetching price for ${symbol}:`, error);
    return {
      symbol,
      name: symbol,
      price: null,
      change: null,
      high: null,
      low: null,
    };
  }
};

const fetchStockChartData = async (symbol) => {
  const options = {
    method: 'GET',
    url: `https://yahoo-finance166.p.rapidapi.com/api/stock/get-chart`,
    params: { region: 'US', symbol, interval: '1d', range: '1mo' },
    headers: {
      'x-rapidapi-key': 'fb4d2eb4d3msh79aa725ac9fba7bp1ea1ecjsn0973925282e4',
      'x-rapidapi-host': 'yahoo-finance166.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(
      `${options.url}?region=${options.params.region}&symbol=${symbol}&interval=${options.params.interval}&range=${options.params.range}`,
      {
        method: 'GET',
        headers: options.headers,
      }
    );

    const data = await response.json();
    const chartData =
      data?.chart?.result?.[0]?.indicators?.quote?.[0]?.close || [];
    return chartData;
  } catch (error) {
    console.error(`Error fetching chart data for ${symbol}:`, error);
    return [];
  }
};

const MyStocks = () => {
  const [mystockData, setMyStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigation = useNavigation();

  const fetchStockList = async () => {
    try {
      const response = await fetch('http://154.53.166.2:5024/api/Stock', {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyIiwidW5pcXVlX25hbWUiOiJzYWZhayIsIm5iZiI6MTczMzk1MDEyNSwiZXhwIjoxNzM2NjI4NTI1LCJpYXQiOjE3MzM5NTAxMjV9.hjTa7V8ubqvgdpzLK88miptRS_MtPntCnoX14bixnNY`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const stockList = await response.json();

      console.log(
        'Fetched stock list:',
        stockList.map((stock) => stock.symbol)
      );

      const enrichedData = await Promise.all(
        stockList.map(async (stock) => {
          const [priceInfo, chartData] = await Promise.all([
            fetchStockPrice(stock.symbol),
            fetchStockChartData(stock.symbol),
          ]);
          return { ...stock, ...priceInfo, chartData };
        })
      );

      setMyStockData(enrichedData);
    } catch (err) {
      setError('Failed to fetch stock data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockList();
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Stocks</Text>
        <Text style={styles.companyCount}>{mystockData.length} Companies</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {mystockData.map((stock) => (
          <TouchableOpacity
            key={stock.symbol}
            onPress={() => navigation.navigate('StockDetails', { stock })}
            style={styles.card}
          >
            <StockCard
              name={stock.name}
              ticker={stock.symbol}
              price={stock.price !== null ? stock.price.toFixed(2) : 'N/A'}
              change={stock.change !== null ? stock.change.toFixed(2) : 'N/A'}
              chartData={stock.chartData}
              iconUrl={`https://img.logo.dev/ticker/${stock.symbol}?token=pk_L243nCyGQ6KNbSvmAhSl0A`}
            />
          </TouchableOpacity>
        ))}
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
