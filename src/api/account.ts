import request from './fetch';

type CredentialsPayload = {
  email: string;
  password: string;
};

export type Profile = {
  email: string;
  first_name: string;
  last_name: string;
};

export type ChangePasswordPayload = {
  old_password: string;
  new_password: string;
  new_password_confirm: string;
};

export const getProfile = (): Promise<Profile> => {
  return request.get('account/profile').json();
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

export const changePassword = (payload: ChangePasswordPayload): Promise<unknown> => {
  return request.post('account/change_password', { json: payload }).json();
};
