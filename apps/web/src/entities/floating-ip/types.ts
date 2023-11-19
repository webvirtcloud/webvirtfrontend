import { type Event } from '../event';
import { type Region } from '../region/types';
import { type Virtance } from '../virtance';

export interface FloatingIP {
  ip: string;
  event: Event | null;
  region: Region;
  virtance: Virtance | null;
}

export type ActionType =
  | {
      ip: string;
      action: 'unassign';
    }
  | {
      ip: string;
      action: 'assign';
      virtance_id: number;
    };
