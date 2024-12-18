import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const StockDetails = ({ route, navigation }) => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('1D');
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { stock } = route.params;

  const timeFrameMap = {
    '1D': '1d',
    '1W': '5d',
    '1M': '1mo',
    '3M': '3mo',
    '1Y': '1y',
  };

  useEffect(() => {
    fetchChartData(selectedTimeFrame);
  }, [selectedTimeFrame]);

  const fetchChartData = async (timeFrame) => {
    setLoading(true);
    try {
      // Dinamik interval seçimi
      const interval = ['1D', '1W'].includes(timeFrame) ? '30m' : '1d';

      const response = await fetch(
        `https://yahoo-finance166.p.rapidapi.com/api/stock/get-chart?region=US&range=${timeFrameMap[timeFrame]}&symbol=${stock.symbol}&interval=${interval}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key':
              'ba243cc05bmsh5c42b7fb65f59c5p196669jsn1790408ea2e3',
            'x-rapidapi-host': 'yahoo-finance166.p.rapidapi.com',
          },
        }
      );
      const data = await response.json();
      const timestamps = data.chart.result[0].timestamp;
      const prices = data.chart.result[0].indicators.quote[0].close;
      setChartData({ labels: timestamps, data: prices });
    } catch (error) {
      console.error('Failed to fetch chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{'<'}</Text>
        </TouchableOpacity>
        <View className="flex flex-row justify-center items-center">
          <View>
            <Image
              source={{ uri: stock.image }}
              className="w-12 h-12 mr-2 rounded-sm"
            />
          </View>
          <View style={styles.stockInfo}>
            <Text style={styles.stockName}>{stock.name}</Text>
            <Text style={styles.stockSymbol}>{stock.symbol}</Text>
          </View>
        </View>
      </View>

      {/* Chart Section */}
      <View style={styles.chartContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#FFF" />
        ) : chartData ? (
          <LineChart
            data={{
              labels: chartData.labels.map((timestamp) =>
                new Date(timestamp * 1000).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              ),
              datasets: [
                {
                  data: chartData.data,
                },
              ],
            }}
            width={Dimensions.get('window').width - 32}
            height={220}
            hideDataPoints
            chartConfig={{
              backgroundColor: '#1E2923',
              backgroundGradientFrom: '#1E2923',
              backgroundGradientTo: '#08130D',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            withDots={false}
            withHorizontalLines={false}
            withVerticalLines={false}
            withVerticalLabels={false}
          />
        ) : (
          <Text style={styles.errorText}>No data available</Text>
        )}
      </View>

      {/* Time Frame Selector */}
      <View style={styles.timeFrameContainer}>
        {Object.keys(timeFrameMap).map((timeFrame) => (
          <TouchableOpacity
            key={timeFrame}
            style={[
              styles.timeFrameButton,
              selectedTimeFrame === timeFrame && styles.selectedTimeFrame,
            ]}
            onPress={() => setSelectedTimeFrame(timeFrame)}
          >
            <Text style={styles.timeFrameText}>{timeFrame}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Price Section */}
      <View style={styles.priceContainer}>
        <Text style={styles.currentPrice}>${stock.price}</Text>
        <Text style={styles.priceLabel}>Current Price</Text>
      </View>

      {/* Portfolio Details */}
      <View style={styles.portfolioDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Shares</Text>
          <Text style={styles.detailValue}>0.17469</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Avg. Cost</Text>
          <Text style={styles.detailValue}>$73.86</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Total Returns</Text>
          <Text style={styles.detailValue}>$1,946.75</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 4,
  },
  backButton: {
    fontSize: 18,
    color: '#FFF',
    marginRight: 10,
  },
  stockInfo: {
    flexDirection: 'column',
    marginLeft: 2,
  },
  stockName: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  stockSymbol: {
    color: '#AAA',
    fontSize: 16,
  },
  chartContainer: {
    marginBottom: 20,
  },
  errorText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
  },
  timeFrameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  timeFrameButton: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#333',
  },
  selectedTimeFrame: {
    backgroundColor: '#0f0',
  },
  timeFrameText: {
    color: '#FFF',
    fontSize: 14,
  },
  priceContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#222',
    borderRadius: 10,
    marginBottom: 20,
  },
  currentPrice: {
    fontSize: 28,
    color: '#FFF',
    fontWeight: 'bold',
  },
  priceLabel: {
    fontSize: 14,
    color: '#AAA',
  },
  portfolioDetails: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 16,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    color: '#AAA',
    fontSize: 14,
  },
  detailValue: {
    color: '#FFF',
    fontSize: 14,
  },
});

export default StockDetails;
