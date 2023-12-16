import { type Firewall } from '@/entities/firewall';

export function useIsFirewallBusy(firewall?: Firewall) {
  return firewall?.event !== null;
}
