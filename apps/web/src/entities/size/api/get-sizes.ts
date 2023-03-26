import request from '@/shared/api/request';

import { Size } from '../types';

export const getSizes = (): Promise<{ sizes: Size[] }> => {
  return request.get('sizes').json();
};
