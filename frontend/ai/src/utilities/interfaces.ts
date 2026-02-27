export interface ItemType {
  id?: number;
  text: string;
}

export interface UserType {
  id?: number;
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  dateOfBirth: string;
  items: ItemType[];
}

export interface registerFormType {
  label: string;
  type: string;
  name: string;
  placeHolder?: string;
}
export interface RegisterInputValType {
  username: string;
  email: string;
  password: string;
  repassword: string;
  firstname: string;
  lastname: string;
  dateOfBirth: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  repassword: string;
  firstname: string;
  lastname: string;
  dateOfBirth: string;
}
export interface loginPayload {
  username: string;
  password: string;
}
