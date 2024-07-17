"use server";
import { cookies } from "next/headers";
import type * as z from "zod";

import { env } from "@/env";
import { CreateWorkspaceSchema } from "@/schema/workspace";
import { type Workspace } from "@/type/workspace";
import { type ApiResponse } from "@/type/web";

export const createWorkspace = async (
  request: z.infer<typeof CreateWorkspaceSchema>,
) => {
  const requestValidation = CreateWorkspaceSchema.safeParse(request);
  if (!requestValidation.success) {
    return { error: "Invalid request!" };
  }
  const { title, description } = requestValidation.data;

  const token = cookies().get("access_token");

  if (token) {
    try {
      const res = await fetch(`${env.API_URL}/api/workspace`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token.value,
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      const response = (await res.json()) as ApiResponse<Workspace>;
      if (response.data) {
        return { success: response.message };
      } else {
        return { error: response.message ?? response.errors![0]?.message };
      }
    } catch (error) {
      return { error: "Internal Server Error" };
    }
  } else {
    return { error: "Please Login First!" };
  }
};
