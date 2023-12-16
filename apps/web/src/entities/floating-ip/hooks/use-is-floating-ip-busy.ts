import { type FloatingIP } from '@/entities/floating-ip';

export function useIsFloatingIPBusy(floatingIP?: FloatingIP) {
  return floatingIP?.event === null;
}
