import type { Event } from '@/entities/event';
import type { Region } from '@/entities/region';
import type { Size } from '@/entities/size';

export interface Database {
  id: string;
  name: string;
  event: Event | null;
  conection: {
    public: {
      uri: string;
      host: string;
    };
    private: {
      uri: string;
      host: string;
    };
    user: string;
    password: string;
    port: number;
    ssl: boolean;
  };
  created_at: string;
  backups_enabled: boolean;
  size: Size;
  region: Region;
  engine: {
    slug: string;
    name: string;
    version: string;
  };
  status: 'active' | 'pending' | 'inactive';
}

export interface DBM {
  slug: string;
  name: string;
  sizes: {
    slug: string;
    memory: number;
    vcpu: number;
    disk: number;
    transfer: number;
    description: string;
    available: boolean;
    price_hourly: string;
    price_monthly: number;
    regions: string[];
  }[];
  engine: string;
  version: string;
  available: boolean;
  description: string;
}

export type DatabaseAction =
  | 'power_on'
  | 'power_off'
  | 'rename'
  | 'shutdown'
  | 'reset'
  | 'rebuild'
  | 'reboot'
  | 'password_reset'
  | 'snapshot'
  | 'enable_recovery_mode';

export type ActionType =
  | {
      uuid: string;
      action: 'power_on';
    }
  | {
      uuid: string;
      action: 'power_off';
    }
  | {
      uuid: string;
      action: 'enable_recovery_mode';
    }
  | {
      uuid: string;
      action: 'disable_recovery_mode';
    }
  | {
      uuid: string;
      action: 'resize';
      size: string;
    }
  | { action: 'rename'; uuid: string; name: string }
  | { action: 'rebuild'; uuid: string; image: string }
  | { action: 'reboot'; uuid: string }
  | { action: 'password_reset'; uuid: string; password: string }
  | { action: 'snapshot'; uuid: string; name: string }
  | { action: 'restore'; uuid: string; image: number }
  | { action: 'enable_backups'; uuid: string }
  | { action: 'disable_backups'; uuid: string };
