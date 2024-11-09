import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

const screenWidth = Dimensions.get('window').width;

const StockChart = ({width, title, data, height, backgroundColor = 'red' }) => (
  <View style={{ width:width, paddingVertical: 8, backgroundColor, padding: 10, borderRadius: 20, marginRight: 10 }}>
    {title && <Text style={{ color: '#FFFFFF', marginBottom: 8 }}>{title}</Text>}
    <Text style={{ color: 'green', marginBottom: 8 }}>+3.57</Text>
    <LineChart
      data={data}
      initialSpacing={-25} 
      spacing={30}  // You can adjust this if needed
      hideDataPoints
      thickness={2}
      hideRules
      hideYAxisText
      hideXAxisText
      hideAxesAndRules
      yAxisColor="#0BA5A4"
      verticalLinesColor="rgba(14,164,164,0.5)"
      xAxisColor="#0BA5A4"
      color="#0BA5A4"
      width={width}
      height={height}  // Ensure height is set according to your layout needs
      style={{ }}  // Set width and height to fit the container
    />
  </View>
);

export default StockChart;
