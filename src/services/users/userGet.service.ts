import { User } from "../../entities/user.entity";
import AppDataSource from "../../data-source";

interface IUserGetServiceProps {
  id: string;
}

const userGetService = async ({ id }: IUserGetServiceProps) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id });
  const allUser = await userRepository.find();

  if (user?.is_adm) return allUser;

  return allUser.find((user) => user.id === id);
};

export default userGetService;
