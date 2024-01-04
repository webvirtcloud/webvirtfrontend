import { type BillingHistory } from '@/entities/billing';
import request from '@/shared/api/request';

export function getHistory(): Promise<{ billing_history: BillingHistory[] }> {
  return request.get('billing/history').json();
}
