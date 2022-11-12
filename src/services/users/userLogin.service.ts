import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appErrors";
import { IUserLogin } from "../../interfaces";
import { User } from "../../entities/user.entity";

const userLoginService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ email });

  if (!user) throw new AppError("Wrong e-mail or password.", 403);

  if (!bcrypt.compareSync(password, user.password))
    throw new AppError("Wrong e-mail or password.", 403);

  const token = jwt.sign(
    {
      is_adm: user.is_adm,
    },
    String(process.env.SECRET_KEY),
    {
      expiresIn: "1h",
      subject: user.id,
    }
  );

  return token;
};

export default userLoginService;
