import { type FirewallPayload } from '@/entities/firewall';
import { useFormContext } from 'react-hook-form';
import { Button } from 'ui/components/button';
import { Input } from 'ui/components/input';
import { Label } from 'ui/components/label';
import { Error } from 'ui/components/error';

type Props = {
  onSubmit: (firewall: FirewallPayload) => void;
};

export const CreateFirewallForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormContext<FirewallPayload>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          {...register('name', { required: 'Name of Keypair is required.' })}
          placeholder="Firewall name"
          error={!!errors.name}
        />
        {errors.name && <Error className="mt-1">{errors.name.message}</Error>}
      </div>
      <Button className="w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submiting...' : 'Submit'}
      </Button>
    </form>
  );
};
