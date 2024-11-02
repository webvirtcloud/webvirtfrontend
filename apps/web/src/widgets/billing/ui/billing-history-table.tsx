import { format } from 'date-fns';
import { Table } from 'ui/components/table';

import { useHistory } from '@/entities/billing';
import { State } from '@/shared/ui/state';

export function BillingHistoryTable() {
  const { data: history, error } = useHistory();

  const columns = [
    {
      field: 'type',
      name: 'Type',
    },
    {
      field: 'description',
      name: 'Description',
    },
    {
      field: 'amount',
      name: 'Amount',
      formatter: (value) => `$${value.amount}`,
    },
    {
      field: 'date',
      name: 'Created at',
      formatter: (item) => format(new Date(item.date), 'MMM dd, yyyy'),
    },
  ];

  if (error) {
    return (
      <State
        title="Oh no..."
        description="We cannot display any history at this time for some reason."
      />
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="mb-4 text-xl font-semibold">History</h2>

      {history ? (
        <>
          <Table data={history} columns={columns} />
          {history.length === 0 ? (
            <State
              title="No history"
              description="We don't have any history for you yet."
            />
          ) : null}
        </>
      ) : null}
    </div>
  );
}
