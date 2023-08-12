export type Image = {
  created_at: string;
  description: string;
  distribution: string;
  min_disk_size: number;
  name: string;
  public: true;
  regions: string[];
  size_gigabytes: number;
  slug: string;
  status: string;
  type: 'distribution';
};

export type Snapshot = {
  id: number;
  virtance_id: number | null;
  slug: null | string;
  name: string;
  distribution: string;
  regions: string[];
  public: false;
  created_at: string;
  type: 'snapshot';
  description: null | string;
  min_disk_size: number;
  size_gigabytes: number;
  status: 'available';
  event: {
    name: string;
    description: string;
  } | null;
};

export type Backup = {
  id: number;
  slug: null;
  name: string;
  type: 'backup';
  event: {
    name: string;
    description: string;
  } | null;
  public: false;
  regions: string[];
  created_at: string;
  description: null;
  distribution: string;
  min_disk_size: number;
  size_gigabytes: number;
  status: 'available' | 'pending';
};

export type ActionType = {
  id: number;
  action: 'convert';
};
