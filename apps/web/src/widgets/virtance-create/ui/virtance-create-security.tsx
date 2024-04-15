import { Controller, useFormContext } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button, buttonVariants } from 'ui/components/button';
import { Input } from 'ui/components/input';
import { cx } from 'ui/lib';

import { useKeypairs } from '@/entities/keypair';

import type { CreateVirtanceForm } from '../types';

export function VirtanceCreateSecurity() {
  const {
    resetField,
    control,
    register,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext<CreateVirtanceForm>();
  const method = watch('authentication.method');

  const { data: keypairs } = useKeypairs();

  function onTypeChange(type: 'ssh' | 'password') {
    setValue('authentication.method', type);

    if (type === 'password') {
      setValue('authentication.keys', undefined);
    }
    if (type === 'ssh') {
      resetField('authentication.password');

      if (keypairs?.length) {
        keypairs &&
          setValue(
            'authentication.keys',
            getValues('authentication.keys')?.add(keypairs[0].id),
          );
      }
    }
  }

  return (
    <div className="">
      <h3 className="mb-2 font-medium">Authorization</h3>
      <div className="mb-4 flex gap-2">
        <Button
          onClick={() => onTypeChange('ssh')}
          variant={method === 'ssh' ? 'default' : 'outline'}
          type="button"
        >
          Keypairs
        </Button>
        <Button
          onClick={() => onTypeChange('password')}
          variant={method === 'password' ? 'default' : 'outline'}
          type="button"
        >
          Password
        </Button>
      </div>
      {method === 'ssh' &&
        (keypairs?.length ? (
          <>
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {keypairs.map((keypair) => (
                <Controller
                  key={keypair.id}
                  name="authentication.keys"
                  control={control}
                  render={({ field }) => (
                    <li>
                      <button
                        type="button"
                        onClick={() => field.onChange(field.value?.add(keypair.id))}
                        className={cx(
                          'disabled:text-muted-foreground disabled:bg-muted/50 w-full cursor-pointer rounded-md border p-4 text-start disabled:cursor-not-allowed',
                          field.value?.has(keypair.id)
                            ? 'border-ring ring-ring ring-1'
                            : '',
                        )}
                      >
                        <div className="font-medium">{keypair.name}</div>
                        <div className="text-muted-foreground truncate text-xs">
                          {keypair.fingerprint}
                        </div>
                      </button>
                    </li>
                  )}
                />
              ))}
            </ul>
          </>
        ) : (
          <div className="flex max-w-sm flex-col items-center gap-2 rounded-md border border-dashed p-8 dark:border-neutral-700">
            You don&apos;t have any keypairs
            <Link to="/keypairs" className={buttonVariants({ size: 'sm' })}>
              Manage keypairs
            </Link>
          </div>
        ))}
      {method === 'password' && (
        <div className="max-w-sm space-y-1.5">
          <Input
            placeholder="Enter secure password"
            {...register('authentication.password')}
          />
          {errors.authentication?.password ? (
            <p className="mt-2 text-red-500">{errors.authentication.password?.message}</p>
          ) : null}
        </div>
      )}
      {errors.authentication?.keys ? (
        <p className="mt-2 text-red-500">{errors.authentication.keys?.message}</p>
      ) : null}
    </div>
  );
}
