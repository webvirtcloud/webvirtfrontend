import { DangerZone } from './danger-zone';
import { General } from './general';
import { RecoveryMode } from './recovery-mode';

export function VirtanceSettings({ id }: { id: number }) {
  return (
    <div className="space-y-8">
      <General id={id} />
      <hr className="my-6" />
      <RecoveryMode id={id} />
      <hr className="my-6" />
      <DangerZone id={id} />
    </div>
  );
}
