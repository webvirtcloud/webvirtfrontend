import { useEffect, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'ui/components/select';

import { Dbm } from '@/entities/database';

import { DatabaseCreateForm } from '../types';

export function DatabaseSizes({ engines }: { engines?: Record<string, Dbm[]> }) {
  const form = useFormContext<DatabaseCreateForm>();

  const engine = form.watch('engine');
  const version = form.watch('version');

  const sizes = useMemo(() => {
    if (!engines || !engine || !version) return [];
    return engines[engine].find((item) => item.slug === version)?.sizes || [];
  }, [engines, engine, version]);

  useEffect(() => {
    form.resetField('size');
    console.log('size was reset');
  }, [version]);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Size</h2>
      </div>
      <div className="grid gap-2 md:max-w-64">
        <Controller
          control={form.control}
          name="size"
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              value={field.value}
              disabled={sizes.length === 0}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    sizes.length === 0 ? 'No sizes available' : 'Select a size'
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {sizes.map((size) => (
                  <SelectItem key={size.slug} value={size.slug}>
                    {size.slug}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {form.formState.errors.size ? (
          <p className="text-red-500">{form.formState.errors.size.message}</p>
        ) : null}
      </div>
    </div>
  );
}
