import * as z from "zod";

export const CreateTaskSchema = z.object({
  title: z.string().min(1).max(100),
  status: z.string().min(1).max(20),
});

export const UpdateTaskSchema = z.object({
  title: z.string().min(1).max(100),
  status: z.string().min(1).max(20),
});
