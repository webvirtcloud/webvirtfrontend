import { getVirtancesSnapshots } from '@/entities/virtance/api/get-virtance-snapshots';
import { State } from '@/shared/ui/state';
import { Table } from 'ui/components/table';
import useSWR from 'swr';

export function VirtanceSnapshotsTable({ id }: { id: number }) {
  const { data: snapshots, error } = useSWR(['virtance-snapshots', id], () =>
    getVirtancesSnapshots(id),
  );

  const columns = [{ name: 'Name' }];

  if (error) {
    return (
      <State
        title="Oh no..."
        description="We cannot display any snapshots at this time for some reason."
      />
    );
  }

  return snapshots ? <Table columns={columns} data={snapshots} /> : null;
}
