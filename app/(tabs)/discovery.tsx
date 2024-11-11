// Discovery.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, ActivityIndicator, TextInput } from 'react-native';
import Header from '@/components/ui/header';
import StockCard from '@/components/ui/StockCard';
import { useStock } from '@/context/stock';

const Discovery = () => {
  const [searchName, setSearchName] = useState('');
  const { stockData, fetchStocksDataByName, error } = useStock();

  const defaultStocks = ['Apple', 'Tesla', 'Microsoft', 'Amazon', 'Google'];

  useEffect(() => {
    // Load default stocks on component mount
    fetchStocksDataByName(defaultStocks);
  }, []);

  const handleSearchNameChange = (text) => {
    setSearchName(text);
    if (text.trim()) {
      // Boş olmayan arama metni girildiyse
      fetchStocksDataByName([text]);
    } else {
      // Arama metni boşsa, varsayılan hisse senetlerini göster
      fetchStocksDataByName(defaultStocks);
    }
  };

  // Helper function to safely handle numbers
  const safeToFixed = (value, decimalPlaces = 2) => {
    if (value === null || value === undefined || isNaN(value)) {
      return '0.00';
    }
    return parseFloat(value).toFixed(decimalPlaces);
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

        {/* Search Bar by Long Name */}
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
            placeholder="Hisse senedi adına göre arayın (örneğin: Apple)"
            placeholderTextColor="#888"
            value={searchName}
            onChangeText={handleSearchNameChange}
          />
        </View>

        <View style={{ marginBottom: 24, paddingHorizontal: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 18, color: '#FFFFFF', marginBottom: 8 }}>Arama Sonuçları</Text>
          </View>

          {error && <Text style={{ color: 'red' }}>{error}</Text>}
          {stockData && stockData.length > 0 ? (
            stockData.map((stock, index) => (
              <StockCard
                key={index}
                name={stock?.shortName || stock?.longName}
                ticker={stock?.symbol}
                price={safeToFixed(stock?.regularMarketPrice)}  
                width={50}
                change={safeToFixed(stock?.regularMarketChange)}  
                chartData={[
                  { value: stock?.regularMarketDayLow },
                  { value: stock?.regularMarketPrice },
                  { value: stock?.regularMarketDayHigh },
                ]}
                iconUrl={`https://img.logo.dev/ticker/${stock?.symbol}?token=pk_L243nCyGQ6KNbSvmAhSl0A`}
              />
            ))
          ) : (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator size="large" color="#FFFFFF" />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Discovery;
