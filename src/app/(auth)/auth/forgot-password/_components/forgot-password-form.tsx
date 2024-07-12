"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordForm() {
  return (
    <Card className="w-full lg:w-[400px]">
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>Please input your login account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="jhon@example.com" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-y-2">
        <Button className="w-full">Send Verification</Button>
      </CardFooter>
    </Card>
  );
}
