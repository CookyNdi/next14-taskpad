"use client";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/server/action/account/logout";
import { useToast } from "@/components/ui/use-toast";
import { type Account } from "@/type/account";

type ProfileProps = {
  session: Account;
};

export default function Profile({ session }: ProfileProps) {
  const { toast } = useToast();

  const handleLogout = async () => {
    await logout().then((data) => {
      if (data?.success) {
        toast({
          title: "Success!",
          description: data.success,
        });
      }
      if (data?.error) {
        toast({
          title: "Error!",
          description: data.error,
        });
      }
    });
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={"https://i.imgur.com/Xsquikt.jpeg"} />
            <AvatarFallback>{"CN"}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-[120] w-56" align="end">
          <DropdownMenuLabel>{session.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={"/p/CookyNdi"}>
            <DropdownMenuItem className="cursor-pointer">
              Profile
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
