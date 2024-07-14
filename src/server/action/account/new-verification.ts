"use server";
import { env } from "@/env";
import { type AccountResponse } from "@/type/account";
import { type ApiResponse } from "@/type/web";

export const newVerification = async (token: string) => {
  console.log({ token });
  try {
    if (token) {
      const res = await fetch(`${env.API_URL}/api/account/verification-email`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
        }),
      });
      const response = (await res.json()) as ApiResponse<AccountResponse>;
      if (response.data) {
        return { success: response.message };
      } else {
        return { error: response.message ?? response.errors![0]?.message };
      }
    }
  } catch (error) {
    return { error: "Internal Server Error" };
  }
};
