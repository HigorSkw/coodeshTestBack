import AppDataSource from "../../data-source";
import { Sales } from "../../entities/sales.entity";
import { User } from "../../entities/user.entity";
import { ISales } from "../../interfaces";

const salesGetService = async (idUser: string) => {
  const salesRepository = AppDataSource.getRepository(Sales);
  const userRespository = AppDataSource.getRepository(User);

  const user = await userRespository.findOneBy({
    id: idUser,
  });

  let sales: ISales[];

  if (user?.is_adm) {
    sales = await salesRepository.find();
  } else {
    sales = await salesRepository.find({
      where: {
        user: {
          id: idUser,
        },
      },
    });
  }
  let totalizer: number = 0;

  sales.forEach((el) => {
    el.type == 3 ? (totalizer -= el.value) : (totalizer += el.value);
  });

  return { totalizer: totalizer, sales: sales };
};

export default salesGetService;
