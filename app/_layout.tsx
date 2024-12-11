import { Slot } from 'expo-router';
import { AuthProvider } from '@/context/auth';
import Index from './(tabs)';
import { StockProvider } from '@/context/stock';
import Discovery from './(tabs)/search';
import MyStocks from './(tabs)/myStock';

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <AuthProvider>
      <StockProvider>
        <Slot />
      </StockProvider>
    </AuthProvider>
  );
}
