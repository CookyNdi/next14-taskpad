import * as z from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(1).max(100),
  email: z
    .string()
    .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
      message: "Please enter a valid email address.",
    })
    .regex(/^[^\s]+$/, { message: "Email must not contain spaces." }),
  password: z.string().min(8, {
    message: "Password must be 8 characters long!",
  }),
});

export const LoginSchema = z.object({
  email: z
    .string()
    .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
      message: "Please enter a valid email address.",
    })
    .regex(/^[^\s]+$/, { message: "Email must not contain spaces." }),
  password: z.string().min(8, {
    message: "Password must be 8 characters long!",
  }),
});

export const ChangeAccountNameSchema = z.object({
  name: z.string().min(1).max(100),
});

export const ChangeAccountAvatarSchema = z.object({
  image_url: z.string().min(1).max(100),
});

export const ChangeAccountEmailSchema = z.object({
  email: z
    .string()
    .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
      message: "Please enter a valid email address.",
    })
    .regex(/^[^\s]+$/, { message: "Email must not contain spaces." }),
  old_email: z
    .string()
    .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
      message: "Please enter a valid email address.",
    })
    .regex(/^[^\s]+$/, { message: "Email must not contain spaces." }),
  email_verification_token: z
    .string()
    .min(1, { message: "Please input valid token!" })
    .max(100),
  password: z.string().min(8, {
    message: "Password must be 8 characters long!",
  }),
});

export const ChangeAccountPasswordSchema = z.object({
  password: z.string().min(1).max(20),
  old_password: z.string().min(1).max(20),
});
