import { AlignJustify } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import SidebarContent from "./sidebar-content";
import { GetWorkspaceList } from "@/server/action/workspace/list";

export default async function MobileSidebar() {
  const workspace = await GetWorkspaceList();

  return (
    <Sheet>
      <SheetTrigger asChild className="flex lg:hidden">
        <AlignJustify />
      </SheetTrigger>
      <SheetContent className="z-[125] pt-12">
        <SidebarContent workspace={workspace} />
      </SheetContent>
    </Sheet>
  );
}
