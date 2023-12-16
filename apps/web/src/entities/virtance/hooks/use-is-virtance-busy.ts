import { type Virtance } from '@/entities/virtance';

export function useIsVirtanceBusy(virtance?: Virtance) {
  return virtance?.event !== null;
}
