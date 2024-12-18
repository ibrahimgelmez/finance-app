import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import resim from '../assets/hisseRobotu.jpg';
import { Link, router } from 'expo-router';

const loginScreen = () => {
  return (
    <ImageBackground
      source={resim}
      style={{ width: '100%', height: '100%', flex: 1 }}
    >
      {/* Container with Red Background */}
      <View
        style={{
          position: 'absolute',
          top: '50%',
          height: '60%',
          width: '100%',
          alignSelf: 'center',
          padding: 20,
          backgroundColor: '#191a20', // Red background for the main container
          borderRadius: 40,
          zIndex: 1,
        }}
      >
        {/* App Title and Description */}
        <Text
          style={{
            color: '#ffffff',
            fontSize: 24,
            textAlign: 'center',
            marginBottom: 10,
          }}
        >
          Finance App
        </Text>
        <Text
          style={{
            color: '#ffffff',
            fontSize: 16,
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          Manage your finances efficiently with our app. Track expenses, set
          budgets, and more.
        </Text>

        {/* Email Input */}
        <TextInput
          placeholder="Email"
          placeholderTextColor="#aaa"
          style={{
            width: '100%',
            height: 50,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: 10,
            paddingHorizontal: 15,
            marginBottom: 15,
          }}
        />

        {/* Password Input */}
        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          style={{
            width: '100%',
            height: 50,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: 10,
            paddingHorizontal: 15,
            marginBottom: 15,
          }}
        />

        {/* Sign In Button */}
        <TouchableOpacity
          style={{
            width: '100%',
            height: 50,
            backgroundColor: '#0066cc',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 15,
          }}
        >
          <Text style={{ color: '#ffffff', fontSize: 16 }}>Sign In</Text>
        </TouchableOpacity>

        {/* Sign in with Google Button */}
        <TouchableOpacity
          style={{
            width: '100%',
            height: 50,
            backgroundColor: '#db4437',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 15,
          }}
        >
          <Text style={{ color: '#ffffff', fontSize: 16 }}>
            Sign in with Google
          </Text>
        </TouchableOpacity>

        {/* Sign Up Section */}
        <TouchableOpacity style={{ marginTop: 15 }}>
          <Text style={{ color: '#ffffff', fontSize: 14, textAlign: 'center' }}>
            Don't have an account?
            <Text style={{ fontWeight: 'bold' }}> Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default loginScreen;
