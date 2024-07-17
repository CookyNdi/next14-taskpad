import Navbar from "@/components/layout/navbar/navbar";
import Sidebar from "@/components/layout/sidebar/sidebar";
import { GetWorkspaceList } from "@/server/action/workspace/list";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const workspace = await GetWorkspaceList();
  return (
    <div className="relative">
      <Navbar workspace={workspace} />
      <Sidebar workspace={workspace } />
      <main className="min-h-[100dvh] w-full pt-[60px] lg:pl-[20%]">
        {children}
      </main>
    </div>
  );
}
