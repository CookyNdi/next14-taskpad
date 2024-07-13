"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

export default function SocialLogin() {
  const signInHandler = async (provider: "Github" | "Google") => {
    if (provider === "Github") {
      await signIn("github", { callbackUrl: "/" });
    } else if (provider === "Google") {
      await signIn("google", { callbackUrl: "/" });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Another Option
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Another Option</DialogTitle>
        </DialogHeader>
        <Button onClick={() => signInHandler("Google")}>
          <div className="flex items-center gap-x-2">
            <FcGoogle size={20} /> Google
          </div>
        </Button>
        <Button onClick={() => signInHandler("Github")}>
          <div className="flex items-center gap-x-2">
            <FaGithub size={20} /> Github
          </div>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
