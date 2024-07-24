"use client";

import { z } from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "../ui/card";
import { toast } from "sonner";
import { useMutation } from "@apollo/client";
import LOGIN from "@/graphql/auth/login";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
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
});
const loginSchema = z.object({
  email: z.string().min(3).email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function LoginForm({
  setAccountCreated,
}: {
  setAccountCreated: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [login] = useMutation(LOGIN);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (user: z.infer<typeof loginSchema>) => {
    try {
      const res = await login({
        variables: {
          user: {
            email: user.email,
            password: user.password,
          },
        },
      });

      if (res.data && !res.errors) {
        form.reset();
        toast.success(res.data.message, {
          description: new Date().toLocaleDateString("FR-fr"),
        });
        router.push("/");
      }
    } catch (err) {
      console.error("Register error:", (err as Error).message);
    }
  };

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your email and password to access your account.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
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
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit">Login</Button>
            <Button
              onClick={() => setAccountCreated(false)}
              variant={"link"}
              className="text-xs font-semibold text-gray-500"
              type="button">
              Not registered yet ? Create account.
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
