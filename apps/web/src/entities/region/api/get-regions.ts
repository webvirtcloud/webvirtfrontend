import request from '@/shared/api/request';
import { Region } from '../types';

export const getRegions = (): Promise<{ regions: Region[] }> => {
  return request.get('regions').json();
};
