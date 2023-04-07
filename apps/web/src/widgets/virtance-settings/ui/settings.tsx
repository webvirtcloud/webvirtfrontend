import { General } from './general';
import { Deletion } from './deletion';
import { Rebuild } from './rebuild';

export function VirtanceSettings({ id }: { id: number }) {
  return (
    <div className="space-y-8">
      <General id={id} />
      <hr className="my-6 dark:border-neutral-800" />
      <Rebuild id={id} />
      <Deletion id={id} />
    </div>
  );
}
