import request from '@/api/fetch';

import { Size } from '../types';

export const getSizes = (): Promise<{ sizes: Size[] }> => {
  return request.get('sizes').json();
};
