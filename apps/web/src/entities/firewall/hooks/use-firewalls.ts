import { getFirewalls } from '@/entities/firewall';
import useSWR from 'swr';

export function useFirewalls() {
  return useSWR('/keypairs/', () =>
    getFirewalls().then((response) => response.firewalls),
  );
}
