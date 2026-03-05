export interface ItemsChatType {
  id?: number;
  question: string;
  answer: string;
}

export interface ChatType {
  chatId?: number | null;
  chatItems: ItemsChatType[];
}

export interface UserType {
  id?: number;
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  dateOfBirth: string;
  items: ChatType[];
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
export interface SaveInputValType {
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  dateOfBirth: string;
}
export interface loginPayload {
  username: string;
  password: string;
}
export interface singleUserType {
  user: UserType | null;
  token?: string | null;
}
