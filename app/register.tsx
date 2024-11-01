// app/register.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';

const Input = styled(TextInput);

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Registration logic here
    console.log({ name, email, password });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#191a1f] items-center px-5">
      <StatusBar barStyle="light-content" />

      {/* Title */}
      <Text className="text-white text-3xl font-bold mt-10">Register</Text>

      {/* Name Input */}
      <View className="w-full mt-10">
        <Text className="text-gray-400 mb-2">Name</Text>
        <Input
          className="bg-gray-800 text-white p-4 rounded-md"
          placeholder="Enter your name"
          placeholderTextColor="#666"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Email Input */}
      <View className="w-full mt-5">
        <Text className="text-gray-400 mb-2">Email</Text>
        <Input
          className="bg-gray-800 text-white p-4 rounded-md"
          placeholder="Enter your email"
          placeholderTextColor="#666"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Password Input */}
      <View className="w-full mt-5">
        <Text className="text-gray-400 mb-2">Password</Text>
        <Input
          className="bg-gray-800 text-white p-4 rounded-md"
          placeholder="Enter your password"
          placeholderTextColor="#666"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Register Button */}
      <TouchableOpacity
        className="bg-green-500 py-4 rounded-full w-full mt-10"
        onPress={handleRegister}
      >
        <Text className="text-black text-center font-bold">Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RegisterScreen;
