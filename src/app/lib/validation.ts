// lib/validation.ts
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;


const allowedCategoryIds = ["1", "2"];


export const productSchema = z.object({
  product: z.object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().min(1, "Description is required"),
    sellingPrice:z.number().nonnegative("Price must not be non-negative"),   
    costPrice:z.number().nonnegative("Price must not be non-negative"),  
    stockQty: z.number().int().nonnegative("Stock must be >= 0"),
    categoryId: z.string().refine((val) => allowedCategoryIds.includes(val), {
      message: "Invalid category",
    }),
    brand: z.string().min(1, "Brand is required"),
    material: z.string().min(1, "Material is required"),
    originCountry: z.string().min(1, "Origin country is required"),
  }),

  sizes: z
    .array(
      z.object({
        size: z.string().min(1, "Size is required"),
        stockQty: z.number().int().nonnegative("Stock must be >= 0"),
      })
    )
    .nonempty("At least one size is required"),

  colors: z
    .array(
      z.object({
        color: z.string().min(1, "Color name is required"),
        hexCode: z.string().regex(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i, "Invalid hex code"),
      })
    )
    .optional(),

  features: z
    .array(
      z.object({
        key: z.string().min(1, "Feature key is required"),
        value: z.string().min(1, "Feature value is required"),
      })
    )
    .optional(),

  imagesMeta: z
    .array(
      z.object({
        color: z.string().min(1, "Image color reference is required"),
      })
    )
    .optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;
