import tw from 'twin.macro';

import { resetPassword } from '@/entities/auth';
import { ResetPasswordForm } from '@/features/auth/reset-password-form/ui/reset-password-form/reset-password-form';

export default function ResetPassword() {
  const onSubmit = (data) => {
    resetPassword(data);
  };

  return (
    <>
      <h1 css={tw`mb-8 text-2xl font-bold text-center`}>Reset password</h1>
      <ResetPasswordForm onSubmit={onSubmit} />
    </>
  );
}
