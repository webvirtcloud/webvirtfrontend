import { type Region } from '@/entities/region';
import request from '@/shared/api/request';

export const getRegions = (): Promise<{ regions: Region[] }> => {
  return request.get('regions').json();
};
