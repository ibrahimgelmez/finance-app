import { View, Text } from "react-native";
import React from "react";

export default function Title({ text }: { text: string }) {
  return (
    <View>
      <Text className="text-xl font-bold text-blue-500">{text}</Text>
    </View>
  );
}
