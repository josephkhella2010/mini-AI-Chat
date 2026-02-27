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
