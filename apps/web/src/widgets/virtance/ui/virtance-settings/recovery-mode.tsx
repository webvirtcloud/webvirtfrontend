import { Controller, useForm } from 'react-hook-form';
import { Button } from 'ui/components/button';
import { cx } from 'ui/lib';

import { useVirtance, useVirtanceAction } from '@/entities/virtance';

interface FormState {
  mode: boolean;
}

const MODES = [
  {
    value: true,
    title: 'Boot from recovery ISO',
    description:
      'Booting from a recovery ISO allows you to recover from kernel mismatches and perform repairs on corrupted file systems.',
  },
  {
    value: false,
    title: 'Boot from Hard Drive',
    description:
      'When this option is selected, your Stacklet will boot from the hard drive the next time it is shut down completely and restarted.',
  },
] as const;

export function RecoveryMode({ id }: { id: number }) {
  const { data: virtance } = useVirtance(id);
  const { runAction } = useVirtanceAction();
  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<FormState>({ defaultValues: { mode: virtance?.recovery_mode } });

  const mode = watch('mode');

  async function onSubmit(data: FormState) {
    await runAction({
      action: data.mode ? 'enable_recovery_mode' : 'disable_recovery_mode',
      id: Number(id),
    });
  }

  return virtance ? (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Recovery mode</h2>
        <p className="text-muted-foreground">
          Booting from a recovery ISO allows you to recover from kernel mismatches and
          perform repairs on corrupted file systems.
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full flex-col items-center gap-4 md:flex-row">
          {MODES.map((mode) => (
            <Controller
              key={mode.value.toString()}
              name="mode"
              defaultValue={virtance.recovery_mode}
              control={control}
              render={({ field }) => (
                <button
                  type="button"
                  onClick={() => field.onChange(mode.value)}
                  className={cx(
                    'disabled:text-muted-foreground bg-card disabled:bg-muted/50 w-full cursor-pointer space-y-1 rounded-md border p-4 text-start disabled:cursor-not-allowed',
                    field.value === mode.value ? 'border-ring ring-ring ring-1' : '',
                  )}
                >
                  <div className="font-medium">{mode.title}</div>
                  <div className="text-muted-foreground">{mode.description}</div>
                </button>
              )}
            />
          ))}
        </div>
        <Button
          type="submit"
          disabled={
            virtance.recovery_mode === mode ||
            virtance.status === 'pending' ||
            isSubmitting
          }
        >
          {isSubmitting ? 'Changing recovery mode...' : 'Change recovery mode'}
        </Button>
      </form>
    </div>
  ) : null;
}
