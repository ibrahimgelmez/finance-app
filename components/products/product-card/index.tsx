import Card from "@/components/ui/card";
import Title from "@/components/ui/title";
import { Product } from "@/types/products";
import React from "react";
import { Text, View } from "react-native";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card>
      <View className="">
        <Title text={product.title} />
        <Text className="text-sm text-gray-500">{product.description}</Text>
      </View>
      <View>
        <Text className="text-lg font-bold">{product.price}</Text>
      </View>
    </Card>
  );
}
