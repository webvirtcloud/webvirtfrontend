export const RegionFeature = ['backup'] as const;

export type Region = {
  available: boolean;
  features: typeof RegionFeature;
  name: string;
  sizes: string[];
  slug: string;
};
