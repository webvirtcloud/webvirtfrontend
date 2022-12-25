import request from './fetch';

export type CreateKeypairPayload = {
  name: string;
  public_key: string;
};

export type Keypair = {
  fingerprint: string;
  id: number;
  name: string;
  public_key: string;
  created_at: string;
};

export const getKeypairs = (): Promise<{ keypairs: Keypair[] }> => {
  return request.get('keypairs').json();
};

export const createKeypair = (payload: CreateKeypairPayload) => {
  return request.post('keypairs', { json: payload }).json();
};
