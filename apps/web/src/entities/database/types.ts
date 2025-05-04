export interface Database {
  id: string;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Dbm {
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
