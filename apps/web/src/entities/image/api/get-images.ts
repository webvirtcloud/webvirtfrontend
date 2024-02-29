import type { ImagesResponse, ImageType } from '@/entities/image';
import request from '@/shared/api/request';

export function getImages(type: ImageType): Promise<ImagesResponse<typeof type>> {
  return request.get(`images?type=${type}`).json();
}
