import { Button } from 'ui/components/button';
import { Table } from 'ui/components/table';
import { useToast } from 'ui/components/toast';

import { type Invoice, downloadInvoice, useInvoices } from '@/entities/billing';
import { State } from '@/shared/ui/state';

export function BillingInvoicesTable() {
  const { data: invoices, error } = useInvoices();
  const { toast } = useToast();

  async function handleDownload(invoice: Invoice) {
    try {
      const blob = await downloadInvoice(invoice.uuid);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice-${invoice.period}.pdf`);
      link.click();
      setTimeout(() => {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      toast({
        title: 'Bad request',
        variant: 'destructive',
        description: 'Something went wrong while trying to download pdf...',
      });
    }
  }

  const Actions = ({ value: invoice }) => (
    <div className="space-x-2">
      <div className="flex justify-end space-x-2">
        <Button size="sm" variant="outline" onClick={() => handleDownload(invoice)}>
          Download
        </Button>
      </div>
    </div>
  );

  const columns = [
    {
      field: 'period',
      name: 'Date',
    },
    {
      field: 'amount',
      name: 'Amount due',
      formatter: ({ amount }) => `$${amount}`,
    },
    {
      field: 'actions',
      name: '',
      component: Actions,
    },
  ];

  if (error) {
    return (
      <State
        title="Oh no..."
        description="We cannot display any invoices at this time for some reason."
      />
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="mb-8 text-lg font-medium">Invoices</h2>

      {invoices ? (
        <>
          <Table data={invoices} columns={columns} />
          {invoices.length === 0 ? (
            <State
              title="No invoices"
              description="Once you’ve paid for something, invoices will show up here."
            />
          ) : null}
        </>
      ) : null}
    </div>
  );
}
