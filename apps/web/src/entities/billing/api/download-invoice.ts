import request from '@/shared/api/request';

export function downloadInvoice(uuid: string) {
  return request.get(`billing/invoices/${uuid}/pdf`).blob();
}
