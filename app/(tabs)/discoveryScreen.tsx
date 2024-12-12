import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import axios from 'axios';

const categories = [
  { id: 'lowRisk', name: 'Lowest Risk', url: 'https://yahoo-finance166.p.rapidapi.com/api/market/get-low-risk' },
  { id: 'topPerforming', name: 'Top Performing', url: 'https://yahoo-finance166.p.rapidapi.com/api/market/get-top-performing' },
  { id: 'highGrowthLarge', name: 'High Growth and Large', url: 'https://yahoo-finance166.p.rapidapi.com/api/market/get-high-growth-large' },
  { id: 'mostActives', name: 'Most Actives', url: 'https://yahoo-finance166.p.rapidapi.com/api/market/get-most-actives' },
  { id: 'trending', name: 'Trending', url: 'https://yahoo-finance166.p.rapidapi.com/api/market/get-trending' },
  { id: 'dayGainers', name: 'Day Gainers', url: 'https://yahoo-finance166.p.rapidapi.com/api/market/get-day-gainers' },
  { id: 'wkGainers', name: '52 Week Gainers', url: 'https://yahoo-finance166.p.rapidapi.com/api/market/52-wk-gainers' },
];

const DiscoveryScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStocks = async (category) => {
    setLoading(true);

    const paramsMap = {
      lowRisk: { offset: '0', count: '30', language: 'en-US', region: 'US' },
      topPerforming: { count: '30', region: 'US', language: 'en-US', quote_type: 'ETFS', offset: '0' },
      highGrowthLarge: { offset: '0', language: 'en-US', region: 'US', count: '30', quote_type: 'ETFS' },
      mostActives: { quote_type: 'EQUITY', offset: '0', count: '30', region: 'US', language: 'en-US' },
      trending: { language: 'en-US', quote_type: 'ALL', region: 'US' },
      dayGainers: { offset: '0', region: 'US', count: '30', language: 'en-US', quote_type: 'EQUITY' },
      wkGainers: { offset: '0', region: 'US', count: '30', language: 'en-US', quote_type: 'EQUITY' },
    };

    const options = {
      method: 'GET',
      url: category.url,
      params: paramsMap[category.id],
      headers: {
        'x-rapidapi-key': 'fb4d2eb4d3msh79aa725ac9fba7bp1ea1ecjsn0973925282e4',
        'x-rapidapi-host': 'yahoo-finance166.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setStocks(response.data.finance.result[0].quotes || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-900 p-4">
      {!selectedCategory ? (
        <>
          <Text className="text-2xl font-bold text-center mb-6 text-stone-100">Explore</Text>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => {
                setSelectedCategory(category);
                fetchStocks(category);
              }}
              className="bg-green-400 py-4 px-4 mb-4 rounded-md"
            >
              <Text className="text-white text-lg font-semibold text-center">{category.name}</Text>
            </TouchableOpacity>
          ))}
        </>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => setSelectedCategory(null)}
            className="bg-gray-500 py-2 px-4 mb-4 rounded-md"
          >
            <Text className="text-white text-lg font-semibold text-center">Change Category</Text>
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-center mb-6 text-white">{selectedCategory.name}</Text>
          {loading && <ActivityIndicator size="large" color="#0000ff" className="mt-6" />}
          <FlatList
            data={stocks}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View className="bg-white mx-4 my-2 p-4 rounded-lg shadow">
                <Text className="text-lg font-semibold">{item?.shortName || 'No Name'}</Text>
                <Text className="text-gray-600">Price: {item?.regularMarketPrice || 'No Info'}</Text>
                <Text className="text-gray-600">52 Week Range: {item?.fiftyTwoWeekRange || 'No Info'}</Text>
                <Text className="text-gray-600">Long Name: {item?.longName || 'No Info'}</Text>
              </View>
            )}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default DiscoveryScreen;
