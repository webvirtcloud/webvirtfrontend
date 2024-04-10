import { FormEvent } from 'react';
import { toast } from 'sonner';
import { Button } from 'ui/components/button';

import { resendConfirmEmail } from '@/entities/user';

export function ConfirmEmail() {
  async function resendEmail(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();

      await resendConfirmEmail();

      toast.success('Email has been sent', { description: 'Please check your inbox' });
    } catch (error) {
      toast.error('Something goes wrong', {
        description:
          'We cannot send an email again at this moment. Please try again later or contact support',
      });
    }
  }

  return (
    <div className="flex grow items-center justify-center">
      <form
        onSubmit={resendEmail}
        className="flex flex-col items-center justify-center gap-4 rounded-lg p-8 md:p-16"
      >
        <h1 className="text-lg font-medium">Confirm email please</h1>
        <p className="max-w-md text-center text-neutral-500">
          Please check your inbox and follow instructions. If you didn&apos;t receive it,
          hit button below to resend it again.
        </p>
        <Button type="submit">Resend email</Button>
      </form>
    </div>
  );
}
