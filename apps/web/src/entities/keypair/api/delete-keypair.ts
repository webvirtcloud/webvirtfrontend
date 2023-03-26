import request from '@/shared/api/request';

export const deleteKeypair = (id: number) => {
  return request.delete(`keypairs/${id}`).json();
};
