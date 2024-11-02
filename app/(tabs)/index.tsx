import React from 'react';
import { View, Text, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import StockChart from '../../components/ui/graphics/stockChart'; // Ensure correct path
import Header from '@/components/ui/header';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import StockCard from '@/components/ui/StockCard';

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
      <SafeAreaView className='flex-1 bg-[#1ad392]  '>
      <ScrollView style={{ backgroundColor: '#191a1f', flex: 1 }}>
     <View className='bg-[#1ad392] mb-4 ' >
      <Header />
      {/* Header Section */}
    
      <View style={{ alignItems: 'center', marginBottom: 24, paddingBottom:4 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#FFFFFF' }}>$229,375.25</Text>
      <Text style={{ color: 'white' }}>Balance Available</Text>
     </View>
      </View>

      {/* Stock Indices */}
      <ScrollView horizontal style={{ marginBottom: 24 , padding:6,paddingHorizontal:10  }}>
        {['DOW', 'S&P 500', 'NASDAQ'].map((index, idx) => (
          <StockChart  key={idx} title={index} data={lineData} height={getHeight(6)} width={120} backgroundColor="#1e222a" />
          ))}
      </ScrollView>

      {/* Wishlist Section */}
        <View style={{ marginBottom: 24,paddingHorizontal:10   }}>
        <View className='flex-row items-baseline justify-between'>
        <Text style={{ fontSize: 18, color: '#FFFFFF', marginBottom: 8 }}>My Wishlist</Text>
        <FontAwesome name="arrow-right" size={20} color="green" />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['TWTR', 'AAPL', 'TSLA'].map((stock, idx) => (
            <StockChart key={idx} title={stock} data={lineData} height={getHeight(6)} width={170} backgroundColor="#1e222a" />
            ))}
        </ScrollView>
      </View>

      <StockCard name={'Şpoti'} ticker={'asd'} price={22} width={50} change={-2} chartData={[
       { value: 2 },
       { value: 11 },
       { value: 29 },
       { value: 30 },
       { value: 88 },
       { value: 29 },
       { value: 30 },
      ]} iconUrl={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRslcO84eWfXP_4Ucd4Yfz6B8uqJmHaTo0iTw&s'}/>
       <StockCard name={'Face'} ticker={'asd'} price={22} width={50} change={-2} chartData={[
       { value: 2 },
       { value: 11 },
       { value: 29 },
       { value: 30 },
       { value: 88 },
       { value: 88 },
       { value: 29 },
       { value: 30 },
      ]} iconUrl={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRslcO84eWfXP_4Ucd4Yfz6B8uqJmHaTo0iTw&s'}/>
       <StockCard name={'Tesla'} ticker={'asd'} price={22} width={50} change={-2} chartData={[
       { value: 2 },
       { value: 11 },
       { value: 29 },
       { value: 30 },
        { value: 88 },
       { value: 29 },
       { value: 30 },
       { value: 88 },
      ]} iconUrl={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRslcO84eWfXP_4Ucd4Yfz6B8uqJmHaTo0iTw&s'}/>
    </ScrollView>
            </SafeAreaView>
  );
};

export default Index;
