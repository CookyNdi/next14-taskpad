"use server";

import type * as z from "zod";

import { ChangeAccountPasswordSchema } from "@/schema/account";
import { env } from "@/env";
import { type ApiResponse } from "@/type/web";
import { type Account } from "@/type/account";
import { cookies } from "next/headers";
import { setAuthAccountCookies } from "@/lib/cookies";

export const changeAccountPassword = async (
  request: z.infer<typeof ChangeAccountPasswordSchema>,
) => {
  const requestValidation = ChangeAccountPasswordSchema.safeParse(request);
  if (!requestValidation.success) {
    return { error: "Invalid request!" };
  }
  const { old_password, password } = requestValidation.data;

  const token = cookies().get("access_token");

  if (token) {
    try {
      const res = await fetch(`${env.API_URL}/api/account/change-password`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token.value,
        },
        body: JSON.stringify({
          old_password,
          password,
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
