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
  } | null;
};

export type Backup = {};
