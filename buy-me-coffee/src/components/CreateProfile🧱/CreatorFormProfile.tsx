import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ProfileType, ProfileSchema } from '../schema/CreatorFormUtils';
import { useUserDataStore } from "@/app/hooks/zustand-User"

type CreatorFormProfileFormProps = {
    onContinue: (values: ProfileType) => void;
    setImagePreview: (url: string) => void;
    imagePreview?: string | null;
    imageFile: (file: File) => void
};


export default function CreatorFormProfile({ onContinue, setImagePreview, imagePreview, imageFile }: CreatorFormProfileFormProps) {

    const { profile } = useUserDataStore()

    const form = useForm<ProfileType>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            name: profile?.username || '',
            bio: profile?.about || '',
            image: profile?.image || undefined,
            socialMediaURL: profile?.social_media_url || '',
        },
    });

    // 🎯 Файлаа авна
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; //file helbereer
        if (file) {
            form.setValue('image', file); // React Hook Form-д file хадгална
            setImagePreview(URL.createObjectURL(file));// Зураг урьдчилж preview хийнэ URL helbereer img src= ...
            imageFile(file); // image as File
        }
    };

    return (
        <div className="w-full h-full">

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onContinue)}

                    className="space-y-6">

                    {/* 📸 Image upload */}
                    <FormField
                        control={form.control}
                        name="image"
                        render={() => (
                            <FormItem>
                                <FormLabel>Upload Image</FormLabel>
                                <FormControl>
                                    <label className="relative w-32 h-32 rounded-full border cursor-pointer overflow-hidden">
                                        {imagePreview ? (
                                            <img src={imagePreview} className="w-full h-full object-cover" />
                                        ) : (
                                            <img
                                                src="/camera.svg"
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8"
                                            />
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </label>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* 🧍 Name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* 📝 Bio */}
                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>About</FormLabel>
                                <FormControl>
                                    <Input placeholder="Write about yourself" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* 🔗 Social Media URL */}
                    <FormField
                        control={form.control}
                        name="socialMediaURL"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Social Media URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* 🔥 Continue Button */}
                    <Button type="submit" className="w-full">
                        Continue
                    </Button>

                </form>
            </Form>
        </div>
    );
}
