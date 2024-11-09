import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesome5 } from '@expo/vector-icons'; // Make sure to install this library

const screenWidth = Dimensions.get('window').width;

const Portfolio = () => {
  const [sortOption, setSortOption] = useState('recent');
  const [open, setOpen] = useState(false);
  const [portfolioValue] = useState({
    total: 196548.5,
    change: 66378.49,
    percentageChange: 24.65,
  });
  const [account] = useState({
    cash: 23087.39,
    pending: 9739.36,
    equity: 186473.68,
    returns: 66378.49,
  });
  const [positions] = useState([
    {
      shortName: 'Spotify',
      regularMarketPrice: 22935.46,
      regularMarketChangePercent: 2.94,
    },
    {
      shortName: 'Meta - Facebook',
      regularMarketPrice: 13286.82,
      regularMarketChangePercent: -2.16,
    },
    {
      shortName: 'Tesla',
      regularMarketPrice: 20564.78,
      regularMarketChangePercent: 2.37,
    },
  ]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
      <ScrollView>
        {/* Portfolio Value Chart */}
        <View
          className="bg-transparent"
          style={{
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
          }}
        >
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 24,
              fontWeight: 'bold',
            }}
          >
            My Portfolio
          </Text>
          <LineChart
            data={{
              labels: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
              ],
              datasets: [
                {
                  data: [10000, 20000, 27750, 22250, 33000, 30000, 36000],
                },
              ],
            }}
            width={screenWidth}
            height={220}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#1a1a1a',
              backgroundGradientTo: '#1a1a1a',
              decimalPlaces: 0, // No decimal places on the chart values
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
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
            withVerticalLabels={false}
            withHorizontalLabels={false}
            fromZero
          />

          <View className="border-2 border-white bg-white  rounded-lg p-4 w-full max-w-sm mx-auto">
            <Text
              style={{
                textAlign: 'center',
                color: 'black',
                fontSize: 32,
                fontWeight: 'bold',
              }}
            >
              ${portfolioValue.total.toFixed(2)}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: '#28a745',
                fontSize: 16,
                marginTop: 4,
              }}
            >
              +${portfolioValue.change.toFixed(2)} (
              {portfolioValue.percentageChange}%)
            </Text>
          </View>
        </View>

        {/* My Account */}
        <View className="bg-[#333] p-4 mt-4 rounded-2xl">
          <Text className="text-white text-xl font-semibold">My Account</Text>

          {/* Account Details Grid */}
          <View className="flex-row flex-wrap justify-between mt-4">
            {/* Cash Available */}
            <View className="w-[48%] bg-[#1a1a1a] p-4 rounded-2xl flex-row items-center">
              <FontAwesome5
                name="wallet"
                size={24}
                color="#4CAF50"
                className="mr-4"
              />
              <View className="ml-2">
                <Text className="text-white text-sm font-medium">
                  Cash Available
                </Text>
                <Text className="text-white text-lg font-bold">
                  ${account.cash.toFixed(2)}
                </Text>
              </View>
            </View>

            {/* Pending Buys */}
            <View className="w-[48%] bg-[#1a1a1a] p-4 rounded-2xl flex-row items-center">
              <FontAwesome5
                name="clock"
                size={24}
                color="#FFA726"
                className="mr-4"
              />
              <View className="ml-2">
                <Text className="text-white text-sm font-medium">
                  Pending Buys
                </Text>
                <Text className="text-white text-lg font-bold">
                  ${account.pending.toFixed(2)}
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
                  ${account.equity.toFixed(2)}
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
                  ${account.returns.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* My Positions */}
        <View
          style={{
            backgroundColor: '#333',
            padding: 16,
            marginTop: 16,
            borderRadius: 16,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>
              My Positions
            </Text>
            <DropDownPicker
              open={open}
              value={sortOption}
              items={[
                { label: 'Recently Added', value: 'recent' },
                { label: 'Top Gainers', value: 'gainers' },
                { label: 'Top Losers', value: 'losers' },
              ]}
              setOpen={setOpen}
              setValue={setSortOption}
              containerStyle={{ width: 160, height: 40 }}
              style={{ backgroundColor: '#222', borderColor: '#333' }}
              dropDownStyle={{ backgroundColor: '#222' }}
              labelStyle={{ color: '#fff' }}
              arrowColor="#fff"
              placeholderStyle={{ color: '#aaa' }}
            />
          </View>
          {positions.map((position, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 8,
              }}
            >
              <Text style={{ color: '#ccc' }}>{position.shortName}</Text>
              <Text style={{ color: 'white' }}>
                ${position.regularMarketPrice.toFixed(2)}{' '}
                <Text
                  style={
                    position.regularMarketChangePercent > 0
                      ? { color: '#28a745' }
                      : { color: '#d32f2f' }
                  }
                >
                  ({position.regularMarketChangePercent.toFixed(2)}%)
                </Text>
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Portfolio;
