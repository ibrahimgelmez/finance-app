import React from 'react';
import { View, Text, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import StockChart from '../../components/ui/graphics/stockChart'; // Ensure correct path
import Header from '@/components/ui/header';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import StockCard from '@/components/ui/StockCard';
import BigStockCard from '@/components/bigStockCard';
import MyStocks from './myStock';
import MyWishlist from '@/components/myWishlistCard/myWishlist';
import FirstCard from '@/components/firstCard';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// Function to calculate height based on percentage
const getHeight = (percentage) => (screenHeight * percentage) / 100;

const Index = () => {
  const lineData = [
    { value: 31 },
    { value: 21 },
    { value: 0 },
    { value: 21 },
    { value: 21 },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#1ad392]  ">
      <ScrollView style={{ backgroundColor: '#1ad392', flex: 1 }}>
        <View className="bg-[#1ad392] mb-4 ">
          <Header />
          {/* Header Section */}

          <View
            style={{ alignItems: 'center', marginBottom: 24, paddingBottom: 4 }}
          >
            <Text
              style={{ fontSize: 32, fontWeight: 'bold', color: '#FFFFFF' }}
            >
              $229,375.25
            </Text>
            <Text style={{ color: 'white' }}>Balance Available</Text>
          </View>
        </View>

        <FirstCard />

        {/* Wishlist Section */}
        <View
          style={{
            marginBottom: 24,
            paddingHorizontal: 10,
            backgroundColor: '#191a1f',
          }}
        >
          <View className="flex-row items-baseline justify-between">
            <Text style={{ fontSize: 18, color: '#FFFFFF', marginBottom: 8 }}>
              My Wishlist
            </Text>
            <FontAwesome name="arrow-right" size={20} color="green" />
          </View>
          <MyWishlist />

          <MyStocks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
