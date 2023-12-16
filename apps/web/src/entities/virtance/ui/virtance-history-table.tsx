import { format } from 'date-fns';
import { Table } from 'ui/components/table';

import { type VirtanceHistory } from '@/entities/virtance';
import { State } from '@/shared/ui/state';

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
              title="No history"
              description="It will displays all kind of virtance's actions."
            />
          ) : null}
        </>
      ) : null}
    </div>
  );
}
