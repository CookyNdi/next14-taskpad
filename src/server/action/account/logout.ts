"use server";
import { cookies } from "next/headers";

import { env } from "@/env";
import { type ApiResponse } from "@/type/web";
import { type Account } from "@/type/account";

export const logout = async () => {
  const token = cookies().get("access_token");
  try {
    if (token) {
      const res = await fetch(`${env.API_URL}/api/account/current`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token.value,
        },
      });

      const response = (await res.json()) as ApiResponse<Account>;
      if (response.data) {
        cookies().delete("access_token");
        console.log("logout", response.message);
        return { success: response.message };
      } else {
        return { error: response.message ?? response.errors![0]?.message };
      }
    }
  } catch (error) {
    return { error: "Internal Server Error" };
  }
};
