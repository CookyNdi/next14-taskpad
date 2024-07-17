import { AlignJustify } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import SidebarContent from "./sidebar-content";
import { type Workspace } from "@/type/workspace";

type MobileSidebar = {
  workspace: Workspace[];
};

export default async function MobileSidebar({ workspace }: MobileSidebar) {
  return (
    <Sheet>
      <SheetTrigger asChild className="flex lg:hidden">
        <AlignJustify />
      </SheetTrigger>
      <SheetContent className="z-[125] pt-12 px-0">
        <SidebarContent workspace={workspace} />
      </SheetContent>
    </Sheet>
  );
}
