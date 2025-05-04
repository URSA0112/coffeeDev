import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form, FormField, FormItem, FormLabel, FormControl, FormMessage
} from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { PaymentSchema, type PaymentType } from "../schema/CreatorFormUtils"
import CountrySelect from "./Countries"
import { useUserDataStore } from "@/app/hooks/zustand-User"
import { useState } from "react"
import { uploadImageToCloudinary } from "@/lib/Cloudinary"
import { BASE_URL } from "@/app/constants/routes"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs";

export default function CreatorFormPayment({ imageFile }: { imageFile: File | null }) {
    const router = useRouter()
    const profile = useUserDataStore((state) => state.profile);
    const [selectedCountry, setSelectedCountry] = useState("")
    const { user } = useUser();

    // ✅ useForm ашиглан Zod-ийн validation-г формд холбож, form-н анхны утгуудыг defaultValues ашиглан зааж өгч байна
    // 🛠️ initialize react-hook-form + Zod + define default value
    const form = useForm<PaymentType>({
        resolver: zodResolver(PaymentSchema),
        defaultValues: {
            country: "",
            firstname: "",
            lastname: "",
            cardNumber: "",
            expires: "",
            year: "",
            cvc: "",
        },
    })

    const onSubmit = async (values: PaymentType) => {
        // console.log(values)      Payment info
        // console.log(profile)     Profile info
        // console.log(imageFile)  image string

        // 1. cloudinary convert send.
        // 2. profile and Payment send to Backend with roken
        // 3. show loading animation

        try {
            if (!imageFile) {
                toast("need image")
                return
            }
            const imageUrl = await uploadImageToCloudinary(imageFile); //waiting get Link from cloudinary

            if (!imageUrl) {
                console.log("cloudinary uplaod failed");
            }

            const response = await axios.post(`${BASE_URL}/api/profile`, {  //Backend руу явуулж бн
                name: profile?.username,
                about: profile?.about,
                image: imageUrl,
                socialUrl: profile?.socialmediaUrl,
                userId: user?.id,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('🚀 Profile created successfully:', response.data);

            if (response.status === 200) {
                toast.success("🌟 Boom! Your profile is live. Let the magic begin! 🔥", {
                    duration: 6000,
                    style: {
                        fontSize: "1.05rem",
                        fontWeight: "600",
                        color: "#1a1a1a",
                    },
                });
                router.push("/home")
            }

        } catch (err: any) {
            console.log('❌ Error creating profile:', err);
            if (err?.response?.data?.message?.includes('unique constraint "profile_user_id_key"')) {
                console.log("❗ A profile already exists for this user.");
            }
            toast.error("❗ A profile already exists for this user.")
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mb-3">

                {/* Country */}
                <FormField
                    control={form.control}
                    name="country"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <CountrySelect
                                    value={field.value}
                                    onChange={field.onChange}
                                    fieldState={fieldState}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* First Name */}
                    <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John" autoComplete="first-name" {...field} />

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Last Name */}
                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Doe" autoComplete="family-name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Card Number */}
                <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="1234 5678 9012 3456"
                                    maxLength={16}
                                    autoComplete="cc-number"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-3 gap-4">
                    {/* Exp. Month */}
                    <FormField
                        control={form.control}
                        name="expires"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Exp. Month</FormLabel>
                                <FormControl>
                                    <Input placeholder="MM" maxLength={2} autoComplete="cc-exp-month" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Exp. Year */}
                    <FormField
                        control={form.control}
                        name="year"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Exp. Year</FormLabel>
                                <FormControl>
                                    <Input placeholder="2026" maxLength={4} autoComplete="cc-exp-year" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* CVC */}
                    <FormField
                        control={form.control}
                        name="cvc"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>CVC</FormLabel>
                                <FormControl>
                                    <Input placeholder="123" maxLength={4} autoComplete="cc-csc" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit" className="w-full">
                    Submit Payment
                </Button>

            </form>
        </Form >
    )
}
