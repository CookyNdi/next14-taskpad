"use server";
import { cookies } from "next/headers";
import type * as z from "zod";

import { env } from "@/env";
import { UpdateBoardSchema } from "@/schema/board";
import { type ApiResponse } from "@/type/web";
import { type Board } from "@/type/board";

export const editBoard = async (
  request: z.infer<typeof UpdateBoardSchema>,
  workspaceId: string,
  boardId: string,
) => {
  const requestValidation = UpdateBoardSchema.safeParse(request);
  if (!requestValidation.success) {
    return { error: "Invalid request!" };
  }
  const { title, description } = requestValidation.data;

  const token = cookies().get("access_token");

  if (token) {
    try {
      const res = await fetch(
        `${env.API_URL}/api/workspace/${workspaceId}/board/${boardId}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token.value,
          },
          body: JSON.stringify({
            title,
            description,
          }),
        },
      );

      const response = (await res.json()) as ApiResponse<Board>;
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
