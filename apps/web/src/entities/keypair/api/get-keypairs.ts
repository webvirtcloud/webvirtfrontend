import { type Keypair } from '@/entities/keypair';
import request from '@/shared/api/request';

export const getKeypairs = (): Promise<{ keypairs: Keypair[] }> => {
  return request.get('keypairs').json();
};
