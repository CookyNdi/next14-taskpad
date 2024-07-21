"use server";
import { cookies } from "next/headers";
import type * as z from "zod";

import { env } from "@/env";
import { CreateTaskSchema } from "@/schema/task";
import { type ApiResponse } from "@/type/web";
import { type Task } from "@/type/task";

export const createTask = async (
  request: z.infer<typeof CreateTaskSchema>,
  workspaceId: string,
  boardId: string,
) => {
  const requestValidation = CreateTaskSchema.safeParse(request);
  if (!requestValidation.success) {
    return { error: "Invalid request!" };
  }
  const { title, status } = requestValidation.data;

  const token = cookies().get("access_token");

  if (token) {
    try {
      const res = await fetch(
        `${env.API_URL}/api/workspace/${workspaceId}/board/${boardId}/task`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token.value,
          },
          body: JSON.stringify({
            title,
            status,
          }),
        },
      );

      const response = (await res.json()) as ApiResponse<Task>;
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
