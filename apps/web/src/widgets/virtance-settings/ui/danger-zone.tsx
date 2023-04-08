import { Deletion } from './deletion';
import { Rebuild } from './rebuild';
import { ResetPassword } from './reset-password';

export function DangerZone({ id }: { id: number }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-red-500">Danger zone</h2>
        <p className="text-neutral-500">
          Think twice before touching any of below options.
        </p>
      </div>
      <div className="divide-y rounded-xl border dark:divide-neutral-800 dark:border-neutral-800">
        <Rebuild id={id} />
        <ResetPassword id={id} />
        <Deletion id={id} />
      </div>
    </div>
  );
}
