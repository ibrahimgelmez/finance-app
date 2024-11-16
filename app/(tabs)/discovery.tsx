import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, ActivityIndicator, TextInput } from 'react-native';
import axios from 'axios'; // Axios ile API çağrısı yapıyoruz
import Header from '@/components/ui/header';
import StockCard from '@/components/ui/StockCard';

const Discovery = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Kullanıcı arama terimi
  const [stockData, setStockData] = useState([]);  // Gelen hisse verileri
  const [loading, setLoading] = useState(false);   // Yükleme durumu
  const [error, setError] = useState(null);        // Hata durumunu göstermek için

  // Popüler hisseler
  const popularStocks = ['AAPL', 'GOOG', 'MSFT', 'AMZN', 'TSLA'];

  // Kullanıcının arama terimi değiştiğinde veya liste boş olduğunda API çağrısı yapılır
  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      setError(null); // Hata durumunu sıfırla

      try {
        let response;

        if (searchTerm.trim() === '') {
          // Eğer arama terimi boşsa popüler hisseleri getir
          response = await axios.get('http://154.53.166.2:5000/api/stocks-by-symbol', {
            params: { symbols: popularStocks.join(',') }, // Popüler hisseler
          });
        } else {
          // Arama terimi varsa normal arama yap
          response = await axios.get('http://154.53.166.2:5000/api/search-stocks', {
            params: { term: searchTerm }, // API'ye arama terimi parametre olarak gönderilir
          });
        }

        setStockData(response.data); // API'den gelen verileri state'e kaydet
      } catch (err) {
        console.error('Error fetching stock data:', err);
        setError('Error fetching stock data.'); // Hata durumunda mesaj göster
      } finally {
        setLoading(false); // Yükleme durumunu sıfırla
      }
    };

    fetchStockData();
  }, [searchTerm]); // Arama terimi değiştiğinde tetiklenir

  const handleSearchChange = (text) => {
    setSearchTerm(text); // Kullanıcının girdiği arama terimini state'e kaydet
  };

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

        {/* Arama Girdisi */}
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
            onChangeText={handleSearchChange} // Arama terimi değiştiğinde güncellenir
          />
        </View>

        {/* Hisse Sonuçları */}
        <View style={{ marginBottom: 24, paddingHorizontal: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 18, color: '#FFFFFF', marginBottom: 8 }}>Search Results</Text>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#FFFFFF" /> // Yükleme ikonu
          ) : error ? (
            <Text style={{ color: 'red' }}>{error}</Text> // Hata mesajı
          ) : stockData.length > 0 ? (
            stockData.map((stock, index) => (
              <StockCard
                key={index}
                name={stock?.shortName || stock?.longName}
                ticker={stock?.symbol}
                price={safeToFixed(stock?.regularMarketPrice)}
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
            <Text style={{ color: 'white' }}>No stocks found for "{searchTerm}"</Text> // Sonuç bulunamazsa mesaj
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Discovery;
