import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { FontAwesome5 } from '@expo/vector-icons';
import PortfolioHeader from '@/components/ui/portfolioHeader'; // Your existing header component

const screenWidth = Dimensions.get('window').width;

const MyStockDetail = ({ route, navigation }) => {
  const { stock } = route.params;
  const [selectedTimeRange, setSelectedTimeRange] = useState('1D');

  // Example stock data for detail view
  const stockDetailData = {
    name: stock?.name || 'Stock Name',
    symbol: stock?.symbol || 'SYM',
    currentPrice: stock?.currentPrice || 0,
    change: stock?.change || 0,
    percentageChange: stock?.percentageChange || 0,
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <ScrollView>
        {/* Header with Back Button */}
        <View
          style={{
            paddingTop: 20,
            paddingBottom: 10,
            paddingHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome5 name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text
            style={{
              color: 'white',
              fontSize: 24,
              fontWeight: 'bold',
              marginLeft: 10,
            }}
          >
            {stockDetailData.name} ({stockDetailData.symbol})
          </Text>
        </View>

        {/* Chart with Time Range Buttons */}
        <View style={{ backgroundColor: '#1ad392', paddingTop: 16 }}>
          <LineChart
            data={{
              labels: ['1D', '1W', '1M', '3M', '1Y', '3Y', '5Y'],
              datasets: [
                {
                  data: [
                    stock.currentPrice * 0.9,
                    stock.currentPrice,
                    stock.currentPrice * 1.1,
                  ],
                },
              ],
            }}
            width={screenWidth}
            height={220}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#1ad392',
              backgroundGradientTo: '#1ad392',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: { borderRadius: 16 },
              propsForDots: {
                r: '4',
                strokeWidth: '1',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{ marginTop: 12 }}
            withDots
            withInnerLines={false}
            withOuterLines={false}
            fromZero
          />

          {/* Time Range Selector */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingVertical: 10,
            }}
          >
            {['1D', '1W', '1M', '3M', '1Y'].map((range) => (
              <TouchableOpacity
                key={range}
                onPress={() => setSelectedTimeRange(range)}
              >
                <Text
                  style={{
                    color: selectedTimeRange === range ? '#fff' : '#aaa',
                    fontWeight: selectedTimeRange === range ? 'bold' : 'normal',
                  }}
                >
                  {range}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Stock Price */}
        <View className="bg-black py-3 pt-8">
          <View className="border-2 border-[#1f2126] bg-[#20222a] w-[86%] rounded-3xl py-4 mx-auto">
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 32,
                fontWeight: 'bold',
              }}
            >
              ${stockDetailData.currentPrice.toFixed(2)}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: stockDetailData.change >= 0 ? '#28a745' : '#ff6347',
                fontSize: 16,
                marginTop: 4,
              }}
            >
              {stockDetailData.change >= 0 ? '+' : '-'}$
              {Math.abs(stockDetailData.change).toFixed(2)} (
              {stockDetailData.percentageChange}%)
            </Text>
          </View>
        </View>

        {/* Account Summary (Cash, Pending Buys, Equity, Total Returns) */}
        <View className="bg-black p-4 pt-4">
          <Text className="text-white text-xl font-semibold">
            Account Summary
          </Text>
          <View className="flex-row flex-wrap justify-between mt-4">
            {/* Cash */}
            <View className="w-[48%] bg-[#1a1a1a] p-4 rounded-2xl flex-row items-center">
              <FontAwesome5
                name="wallet"
                size={24}
                color="#4CAF50"
                className="mr-4"
              />
              <View className="ml-2">
                <Text className="text-white text-sm font-medium">Cash</Text>
                <Text className="text-white text-lg font-bold">
                  ${stock.cashAvailable}
                </Text>
              </View>
            </View>

            {/* Equity */}
            <View className="w-[48%] bg-[#1a1a1a] p-4 rounded-2xl flex-row items-center mt-4">
              <FontAwesome5
                name="chart-pie"
                size={24}
                color="#FF7043"
                className="mr-4"
              />
              <View className="ml-2">
                <Text className="text-white text-sm font-medium">Equity</Text>
                <Text className="text-white text-lg font-bold">
                  ${stockDetailData.equity.toFixed(2)}
                </Text>
              </View>
            </View>

            {/* Total Returns */}
            <View className="w-[48%] bg-[#1a1a1a] p-4 rounded-2xl flex-row items-center mt-4">
              <FontAwesome5
                name="chart-line"
                size={24}
                color="#7E57C2"
                className="mr-4"
              />
              <View className="ml-2">
                <Text className="text-white text-sm font-medium">
                  Total Returns
                </Text>
                <Text className="text-white text-lg font-bold">
                  ${stockDetailData.returns.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyStockDetail;
