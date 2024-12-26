import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useStock } from '@/context/stock';
import BigStockCard from '@/components/bigStockCard';
import { useNavigation } from '@react-navigation/native';


const FirstCard = () => {
  const [indicesData, setIndicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigation = useNavigation();
  const { chartData, fetchChartData, stockData, fetchReelData } = useStock();

  // Endeksler için belirlediğimiz semboller
  const sp500Symbol = '^GSPC';
  const nasdaqSymbol = '^IXIC';
  const dowSymbol = '^DJI'; 

  const formatDate = (date) => date.toISOString().split('T')[0];

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Verileri çekme fonksiyonu
  const fetchIndicesData = async () => {
    try {
      // Üç sembol için veriyi çekiyoruz
      const symbols = [sp500Symbol, nasdaqSymbol, dowSymbol];
      
      symbols.forEach(async (symbol) => {
        await fetchReelData(symbol); // Gerçek zamanlı veriyi çek
        fetchChartData(symbol, formatDate(yesterday), formatDate(today), "1h"); // Grafik verisini çek
      });

      setIndicesData(symbols); // Üç sembolü bir arada tutuyoruz
    } catch (error) {
      setError("Veri çekilirken hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndicesData(); // Veri çekmeyi başlat
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
      <ScrollView horizontal contentContainerStyle={styles.container}>
        {indicesData.map((symbol) => {
          const realTimeStock = stockData.find((item) => item.symbol === symbol);
          const marketName = realTimeStock ? realTimeStock.name : symbol;
          const marketCurrentPrice = realTimeStock ? realTimeStock.currentPrice : 'N/A';
          const marketChange = realTimeStock ? realTimeStock.priceChangePercent.toFixed(2) : 0;
          const chartDataForStock = chartData[symbol] || []; // Grafik verisi
          
          return (
            <TouchableOpacity
            key={symbol}
            onPress={() =>
              navigation.navigate('StockDetails', {
                stock: {
                  symbol,
                  name: marketName,
                  price: marketCurrentPrice,
                  change: marketChange,
                  chartData: chartDataForStock,
                },
              })
            }
          >
            <BigStockCard
              key={symbol}
              name={marketName}
              title={marketName}
              ticker={symbol}
              price={marketCurrentPrice} 
              change={marketChange}
              chartData={chartDataForStock} // Grafik verisi
              iconUrl={null}
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
  },
});

export default FirstCard;