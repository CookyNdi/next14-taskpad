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
import { ChangeAccountEmailSchema } from "@/schema/account";
import { FormSuccess } from "@/components/layout/form-message/form-success";
import { FormError } from "@/components/layout/form-message/form-error";
import { changeAccountEmail } from "@/server/action/account/change-email";
import { cn } from "@/lib/utils";
import { sendVerificationToken } from "@/server/action/account/send-verification-token";
import { useToast } from "@/components/ui/use-toast";

export default function ChangeEmailForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isSendVerificationToken, setIsSendVerificationToken] =
    useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof ChangeAccountEmailSchema>>({
    resolver: zodResolver(ChangeAccountEmailSchema),
    defaultValues: {
      email: "",
      old_email: "",
      email_verification_token: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ChangeAccountEmailSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      changeAccountEmail(values)
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

  const handleSendVerificationToken = () => {
    startTransition(() => {
      sendVerificationToken(form.getValues("email"))
        .then((data) => {
          if (data.error) {
            toast({
              title: "Error!",
              description: data.error,
            });
          }
          if (data.success) {
            setIsSendVerificationToken(true);
            toast({
              title: "Success!",
              description: data.success,
            });
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Email</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              disabled={isPending}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Email</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-6 gap-2">
                      <Input
                        placeholder="Jhon@example.com"
                        {...field}
                        className="col-span-5"
                      />
                      <Button
                        disabled={!form.getValues("email")}
                        className="col-span-1 disabled:cursor-not-allowed"
                        type="button"
                        onClick={handleSendVerificationToken}
                      >
                        Send Verification
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>This is for your new email.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              disabled={isPending}
              name="email_verification_token"
              render={({ field }) => (
                <FormItem
                  className={cn("hidden", isSendVerificationToken && "block")}
                >
                  <FormLabel>Token</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your token from email you get previously
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              disabled={isPending}
              name="old_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Previous Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Jhon@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your previously email.
                  </FormDescription>
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
                  <FormDescription>
                    This is your current account password.
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
