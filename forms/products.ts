import { z } from "zod";

export const productCreateFormSchema = z.object({
  title: z.string().min(3).max(255),
});
