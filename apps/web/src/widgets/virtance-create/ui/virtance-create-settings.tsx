import { useFormContext } from 'react-hook-form';

import { Input } from 'ui/components/input';

export function VirtanceCreateSettings() {
  const { register } = useFormContext();
  return (
    <section>
      <h2 className="mb-4 text-lg font-medium">Settings</h2>
      <Input
        id="name"
        className="max-w-sm"
        placeholder="Enter name for server"
        {...register('name', { required: 'Server name is required.' })}
      />
    </section>
  );
}
