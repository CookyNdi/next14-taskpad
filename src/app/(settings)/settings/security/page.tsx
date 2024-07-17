import ChangeEmailForm from "./_components/change-email-form";
import ChangePasswordForm from "./_components/change-password-form";

export default async function SecuritySettings() {
  return (
    <div className="space-y-4">
      <ChangeEmailForm />
      <ChangePasswordForm />
    </div>
  );
}
