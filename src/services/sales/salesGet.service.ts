import AppDataSource from "../../data-source";
import { Sales } from "../../entities/sales.entity";
import { ISales } from "../../interfaces";

const salesGetService = async () => {
  const salesRepository = AppDataSource.getRepository(Sales);

  let salles: ISales[];
  salles = await salesRepository.find();

  return salles;
};

export default salesGetService;
