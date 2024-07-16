import Navbar from "@/components/layout/navbar/navbar";
import SettingsSidebar from "@/components/layout/sidebar/settings-sidebar";

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <Navbar />
      <main className="min-h-[100dvh] w-full pt-[60px]">
        <SettingsSidebar>{children}</SettingsSidebar>
      </main>
    </div>
  );
}
