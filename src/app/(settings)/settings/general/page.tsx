import ChangeNameForm from "./_components/change-name-form";
import { getSession } from "@/lib/session";
import ChangeAvatarForm from "./_components/change-avatar-form";

export default async function GeneralSettings() {
  const session = await getSession();
  return (
    <div className="space-y-4">
      <ChangeNameForm session={session} />
      <ChangeAvatarForm />
    </div>
  );
}
