"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import SocialLogin from "@/components/dialog/social-login";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { LoginSchema } from "@/schema/account";
import { login } from "@/server/action/account/login";
import { FormError } from "@/components/layout/form-message/form-error";
import { FormSuccess } from "@/components/layout/form-message/form-success";

export default function LoginForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      provider: "Credentials",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    console.log(values);
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            toast({
              title: "Error!",
              description: data.error,
            });
            setError(data.error);
          }
          redirect("/");
          // if (data.success) {
          //   toast({
          //     title: "Success!",
          //     description: data.success,
          //   });
          //   setSuccess(data.success);
          // }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <Card className="w-full lg:w-[400px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
            <FormField
              control={form.control}
              disabled={isPending}
              name="provider"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormLabel>Provider</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between">
              <Link href={"/auth/register"} className="text-sm underline">
                Dont have account?
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
            <div className="flex flex-col gap-y-2">
              <SocialLogin />
              <Button className="w-full">Login</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
