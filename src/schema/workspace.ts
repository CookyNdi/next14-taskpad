import * as z from "zod";

export const CreateWorkspaceSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(100).optional(),
});

export const UpdateWorkspaceSchema = z.object({
  title: z.string().max(100).optional(),
  description: z.string().max(100).optional(),
});
