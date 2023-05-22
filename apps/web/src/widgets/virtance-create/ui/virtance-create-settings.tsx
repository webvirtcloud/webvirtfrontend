import { useFormContext } from 'react-hook-form';
import { Input } from 'ui/components/input';
import { VirtanceCreateSecurity } from './virtance-create-security';
import { Label } from 'ui/components/label';

export function VirtanceCreateSettings() {
  const { register } = useFormContext();

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-medium">Settings</h2>

      <VirtanceCreateSecurity />

      <div className="flex flex-col gap-2">
        <Label>Name</Label>
        <Input
          id="name"
          className="max-w-sm"
          placeholder="Enter name for server"
          {...register('name', { required: 'Server name is required.' })}
        />
      </div>
    </section>
  );
}
