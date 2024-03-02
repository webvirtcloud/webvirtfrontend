import { useFormContext } from 'react-hook-form';
import { Input } from 'ui/components/input';
import { Label } from 'ui/components/label';

import type { CreateVirtanceForm } from '../types';
import { VirtanceCreateAdvancedOptions } from './virtance-create-advanced-options';
import { VirtanceCreateBackupsSettings } from './virtance-create-backups-settings';
import { VirtanceCreateSecurity } from './virtance-create-security';

export function VirtanceCreateSettings() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateVirtanceForm>();

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-medium">Settings</h2>

      <div className="space-y-8">
        <VirtanceCreateSecurity />
        <VirtanceCreateBackupsSettings />
        <VirtanceCreateAdvancedOptions />

        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            className="max-w-sm"
            placeholder="Enter name for server"
            {...register('name', { required: 'Server name is required.' })}
          />
          {errors.name ? <p className="text-red-500">{errors.name.message}</p> : null}
        </div>
      </div>
    </section>
  );
}
