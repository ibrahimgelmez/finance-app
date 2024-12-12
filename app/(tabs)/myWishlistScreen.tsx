// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
// import StockCard from '@/components/ui/StockCard';

// const fetchStockPrice = async (symbol) => {
//   const options = {
//     method: 'GET',
//     url: `https://yahoo-finance166.p.rapidapi.com/api/stock/get-price`,
//     params: { region: 'US', symbol },
//     headers: {
//       'x-rapidapi-key': 'cd04661eb6msh8638f17e507e7bbp1183c5jsn31d7703d6851',
//       'x-rapidapi-host': 'yahoo-finance166.p.rapidapi.com',
//     },
//   };

//   try {
//     const response = await fetch(`${options.url}?region=${options.params.region}&symbol=${symbol}`, {
//       method: 'GET',
//       headers: options.headers,
//     });

//     const data = await response.json();

//     console.log(`Response for ${symbol}:`, JSON.stringify(data, null, 2)); // Log yanıt

//     const priceData = data?.quoteSummary?.result?.[0]?.price || {};

//     return {
//       symbol,
//       name: priceData.shortName || priceData.longName || symbol, // Hisse adı
//       price: priceData.regularMarketPrice?.raw || null, // Hisse fiyatı
//       change: priceData.regularMarketChange?.raw || null, // Değişim oranı
//       high: priceData.regularMarketDayHigh?.raw || null, // Günlük en yüksek fiyat
//       low: priceData.regularMarketDayLow?.raw || null, // Günlük en düşük fiyat
//     };
//   } catch (error) {
//     console.error(`Error fetching price for ${symbol}:`, error);
//     return { symbol, name: symbol, price: null, change: null, high: null, low: null };
//   }
// };

// const MyWishlist = () => {
//   const [wishlistData, setWishlistData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchWishlistData = async () => {
//     try {
//       const response = await fetch('http://154.53.166.2:5024/api/Wishlist', {
//         headers: {
//           'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyIiwidW5pcXVlX25hbWUiOiJzYWZhayIsIm5iZiI6MTczMTI2NTQ5NSwiZXhwIjoxNzMzODU3NDk1LCJpYXQiOjE3MzEyNjU0OTV9.ZZLP0COxvpy3pDRvN_eQwXWGT6eaOuHaRYtECNmm7cE`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();

//       console.log('Fetched wishlist:', data.map(stock => stock.symbol)); // Log semboller

//       const enrichedData = await Promise.all(
//         data.map(async (stock) => {
//           const priceInfo = await fetchStockPrice(stock.symbol);
//           return { ...stock, ...priceInfo };
//         })
//       );

//       setWishlistData(enrichedData);
//     } catch (error) {
//       setError('Failed to fetch wishlist data.');
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchWishlistData();
//   }, []);

//   if (loading) {
//     return (
//       <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color="#000" />
//       </SafeAreaView>
//     );
//   }

//   if (error) {
//     return (
//       <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text style={{ color: 'red' }}>{error}</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#191a1f' }}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>My Wishlist</Text>
//         <Text style={styles.companyCount}>{wishlistData.length} Companies</Text>
//       </View>

//       <ScrollView contentContainerStyle={styles.container}>
//         {wishlistData.map((stock) => (
//           <StockCard
//             key={stock.symbol}
//             name={stock.name} // Hisse adı
//             ticker={stock.symbol} // Hisse sembolü
//             price={stock.price !== null ? stock.price.toFixed(2) : 'N/A'} // Fiyat bilgisi
//             change={stock.change !== null ? stock.change.toFixed(2) : 'N/A'} // Değişim oranı
//             high={stock.high !== null ? stock.high.toFixed(2) : 'N/A'} // Günlük en yüksek fiyat
//             low={stock.low !== null ? stock.low.toFixed(2) : 'N/A'} // Günlük en düşük fiyat
//             iconUrl={`https://img.logo.dev/ticker/${stock.symbol}?token=pk_L243nCyGQ6KNbSvmAhSl0A`}
//           />
//         ))}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#1f1f1f',
//     backgroundColor: '#191a1f',
//   },
//   headerTitle: {
//     color: 'white',
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   companyCount: {
//     color: '#888',
//     fontSize: 16,
//   },
//   container: {
//     padding: 16,
//   },
// });

// export default MyWishlist;
