import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { type Backup, type Distribution, type Snapshot } from '@/entities/image';

import type { CreateVirtanceForm } from './types';
import { VirtanceCreateBackups } from './virtance-create-backups';
import { VirtanceCreateDistributions } from './virtance-create-distributions';
import { VirtanceCreateSnapshots } from './virtance-create-snapshots';

type Tab = 'distributions' | 'snapshots' | 'backups';

export function VirtanceCreateImages() {
  const [tab, setTab] = useState<Tab>('distributions');

  const { setValue, watch, resetField } = useFormContext<CreateVirtanceForm>();

  const region = watch('region');

  const tabs: Tab[] = [
    'distributions',
    ...(region?.features?.includes('snapshot') ? ['snapshots' as const] : []),
    ...(region?.features?.includes('backup') ? ['backups' as const] : []),
  ];

  function handleOnChange(image: Distribution | Snapshot | Backup) {
    setValue('image', {
      id: image.id,
      type: image.type,
      minDiskSize: image.min_disk_size,
      description: image.description,
      name: image.name,
    });
    setValue('distribution', undefined);
  }

  useEffect(() => {
    if (!tabs.includes(tab)) {
      setTab('distributions');

      resetField('image');
      resetField('distribution');
    }
  }, [region]);

  return (
    <section className="mb-12">
      <ul className="mb-4 space-x-4 text-lg font-medium">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            className={`text-muted-foreground data-[active=true]:text-foreground cursor-pointer capitalize`}
            data-active={t === tab}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </ul>
      {tab === 'distributions' && <VirtanceCreateDistributions />}
      {tab === 'snapshots' && <VirtanceCreateSnapshots onChange={handleOnChange} />}
      {tab === 'backups' && <VirtanceCreateBackups onChange={handleOnChange} />}
    </section>
  );
}
