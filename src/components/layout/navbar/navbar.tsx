import Link from "next/link";
import { type Session } from "next-auth";

import { ToggleTheme } from "@/components/theme/toggle-theme";

import Profile from "../profile/profile";
import MobileSidebar from "../sidebar/mobile-sidebar";
import { Button } from "@/components/ui/button";

type NavbarProps = {
  session: Session | null;
};

export default function Navbar({ session }: NavbarProps) {
  return (
    <div className="fixed top-0 z-[110] flex h-[60px] w-full items-center justify-between border-b bg-background/50 px-4 backdrop-blur-md lg:px-12">
      <Link href={"/"} className="text-2xl font-semibold">
        Taskpad
      </Link>
      <div className="flex items-center gap-x-4">
        <ToggleTheme />
        {session ? (
          <>
            {session.user ? (
              <Profile user={session.user} />
            ) : (
              <Link href="/auth/login">
                <Button>Login</Button>
              </Link>
            )}
          </>
        ) : (
          <Link href="/auth/login">
            <Button>Login</Button>
          </Link>
        )}
        <MobileSidebar />
      </div>
    </div>
  );
}
