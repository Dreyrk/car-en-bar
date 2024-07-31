"use client";

import { z } from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { toast } from "sonner";
import { useRegisterMutation } from "@/graphql/generated/schema";
import Loader from "../ui/loader";
import Required from "../ui/required";

const registerSchema = z
  .object({
    username: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .optional(),
    email: z.string().min(3).email(),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Please confirm your password",
    path: ["confirmPassword"],
  });

export default function RegisterForm({
  setAccountCreated,
}: {
  setAccountCreated: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [register, { loading, error }] = useRegisterMutation();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (user: z.infer<typeof registerSchema>) => {
    const newUser = {
      username: user.username || "",
      email: user.email,
      password: user.password,
    };
    try {
      const res = await register({
        variables: {
          newUser,
        },
      });

      if (res.data?.register.success && !res.errors?.length) {
        form.reset();
        toast.success(res.data.register.message, {
          description: new Date().toLocaleDateString("FR-fr"),
        });
        setAccountCreated(true);
      } else {
        toast.error("Failed to create new account, try again later.");
      }
    } catch (err) {
      console.error("Register error:", (err as Error).message);
    }
  };

  if (loading) {
    return <Loader size={50} />;
  }

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Create a new account.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Carenbar98" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="relative">
                    Email
                    <Required />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="exemple@email.com" {...field} />
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
                  <FormLabel className="relative">
                    Password <Required />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="relative">
                    Confirm your password <Required />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit">Register</Button>
            <Button
              onClick={() => setAccountCreated(true)}
              variant={"link"}
              className="text-xs font-semibold text-gray-500"
              type="button">
              Already registered ? Sign in.
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
