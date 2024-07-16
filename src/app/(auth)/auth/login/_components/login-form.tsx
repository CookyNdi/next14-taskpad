"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";

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
  const [count, setCount] = useState(3);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values)
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

  useEffect(() => {
    if (success) {
      if (count > 0) {
        const timer = setTimeout(() => {
          setCount(count - 1);
        }, 1000);

        return () => clearTimeout(timer);
      }
    }
  }, [success, count]);

  useEffect(() => {
    if (count === 0) {
      redirect("/");
    }
  }, [count]);

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
            {success && (
              <FormSuccess message={`Authentication please wait ${count}s`} />
            )}
            <div className="flex flex-col gap-y-2">
              <Button className="w-full">Login</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
