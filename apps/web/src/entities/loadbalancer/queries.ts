export const loadbalancerQueries = {
  list: () => ['loadbalancers'] as const,
  loadbalancer: (id?: string) => ['loadbalancer', id] as const,
  virtances: (id?: string) => ['loadbalancer', id, 'virtances'] as const,
  event: (id: string) => ['loadbalancer-event', id] as const,
};
