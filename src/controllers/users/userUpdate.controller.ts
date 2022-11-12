import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import userUpdateService from "../../services/users/userUpdate.service";

const userUpdateController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { email, name, is_adm } = req.body;

  const userDataUpdated = await userUpdateService({
    id,
    email,
    name,
    is_adm,
  });
  return res.status(200).json(instanceToPlain(userDataUpdated));
};

export default userUpdateController;
