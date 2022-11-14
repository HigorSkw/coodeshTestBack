import { Readable } from "stream";
import readLine from "readline";
import { ISalesRequest } from "../../interfaces";
import { Sales } from "../../entities/sales.entity";
import { User } from "../../entities/user.entity";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appErrors";

const salesUploadService = async (buffer: Buffer | undefined, id: string) => {
  const readableFile = new Readable();
  readableFile.push(buffer);
  readableFile.push(null);

  const salesLine = readLine.createInterface({
    input: readableFile,
  });

  const sales: ISalesRequest[] = [];

  for await (let line of salesLine) {
    const arraySalle = line.split("");
    const type = +arraySalle.slice(0, 1).join("");
    const date = new Date(arraySalle.slice(1, 26).join(""));
    const product = arraySalle.slice(26, 56).join("");
    const value = Number(arraySalle.slice(56, 66).join(""));
    const seller = arraySalle.slice(66, 86).join("");

    if (line.split("").length !== 0) {
      sales.push({ type, date, product, value, seller });
    }
  }

  const salesRepository = AppDataSource.getRepository(Sales);
  const userRespository = AppDataSource.getRepository(User);

  const ownerSales = await userRespository.findOneBy({
    id,
  });
  if (!ownerSales) {
    throw new AppError("user not exists");
  }

  for await (let { type, date, product, value, seller } of sales) {
    const sale = new Sales();
    sale.type = type;
    sale.date = date;
    sale.product = product;
    sale.value = value;
    sale.seller = seller;
    sale.user = ownerSales;

    salesRepository.create(sale);

    await salesRepository.save(sale);
  }

  let totalizer: number = 0;

  sales.forEach((el) => {
    el.type == 3 ? (totalizer -= el.value) : (totalizer += el.value);
  });

  return { totalizer: totalizer, sales: sales };
};

export default salesUploadService;
