import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox } from 'ui/components/checkbox';
import { Label } from 'ui/components/label';
import { cx } from 'ui/lib';

export function LoadbalancerSSL() {
  const { register, control } = useFormContext<{
    redirect_http_to_https: boolean;
  }>();
  return (
    <div>
      <div className="mb-4 space-y-2">
        <h2 className="text-lg font-semibold">SSL</h2>
        <p className="text-muted-foreground max-w-prose">
          Setting this option will force all HTTP traffic to be redirected to HTTPS. This
          will only work if there&apos;s is atleast one HTTP and one HTTPS rule.
        </p>
      </div>
      <Controller
        name="redirect_http_to_https"
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <div className="flex gap-2">
            <Label htmlFor="backups" className={cx(['flex items-center gap-3'])}>
              <Checkbox
                {...field}
                value={undefined}
                checked={field.value}
                onCheckedChange={field.onChange}
                id="backups"
                {...register('redirect_http_to_https')}
              />

              <p>Redirect HTTP to HTTPS</p>
            </Label>
          </div>
        )}
      />
    </div>
  );
}
