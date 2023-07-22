import { getVirtancesSnapshots } from '@/entities/virtance/api/get-virtance-snapshots';
import { State } from '@/shared/ui/state';
import { Table } from 'ui/components/table';
import useSWR from 'swr';

export function VirtanceSnapshotsTable({ id }: { id: number }) {
  const { data: snapshots, error } = useSWR(['virtance-snapshots', id], () =>
    getVirtancesSnapshots(id).then((response) => response.snapshots),
  );

  const columns = [{ name: 'Name', field: 'name' }];

  if (error) {
    return (
      <div className="rounded-md border dark:border-neutral-700">
        <State
          title="Oh no..."
          description="We cannot display any snapshots at this time for some reason."
        />
      </div>
    );
  }

  return snapshots ? (
    <>
      <Table columns={columns} data={snapshots} />
      {snapshots.length === 0 ? (
        <State
          title="No snapshots"
          description="Take some snapshots to start use them."
        />
      ) : null}
    </>
  ) : null;
}
