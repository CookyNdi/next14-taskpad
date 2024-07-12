import { ToggleTheme } from "@/components/theme/toggle-theme";

export default function Navbar() {
  return (
    <div className="fixed top-0 z-[110] flex h-[60px] w-full items-center justify-between border-b bg-background/50 px-12 backdrop-blur-md">
      <h1>Taskpad</h1>
      <ToggleTheme />
    </div>
  );
}
