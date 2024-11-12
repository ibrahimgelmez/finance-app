import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const BigStockCard = ({ title, name, ticker, price, change, chartData, iconUrl }) => {
  // Ensure chartData has the required structure, including color
  const formattedChartData = chartData && chartData.length > 0
    ? chartData.map((data) => data.close).filter((value) => !isNaN(value)) // Filter out NaN values
    : []; // If chartData is missing or empty, use an empty array

  // Check if iconUrl is a valid URL (not empty or null)
  const hasIcon = iconUrl && iconUrl.trim() !== '';

  return (
    <View style={{ flex: 1, paddingVertical: 8, padding: 15, borderRadius: 20, marginRight: 10, backgroundColor: '#1e222a', width: 200, justifyContent: 'center', alignItems: 'center' }}>
      {/* Display the Icon if iconUrl is provided */}
      {hasIcon && <Image source={{ uri: iconUrl }} style={styles.icon} />}

      <Text style={[styles.title, !hasIcon && styles.titleWithoutIcon]}>{title}</Text>
      <Text style={{ color: 'green', marginBottom: 8 }}>{change > 0 ? `+${change}%` : `${change}%`}</Text>

      <View className='items-center justify-center'>
        {formattedChartData.length > 0 && (
          <LineChart
            data={{
              datasets: [{ data: formattedChartData }], // Pass the filtered chart data
            }}
            width={180} // Adjust the width of the chart
            height={100}
            withDots={false} // Remove data points
            withVerticalLabels={false} // Remove vertical labels
            withHorizontalLabels={false} // Remove horizontal labels
            withInnerLines={false} // Remove inner grid lines
            withOuterLines={false} // Remove outer grid lines
            chartConfig={{
              backgroundColor: '#1e222a',
              backgroundGradientFrom: '#1e222a',
              backgroundGradientTo: '#1e222a',
              color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`, // Line color
            }}
            style={styles.chartContainer}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    marginTop: 8,
    paddingRight: 0,
    alignItems: 'center',
    justifyContent: 'center',
    left: 5,
  },
  icon: {
    width: 50, // Adjust the size of the icon
    height: 50,
    borderRadius: 25, // Makes the icon circular
    marginBottom: 10, // Adds spacing between the icon and the title
  },
  title: {
    color: '#FFFFFF',
    marginBottom: 8,
  },
  titleWithoutIcon: {
    fontSize: 15, // Larger font size when no icon is present
    marginTop: 20, // Moves the title up when there's no icon
    fontFamily: 'Arial', // Change the font family
    fontWeight: 'bold', // Make the title bold
  },
});

export default BigStockCard;
