"use client";

import Link from "next/link";

import SocialLogin from "@/components/dialog/social-login";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterForm() {
  return (
    <Card className="w-full lg:w-[400px]">
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="jhon@example.com" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="**********" />
        </div>
        <div className="flex justify-between">
          <Link href={"/auth/login"} className="text-sm underline">
            Already have account?
          </Link>
          <Link href={"/auth/forgot-password"} className="text-sm underline">
            Forgot Password!
          </Link>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-y-2">
        <SocialLogin />
        <Button className="w-full">Register</Button>
      </CardFooter>
    </Card>
  );
}
