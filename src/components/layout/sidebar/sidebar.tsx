import SidebarContent from "./sidebar-content";

export default function Sidebar() {
  return (
    <div className="fixed left-0 hidden h-[100dvh] w-[20%] flex-col border-r bg-background pt-[68px] lg:flex">
      <SidebarContent />
    </div>
  );
}
