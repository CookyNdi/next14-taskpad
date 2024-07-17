import SidebarContent from "./sidebar-content";
import { type Workspace } from "@/type/workspace";

type SidebarProps = {
  workspace: Workspace[];
};

export default async function Sidebar({ workspace }: SidebarProps) {
  return (
    <div className="fixed left-0 hidden h-[100dvh] w-[20%] flex-col border-r bg-background pt-[68px] lg:flex">
      <SidebarContent workspace={workspace} />
    </div>
  );
}
