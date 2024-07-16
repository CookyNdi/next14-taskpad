import { GetWorkspaceList } from "@/server/action/workspace/list";
import SidebarContent from "./sidebar-content";

export default async function Sidebar() {
  const workspace = await GetWorkspaceList();
  return (
    <div className="fixed left-0 hidden h-[100dvh] w-[20%] flex-col border-r bg-background pt-[68px] lg:flex">
      <SidebarContent workspace={workspace} />
    </div>
  );
}
