import request from '@/shared/api/request';
import type { Keypair, KeypairPayload } from '../types';

export function updateKeypair(id: number, name: string): Promise<{ keypair: Keypair }> {
  return request.put(`keypairs/${id}`, { json: { name } }).json();
}
