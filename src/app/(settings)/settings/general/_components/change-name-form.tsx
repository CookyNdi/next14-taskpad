"use client";
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
import { ChangeAccountNameSchema } from "@/schema/account";
import { type Account } from "@/type/account";
import { FormSuccess } from "@/components/layout/form-message/form-success";
import { FormError } from "@/components/layout/form-message/form-error";
import { useState, useTransition } from "react";
import { changeAccountName } from "@/server/action/account/change-name";

type ChangeNameFormProps = {
  session: Account | null;
};

export default function ChangeNameForm({ session }: ChangeNameFormProps) {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ChangeAccountNameSchema>>({
    resolver: zodResolver(ChangeAccountNameSchema),
    defaultValues: {
      name: session?.name,
    },
  });

  const onSubmit = (values: z.infer<typeof ChangeAccountNameSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      changeAccountName(values)
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
        <CardTitle>Name</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              disabled={isPending}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jhon" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
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
