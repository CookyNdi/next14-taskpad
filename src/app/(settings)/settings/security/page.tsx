import { getSession } from "@/lib/session";
import ChangeEmailForm from "./_components/change-email-form";

export default async function SecuritySettings() {
  const session = await getSession();
  return (
    <div className="space-y-4">
      <ChangeEmailForm />
    </div>
  );
}
