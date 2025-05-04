import { z } from "zod"


// 🧠 Zod ашиглан Schema үүсгэж байна
export const ProfileSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),

  bio: z
    .string()
    .min(1, "Bio is required")
    .max(300, "Bio can't be longer than 300 characters"),

  image:
    z.union([
      z.instanceof(File),
      z.string().min(1) // this handles Cloudinary URL or preview
    ]),

  socialMediaURL: z
    .string()
    .min(1, "Social media URL is required")
    .url("Must be a valid URL"),
})


export const PaymentSchema = z.object({
  country: z.string().min(1, "Country is required"),
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  cardNumber: z
    .string()
    .min(16, "Card number must be 16 digits")
    .max(16, "Card number must be 16 digits")
    .regex(/^\d+$/, "Card number must contain only numbers"),
  expires: z
    .string()
    .min(1, "Expiration month is required")
    .regex(/^(0[1-9]|1[0-2])$/, "Must be a valid month (01-12)"),
  year: z
    .string()
    .min(2, "Year is required")
    .regex(/^2\d{3}$/, "Must be a valid year (e.g. 2025)"),
  cvc: z
    .string()
    .min(3, "CVC must be at least 3 digits")
    .max(4, "CVC must be no more than 4 digits")
    .regex(/^\d+$/, "CVC must be numeric"),
})


// ✅ TypeScript-д зориулсан Type автоматаар schema-гаас үүсгэж байна
export type ProfileType = z.infer<typeof ProfileSchema>

export type PaymentType = z.infer<typeof PaymentSchema>


