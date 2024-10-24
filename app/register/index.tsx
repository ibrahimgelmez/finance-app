import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, TextInput, Button, Text } from 'react-native';

type FormData = {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
};


export default function App() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <View className="flex-1 p-4 justify-center bg-yellow-400 ">
      <Controller
        control={control}
        name="firstName"
        rules={{ required: true, maxLength: 80 }}
        render={({ field: { onChange, value } }) => (
       
       <View className='bg-gray-200' >
          <TextInput
            className="h-10 border bg- border-black-300 bg-white-200 bg-gray-200 mb-3 px-2"
            placeholder="First name"
            onChangeText={onChange}
            value={value}
            />
            </View>
        )}
      />
      {errors.firstName && <Text className="text-red-500 mb-2">First name is required.</Text>}
      
      <Controller
        control={control}
        name="lastName"
        rules={{ required: true, maxLength: 100 }}
        render={({ field: { onChange, value } }) => (
          <TextInput
          className="h-10 border border-black-300 mb-3 px-2"
            placeholder="Last name"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.lastName && <Text className="text-red-500 mb-2">Last name is required.</Text>}
      
      <Controller
        control={control}
        name="mobileNumber"
        rules={{ required: true, minLength: 6, maxLength: 12 }}
        render={({ field: { onChange, value } }) => (
          <TextInput
          className="h-10 border border-black-300 mb-3 px-2"
            placeholder="Mobile number"
            keyboardType="phone-pad"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.mobileNumber && <Text className="text-red-500 mb-2">Mobile number is required.</Text>}
      
      <Controller
        control={control}
        name="email"
        rules={{ required: true, pattern: /^\S+@\S+$/i }}
        render={({ field: { onChange, value } }) => (
          <TextInput
          className="h-10 border border-black-300 mb-3 px-2"
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.email && <Text className="text-red-500 mb-2">Email is invalid.</Text>}
     <View className="h-10" />
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        <View  />
    </View>
  );
}

