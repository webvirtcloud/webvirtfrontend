import request from '@/shared/api/request';
import { Image } from '../types';

export const getImages = (
  type: 'distribution' | 'snapshot' | 'backup',
): Promise<{ images: Image[] }> => {
  return request.get(`images?type=${type}`).json();
};
