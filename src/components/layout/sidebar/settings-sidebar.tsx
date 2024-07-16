"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname().split("/");
  console.log(pathname);

  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Settings</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav className="grid gap-y-1 text-sm text-muted-foreground">
          <Link
            href="/settings/general"
            className={cn(
              "p-4 rounded-sm",
              pathname.includes("general") && "font-semibold text-primary bg-background border",
            )}
          >
            General
          </Link>
          <Link
            href="/settings/security"
            className={cn(
              "p-4 rounded-sm",
              pathname.includes("security") && "font-semibold text-primary bg-background border",
            )}
          >
            Security
          </Link>
        </nav>
        <div className="grid gap-6">{children}</div>
      </div>
    </main>
  );
}
