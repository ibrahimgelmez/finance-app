import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTailwind } from 'nativewind';

const HelpCenter = () => {
  const [selectedTab, setSelectedTab] = useState('FAQ');
  const [expandedItem, setExpandedItem] = useState(null);

  const faqData = [
    {
      question: 'What is Speyee?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      question: 'How to buy stock on Speyee?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      question: 'How to sell stock on Speyee?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      question: 'How to exchange stock on Speyee?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      question: 'How to close an Speyee account?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
  ];

  const toggleItem = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  return (
    <SafeAreaView className="bg-gray-900 flex-1 ">
      <View className="mx-4">
        <View className="flex-row justify-between  items-center">
          <Text className="text-white text-xl font-semibold">Help Center</Text>
        </View>

        {/* Tabs */}
        <View className="flex-row mt-4 bg-gray-900  ">
          <TouchableOpacity
            onPress={() => setSelectedTab('FAQ')}
            className="mr-4"
          >
            <Text
              className={`text-lg ${
                selectedTab === 'FAQ' ? 'text-green-400' : 'text-gray-500'
              }`}
            >
              FAQ
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Indicator */}
        <View className="border-b border-gray-700 my-2">
          <View className="w-1/2 h-1 bg-green-400" />
        </View>

        {/* FAQ List */}
        <ScrollView className="mt-4">
          {faqData.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => toggleItem(index)}
              className="bg-gray-800 mb-2 p-4 rounded-lg"
            >
              <View className="flex-row justify-between items-center">
                <Text className="text-white text-base">{item.question}</Text>
                <Ionicons name="chevron-down" size={20} color="green" />
              </View>
              {expandedItem === index && (
                <Text className="text-gray-400 mt-2">{item.answer}</Text>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HelpCenter;
