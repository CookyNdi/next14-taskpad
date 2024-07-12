import Navbar from "@/components/layout/navbar/navbar";
import Sidebar from "@/components/layout/sidebar/sidebar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <Navbar />
      <Sidebar />
      <main className="min-h-[100dvh] w-full pt-[60px] lg:pl-[20%]">
        {children}
      </main>
    </div>
  );
}
