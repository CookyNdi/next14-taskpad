import Navbar from "@/components/layout/navbar/navbar";
import Sidebar from "@/components/layout/sidebar/sidebar";
import { currentSession } from "@/lib/auth";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await currentSession();
  return (
    <div className="relative">
      <Navbar session={session} />
      <Sidebar />
      <main className="min-h-[100dvh] w-full pt-[60px] lg:pl-[20%]">
        {children}
      </main>
    </div>
  );
}
