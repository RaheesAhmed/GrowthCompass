"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Pencil, User, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  email: z
    .string()
    .min(1, { message: "This field cannot be empty." })
    .email("This is not a valid email."),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfilePage() {
  const { data: session, update: updateSession } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Initialize form with current user data
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    try {
      // In a real app, make an API call to update the user profile
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      // Update session data
      await updateSession({
        ...session,
        user: {
          ...session?.user,
          name: data.name,
          email: data.email,
        },
      });

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Image size should be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // In a real app, upload the image to a storage service
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate upload

      toast({
        title: "Success",
        description: "Profile picture updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8 mt-20">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Profile Settings
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and profile information
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>
              Click on the image to upload a new profile picture
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="relative group">
              <Avatar className="h-24 w-24">
                <AvatarImage src={session?.user?.image || ""} />
                <AvatarFallback>
                  <User className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              <label
                htmlFor="avatar-upload"
                className="absolute inset-0 flex items-center justify-center bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
              >
                <Upload className="h-6 w-6" />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isLoading}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Recommended: Square image, max 5MB
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal information and email address
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your email" {...field} />
                      </FormControl>
                      <FormDescription>
                        This email will be used for notifications and login.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save changes"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
