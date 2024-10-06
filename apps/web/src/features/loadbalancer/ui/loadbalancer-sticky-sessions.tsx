import { useFormContext } from 'react-hook-form';
import { Input } from 'ui/components/input';
import { Label } from 'ui/components/label';
import { RadioGroup, RadioGroupItem } from 'ui/components/radio-group';

export function LoadbalancerStickySessions() {
  const {
    register,
    unregister,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<{
    sticky_sessions?: {
      cookie_ttl_seconds: number;
      cookie_name: string;
    };
  }>();

  const session = watch('sticky_sessions');

  function handleValueChange(value: string) {
    if (value === 'cookie') {
      register('sticky_sessions');
      setValue('sticky_sessions.cookie_ttl_seconds', 300);
      setValue('sticky_sessions.cookie_name', 'WVC_LB');
    } else {
      unregister('sticky_sessions');
    }
  }

  return (
    <div>
      <div className="mb-4 space-y-2">
        <h2 className="text-lg font-semibold">Sticky sessions</h2>
        <p className="text-muted-foreground max-w-prose">
          When enabled, the Load Balancer will use a cookie to route follow-up requests
          from the same client to a single Virtance.
        </p>
      </div>
      <RadioGroup
        defaultValue="none"
        className="flex gap-4"
        onValueChange={handleValueChange}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="none" id="none" />
          <Label htmlFor="none">None</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="cookie" id="cookie" />
          <Label htmlFor="cookie">Cookie</Label>
        </div>
      </RadioGroup>
      {session && (
        <div className="mt-4 grid gap-4 md:max-w-prose md:grid-cols-4">
          <div className="space-y-1">
            <Label htmlFor="health-check-port">Cookie name</Label>
            <Input
              id="health-check-port"
              {...register('sticky_sessions.cookie_name')}
              className="border-border h-10 w-full rounded-md border bg-transparent shadow-sm"
            />
            {errors?.sticky_sessions?.cookie_name && (
              <p className="text-sm font-medium text-red-500">
                {errors?.sticky_sessions?.cookie_name?.message}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="health-check-port">TTL (in s)</Label>
            <Input
              id="health-check-port"
              {...register('sticky_sessions.cookie_ttl_seconds')}
              className="border-border h-10 w-full rounded-md border bg-transparent shadow-sm"
            />
            {errors?.sticky_sessions?.cookie_ttl_seconds && (
              <p className="text-sm font-medium text-red-500">
                {errors?.sticky_sessions?.cookie_ttl_seconds?.message}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
