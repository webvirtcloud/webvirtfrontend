import { type Image } from '@/entities/image';
import request from '@/shared/api/request';

export const getImages = (
  type: 'distribution' | 'snapshot' | 'backup',
): Promise<{ images: Image[] }> => {
  return request.get(`images?type=${type}`).json();
};
