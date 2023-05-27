import { useKeypairs } from '@/entities/keypair';
import { useState } from 'react';
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button, buttonVariants } from 'ui/components/button';
import { Input } from 'ui/components/input';
import { cx } from 'ui/lib';

type Type = 'password' | 'keypairs';

export function VirtanceCreateSecurity() {
  const { resetField, control, register } = useFormContext();
  const [type, setType] = useState<Type>('keypairs');

  const { keypairs } = useKeypairs();

  function handleKeyparSelect(
    field: ControllerRenderProps<FieldValues, 'keypairs'>,
    id: number,
  ) {
    if (field.value.has(id)) {
      const value = field.value;
      value.delete(id);
      return field.onChange(value);
    }

    field.onChange(field.value.add(id));
  }

  function onTypeChange(value: Type) {
    setType(value);
    if (value === 'password') {
      resetField('keypairs');
    }
  }

  return (
    <div className="">
      <h3 className="mb-2 font-medium">Authorization</h3>
      <div className="mb-4 flex gap-2">
        <Button
          onClick={() => onTypeChange('keypairs')}
          variant={type === 'keypairs' ? 'default' : 'secondary'}
          type="button"
        >
          Keypairs
        </Button>
        <Button
          onClick={() => onTypeChange('password')}
          variant={type === 'password' ? 'default' : 'secondary'}
          type="button"
        >
          Password
        </Button>
      </div>
      {type === 'keypairs' &&
        (keypairs?.length ? (
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {keypairs.map((keypair) => (
              <Controller
                key={keypair.id}
                name="keypairs"
                control={control}
                render={({ field }) => (
                  <li>
                    <button
                      type="button"
                      onClick={() => handleKeyparSelect(field, keypair.id)}
                      className={cx(
                        'w-full cursor-pointer rounded-md border p-4 text-start disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-500 dark:border-neutral-700 dark:disabled:bg-neutral-800',
                        field.value.has(keypair.id)
                          ? 'border-sky-500 ring-1 ring-sky-500'
                          : '',
                      )}
                    >
                      <div className="font-medium">{keypair.name}</div>
                      <div className="truncate text-xs text-neutral-500">
                        {keypair.fingerprint}
                      </div>
                    </button>
                  </li>
                )}
              />
            ))}
          </ul>
        ) : (
          <div className="flex max-w-sm flex-col items-center gap-2 rounded-md border border-dashed p-8 dark:border-neutral-700">
            You don't have any keypairs
            <Link to="/keypairs" className={buttonVariants({ size: 'sm' })}>
              Manage keypairs
            </Link>
          </div>
        ))}
      {type === 'password' && (
        <div className="max-w-sm">
          <Input
            placeholder="Enter secure password"
            {...register('password', { required: 'Password is required.' })}
          />
        </div>
      )}
    </div>
  );
}
