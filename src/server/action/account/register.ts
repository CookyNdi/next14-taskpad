"use server";
import type * as z from "zod";

import { env } from "@/env";
import { RegisterSchema } from "@/schema/account";
import { type ApiResponse } from "@/type/web";
import { type AccountResponse } from "@/type/account";

export const register = async (request: z.infer<typeof RegisterSchema>) => {
  const requestValidation = RegisterSchema.safeParse(request);
  if (!requestValidation.success) {
    return { error: "Invalid request!" };
  }
  const { name, email, password, image_url, provider } = requestValidation.data;

  try {
    const res = await fetch(`${env.API_URL}/api/account`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        image_url,
        provider,
      }),
    });

    const response = (await res.json()) as ApiResponse<AccountResponse>;
    if (response.data) {
      return { success: response.message };
    } else {
      return { error: response.message ?? response.errors![0]?.message };
    }
  } catch (error) {
    return { error: "Internal Server Error" };
  }
};
