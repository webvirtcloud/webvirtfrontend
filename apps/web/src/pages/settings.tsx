import { UserUpdateForm, UserUpdatePasswordForm } from '@/features/user';

export default function Settings() {
  return (
    <>
      <section className="mx-auto max-w-7xl space-y-8">
        <div className="grid grid-cols-5 gap-8 rounded-xl border p-8">
          <div className="col-span-2">
            <h2 className="mb-2 text-lg font-medium">Profile</h2>
            <p className="text-muted-foreground">
              Update information about your profile.
            </p>
          </div>
          <div className="col-span-3">
            <UserUpdateForm />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-8 rounded-xl border p-8">
          <div className="col-span-2">
            <h2 className="mb-2 text-lg font-medium">Password</h2>
            <p className="text-muted-foreground">
              You can change your current password to new one. After submitting the form
              you will be redirected to the Sign In page.
            </p>
          </div>
          <div className="col-span-3">
            <UserUpdatePasswordForm />
          </div>
        </div>
      </section>
    </>
  );
}
