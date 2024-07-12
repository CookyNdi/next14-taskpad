import Link from "next/link";

import { ToggleTheme } from "@/components/theme/toggle-theme";
import Profile from "../profile/profile";

export default function Navbar() {
  return (
    <div className="fixed top-0 z-[110] flex h-[60px] w-full items-center justify-between border-b bg-background/50 px-4 backdrop-blur-md lg:px-12">
      <Link href={"/"} className="text-2xl font-semibold">
        Taskpad
      </Link>
      <div className="flex items-center gap-x-4">
        <ToggleTheme />
        <Profile />
      </div>
    </div>
  );
}
