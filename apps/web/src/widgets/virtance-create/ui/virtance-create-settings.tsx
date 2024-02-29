import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox } from 'ui/components/checkbox';
import { Input } from 'ui/components/input';
import { Label } from 'ui/components/label';

import { Region } from '@/entities/region';

import type { CreateVirtanceForm } from '../types';
import { VirtanceCreateSecurity } from './virtance-create-security';
import { VirtanceCreateUserdata } from './virtance-create-userdata';

export function VirtanceCreateSettings({ regions }: { regions: Region[] }) {
  const { register, control, watch } = useFormContext<CreateVirtanceForm>();

  const { slug: regionSlug } = watch('region');
  const region = regions.find((region) => region.slug === regionSlug);

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-medium">Settings</h2>

      <div className="space-y-8">
        <VirtanceCreateSecurity />
        <VirtanceCreateUserdata />

        {region?.features.includes('backup') && (
          <Controller
            name="backups"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <div className="flex gap-2">
                <Checkbox
                  {...field}
                  value={undefined}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="backups"
                  {...register('backups')}
                />
                <Label htmlFor="backups" className="leading-normal">
                  Backups
                </Label>
              </div>
            )}
          />
        )}

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
