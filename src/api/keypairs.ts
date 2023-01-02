import request from './fetch';

export type KeypairPayload = {
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

export const createKeypair = (payload: KeypairPayload): Promise<{ keypair: Keypair }> => {
  return request.post('keypairs', { json: payload }).json();
};

export const updateKeypair = (payload: KeypairPayload): Promise<{ keypair: Keypair }> => {
  return request.put('keypairs', { json: payload }).json();
};

export const deleteKeypair = (id: number) => {
  return request.delete(`keypairs/${id}`).json();
};
