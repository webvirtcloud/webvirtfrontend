import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from 'ui/components/button';

import { createDatabase, DBM, useDbms } from '@/entities/database';

import { DatabaseCreateFormSchema } from '../schema';
import { type DatabaseCreateForm } from '../types';
import { DatabaseBackups } from './database-backups';
import { DatabaseDbms } from './database-dbms';
import { DatabaseName } from './database-name';
import { DatabaseRegions } from './database-regions';
import { DatabaseSizes } from './database-sizes';

export function DatabaseCreateForm() {
  const navigate = useNavigate();
  const { data } = useDbms();

  const engines = useMemo(
    () =>
      data?.reduce((acc, item) => {
        const engine = item.engine;
        if (!acc[engine]) {
          acc[engine] = [];
        }
        acc[engine].push(item);
        return acc;
      }, {} as Record<string, DBM[]>),
    [data],
  );

  const form = useForm({
    resolver: zodResolver(DatabaseCreateFormSchema),
    defaultValues: {
      name: `database-${Math.floor(Math.random() * 1000)}`,
      size: '',
      engine: '',
      version: '',
      region: '',
      backups_enabled: false,
    },
  });

  async function onSubmit(data: DatabaseCreateForm) {
    try {
      await createDatabase({
        name: data.name,
        engine: data.version,
        size: data.size,
        region: data.region,
        backups_enabled: data.backups_enabled ?? false,
      });
      navigate('/databases');
    } catch (e) {
      const { errors, message, status_code } = await e.response.json();

      if (status_code === 500 && message) {
        return toast.error('Bad request', { description: message });
      }

      if (status_code === 400 && errors) {
        return errors.forEach((error) => {
          const keys = Object.keys(error);

          keys.forEach((key) => {
            toast.error('Bad request', { description: error[key] });
          });
        });
      }
    }
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative mx-auto max-w-4xl space-y-12 py-8"
      >
        <div className="mb-8 md:mb-12">
          <h1 className="text-2xl font-semibold">Create Database</h1>
          <p className="text-muted-foreground">
            Choose engine, version, and size to set up your database.
          </p>
        </div>
        <DatabaseDbms engines={engines} />
        <DatabaseSizes engines={engines} />
        <DatabaseRegions />
        <DatabaseBackups />
        <DatabaseName />
        <Button type="submit">Create Database</Button>
      </form>
    </FormProvider>
  );
}
