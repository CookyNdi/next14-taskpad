export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <main className="flex h-[100dvh] w-full items-center justify-center px-4">
        {children}
      </main>
    </div>
  );
}
