"use server";

import { env } from "@/env";
import { type ApiResponse } from "@/type/web";
import { type Account } from "@/type/account";

export const sendVerificationToken = async (email: string) => {
  try {
    const res = await fetch(
      `${env.API_URL}/api/account/send-verification-token`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      },
    );

    const response = (await res.json()) as ApiResponse<Account>;
    if (response.message) {
      return { success: response.message };
    } else {
      return { error: response.errors![0]?.message };
    }
  } catch (error) {
    return { error: "Internal Server Error" };
  }
};
