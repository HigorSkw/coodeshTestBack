import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appErrors";

const userDeleteService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const userAlreadyExists = await userRepository.findOneBy({
    id,
  });
  if (!userAlreadyExists) {
    throw new AppError("user not exists");
  }

  await userRepository.delete({ id });

  return true;
};

export default userDeleteService;
