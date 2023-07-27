import request from '@/shared/api/request';
import { Image } from '../types';

export const deleteImage = (id: number): Promise<unknown> => {
  return request.delete(`images/${id}/`).json();
};
