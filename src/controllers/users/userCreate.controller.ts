import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import userCreateService from "../../services/users/userCreate.service";

const userCreateController = async (req: Request, res: Response) => {
  const { email, name, password, is_adm } = req.body;
  const newUser = await userCreateService({
    email,
    name,
    password,
    is_adm,
  });

  return res.status(201).json(instanceToPlain(newUser));
};

export default userCreateController;
