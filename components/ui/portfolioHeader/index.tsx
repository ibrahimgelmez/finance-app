import { View, Text } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
const PortfolioHeader = ({ screenName }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        paddingHorizontal: 16,
        paddingVertical: 4,
        alignItems: 'center',
        backgroundColor: '#1ad392',
      }}
    >
      <Ionicons name="logo-closed-captioning" size={24} color="black" />
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: '#FFFFFF',
          marginLeft: 10,
        }}
      >
        {screenName}
      </Text>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Ionicons
          name="ellipsis-horizontal-circle-outline"
          size={32}
          color="white"
        />
      </View>
    </View>
  );
};

export default PortfolioHeader;
