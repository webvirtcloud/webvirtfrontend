import { useForm } from 'react-hook-form';
import tw from 'twin.macro';

import type { CreateKeypairPayload } from '@/api/keypairs';
import { createKeypair } from '@/api/keypairs';
import { Button } from '@/components/Button';
import { Dialog } from '@/components/Dialog';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';

type Props = {
  isOpen: boolean;
  onToggle: (state: boolean) => void;
};

export const CreateKeypairDialog = ({ isOpen, onToggle }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateKeypairPayload>();

  const onSubmit = (data: CreateKeypairPayload) => {
    try {
      createKeypair(data);
      onToggle(false);
    } catch (error) {}
  };

  return (
    <Dialog title="Create Keypair" isOpen={isOpen} onClose={() => onToggle(false)}>
      <form onSubmit={handleSubmit(onSubmit)} css={tw`space-y-4`}>
        <div>
          <Input
            id="name"
            {...register('name', { required: 'Name of Keypair is required.' })}
            label="Name"
            placeholder="My access key"
          />
          {errors.name && (
            <p css={tw`text-red-500`} role="alert">
              {errors.name?.message}
            </p>
          )}
        </div>
        <div>
          <Textarea
            id="public_key"
            rows={10}
            spellCheck={false}
            {...register('public_key', { required: 'Public key is required.' })}
            label="Public key"
            placeholder="Your public key"
          ></Textarea>
          {errors.public_key && (
            <p css={tw`text-red-500`} role="alert">
              {errors.public_key?.message}
            </p>
          )}
        </div>
        <Button
          variant="primary"
          type="submit"
          fullWidth
          size="lg"
          loading={isSubmitting}
        >
          Submit
        </Button>
      </form>
    </Dialog>
  );
};
