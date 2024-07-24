"use client";

import { z } from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { useMutation } from "@apollo/client";
import REGISTER from "@/graphql/auth/register";
import { toast } from "sonner";

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
  const [register] = useMutation(REGISTER);
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

      if (res.data && !res.errors) {
        form.reset();
        toast.success(res.data.message, {
          description: new Date().toLocaleDateString("FR-fr"),
        });
        setAccountCreated(true);
      }
    } catch (err) {
      console.error("Register error:", (err as Error).message);
    }
  };

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
                  <FormLabel>
                    Email<span className="text-xs text-gray-500 h-fit w-fit ">*</span>
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
                  <FormLabel>Password</FormLabel>
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
                  <FormLabel>Confirm your password</FormLabel>
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
