"use client";
import Link from "next/link";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";

import { ScrollArea } from "@/components/ui/scroll-area";

import CreateWorkspace from "@/components/dialog/create-workspace";
import { type Workspace } from "@/type/workspace";
import { cn } from "@/lib/utils";

type SidebarContentProps = {
  workspace: Workspace[];
};

export default function SidebarContent({ workspace }: SidebarContentProps) {
  const workspaceId = usePathname().slice(11);
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between rounded-b-sm border-b px-4 py-2">
        <h1 className=" text-lg font-semibold">Your Workspace : </h1>
        <CreateWorkspace>
          <Plus className="cursor-pointer" size={18} />
        </CreateWorkspace>
      </div>
      <ScrollArea className="h-[calc(100dvh-86px)] pb-12">
        <div className="flex flex-col">
          {workspace.length > 0 ? (
            <>
              {workspace.map(
                (item) => (
                  <Link key={item.id} href={`/workspace/${item.id}`}>
                    <div
                      className={cn(
                        "w-full rounded-sm px-4 py-2 text-primary border-b hover:bg-muted",
                        workspaceId === item.id && "bg-muted font-semibold",
                      )}
                    >
                      {item.title}
                    </div>
                  </Link>
                ),
              )}
            </>
          ) : (
            <p>Workspace Not Found!</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
