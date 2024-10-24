import {
  CreateProduct,
  GetProducts,
  Product,
  ProductCreateForm,
} from "@/types/products";
import { get, post } from "@/utils/fetch";

export const getProducts = async () => {
  const data = await get<GetProducts>(`/products`);
  return data;
};

export const createProduct = async (product: ProductCreateForm) => {
  const data = await post<CreateProduct>("/products/add", product);
  return data;
};
