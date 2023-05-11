import { useKeypairs } from '@/entities/keypair';
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from 'react-hook-form';
import { Link } from 'react-router-dom';
import { buttonVariants } from 'ui/components/button';
import { Input } from 'ui/components/input';
import { Label } from 'ui/components/label';
import { cx } from 'ui/lib';

export function VirtanceCreateSettings() {
  const { register, control } = useFormContext();

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

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-medium">Settings</h2>

      <div className="flex flex-col gap-2">
        <Label>Keypairs</Label>
        {keypairs?.length ? (
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
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          className="max-w-sm"
          placeholder="Enter name for server"
          {...register('name', { required: 'Server name is required.' })}
        />
      </div>
    </section>
  );
}
