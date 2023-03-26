import { type Keypair, type KeypairPayload } from '@/entities/keypair';
import { useFormContext } from 'react-hook-form';
import { Button } from 'ui/components/button';
import { Input } from 'ui/components/input';
import { Textarea } from 'ui/components/textarea';
import { Label } from 'ui/components/label';
import { Error } from 'ui/components/error';

type Props = {
  keypair?: Keypair | undefined;
  onSubmit: (keypair: Keypair) => void;
};

export const KeypairForm = ({ keypair, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormContext<KeypairPayload>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          {...register('name', { required: 'Name of Keypair is required.' })}
          placeholder="My access key"
          error={!!errors.name}
        />
        {errors.name && <Error className="mt-1">{errors.name.message}</Error>}
      </div>
      <div className="space-y-1">
        <Label htmlFor="public_key">Public key</Label>
        <Textarea
          readOnly={keypair !== undefined}
          id="public_key"
          rows={10}
          spellCheck={false}
          {...register('public_key', { required: 'Public key is required.' })}
          placeholder="Your public key"
          error={!!errors.public_key}
        />
        {errors.public_key && <Error className="mt-1">{errors.public_key.message}</Error>}
      </div>
      <Button className="w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submiting...' : 'Submit'}
      </Button>
    </form>
  );
};
