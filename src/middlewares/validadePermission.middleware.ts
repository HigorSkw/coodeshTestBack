import { Request, Response, NextFunction } from "express";
import { User } from "../entities/user.entity";
import AppDataSource from "../data-source";
import { AppError } from "../errors/appErrors";

export const verifyPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id: idUser } = req.params;
  const { id } = req.user;

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id });
  if (!user) throw new AppError("user not exists");

  if (user.is_adm) return next();

  if (idUser !== id) {
    return res.status(401).json({ message: "User not authorized" });
  }

  next();
};
