export type RegionFeature =
  | 'backup'
  | 'snapshot'
  | 'ipv6'
  | 'resize'
  | 'volume'
  | 'one_click'
  | 'floating_ip'
  | 'load_balancer'
  | 'database';

export type Region = {
  available: boolean;
  features: RegionFeature[];
  name: string;
  sizes: string[];
  slug: string;
};
