import request from '@/shared/api/request';

import type { Keypair, KeypairPayload } from '../types';

export const createKeypair = (payload: KeypairPayload): Promise<{ keypair: Keypair }> => {
  return request.post('keypairs', { json: payload }).json();
};
