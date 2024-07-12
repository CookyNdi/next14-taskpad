import { AlignJustify } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import SidebarContent from "./sidebar-content";

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild className="flex lg:hidden">
        <AlignJustify />
      </SheetTrigger>
      <SheetContent className="z-[125] pt-12">
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );
}
