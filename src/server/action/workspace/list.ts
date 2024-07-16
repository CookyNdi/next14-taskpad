"use server";
import { cookies } from "next/headers";

import { env } from "@/env";
import { type ApiResponse } from "@/type/web";
import { type Workspace } from "@/type/workspace";

export const GetWorkspaceList = async () => {
  const token = cookies().get("access_token");

  if (token) {
    try {
      const res = await fetch(`${env.API_URL}/api/workspace`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token.value,
        },
      });

      const response = (await res.json()) as ApiResponse<Workspace[]>;
      if (response.data) {
        return response.data;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  } else {
    return [];
  }
};
