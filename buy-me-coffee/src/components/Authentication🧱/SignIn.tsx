"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { SignInSchema } from "../schema/SignUtils";
import { Eye, EyeOff } from "lucide-react";


export default function SignIn() {
    const router = useRouter();

    const { signIn, isLoaded, setActive } = useSignIn(); // ➕ Clerk setup
    const [showPassword, setShowPassword] = useState(false); // for password input hidden or show
    const [error, setError] = useState<string>("");

    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            identify: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
        if (!isLoaded) return; // Clerk ачааллаж дуусаагүй бол буцаана

        try {
            const result = await signIn.create({ // Clerk ruu New user uusgej bn
                identifier: values.identify, // 🎯 Username эсвэл Email
                password: values.password,
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId }); // Шинэ хэрэглэгчийн session-г идэвхжүүлнэ
                toast.success("Successfully Signed In  ✅");


                router.push("/createProfile"); // Бүртгэл амжилттай бол createProfile үүсгэх хуудас руу зөөнө
            } else {
                toast.info("Please complete the required steps ⏳");
            }
        } catch (err: any) {
            const errorMessage = err?.errors?.[0]?.message || "Something went wrong. Try again.";
            console.error("SignIn error:", errorMessage);
            setError(errorMessage);
            toast.error(errorMessage);
        }
    };

    return (
        <div className="py-10 px-20 w-full h-screen">
            <div className="h-full w-full px-32 flex flex-col gap-4 justify-center items-center">
                <div className="w-[400px]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="flex flex-col gap-2">
                                {/* ✉️ Email эсвэл Username */}
                                <FormField
                                    control={form.control}
                                    name="identify"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[14px] text-black">Username or Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter email or username"
                                                    {...field}
                                                    className="border outline-none focus-within:outline-none"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* 🔐 Password */}
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[14px] text-black">Password</FormLabel>
                                            <div className="flex relative">

                                                <FormControl>
                                                    <Input
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="Enter password here"
                                                        {...field}
                                                        className="border outline-none focus-within:outline-none"
                                                    />
                                                </FormControl>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                                >
                                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                </button>
                                            </div>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button type="submit" className="w-full rounded-md bg-[#18181b]">
                                Submit
                            </Button>

                            <div className="flex gap-2 my-3 mx-1">
                                <p> Create new account</p>
                                <Link href="/signUp"><p className="text-rose-400">Sign Up</p></Link>
                            </div>
                        </form>
                    </Form>
                </div>

                {error && (
                    <div className="text-red-500 text-sm text-center">{error}</div>
                )}
                <div id="clerk-captcha" />
            </div>
        </div>
    );
}
