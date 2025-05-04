"use client"

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

import { useUserDataStore } from "@/app/hooks/zustand-User"
import { useState } from "react";
import { toast } from "sonner";
import { ProfileSchema, ProfileType } from '@/components/schema/CreatorFormUtils';
import { useForm } from 'react-hook-form';

export default function PersonalInfoSettings() {
  const { profile } = useUserDataStore();
  const [imagePreview, setImagePreview] = useState<string | null>(profile?.image || null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<ProfileType>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: profile?.username || '',
      bio: profile?.about || '',
      image: profile?.image || undefined,
      socialMediaURL: profile?.social_media_url || '',
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('image', file);
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const onSubmit = (values: ProfileType) => {
    console.log("✅ Updated profile:", values);
    toast.success("✅ Profile updated successfully!");
    // TODO: send updated values to backend or update Zustand store
  };

  return (
    <div className="w-full h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          {/* 📸 Image upload */}
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel>Profile Image</FormLabel>
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

          {/* 💾 Save Button */}
          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </Form>
    </div>
  );
}
