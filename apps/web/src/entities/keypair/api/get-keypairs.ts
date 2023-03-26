import request from '@/shared/api/request';
import { Keypair } from '../types';

export const getKeypairs = (): Promise<{ keypairs: Keypair[] }> => {
  return request.get('keypairs').json();
};
