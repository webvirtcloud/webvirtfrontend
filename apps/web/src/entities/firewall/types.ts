import { type Event } from '@/entities/event';

export type FirewallInboundRule = {
  ports: string;
  protocol: string;
  sources: { addresses: string[] };
};

export type FirewallOutboundRule = {
  ports: string;
  protocol: string;
  destinations: { addresses: string[] };
};

export type Firewall = {
  uuid: string;
  name: string;
  event: Event | null;
  created_at: string;
  inbound_rules: FirewallInboundRule[];
  outbound_rules: FirewallOutboundRule[];
  virtance_ids: number[];
};

export interface FirewallPayload {
  name: string;
}
