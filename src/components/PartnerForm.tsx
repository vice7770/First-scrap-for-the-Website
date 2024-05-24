import React, { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "../components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"
import { Input } from "../components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
  
import { Textarea } from "../components/ui/textarea"

const profileFormSchema = z.object({
    username: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max(30, {
        message: "Username must not be longer than 30 characters.",
      }),
    email: z
      .string({
        required_error: "Please select an email to display.",
      })
      .email(),
    bio: z.string().max(160).min(4),
    urls: z
      .array(
        z.object({
          value: z.string().url({ message: "Please enter a valid URL." }),
        })
      )
      .optional(),
})

export type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
    bio: "I own a computer.",
    urls: [
      { value: "https://shadcn.com" },
      { value: "http://twitter.com/shadcn" },
    ],
}

export default function PartnerForm() {
    // const [isHydrating, setIsHydrating] = useState(true)
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: "onChange",
    })
    
    const { fields, append } = useFieldArray({
        name: "urls",
        control: form.control,
    })
    
    async function onSubmit(data: ProfileFormValues) {
        const result = await fetch("/api/partnerPost", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        if (result.ok) {
            window.location.href = "/joinUsRedirect";
        } else {
            console.error(`Error: ${result.status}`);
            // Handle error...
        }
    }

    // useEffect(() => {
    //     setIsHydrating(false);
    //     // if(!isAuth){
    //     //     // cleanCart();
    //     // }
    //     // else {
    //     //     getFavorites();
    //     // }
    // }, []);

    // if (isHydrating) {
    //     return (
    //         <div>Loading...</div>
    //     )
    // }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                        This is your public display name. It can be your real name or a
                        pseudonym. You can only change this once every 30 days.
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
                            <Input placeholder="shadcn@gmail.com" {...field} />
                        </FormControl>
                        <FormDescription>
                            You can manage verified email addresses in your
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder="Tell us a little bit about yourself"
                            className="resize-none"
                            {...field}
                            />
                        </FormControl>
                        <FormDescription>
                            Please explain what you do and what we can do to help you.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <div>
                {fields.map((field, index) => (
                    <FormField
                    control={form.control}
                    key={field.id}
                    name={`urls.${index}.value`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className={cn(index !== 0 && "sr-only")}>
                                Media
                            </FormLabel>
                            <FormDescription className={cn(index !== 0 && "sr-only")}>
                                Add links to your website, blog, or social media profiles, to show your work.
                            </FormDescription>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                ))}
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => {{
                        fields.length < 4 &&
                        append({ value: "" });
                        }
                    }}
                    >
                    Add URL
                </Button>
                </div>
                <Button type="submit">Update profile</Button>
            </form>
        </Form>
    );
}

// export default PartnerForm;