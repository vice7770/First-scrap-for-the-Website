import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  username: z.string().min(6, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})

export default function SignInComponent() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data) => {
    console.log(data)
  }
  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input id="username" className="rounded border-black bg-white placeholder:text-slate-400" type="text" placeholder="Username" {...field} />
                </FormControl>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input id="password" className="rounded border-black bg-white placeholder:text-slate-400" type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormDescription>
                  Sign in with your account name and password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit"className="bg-blue-500 text-white rounded py-2 px-4">Submit</Button>
        </form>
      </Form>
  )
}
