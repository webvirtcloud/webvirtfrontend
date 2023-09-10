import { Controller, useFormContext } from 'react-hook-form';
import { Input } from 'ui/components/input';
import { Label } from 'ui/components/label';
import { Checkbox } from 'ui/components/checkbox';
import { VirtanceCreateSecurity } from './virtance-create-security';
import { VirtanceCreateUserdata } from './virtance-create-userdata';
import { Region } from '@/entities/region/types';

export function VirtanceCreateSettings() {
  const { register, control, watch } = useFormContext();

  const region: Region = watch('region');

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-medium">Settings</h2>

      <div className="space-y-8">
        <VirtanceCreateSecurity />
        <VirtanceCreateUserdata />
        
        {region.features.includes('backup') && <Controller
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
        />}

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
