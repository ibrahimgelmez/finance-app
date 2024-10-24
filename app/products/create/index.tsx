import { productCreateFormSchema } from "@/forms/products";
import { createProduct } from "@/services/products";
import { ProductCreateForm } from "@/types/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { Alert, Button, Text, TextInput, View } from "react-native";

export default function ProductCreatePage() {
  //hooks useCreateProduct
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductCreateForm>({
    resolver: zodResolver(productCreateFormSchema),
  });

  const createProductMutation = useMutation({
    mutationKey: ["createProduct"],
    mutationFn: (product: ProductCreateForm) => createProduct(product),
    onSuccess: (data) => {
      Alert.alert("Product created" + data.data?.id);
    },
    onError: () => {
      Alert.alert("Failed to create product");
    },
  });

  const onSubmit = handleSubmit((data) => {
    createProductMutation.mutate(data);
  });

  return (
    <View className="px-4 py-2">
      {/*  bu component */}
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, onBlur, value } }) => (
          // bu ui
          <TextInput
            placeholder="First name"
            className="px-4 py-2 bg-white border-2 border-gray-300 rounded-md"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {/* <ErrorMessage errors={errors} name="title" /> */}
      {/* shadcn cok guzel ayarlamis onu inceleyebiliriz */}
      {errors.title && <Text>{errors.title.message}</Text>}

      {/* ui */}
      <Button title="Submit" onPress={onSubmit} />
    </View>
  );
}
