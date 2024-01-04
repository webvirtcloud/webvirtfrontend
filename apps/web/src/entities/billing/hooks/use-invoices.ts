import { type QueryOptions, useQuery } from '@tanstack/react-query';

import { type Invoice, billingQueries, getInvoices } from '@/entities/billing';

export function useInvoices(options?: QueryOptions<Invoice[]>) {
  return useQuery({
    queryKey: billingQueries.invoices(),
    queryFn: () => getInvoices().then((response) => response.invoices),
    ...options,
  });
}
