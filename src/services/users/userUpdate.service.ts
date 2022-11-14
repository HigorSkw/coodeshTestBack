import { User } from "../../entities/user.entity";
import AppDataSource from "../../data-source";
import { IUserUpdate } from "../../interfaces";
import { AppError } from "../../errors/appErrors";

interface IUserUpdateProps extends IUserUpdate {
  id: string;
  is_adm: boolean;
}

const userUpdateService = async ({
  id,
  email,
  name,
  is_adm,
}: IUserUpdateProps) => {
  const userRepository = AppDataSource.getRepository(User);
  if (is_adm) throw new AppError("Not possible to update is_adm", 401);

  console.log("cheguei aqui");

  await userRepository.update(id, {
    email,
    name,
  });
  const userUpdated = userRepository.findOneBy({ id });
  return userUpdated;
};

export default userUpdateService;
