import { type Invoice } from '@/entities/billing';
import request from '@/shared/api/request';

export function getInvoices(): Promise<{ invoices: Invoice[] }> {
  return request.get('billing/invoices').json();
}
