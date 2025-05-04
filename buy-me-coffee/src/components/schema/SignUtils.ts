import { z } from "zod";

export const SignUpSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    username: z.string().min(2, "Password must be at least 8 characters"),
    confirmPassword: z.string()
}).refine((formSchema) => formSchema.password === formSchema.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});




export const SignInSchema = z.object({
    identify: z.string().min(2, "Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});


