import { View, Text } from "react-native";
import React from "react";

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <View className="flex justify-between px-4 py-2 bg-white border-b border-gray-200">
      {children}
    </View>
  );
}
