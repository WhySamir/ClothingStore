// lib/validation.ts
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;




export const productSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  price: z.number().nonnegative(),
  originalPrice: z.number().nonnegative(),
  stock: z.number().int().nonnegative(),
  colors: z.string().optional(),
  sizes: z.string().optional(),
  description: z.string().optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;
