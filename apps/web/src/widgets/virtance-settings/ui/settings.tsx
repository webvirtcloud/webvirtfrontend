import { General } from './general';
import { DangerZone } from './danger-zone';

export function VirtanceSettings({ id }: { id: number }) {
  return (
    <div className="space-y-8">
      <General id={id} />
      <hr className="my-6 dark:border-neutral-800" />
      <DangerZone id={id} />
    </div>
  );
}
