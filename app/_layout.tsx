import { QueryProvider } from "@/lib/tanstack-query";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <QueryProvider>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="products" />
      </Stack>
    </QueryProvider>
  );
}
