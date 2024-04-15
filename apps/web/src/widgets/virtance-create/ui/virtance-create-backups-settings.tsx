import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox } from 'ui/components/checkbox';
import { Label } from 'ui/components/label';
import { cx } from 'ui/lib';

import type { CreateVirtanceForm } from '../types';

export function VirtanceCreateBackupsSettings() {
  const { register, control, watch } = useFormContext<CreateVirtanceForm>();

  const region = watch('region');

  return (
    region?.features.includes('backup') && (
      <Controller
        name="backups"
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <div className="space-y-2">
            <h2 className="text-lg font-medium">Backups</h2>
            <div className="flex gap-2">
              <Label
                htmlFor="backups"
                className={cx([
                  'bg-card flex w-full max-w-sm items-center gap-4 rounded-md border p-4',
                  field.value ? 'border-ring ring-ring ring-1' : '',
                ])}
              >
                <Checkbox
                  {...field}
                  value={undefined}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="backups"
                  {...register('backups')}
                />

                <p>Enable automated backups</p>
              </Label>
            </div>
          </div>
        )}
      />
    )
  );
}
