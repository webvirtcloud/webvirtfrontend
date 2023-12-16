export const floatingIPQueries = {
  one: (ip: string) => ['floating-ip', ip] as const,
  list: () => ['floating-ips'] as const,
  event: (ip: string) => ['floating-ip-event', ip] as const,
};
