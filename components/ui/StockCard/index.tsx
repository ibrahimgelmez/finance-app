import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const StockCard = ({ name, ticker, price, change, chartData, iconUrl }) => {
  const chartClosePrices = chartData.map((data) => data.close);

  return (
    <View style={styles.cardContainer}>
      {/* Left Section - Icon */}
      <Image source={{ uri: iconUrl }} style={styles.icon} />

      {/* Middle Section - Name and Ticker */}
      <View style={styles.middleSection}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.tickerText}>{ticker}</Text>

      </View>
      {chartClosePrices.length > 0 && (
          <View style={styles.chartContainer}>
            <LineChart
              data={{
                datasets: [{ data: chartClosePrices }],
              }}
              width={60} // Chart width to match the small chart in the example
              height={40} // Adjusted height for compact view
              withDots={false}
              withVerticalLabels={false}
              withHorizontalLabels={false}
              withInnerLines={false}
              withOuterLines={false}
              chartConfig={{
                backgroundColor: '#000',
                backgroundGradientFrom: '#000',
                backgroundGradientTo: '#000',
                color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
              }}
              style={{ paddingRight: 0 }}
            />
          </View>
        )}
      {/* Right Section - Price, Change, and Chart */}
      <View style={styles.rightSection}>
        {/* Price */}
        <Text style={styles.priceText}>${price}</Text>
        {/* Change */}
        <Text style={[styles.changeText, { color: change > 0 ? '#00FF00' : '#FF0000' }]}>
          {change > 0 ? '+' : ''}{change}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  middleSection: {
    flex: 1,
    marginLeft: 12,
  },
  nameText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tickerText: {
    color: '#888',
    fontSize: 14,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8, // Space between price and chart
  },
  chartContainer: {
    width: 60, // Ensures the chart stays centered
    alignItems: 'center', 
    right:'100%'
  },
  changeText: {
    fontSize: 14,
    marginLeft: 8, // Space between chart and change percentage
  },
});

export default StockCard;
