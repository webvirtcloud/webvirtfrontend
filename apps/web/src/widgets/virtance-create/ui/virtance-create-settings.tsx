import { useFormContext } from 'react-hook-form';
import { Input } from 'ui/components/input';
import { Label } from 'ui/components/label';
import { VirtanceCreateSecurity } from './virtance-create-security';
import { VirtanceCreateUserdata } from './virtance-create-userdata';

export function VirtanceCreateSettings() {
  const { register } = useFormContext();

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-medium">Settings</h2>

      <div className="space-y-8">
        <VirtanceCreateSecurity />
        <VirtanceCreateUserdata />

        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            className="max-w-sm"
            placeholder="Enter name for server"
            {...register('name', { required: 'Server name is required.' })}
          />
        </div>
      </div>
    </section>
  );
}
