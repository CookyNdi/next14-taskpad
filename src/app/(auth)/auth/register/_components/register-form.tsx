"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SocialLogin from "@/components/dialog/social-login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RegisterSchema } from "@/schema/account";
import { FormError } from "@/components/layout/form-message/form-error";
import { FormSuccess } from "@/components/layout/form-message/form-success";
import { register } from "@/server/action/account/register";
import { useToast } from "@/components/ui/use-toast";

export default function RegisterForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    console.log(values);
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values)
        .then((data) => {
          if (data.error) {
            toast({
              title: "Error!",
              description: data.error,
            });
            setError(data.error);
          }
          if (data.success) {
            toast({
              title: "Success!",
              description: data.success,
            });
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <Card className="w-full lg:w-[400px]">
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              disabled={isPending}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="jhon" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              disabled={isPending}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="jhon@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              disabled={isPending}
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
            <div className="flex justify-between">
              <Link href={"/auth/login"} className="text-sm underline">
                Already have account?
              </Link>
              <Link
                href={"/auth/forgot-password"}
                className="text-sm underline"
              >
                Forgot Password!
              </Link>
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            {success && (
              <FormSuccess message="Please check your your email for verification!" />
            )}
            <div className="flex flex-col gap-y-2">
              <SocialLogin />
              <Button className="w-full" type="submit" disabled={isPending}>
                Register
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
