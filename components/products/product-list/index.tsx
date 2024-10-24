import { Product } from "@/types/products";
import React from "react";
import { FlatList, Text, View } from "react-native";
import ProductCard from "../product-card";

export default function ProductList({ products }: { products?: Product[] }) {
  return (
    <FlatList
      data={products}
      renderItem={({ item }: { item: Product }) => (
        <ProductCard product={item} />
      )}
    />
  );
}
