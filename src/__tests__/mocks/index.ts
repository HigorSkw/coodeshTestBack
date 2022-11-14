import { IUserLogin, IUserRequest, IUserUpdate } from "../../interfaces";

export const mockedAdmin: IUserRequest = {
  name: "Higor Skowronski",
  email: "higor@email.com",
  password: "123456",
  is_adm: true,
};

export const mockedUser: IUserRequest = {
  name: "Nelson Freitas",
  email: "nelson@email.com",
  password: "123456",
  is_adm: false,
};

export const mockedAdminLogin: IUserLogin = {
  email: "higor@email.com",
  password: "123456",
};

export const mockedUserLogin: IUserLogin = {
  email: "nelson@email.com",
  password: "123456",
};
