import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { Controller, Control, FieldValues } from 'react-hook-form';
import { FormInputProps } from '../../../types/form'; // Bu import yolunu projenizin dizinine göre ayarlayın

const FormInput: React.FC<FormInputProps> = ({ control, name, rules, placeholder, ...rest }) => {
  return (
    <Controller
      control={control}
      name={name as string} // name'i string olarak tanımlayın
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10 }} // style prop kullanın
          placeholder={placeholder}
          onChangeText={onChange} // onChangeText kullanın
          onBlur={onBlur} // onBlur ekleyin
          value={value}
          {...rest}
        />
      )}
    />
  );
};

export default FormInput;
