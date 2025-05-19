import { useParams } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { Button } from 'ui/components/button';
import { Error } from 'ui/components/error';
import { Input } from 'ui/components/input';
import { Label } from 'ui/components/label';

import { useDatabase, useDatabaseAction } from '@/entities/database';

interface FormState {
  name: string;
}

export function DatabaseSettingsGeneral() {
  const { uuid } = useParams({ from: '/_authenticated/databases/$uuid' });
  const { data: database } = useDatabase(uuid);
  const { runAction } = useDatabaseAction();
  const isBusy = database?.status === 'pending';
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormState>();

  async function onSubmit(data: FormState) {
    await runAction({ action: 'rename', uuid, name: data.name });
  }

  return database ? (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">General</h2>
        <p className="text-muted-foreground">
          Settings and options for the{' '}
          <span className="text-foreground font-semibold">{database.name}</span> database.
        </p>
      </div>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="database-name">Database name</Label>
          <div className="flex items-center gap-2">
            <Input
              {...register('name', { required: 'Name is required.' })}
              defaultValue={database.name}
              id="database-name"
              placeholder="Enter database name"
              className="max-w-sm"
              disabled={isBusy}
              error={!!errors.name}
            />
            <Button type="submit" disabled={isSubmitting || isBusy}>
              {isSubmitting ? 'Renaming...' : 'Rename'}
            </Button>
          </div>
          {errors.name && <Error>{errors.name?.message}</Error>}
        </div>
      </form>
    </div>
  ) : null;
}
