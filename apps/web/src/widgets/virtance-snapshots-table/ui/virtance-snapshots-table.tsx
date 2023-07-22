import { State } from '@/shared/ui/state';
import { format } from 'date-fns';
import { Button } from 'ui/components/button';
import { Table } from 'ui/components/table';

export function VirtanceSnapshotsTable({
  snapshots,
  error,
}: {
  snapshots: [] | undefined;
  error: any;
}) {
  function onDialogOpen() {}

  const Actions = ({ value: key }) => (
    <div className="space-x-2">
      <div className="flex justify-end space-x-2">
        <Button size="sm" variant="destructive" onClick={() => onDialogOpen()}>
          Delete
        </Button>
      </div>
    </div>
  );

  const columns = [
    {
      field: 'name',
      name: 'Name',
      component: ({ value }) => (
        <div>
          <div className="font-bold">{value.name}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Size {value.size_gigabytes} GB
          </div>
        </div>
      ),
    },
    {
      field: 'created_at',
      name: 'Created at',
      formatter: (item) => format(new Date(item.created_at), 'MMM dd, yyyy'),
    },
    {
      field: 'actions',
      name: '',
      component: Actions,
    },
  ];

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
