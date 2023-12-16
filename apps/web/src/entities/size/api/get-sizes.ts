import { type Size } from '@/entities/size';
import request from '@/shared/api/request';

export const getSizes = (): Promise<{ sizes: Size[] }> => {
  return request.get('sizes').json();
};
