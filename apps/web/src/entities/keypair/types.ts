export interface Keypair {
  fingerprint: string;
  id: number;
  name: string;
  public_key: string;
  created_at: string;
}

export interface KeypairPayload {
  name: string;
  public_key: string;
}
