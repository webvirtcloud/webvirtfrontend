import request from '@/shared/api/request';

export const deleteImage = (id: number): Promise<unknown> => {
  return request.delete(`images/${id}/`).json();
};
