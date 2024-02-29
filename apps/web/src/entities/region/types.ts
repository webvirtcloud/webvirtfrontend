export type RegionFeature = 'backup' | 'snapshot';

export type Region = {
  available: boolean;
  features: RegionFeature[];
  name: string;
  sizes: string[];
  slug: string;
};
