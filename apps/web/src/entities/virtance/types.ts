export type Virtance = {
  id: number;
  name: string;
  vcpu: number;
  memory: number;
  disk: number;
  locked: boolean;
  status: VirtanceStatus;
  created_at: string;
  features: [];
  backup_ids: [];
  snapshot_ids: [];
  image: {
    slug: string;
    name: string;
    distribution: string;
    regions: string[];
    public: boolean;
    created_at: string;
    type: 'distribution';
    description: string;
    min_disk_size: number;
    size_gigabytes: number;
    status: 'available';
  };
  size: {
    slug: string;
    memory: number;
    vcpu: number;
    disk: number;
    transfer: number;
    description: 'Micro';
    available: boolean;
    price_hourly: string;
    price_monthly: number;
    regions: string[];
  };
  networks: {
    v4: [
      {
        address: string;
        netmask: string;
        gateway: string;
        type: 'private';
      },
      {
        address: string;
        netmask: string;
        gateway: string;
        type: 'public';
      },
      {
        address: string;
        netmask: string;
        gateway: string;
        type: 'compute';
      },
    ];
  };
  region: {
    slug: string;
    name: string;
    available: boolean;
    features: [];
    sizes: string[];
  };
};

export type VirtanceStatus = 'active' | 'pending' | 'inactive';

export type VirtanceAction =
  | 'power_on'
  | 'power_off'
  | 'rename'
  | 'shutdown'
  | 'rebuild'
  | 'reboot'
  | 'password_reset'
  | 'snapshot';

export type ActionType =
  | {
      id: number;
      action: 'power_on';
    }
  | {
      id: number;
      action: 'power_off';
    }
  | {
      id: number;
      action: 'shutdown';
    }
  | {
      id: number;
      action: 'resize';
      size: string;
    }
  | { action: 'rename'; id: number; name: string }
  | { action: 'rebuild'; id: number; image: string }
  | { action: 'reboot'; id: number }
  | { action: 'password_reset'; id: number; password: string }
  | { action: 'snapshot'; id: number; name: string };

export type VirtanceCPUMetrics = {
  name: string;
  unit: string;
  data: { sys: [number, string][]; user: [number, string][] };
};

export type VirtanceNetMetrics = {
  name: string;
  unit: string;
  data: { inbound: [number, string][]; outbound: [number, string][] };
};

export type VirtanceDiskMetrics = {
  name: string;
  unit: string;
  data: { read: [number, string][]; write: [number, string][] };
};
