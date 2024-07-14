import NewVerificationForm from "./_components/new-verification-form";

type NewVerificationPageProps = {
  searchParams: {
    token: string;
  };
};

export default function NewVerificationPage({
  searchParams,
}: NewVerificationPageProps) {
  const token = searchParams.token ?? "";
  return <NewVerificationForm token={token} />;
}
