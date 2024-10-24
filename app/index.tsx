import { useProducts } from "@/hooks/useProducts";
import { Link } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

export default function Index() {
  const { data, error, isLoading } = useProducts();
  return (
    <SafeAreaView className="items-center justify-center flex-1">
     <Link href="/register">Go to Register Page </Link>
     <Link href="/register/login">Go to login Page </Link>
    </SafeAreaView>
  );
}
