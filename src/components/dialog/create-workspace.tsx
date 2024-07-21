"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { CreateWorkspaceSchema } from "@/schema/workspace";
import { useToast } from "../ui/use-toast";
import { createWorkspace } from "@/server/action/workspace/create";

type CreateWorkspaceProps = {
  children: React.ReactNode;
};

export default function CreateWorkspace({ children }: CreateWorkspaceProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateWorkspaceSchema>>({
    resolver: zodResolver(CreateWorkspaceSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = (values: z.infer<typeof CreateWorkspaceSchema>) => {
    startTransition(() => {
      createWorkspace(values)
        .then((data) => {
          if (data.error) {
            toast({
              title: "Error!",
              description: data.error,
            });
          }
          if (data.success) {
            toast({
              title: "Success!",
              description: data.success,
            });
            form.reset();
            setOpen(false);
            router.refresh();
          }
        })
        .catch(() => {
          toast({
            title: "Error!",
            description: "Something went wrong",
          });
        });
    });
  };
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[420px]">
        <DialogHeader>
          <DialogTitle>Create New Workspace</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              disabled={isPending}
              name="title"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Workspace 1"
                      {...field}
                      className="col-span-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              disabled={isPending}
              name="description"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Description</FormLabel>
                  <FormControl>
                    <Textarea className="col-span-3 max-h-[190px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Create Workspace</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
