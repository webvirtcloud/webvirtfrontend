import { Event } from '../event';
import { Region } from '../region';

export interface Loadbalancer {
  id: string;
  ip?: string;
  name: string;
  event: Event;
  created_at: string;
  redirect_http_to_https: boolean;
  region: Region;
  health_check: {
    path: string;
    port: number;
    protocol: string;
    healthy_threshold: number;
    unhealthy_threshold: number;
    check_interval_seconds: number;
    response_timeout_seconds: number;
  };
  virtance_ids: number[];
  sticky_sessions?: string;
  forwarding_rules: {
    entry_port: number;
    entry_protocol: string;
    target_port: number;
    target_protocol: string;
  }[];
}
