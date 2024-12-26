import { Tabs } from 'expo-router';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StockDetails from './details';
import { FontAwesome } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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
            <Ionicons name="home-outline" size={24} color={'white'} />
          ),
        }}
      />
      <Tabs.Screen
        name="portfolio"
        options={{
          title: 'Portfolio',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="linechart" size={24} color={'white'} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass" size={24} color={'white'} />
          ),
        }}
      />
      <Tabs.Screen
        name="helpCenter"
        options={{
          title: 'Help',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="hire-a-helper" size={24} color={'white'} />
          ),
        }}
      />
      <Tabs.Screen
        name="myStock"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="account-circle" size={24} color={'white'} />
          ),
        }}
      />
      <Tabs.Screen
        name="details"
        options={{
          title: 'Account',
          tabBarButton: () => null, // Hide icon from tab bar
        }}
      />
      <Tabs.Screen
        name="discoveryScreen"
        options={{
          title: 'Discovery',
          tabBarButton: () => null, // Hide icon from tab bar
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
