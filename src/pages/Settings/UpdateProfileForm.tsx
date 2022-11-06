import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import tw from 'twin.macro';

import { Profile, updateProfile } from '@/api/account';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { store } from '@/store/profile';

const UpdateProfileForm = (): JSX.Element => {
  const [profile] = useAtom(store);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm<Profile>();

  const onSubmit = async (data: Profile) => {
    try {
      const response = await updateProfile(data);

      setValue('email', response.profile.email);
      setValue('first_name', response.profile.first_name);
      setValue('last_name', response.profile.last_name);
    } catch (error) {}
  };

  useEffect(() => {
    profile && setValue('email', profile.email);
    profile && setValue('first_name', profile.first_name);
    profile && setValue('last_name', profile.last_name);
  }, [profile]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} css={tw`space-y-4`}>
      <Input {...register('email')} readonly placeholder="Your email" label="Email" />
      <div css={tw`grid grid-cols-2 gap-4`}>
        <Input {...register('first_name')} placeholder="John" label="First name" />
        <Input {...register('last_name')} placeholder="Doe" label="Last name" />
      </div>
      <Button loading={isSubmitting} css={tw`w-full`} type="submit">
        Update profile
      </Button>
    </form>
  );
};

export default UpdateProfileForm;
