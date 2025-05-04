import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Button } from 'ui/components/button';
import { Skeleton } from 'ui/components/skeleton';
import { cx } from 'ui/lib';

import type { Dbm } from '@/entities/database';

import type { DatabaseCreateForm } from '../types';

export function DatabaseDbms({ engines }: { engines?: Record<string, Dbm[]> }) {
  const form = useFormContext<DatabaseCreateForm>();

  useEffect(() => {
    if (engines && !form.getValues('engine') && !form.getValues('version')) {
      form.setValue('engine', Object.keys(engines)[0]);
      form.setValue('version', (engines[Object.keys(engines)[0]] as Dbm[])[0].slug);
    }
  }, [engines]);

  return (
    <div className="space-y-4">
      <div className="">
        <h2 className="text-lg font-semibold">Engine</h2>
      </div>

      {engines ? (
        <div className="">
          {Object.entries(engines).map(([engine, dbmsList]) => (
            <Controller
              key={engine}
              name="engine"
              render={({ field }) => (
                <div
                  className={cx([
                    'bg-card group relative flex h-full flex-col overflow-hidden rounded-lg border transition-all duration-200',
                    field.value === engine
                      ? 'ring-ring border-ring ring-1'
                      : 'border-border hover:border-muted-foreground/20',
                  ])}
                >
                  <div className="flex w-full flex-1 flex-col gap-4 p-6 text-left md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-muted text-primary inline-flex h-14 w-14 items-center justify-center rounded-lg">
                        <img
                          src={
                            new URL(
                              `/src/shared/assets/images/engines/${engine}.svg`,
                              import.meta.url,
                            ).href
                          }
                          alt={engine}
                          className="h-7 w-7"
                        />
                      </div>
                      <div>
                        <div className="text-xl font-semibold tracking-tight">
                          PostgreSQL
                        </div>
                        <p className="text-muted-foreground max-w-2xl text-sm">
                          {(dbmsList as Dbm[])[0]?.description ||
                            `${engine} database engine`}
                        </p>
                      </div>
                    </div>

                    <div className="">
                      <div className="flex flex-wrap gap-1.5">
                        {(dbmsList as Dbm[]).map((item) => (
                          <Controller
                            key={item.slug}
                            name="version"
                            render={({ field }) => (
                              <Button
                                type="button"
                                size="icon"
                                variant={
                                  field.value === item.slug ? 'default' : 'outline'
                                }
                                disabled={!item.available || item.sizes.length === 0}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  field.onChange(item.slug);
                                }}
                              >
                                {item.version}
                              </Button>
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      )}
    </div>
  );
}
