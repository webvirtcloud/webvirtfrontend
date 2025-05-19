import { createFileRoute } from '@tanstack/react-router';
import { format } from 'date-fns';

import { useBalance } from '@/entities/billing';
import { BillingHistoryTable, BillingInvoicesTable } from '@/widgets/billing';

export const Route = createFileRoute('/_authenticated/billing')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useBalance();
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h2 className="mb-4 text-xl font-semibold">Billing</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2 rounded-2xl border p-8">
            <div>
              <h3 className="text-lg font-medium">Balance</h3>
              <p className="text-muted-foreground">
                Charges will be deducted from your balance first
              </p>
            </div>
            <div className="flex items-end gap-1">
              <span className="text-muted-foreground pb-0.5 text-lg">$</span>
              <span className="text-2xl font-medium">{data?.account_balance}</span>
            </div>
          </div>
          <div className="space-y-2 rounded-2xl border p-8">
            <div>
              <h3 className="text-lg font-medium">Usage</h3>
              <p className="text-muted-foreground">
                Last updated at{' '}
                {data?.generated_at
                  ? format(new Date(data.generated_at), 'MMM dd, yyyy hh:mm')
                  : null}
              </p>
            </div>
            <div className="flex items-end gap-1">
              <span className="text-muted-foreground pb-0.5 text-lg">$</span>
              <span className="text-2xl font-medium">{data?.month_to_date_usage}</span>
            </div>
          </div>
        </div>
      </div>

      <BillingInvoicesTable />

      <BillingHistoryTable />
    </div>
  );
}
