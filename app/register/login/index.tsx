import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, TextInput, Button, Text } from 'react-native';

export default function App() {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any ) => {
    console.log(data);
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#ccc' }}>
      <Controller
        control={control}
        name="emailOrUsername"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={{ height: 40, borderColor: 'black', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
            placeholder="Email or Username"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.emailOrUsername && <Text style={{ color: 'red' }}>This field is required.</Text>}
      
      <Controller
        control={control}
        name="password"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={{ height: 40, borderColor: 'black', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
            placeholder="Password"
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      {errors.password && <Text style={{ color: 'red' }}>Password is required.</Text>}
     
      <Button title="Login" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
