export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full px-8 pt-8">{children}</div>;
}
