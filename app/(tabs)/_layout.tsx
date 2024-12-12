import { Tabs } from 'expo-router';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StockDetails from './details';
import { FontAwesome } from '@expo/vector-icons';

// Create the stack navigator
const Stack = createNativeStackNavigator();

// Tab bar component for specific screens
function TabBarScreens() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'green',
        headerShown: false,
      }}
      initialRouteName="index" // Set initial tab
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={'gray'} />
          ),
        }}
      />
      <Tabs.Screen
        name="details"
        options={{
          title: 'Details',
          tabBarStyle: { display: 'none' }, // Tab bar'da görünmesini engeller
        }}
      />
    </Tabs>
  );
}

// Main Stack
export default function TabLayout() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Main Tabs */}
      <Stack.Screen name="Tabs" component={TabBarScreens} />

      {/* Other Screens */}

      <Stack.Screen
        name="StockDetails"
        component={StockDetails}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
