import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

import type { ChangePasswordPayload } from '@/api/account';
import { changePassword } from '@/api/account';
import Button from '@/components/Button';
import Input from '@/components/Input';

const ChangePasswordForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ChangePasswordPayload>();

  const navigate = useNavigate();

  const onSubmit = async (data: ChangePasswordPayload) => {
    try {
      await changePassword(data);

      window.localStorage.removeItem('token');

      navigate('/sign-in');
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} css={tw`space-y-4`}>
      <Input
        {...register('old_password')}
        placeholder="Your current password"
        label="Current password"
        type="password"
      />
      <Input
        {...register('new_password')}
        placeholder="New secure password"
        label="New password"
        type="password"
      />
      <Input
        {...register('new_password_confirm')}
        placeholder="New secure password again"
        label="New password confirm"
        type="password"
      />
      <Button css={tw`w-full`} type="submit" loading={isSubmitting}>
        Change password
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
