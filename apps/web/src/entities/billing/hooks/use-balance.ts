import { type QueryOptions, useQuery } from '@tanstack/react-query';

import { type Balance, billingQueries, getBalance } from '@/entities/billing';

export function useBalance(options?: QueryOptions<Balance>) {
  return useQuery({
    queryKey: billingQueries.balance(),
    queryFn: () => getBalance().then((response) => response),
    ...options,
  });
}
