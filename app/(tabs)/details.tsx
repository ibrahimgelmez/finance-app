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
import { LineChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const StockDetails = ({ route, navigation }) => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('1D');
  const [chartData, setChartData] = useState(null);
  const [stockFundamentals, setStockFundamentals] = useState('');
  const [showFullSummary, setShowFullSummary] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recommendationData, setRecommendationData] = useState([]);
  const [financialData, setFinancialData] = useState(null);
  const { stock } = route.params;
console.log(stock);
  const API_KEY = 'fb4d2eb4d3msh79aa725ac9fba7bp1ea1ecjsn0973925282e4';

  const [account] = useState({
    cash: 23087.39,
    pending: 9739.36,
    equity: 186473.68,
    returns: 66378.49,
  });

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

  useEffect(() => {
    fetchFinancialData();
    fetchFundamentals();
    fetchRecommendationData();
  }, []);

  const fetchFundamentals = async () => {
    try {
      const response = await fetch(
        'https://yahoo-finance166.p.rapidapi.com/api/stock/get-fundamentals?region=US&symbol=TSLA',
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'yahoo-finance166.p.rapidapi.com',
          },
        }
      );
      const data = await response.json();
      setStockFundamentals(data?.quoteSummary?.result[0]?.assetProfile);
    } catch (error) {
      console.error('Error fetching fundamentals:', error);
    }
  };

  const fetchChartData = async (timeFrame) => {
    setLoading(true);
    try {
      const interval = ['1D', '1W'].includes(timeFrame) ? '30m' : '1d';

      const response = await fetch(
        `https://yahoo-finance166.p.rapidapi.com/api/stock/get-chart?region=US&range=${timeFrameMap[timeFrame]}&symbol=${stock.symbol}&interval=${interval}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key': API_KEY,
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

  const fetchFinancialData = async () => {
    try {
      const response = await fetch(
        `https://yahoo-finance166.p.rapidapi.com/api/stock/get-financial-data?region=US&symbol=${stock.symbol}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'yahoo-finance166.p.rapidapi.com',
          },
        }
      );
      const data = await response.json();
      setFinancialData(data.quoteSummary.result[0].financialData);
    } catch (error) {
      console.error('Error fetching financial data:', error);
    }
  };

  const fetchRecommendationData = async () => {
    try {
      const response = await fetch(
        `https://yahoo-finance166.p.rapidapi.com/api/stock/get-recommendation-trend?symbol=${stock.symbol}&region=US`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'yahoo-finance166.p.rapidapi.com',
          },
        }
      );
      const data = await response.json();
      const trends = data.quoteSummary.result[0].recommendationTrend.trend[0];
      setRecommendationData([
        { name: 'Strong Buy', value: trends.strongBuy, color: '#006400' },
        { name: 'Buy', value: trends.buy, color: '#32CD32' },
        { name: 'Hold', value: trends.hold, color: '#FFD700' },
        { name: 'Sell', value: trends.sell, color: '#FF6347' },
        { name: 'Strong Sell', value: trends.strongSell, color: '#8B0000' },
      ]);
    } catch (error) {
      console.error('Error fetching recommendation data:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{'<'}</Text>
        </TouchableOpacity>
        <View className="flex flex-row justify-center items-center">
          <View>
            <Image
              source={{ uri: stock?.image }}
              className="w-12 h-12 mr-2 rounded-sm"
            />
          </View>
          <View style={styles.stockInfo}>
            <Text style={styles.stockName}>{stock?.name}</Text>
            <Text style={styles.stockSymbol}>{stock?.symbol}</Text>
          </View>
        </View>
      </View>

      <ScrollView>
        <View style={styles.chartContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#FFF" />
          ) : chartData ? (
            <LineChart
              data={{
                labels: chartData?.labels?.map((timestamp) =>
                  new Date(timestamp * 1000).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                ),
                datasets: [
                  {
                    data: chartData?.data,
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

        <View className="bg-black p-4 pt-4 ">
          <Text className="text-white text-xl font-semibold">My Account</Text>

          <View className="flex-row flex-wrap justify-between mt-4">
            <View className="w-[48%] bg-[#1a1a1a] p-4 rounded-2xl flex-row items-center">
              <FontAwesome5
                name="wallet"
                size={24}
                color="#4CAF50"
                className="mr-4"
              />
              <View className="ml-2">
                <Text className="text-white text-sm font-medium">
                  Total Cash
                </Text>
                <Text className="text-white text-lg font-bold">
                  $
                  {financialData
                    ? (financialData?.totalCash?.raw / 1e9).toFixed(2) + 'B'
                    : 'Loading...'}
                </Text>
              </View>
            </View>

            <View className="w-[48%] bg-[#1a1a1a] p-4 rounded-2xl flex-row items-center">
              <FontAwesome5
                name="clock"
                size={24}
                color="#FFA726"
                className="mr-4"
              />
              <View className="ml-2">
                <Text className="text-white text-sm font-medium">
                  Total Debt
                </Text>
                <Text className="text-white text-lg font-bold">
                  $
                  {financialData
                    ? (financialData.totalDebt.raw / 1e9).toFixed(2) + 'B'
                    : 'Loading...'}
                </Text>
              </View>
            </View>

            <View className="w-[48%] bg-[#1a1a1a] p-4 rounded-2xl flex-row items-center mt-4">
              <FontAwesome5
                name="chart-pie"
                size={24}
                color="#FF7043"
                className="mr-4"
              />
              <View className="ml-2">
                <Text className="text-white text-sm font-medium">EBITDA</Text>
                <Text className="text-white text-lg font-bold">
                  {financialData
                    ? (financialData.ebitda.raw / 1e9).toFixed(2)
                    : 'Loading...'}
                </Text>
              </View>
            </View>

            <View className="w-[48%] bg-[#1a1a1a] p-4 rounded-2xl flex-row items-center mt-4">
              <FontAwesome5
                name="chart-line"
                size={24}
                color="#7E57C2"
                className="mr-4"
              />
              <View className="ml-2">
                <Text className="text-white text-sm font-medium">
                  Free Cashflow
                </Text>
                <Text className="text-white text-lg font-bold">
                  $
                  {financialData
                    ? (financialData.freeCashflow.raw / 1e9).toFixed(2) + 'B'
                    : 'Loading...'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Recommendation Pie Chart */}
        <View style={styles.recommendationContainer}>
          <Text style={styles.recommendationHeader}>
            Expert Recommendations
          </Text>
          <PieChart
            data={recommendationData.map((item) => ({
              name: item.name,
              population: item.value,
              color: item.color,
              legendFontColor: '#FFF',
              legendFontSize: 12,
            }))}
            width={Dimensions.get('window').width - 32}
            height={220}
            chartConfig={{
              backgroundColor: '#1E2923',
              backgroundGradientFrom: '#1E2923',
              backgroundGradientTo: '#08130D',
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
      </ScrollView>
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
  errorText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
  },
  sectionHeader: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recommendationContainer: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 16,
    marginTop: 20,
  },
  recommendationHeader: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default StockDetails;
