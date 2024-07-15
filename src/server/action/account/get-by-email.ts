"use server";

import { env } from "@/env";
import { type ApiResponse } from "@/type/web";
import { type Account } from "@/type/account";

export const GetAccountByEmail = async (email: string) => {
  try {
    const res = await fetch(`${env.API_URL}/api/account/email?email=${email}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return { error: "Internal Server Error" };
    }

    const response = (await res.json()) as ApiResponse<Account>;
    if (response.data) {
      return { success: response.data.email };
    } else {
      return { error: response.message };
    }
  } catch (error) {
    return { error: "Internal Server Error" };
  }
};
