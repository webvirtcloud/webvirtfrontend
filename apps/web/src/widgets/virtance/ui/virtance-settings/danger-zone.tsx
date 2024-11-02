import { Deletion } from './deletion';
import { PowerOff } from './power-off';
import { Rebuild } from './rebuild';
import { Reset } from './reset';
import { ResetPassword } from './reset-password';

export function DangerZone({ id }: { id: number }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Danger zone</h2>
        <p className="text-muted-foreground">
          Think twice before touching any of below options.
        </p>
      </div>
      <div className="bg-card divide-y rounded-lg border">
        <Rebuild id={id} />
        <ResetPassword id={id} />
        <PowerOff id={id} />
        <Reset id={id} />
        <Deletion id={id} />
      </div>
    </div>
  );
}
