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
      <main className="min-h-[100dvh] w-full pl-[20%] pt-[60px]">
        {children}
      </main>
    </div>
  );
}
