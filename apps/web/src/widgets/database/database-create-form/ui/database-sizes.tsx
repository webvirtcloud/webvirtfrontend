import { useEffect, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import type { Dbm } from '@/entities/database';
import { SizeCard } from '@/entities/size';

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
  }, [version]);

  return sizes ? (
    <section className="mb-12">
      <h2 className="mb-4 text-lg font-semibold">Sizes</h2>
      {sizes.length ? (
        <div className="grid gap-4 md:grid-cols-3">
          {sizes.map((size) => (
            <Controller
              key={size.slug}
              name="size"
              control={form.control}
              render={({ field }) => (
                <SizeCard
                  onClick={() => field.onChange(size.slug)}
                  isActive={field.value === size.slug}
                  isDisabled={!size.available}
                  key={size.slug}
                  size={size}
                />
              )}
            />
          ))}
        </div>
      ) : (
        <p className="flex max-w-sm flex-col items-center gap-2 rounded-md border border-dashed p-8">
          You don&apos;t have sizes in selected engine or version.
        </p>
      )}
    </section>
  ) : null;
}
