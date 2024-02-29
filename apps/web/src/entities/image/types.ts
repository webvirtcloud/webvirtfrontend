import { type Event } from '@/entities/event';

export interface Distribution {
  type: 'distribution';
  id: number;
  slug: string;
  name: string;
  event: Event | null;
  public: true;
  regions: string[];
  created_at: string;
  description: string;
  distribution: string;
  min_disk_size: number;
  size_gigabytes: number;
  status: 'available';
}

export interface Snapshot {
  type: 'snapshot';
  id: number;
  virtance_id: number | null;
  slug: null | string;
  name: string;
  distribution: string;
  regions: string[];
  public: false;
  created_at: string;
  description: string;
  min_disk_size: number;
  size_gigabytes: number;
  status: 'available';
  event: Event | null;
}

export interface Backup {
  type: 'backup';
  id: number;
  slug: null;
  name: string;
  event: Event | null;
  public: false;
  regions: string[];
  created_at: string;
  description: string;
  distribution: string;
  min_disk_size: number;
  size_gigabytes: number;
  status: 'available' | 'pending';
}

export type ImageType = 'distribution' | 'snapshot' | 'backup';

export type ImagesResponse<T extends ImageType> = {
  images: T extends 'distribution'
    ? Distribution[]
    : T extends 'snapshot'
    ? Snapshot[]
    : Backup[];
};

export type ActionType = {
  id: number;
  action: 'convert';
};
