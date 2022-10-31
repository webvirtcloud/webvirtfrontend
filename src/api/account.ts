import request from './fetch';

type CredentialsPayload = {
  email: string;
  password: string;
};

export const signIn = (payload: CredentialsPayload): Promise<{ token: string }> => {
  return request.post('account/login', { json: payload }).json();
};

export const signUp = (payload: CredentialsPayload): Promise<{ token: string }> => {
  return request.post('account/register', { json: payload }).json();
};

export const resetPassword = (payload: { password: string }): Promise<unknown> => {
  return request.post('account/reset_passwod', { json: payload }).json();
};
