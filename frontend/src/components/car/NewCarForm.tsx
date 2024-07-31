"use client";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Required from "../ui/required";
import { useCreateCarMutation, useGetProfileQuery } from "@/graphql/generated/schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import client from "@/lib/apolloClient";

const carSchema = z.object({
  brand: z.string().min(3, { message: "Car brand is required" }),
  model: z.string().min(1, { message: "Car model is required" }),
  year: z.number().optional(),
  plate_number: z.string().optional(),
});

export default function NewCarForm() {
  const router = useRouter();
  const { data, loading, error } = useGetProfileQuery();
  const userId = data?.getProfile.id;
  const [registerCar] = useCreateCarMutation();
  const form = useForm<z.infer<typeof carSchema>>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      brand: "",
      model: "",
      year: 2011,
      plate_number: "",
    },
  });

  const onSubmit = async (car: z.infer<typeof carSchema>) => {
    try {
      await registerCar({
        variables: { car },
        onCompleted: (data) => {
          if (data.createCar.success) {
            toast.success("New vehicule registered");
            form.reset();
            client.resetStore();
            router.push(`/profile/${userId}`);
          } else {
            toast.error(data.createCar.message);
          }
        },
      });
    } catch (e) {
      toast.error("Something wrong");
      throw new Error(`Cannot create vehicule: ${(e as Error).message}`);
    }
  };
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Register your vehicle</CardTitle>
        <CardDescription>Enter your vehicle informations below</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="relative">
                    Brand
                    <Required />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Porsche" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="relative">
                    Model
                    <Required />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="911 GT" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field: { value, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input placeholder="2011" type="number" value={Number(value)} {...fieldProps} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plate_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plate Number</FormLabel>
                  <FormControl>
                    <Input placeholder="AB-756-YZ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full mx-4 font-semibold text-base" type="submit">
              Register vehicule
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
