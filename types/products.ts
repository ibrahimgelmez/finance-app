import { productCreateFormSchema } from "@/forms/products";
import { z } from "zod";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export type ProductCreateForm = z.infer<typeof productCreateFormSchema>;

// RESPONSES
export interface GetProducts {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface CreateProduct {
  id: number;
}
