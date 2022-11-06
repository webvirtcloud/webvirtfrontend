import { useForm } from 'react-hook-form';
import tw from 'twin.macro';

import Button from '@/components/Button';
import Input from '@/components/Input';

const UpdateProfileForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

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
