import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const StockCard = ({ name, ticker, price, change, chartData, iconUrl }) => {
  // chartData'daki geçerli sayıları almak için filtreleme işlemi
  const chartClosePrices = chartData && chartData?.length > 0
    ? chartData?.map((data) => data.close).filter((value) => !isNaN(value)) // NaN değerleri filtrele
    : []; // Eğer chartData yoksa boş dizi döndür

  return (
    <View style={styles.cardContainer}>
      {/* Left Section - Icon */}
      <Image source={{ uri: iconUrl }} style={styles.icon} />

      {/* Middle Section - Name and Ticker */}
      <View style={styles.middleSection}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.tickerText}>{ticker}</Text>
      </View>

      {chartClosePrices?.length > 0 && (
        <View style={styles.chartContainer}>
          <LineChart
            data={{
              datasets: [{ data: chartClosePrices }],
            }}
            width={60} // Chart width for compact display
            height={40} // Adjusted height for compact view
            withDots={false}
            withVerticalLabels={false}
            withHorizontalLabels={false}
            withInnerLines={false}
            withOuterLines={false}
            chartConfig={{
              backgroundColor: '#191a1f',
              backgroundGradientFrom: '#191a1f',
              backgroundGradientTo: '#191a1f',
              
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
    backgroundColor: '#191a1f',
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
    alignItems: 'flex-end',
    flex: 1,
  },
  priceText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  changeText: {
    fontSize: 14,
  },
  chartContainer: {
    marginTop: 8,
    width: 60, // Ensures the chart stays centered
  },
});

export default StockCard;
