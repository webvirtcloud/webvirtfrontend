export interface User {
  email: string;
  first_name: string;
  last_name: string;
}

export interface UpdatePasswordPayload {
  old_password: string;
  new_password: string;
  new_password_confirm: string;
}
