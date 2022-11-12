import { User } from "../entities/user.entity";

export interface ISalesRequest {
  type: number;
  date: Date;
  product: string;
  value: number;
  seller: string;
}

export interface ISales extends ISalesRequest {
  id: string;
  user: User;
}

export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  is_adm?: boolean;
}

export interface IUser extends IUserRequest {
  id: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}
