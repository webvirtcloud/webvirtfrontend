import { type GetVirtancesParams } from '@/entities/virtance';

export const virtanceQueries = {
  one: (id: number) => ['virtance', id] as const,
  list: (params?: GetVirtancesParams) => ['virtances', params] as const,
  event: (id: number) => ['virtance-event', id] as const,
  snapshots: (id: number) => ['virtance-snapshots', id] as const,
  backups: (id: number) => ['virtance-backups', id] as const,
  console: (id: number) => ['virtance-console', id] as const,
  firewall: (id: number) => ['virtance-firewall', id] as const,
  history: (id: number) => ['virtance-history', id] as const,
  metrics: {
    cpu: (id: number) => ['virtance-metric-cpu', id] as const,
    net: (id: number) => ['virtance-metric-net', id] as const,
    disk: (id: number) => ['virtance-metric-disk', id] as const,
    memory: (id: number) => ['virtance-metric-memory', id] as const,
  },
};
