import { type QueryOptions, useQuery } from '@tanstack/react-query';

import { type BillingHistory, billingQueries, getHistory } from '@/entities/billing';

export function useHistory(options?: QueryOptions<BillingHistory[]>) {
  return useQuery({
    queryKey: billingQueries.history(),
    queryFn: () => getHistory().then((response) => response.billing_history),
    ...options,
  });
}
