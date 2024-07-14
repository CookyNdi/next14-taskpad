"use server";
import type * as z from "zod";
import { AuthError } from "next-auth";
import { LoginSchema } from "@/schema/account";
import { signIn } from "@/auth";

export const login = async (request: z.infer<typeof LoginSchema>) => {
  const requestValidation = LoginSchema.safeParse(request);
  if (!requestValidation.success) {
    return { error: "Invalid request!" };
  }
  const { email, password, provider } = requestValidation.data;

  try {
    await signIn("credentials", {
      email,
      password,
      provider,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
