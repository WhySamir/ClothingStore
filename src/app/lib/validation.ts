// lib/validation.ts
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;


const allowedCategoryIds = ["1","2"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB


export const productSchema = z.object({
  product: z.object({
    name: z.string().min(3, "Product name of atleast 3 characters is required"),
    description: z.string().min(1, "Description is required").refine((val) => val.trim().split(/\s+/).length >= 4, {
    message: "At least 4 words are required",
  }),
 
    sellingPrice: z.number().min(10, "Selling price must be greater or equals to 10"),
    costPrice: z.number().min(5,"Cost price must be greater or equals to than 5"),
    // stockQty: z.number().int().positive("Stock must be >= 0"),
      categoryId: z
      .string()
      .refine((val) => allowedCategoryIds.includes(val), {
        message: "One gender please",
      }),
    brand: z.string().min(3, "Brand name of atleast 3 characters is required"),
    material: z.string().min(3, "Material of atleast 3 characters is required"),
    originCountry: z.string().min(3, "Origin country o alteast 3 characters is required"),
  }),

 mainImage: z
    .instanceof(File, { message: "Main image is required" })
    .refine((f) => f.size > 0, "Main image cannot be empty").refine((f) => f.size <= MAX_FILE_SIZE, "Main image must be less than 10MB"),

  sizes: z
  .array(
    z.object({
      size: z.string().min(1, "Size is required"),
      stockQty: z.number().int().nonnegative("Stock must be greater than 0"),
    })
  )
  .nonempty("At least one size is required")
  .refine(
    (arr) => arr.some((s) => s.stockQty >= 1),
    "At least one size must have stockQty of 1 or more"
  ),
  features: z.array(
    z.object({
      key: z.string().min(3, "Feature key of 3 characters is required"),
      value: z.string().min(3, "Feature value of 3 characters is required"),
    })
  ).optional(),  


  tags: z.array(
    z.object({
      name: z.string().min(3, "Tag name of 3 characters is required"),
    })
  ),
colors: z.array(
    z.object({
      color: z.string().min(1, "Color name is required"),
      hexCode: z
        .string()
        .regex(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i, "Invalid hex code"),
    })
  ).min(2, "At least 2 colors are required").max(4, "Maximum 4 colors allowed").superRefine((colors, ctx) => {
    const seen = new Map<string, number[]>();

    colors.forEach((c, idx) => {
      const hex = c.hexCode.toLowerCase();
      if (!seen.has(hex)) {
        seen.set(hex, []);
      }
      seen.get(hex)?.push(idx);
    });

    // For duplicates, add issue to each duplicate's path
    for (const [hex, indices] of seen) {
      if (indices.length > 1) {
        indices.forEach((i) => {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Duplicate hex code",
            path: [i, "hexCode"],
          });
        });
      }
    }
  }),

  imagesMeta: z.array(
    z.object({
      color: z.string().nullable().optional(),
      alt: z.string().nullable().optional(),
      file: z
        .instanceof(File)
        .refine((f) => f.size > 0, "Image file is required").refine((f) => f.size <= MAX_FILE_SIZE, "Image must be less than 10MB"),
    })
  ).min(2, "At least 2 images are required").max(4, "Maximum 4 images allowed"),
}).superRefine((obj, ctx) => {
  if (obj.colors.length  !== obj.imagesMeta.length +1) {
    const msg = `Number of colors (${obj.colors.length }) must match number of images (${obj.imagesMeta.length +1})`;

    ctx.addIssue({
      path: [],
      code: z.ZodIssueCode.custom,
      message: msg,
    });

    ctx.addIssue({
      path: ["colors"],
      code: z.ZodIssueCode.custom,
      message: msg,
    });

    ctx.addIssue({
      path: ["imagesMeta"],
      code: z.ZodIssueCode.custom,
      message: msg,
    });
  }
});




export type ProductFormData = z.infer<typeof productSchema>;

