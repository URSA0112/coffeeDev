'use client'

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "../schema/SignUtils";
import { useForm } from "react-hook-form";
import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

const BASE_URL = process.env.BASE_URL!;

export default function SignUp() {
    const router = useRouter();

    const { signUp, isLoaded, setActive } = useSignUp(); //CLERK
    const [haveUserName, setHaveUserName] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string>("")

    type FormType = z.infer<typeof SignUpSchema>;

    const form = useForm<FormType>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            email: "",
            password: "",
            username: "",
            confirmPassword: "",
        },
    });

    const handleNext = async () => {
        const isValid = await form.trigger("username");
        if (isValid) {
            setHaveUserName(true);
        }
    };

    const onSubmit = async (values: FormType) => {
        if (!isLoaded) return; // Clerk ачааллаж дуусаагүй бол буцаана

        try {
            const result = await signUp.create({  // Clerk ruu New user uusgej bn
                emailAddress: values.email,
                password: values.password,
                username: values.username,
            });

            console.log("Signup result:", result);

            if (result.status === "complete") {
                console.log("✅ Signup complete");

                await setActive({ session: result.createdSessionId }); // Шинэ хэрэглэгчийн session-г идэвхжүүлнэ
                console.log("✅ Session activated");

                toast.success("Successfully signed up!"); // Амжилттай бүртгэгдсэн popup

                try {
                    const response = await axios.post(`${BASE_URL}/api/user`, {  //Backend руу явуулж бн
                        userId: result.createdUserId,
                        email: values.email,
                        username: values.username,
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    console.log('🚀 Profile created successfully:', response.data);

                } catch (err: any) {
                    console.log(err);
                }

                router.push("/createProfile"); // Бүртгэл амжилттай бол createProfile үүсгэх хуудас руу зөөнө
            } else {
                console.log("⏳ Waiting for email verification");
                toast.error("Please verify your email first."); // Имэйл баталгаажуулалт хүлээж байна
            }
        } catch (err: any) {
            console.log("Signup error:", err?.errors?.[0]?.message || err);
            toast.error(err?.errors?.[0]?.message || "Signup failed.");// Алдаа гарвал popup-аар мэдэгдэнэ
            setError(err?.errors?.[0]?.message || err)
        }
    };


    return (
        <div className="py-10 px-20 w-[100%] h-screen">
            <div className="h-full w-full px-32 flex flex-col gap-4 justify-center items-center">
                <div className="w-[400px]">
                    <div id="clerk-captcha" />
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="flex flex-col gap-2">

                                <div className={`${haveUserName ? "hidden" : "block"}`}>
                                    <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[14px] text-black">Username</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter username here"
                                                        {...field}
                                                        className="border outline-none focus-within:outline-none"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        className="w-full rounded-md bg-[#18181b] my-5"
                                        onClick={handleNext}
                                    >
                                        Continue
                                    </Button>
                                    <div className="flex gap-2 my-3 mx-1"> <p>Already have an account?</p>
                                        <Link href="/signIn"><p className="text-rose-400">Sign In</p></Link>
                                    </div>


                                </div>

                                <div className={`${haveUserName ? "block" : "hidden"} space-y-3`}>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[14px] text-black">Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter email here"
                                                        {...field}
                                                        className="border outline-none focus-within:outline-none"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
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
                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" {...field} placeholder="Re-enter password" />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="flex w-full gap-5">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="w-20 my-5"
                                            onClick={() => setHaveUserName(false)}
                                        >
                                            Back
                                        </Button>

                                        <Button
                                            type="submit"
                                            className="w-[70%] rounded-md bg-[#18181b] my-5"
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                    <div className="flex gap-2 my-3 mx-1"> <p>Already have an account?</p>
                                        <Link href="/signIn"><p className="text-rose-400">Sign In</p></Link>
                                    </div>
                                </div>
                                {error && (
                                    <div className="text-red-500 text-sm text-center">
                                        {error}
                                    </div>
                                )}
                                <div id="clerk-captcha" />
                            </div>
                        </form>
                    </Form>
                </div>
            </div>

        </div>
    );
}
