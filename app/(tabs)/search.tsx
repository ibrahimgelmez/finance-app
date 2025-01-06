import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import axios from 'axios';
import Header from '@/components/ui/header';
import StockCard from '@/components/ui/StockCard';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const fetchStockPrice = async (symbol) => {
  const options = {
    method: 'GET',
    url: 'https://yahoo-finance166.p.rapidapi.com/api/stock/get-price',
    params: {
      region: 'US',
      symbol,
    },
    headers: {
      'x-rapidapi-key': 'fb4d2eb4d3msh79aa725ac9fba7bp1ea1ecjsn0973925282e4',
      'x-rapidapi-host': 'yahoo-finance166.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    const priceData = response.data?.quoteSummary?.result?.[0]?.price || {};
    return {
      price: priceData.regularMarketPrice?.raw || null,
      change: priceData.regularMarketChange?.raw || null,
      high: priceData.regularMarketDayHigh?.raw || null,
      low: priceData.regularMarketDayLow?.raw || null,
    };
  } catch (error) {
    console.error(`Error fetching price for ${symbol}:`, error);
    return { price: null, change: null, high: null, low: null };
  }
};

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stockData, setStockData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigation = useNavigation(); // Use navigation
  const rapidApiOptions = {
    headers: {
      'x-rapidapi-key': 'fb4d2eb4d3msh79aa725ac9fba7bp1ea1ecjsn0973925282e4',
      'x-rapidapi-host': 'yahoo-finance166.p.rapidapi.com',
    },
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
      const response = await axios.request(options);
      const data = response.data;

      console.log('Chart Data Response:', data); // Debug için
      const chartData =
        data?.chart?.result?.[0]?.indicators?.quote?.[0]?.close || [];
      return chartData;
    } catch (error) {
      console.error(`Error fetching chart data for ${symbol}:`, error.message);
      return [];
    }
  };
  const fetchData = useCallback(
    debounce(async (query) => {
      if (!query) {
        setStockData([]);
        setNewsData([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          'https://yahoo-finance166.p.rapidapi.com/api/autocomplete',
          {
            params: { query },
            ...rapidApiOptions,
          }
        );

        const quotes = (response.data.quotes || []).filter(
          (quote) => quote.quoteType === 'EQUITY'
        );

        const priceDataPromises = quotes.map(async (quote) => {
          const priceData = await fetchStockPrice(quote.symbol);
          return { ...quote, ...priceData };
        });

        const mergedData = await Promise.all(priceDataPromises);
        setStockData(mergedData);
        setNewsData(response.data.news || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error fetching data.');
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    fetchData(searchTerm);
  }, [searchTerm]);

  const handleSearchChange = (text) => {
    setSearchTerm(text);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#1ad392' }}>
        <ScrollView style={{ backgroundColor: '#191a1f', flex: 1 }}>
          <View style={{ backgroundColor: '#1ad392', marginBottom: 4 }}>
            <Header />
            <View
              style={{
                alignItems: 'center',
                marginBottom: 24,
                paddingBottom: 4,
              }}
            >
              <Text
                style={{ fontSize: 32, fontWeight: 'bold', color: '#FFFFFF' }}
              >
                $229,375.25
              </Text>
              <Text style={{ color: 'white' }}>Balance Available</Text>
            </View>
          </View>

          {/* Search Input */}
          <View style={{ paddingHorizontal: 10, marginBottom: 16 }}>
            <TextInput
              style={{
                height: 40,
                borderColor: '#1e222a',
                borderWidth: 1,
                paddingHorizontal: 10,
                color: '#FFFFFF',
                backgroundColor: '#333',
                borderRadius: 8,
              }}
              placeholder="Search for a stock (e.g., Apple)"
              placeholderTextColor="#888"
              value={searchTerm}
              onChangeText={handleSearchChange}
            />
          </View>

          {/* Stock Results */}
          <View style={{ marginBottom: 24, paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 18, color: '#FFFFFF', marginBottom: 8 }}>
              Stock Results
            </Text>
            {loading ? (
              <ActivityIndicator size="large" color="#FFFFFF" />
            ) : error ? (
              <Text style={{ color: 'red' }}>{error}</Text>
            ) : stockData.length > 0 ? (
              stockData.map((stock, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={async () => {
                    const chartData = await fetchStockChartData(stock?.symbol);

                    navigation.navigate('StockDetails', {
                      stock: {
                        name:
                          stock?.shortname || stock?.longname || stock?.symbol,
                        symbol: stock?.symbol,
                        price:
                          stock?.price !== null
                            ? stock?.price?.toFixed(2)
                            : 'N/A',
                        change:
                          stock?.change !== null
                            ? stock?.change?.toFixed(2)
                            : 'N/A',
                        high:
                          stock?.high !== null
                            ? stock?.high?.toFixed(2)
                            : 'N/A',
                        low:
                          stock?.low !== null ? stock?.low?.toFixed(2) : 'N/A',
                        chartData,
                        image: `https://img.logo.dev/ticker/${stock?.symbol}?token=pk_L243nCyGQ6KNbSvmAhSl0A`,
                      },
                    });
                  }}
                >
                  <StockCard
                    name={stock?.shortname || stock?.longname || stock?.symbol}
                    ticker={stock?.symbol}
                    chartData={stock?.chartData || []}
                    price={
                      stock?.price !== null ? stock?.price?.toFixed(2) : 'N/A'
                    }
                    change={
                      stock?.change !== null ? stock?.change?.toFixed(2) : 'N/A'
                    }
                    high={
                      stock?.high !== null ? stock?.high?.toFixed(2) : 'N/A'
                    }
                    low={stock?.low !== null ? stock?.low?.toFixed(2) : 'N/A'}
                    iconUrl={`https://img.logo.dev/ticker/${stock?.symbol}?token=pk_L243nCyGQ6KNbSvmAhSl0A`}
                  />
                </TouchableOpacity>
              ))
            ) : (
              <Text style={{ color: 'white' }}>
                No stocks found for "{searchTerm}"
              </Text>
            )}
          </View>

          {/* News Results */}
          <View style={{ marginBottom: 24, paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 18, color: '#FFFFFF', marginBottom: 8 }}>
              News
            </Text>
            {newsData?.length > 0 ? (
              newsData?.map((news, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    Linking.openURL(news?.link);
                  }}
                  style={{ marginBottom: 16 }}
                >
                  <Image
                    source={{ uri: news.thumbnail?.resolutions[0]?.url }}
                    style={{ width: '100%', height: 150, borderRadius: 8 }}
                  />
                  <Text
                    style={{ fontSize: 16, color: '#FFFFFF', marginTop: 8 }}
                  >
                    {news.title}
                  </Text>
                  <Text style={{ color: '#888' }}>{news?.publisher}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={{ color: 'white' }}>No news available.</Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Search;
