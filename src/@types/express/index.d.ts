import { IUserRequest, IUserUpdate } from "./../../interfaces/index";
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        is_adm: boolean;
      };
      newUser: IUserRequest;
      newUserUpdate: IUserUpdate;
    }
  }
}
