import ProductList from "@/components/products/product-list";
import { useProducts } from "@/hooks/useProducts";
import { Link } from "expo-router";
import { View } from "react-native";

export default function ProductListPage() {
  const { data, error, isLoading } = useProducts();
  return (
    <View className="items-center justify-center flex-1">
      <Link href="/products/create">Create product</Link>

      <ProductList products={data?.data?.products} />
    </View>
  );
}
