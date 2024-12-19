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
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000', // Dark background
          height: 60, // Adjust height
        },
        tabBarLabelStyle: {
          fontSize: 12, // Adjust font size
        },
        tabBarActiveTintColor: '#32CD32', // Active tab color (similar to green in screenshot)
        tabBarInactiveTintColor: '#fff', // Inactive tab color (white)
      }}
      initialRouteName="index" // Set initial tab
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="portfolio"
        options={{
          title: 'Portfolio',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="line-chart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="compass" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="ellipsis-h" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
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
