import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const Register = () => {
  return (
    <SafeAreaView className=" flex-1 items-center bg-gray-900 px-4">
      <View className="w-full p-1 ">
        <Text className="text-white text-3xl font-semibold mb-4">
          Hello there 👋
        </Text>
        <Text className="text-white text-base mb-8">
          Please enter your account email address and password. We will send an
          OTP code for verification in the next step.
        </Text>

        <Text className="text-white font-bold text-sm mb-2">Email</Text>
        <TextInput
          placeholder="you@example.com"
          placeholderTextColor="#555"
          className="w-full bg-gray-800 text-white p-4 rounded-md mb-4"
          keyboardType="email-address"
        />

        <Text className="text-white font-bold text-sm mb-2">Password</Text>
        <TextInput
          placeholder="Enter your password"
          placeholderTextColor="#555"
          className="w-full bg-gray-800 text-white p-4 rounded-md mb-6"
          secureTextEntry={true}
        />

        <TouchableOpacity className="w-full bg-green-500 p-4 rounded-full">
          <Text className="text-white text-center text-lg font-semibold">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Register;
