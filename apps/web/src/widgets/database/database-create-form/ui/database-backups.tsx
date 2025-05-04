import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox } from 'ui/components/checkbox';
import { Label } from 'ui/components/label';
import { cx } from 'ui/lib';

import type { DatabaseCreateForm } from '../types';

export function DatabaseBackups() {
  const form = useFormContext<DatabaseCreateForm>();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight">Backups</h2>
        <p className="text-muted-foreground">
          Setting this option will enable backups for the database.
        </p>
      </div>

      <Controller
        name="backups_enabled"
        control={form.control}
        defaultValue={false}
        render={({ field }) => (
          <div className="flex gap-2">
            <Label htmlFor="backups_enabled" className={cx(['flex items-center gap-3'])}>
              <Checkbox
                {...field}
                value={undefined}
                checked={field.value}
                onCheckedChange={field.onChange}
                id="backups_enabled"
                {...form.register('backups_enabled')}
              />

              <p>Enable backups</p>
            </Label>
          </div>
        )}
      />
    </div>
  );
}
