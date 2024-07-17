"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChangeAccountPasswordSchema } from "@/schema/account";
import { FormSuccess } from "@/components/layout/form-message/form-success";
import { FormError } from "@/components/layout/form-message/form-error";
import { changeAccountPassword } from "@/server/action/account/change-password";

export default function ChangePasswordForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ChangeAccountPasswordSchema>>({
    resolver: zodResolver(ChangeAccountPasswordSchema),
    defaultValues: {
      old_password: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ChangeAccountPasswordSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      changeAccountPassword(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="space-y-4">
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
                  <FormDescription>
                    This is your for your new password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              disabled={isPending}
              name="old_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your old account password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormSuccess message={success} />
            <FormError message={error} />
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button disabled={isPending} type="submit">
              Save
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
