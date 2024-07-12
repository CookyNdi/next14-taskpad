export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full px-4 pt-4 lg:px-8 lg:pt-8">{children}</div>;
}
