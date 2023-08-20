import { State } from '@/shared/ui/state';
import { Table } from 'ui/components/table';
import { VirtanceHistory } from '../types';
import { format } from 'date-fns';

export function VirtanceHistoryTable({ data }: { data: VirtanceHistory[] | undefined }) {
  const columns = [
    {
      field: 'event',
      name: 'Event',
    },
    {
      field: 'created',
      name: 'Created at',
      formatter: (item) => format(new Date(item.created), 'MMM dd, yyyy'),
    },
  ];

  return (
    <div>
      {data ? (
        <>
          <Table data={data} columns={columns} />
          {data.length === 0 ? (
            <State
              title="No keypairs"
              description="Add new keypairs to start use them."
            />
          ) : null}
        </>
      ) : null}
    </div>
  );
}
