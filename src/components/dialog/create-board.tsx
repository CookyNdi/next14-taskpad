"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CreateBoardSchema } from "@/schema/board";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import { createBoard } from "@/server/action/board/create";

type CreateBoardProps = {
  children: React.ReactNode;
  workspaceId: string;
};

export default function CreateBoard({
  children,
  workspaceId,
}: CreateBoardProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateBoardSchema>>({
    resolver: zodResolver(CreateBoardSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  function onSubmit(values: z.infer<typeof CreateBoardSchema>) {
    startTransition(() => {
      createBoard(values, workspaceId)
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
            setOpen(false);
            form.reset();
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
  }
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[420px] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Board</DialogTitle>
          <DialogDescription>Create your own board here.</DialogDescription>
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
                    <Input {...field} className="col-span-3" />
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
                    <Textarea className="col-span-3 max-h-[160px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
