"use server";

import { ChangeAccountAvatarSchema } from "@/schema/account";
import type * as z from "zod";

import { env } from "@/env";
import { type ApiResponse } from "@/type/web";
import { type Account } from "@/type/account";
import { cookies } from "next/headers";
import { setAuthAccountCookies } from "@/lib/cookies";

export const changeAccountAvatar = async (
  request: z.infer<typeof ChangeAccountAvatarSchema>,
) => {
  const requestValidation = ChangeAccountAvatarSchema.safeParse(request);
  if (!requestValidation.success) {
    return { error: "Invalid request!" };
  }
  const { image_url } = requestValidation.data;

  const token = cookies().get("access_token");

  if (token) {
    try {
      const res = await fetch(`${env.API_URL}/api/account/avatar`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token.value,
        },
        body: JSON.stringify({
          image_url,
        }),
      });

      const response = (await res.json()) as ApiResponse<Account>;
      if (response.data) {
        await setAuthAccountCookies(token.value);
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
