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
      <h2 className="mb-8 text-lg font-medium">History</h2>

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
