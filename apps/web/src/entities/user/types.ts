export interface User {
  uuid: string;
  email: string;
  first_name: string;
  last_name: string;
  verified: string;
  email_verified: string;
  created_at: string;
  updated_at: string;
}

export interface UpdatePasswordPayload {
  old_password: string;
  new_password: string;
  new_password_confirm: string;
}
