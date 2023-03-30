import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from '@/entities/user';
import { type User, updateUser } from '@/entities/user';
import { Button } from 'ui/components/button';
import { Input } from 'ui/components/input';
// import { useToastContext } from '@/shared/ui/Toast';

export function UpdateUserForm() {
  const { data: profile } = useUser();

  // const createToast = useToastContext();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { isSubmitting, isValid, errors },
  } = useForm<User>({ mode: 'onChange' });

  const setDefaultValues = (profile: User) => {
    setValue('email', profile.email);
    setValue('first_name', profile.first_name);
    setValue('last_name', profile.last_name);

    trigger(['email', 'first_name', 'last_name']);
  };

  const onSubmit = async (data: User) => {
    try {
      const response = await updateUser(data);

      setDefaultValues(response.profile);

      // createToast({ type: 'success', message: 'Your profile was updated.' });
    } catch (error) {}
  };

  useEffect(() => {
    profile && setDefaultValues(profile);
  }, [profile]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        {...register('email')}
        readOnly
        placeholder="Your email"
        id="email"
        name="email"
        error={!!errors.email}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          {...register('first_name', { required: 'First name is required.' })}
          placeholder="John"
          id="first_name"
          name="first_name"
          required
          error={!!errors.first_name}
        />
        <Input
          {...register('last_name', { required: 'Last name is required.' })}
          placeholder="Doe"
          id="last_name"
          name="last_name"
          required
          error={!!errors.last_name}
        />
      </div>
      <Button disabled={!isValid} className="w-full" type="submit">
        Update profile
      </Button>
    </form>
  );
}