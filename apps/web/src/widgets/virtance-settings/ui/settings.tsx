import { VirtanceSettingsRename } from './rename';
import { VirtanceDeletion } from './deletion';

export function VirtanceSettings({ id }: { id: number }) {
  return (
    <div className="space-y-8">
      <VirtanceSettingsRename id={id} />
      <hr className="my-6 dark:border-neutral-800" />
      <VirtanceDeletion id={id} />
    </div>
  );
}
