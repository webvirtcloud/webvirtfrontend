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
