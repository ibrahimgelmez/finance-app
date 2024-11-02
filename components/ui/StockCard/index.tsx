import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

const screenWidth = Dimensions.get('window').width;

const StockCard = ({ name, ticker, price, change, iconUrl, chartData,width }) => {
  const isPositive = change > 0;

  return (
    <View className="bg-gray-900 p-3 rounded-lg mb-4">
      <View className="flex-row justify-around">
        <View className="flex-row items-center">
          <Image source={{ uri: iconUrl }} style={{ width: 48, height: 48, marginRight: 10, marginLeft:-15 }} />
          <View>
            <Text className="text-white text-lg font-semibold">{name}</Text>
            <Text className="text-gray-400">{ticker}</Text>
          </View>
          <View className='top-3 mr-2 ml-4 px-2'>
            <LineChart
              data={chartData}
              initialSpacing={0}
              spacing={10} // Adjust spacing as necessary
              hideDataPoints
              thickness={2}
              hideRules
              hideYAxisText
              showXAxisIndices={false}
              hideAxesAndRules
              yAxisColor="#0BA5A4"
              verticalLinesColor="rgba(14,164,164,0.5)"
              xAxisColor="#0BA5A4"
              color="#0BA5A4"
              width={width} // Adjust width as necessary
              height={20} // Smaller height for the chart
              // Add some space above the chart
            />
          </View>
        </View>
        <View className="items-end">
          <Text className="text-white text-lg font-semibold">${price.toFixed(2)}</Text>
          <Text className={`${isPositive ? 'text-green-500' : 'text-red-500'} text-sm`}>
            {isPositive ? '+' : '-'}{Math.abs(change).toFixed(2)}%
          </Text>
        </View>
      </View>
    </View>
  );
};

export default StockCard;