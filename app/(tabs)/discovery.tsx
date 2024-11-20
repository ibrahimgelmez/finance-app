import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, ActivityIndicator, TextInput, Image, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';
import Header from '@/components/ui/header';
import StockCard from '@/components/ui/StockCard';

const fetchStockPrice = async (symbol) => {
  const options = {
    method: 'GET',
    url: 'https://yahoo-finance166.p.rapidapi.com/api/stock/get-price',
    params: {
      region: 'US',
      symbol,
    },
    headers: {
      'x-rapidapi-key': 'cd04661eb6msh8638f17e507e7bbp1183c5jsn31d7703d6851',
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

const Discovery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stockData, setStockData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const rapidApiOptions = {
    headers: {
      'x-rapidapi-key': 'cd04661eb6msh8638f17e507e7bbp1183c5jsn31d7703d6851',
      'x-rapidapi-host': 'yahoo-finance166.p.rapidapi.com',
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Autocomplete API'den verileri al
        const response = await axios.get(
          'https://yahoo-finance166.p.rapidapi.com/api/autocomplete',
          {
            params: { query: searchTerm || 'AAPL' },
            ...rapidApiOptions,
          }
        );

    // Sadece hisseleri (quoteType === 'EQUITY') filtrele
    const quotes = (response.data.quotes || []).filter((quote) => quote.quoteType === 'EQUITY');

    setStockData(quotes); // Filtrelenmiş hisseleri state'e kaydet
    setNewsData(response.data.news || []);

        // Her bir sembol için fiyat bilgisi al
        const priceDataPromises = quotes.map(async (quote) => {
          const priceData = await fetchStockPrice(quote.symbol);
          return { ...quote, ...priceData };
        });

        const mergedData = await Promise.all(priceDataPromises);
        setStockData(mergedData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  const handleSearchChange = (text) => {
    setSearchTerm(text);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1ad392' }}>
      <ScrollView style={{ backgroundColor: '#191a1f', flex: 1 }}>
        <View style={{ backgroundColor: '#1ad392', marginBottom: 4 }}>
          <Header />
          <View style={{ alignItems: 'center', marginBottom: 24, paddingBottom: 4 }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#FFFFFF' }}>$229,375.25</Text>
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
          <Text style={{ fontSize: 18, color: '#FFFFFF', marginBottom: 8 }}>Stock Results</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#FFFFFF" />
          ) : error ? (
            <Text style={{ color: 'red' }}>{error}</Text>
          ) : stockData.length > 0 ? (
            stockData.map((stock, index) => (
              <StockCard
                key={index}
                name={stock?.shortname || stock?.longname || stock?.symbol} // Stock name
                ticker={stock?.symbol}
                price={stock?.price !== null ? stock?.price.toFixed(2) : 'N/A'}
                change={stock?.change !== null ? stock?.change.toFixed(2) : 'N/A'}
                high={stock?.high !== null ? stock?.high.toFixed(2) : 'N/A'}
                low={stock?.low !== null ? stock?.low.toFixed(2) : 'N/A'}
                iconUrl={`https://img.logo.dev/ticker/${stock?.symbol}?token=pk_L243nCyGQ6KNbSvmAhSl0A`}
              />
            ))
          ) : (
            <Text style={{ color: 'white' }}>No stocks found for "{searchTerm}"</Text>
          )}
        </View>

        {/* News Results */}
        <View style={{ marginBottom: 24, paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 18, color: '#FFFFFF', marginBottom: 8 }}>News</Text>
          {newsData.length > 0 ? (
            newsData.map((news, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  Linking.openURL(news.link);
                }}
                style={{ marginBottom: 16 }}
              >
                <Image
                  source={{ uri: news.thumbnail?.resolutions[0]?.url }}
                  style={{ width: '100%', height: 150, borderRadius: 8 }}
                />
                <Text style={{ fontSize: 16, color: '#FFFFFF', marginTop: 8 }}>{news.title}</Text>
                <Text style={{ color: '#888' }}>{news.publisher}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ color: 'white' }}>No news available.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Discovery;
