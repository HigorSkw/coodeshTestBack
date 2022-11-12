import { Readable } from "stream";
import readLine from "readline";
import { ISalesRequest } from "../../interfaces";
import { Sales } from "../../entities/sales.entity";
import AppDataSource from "../../data-source";

const salesUploadService = async (buffer: Buffer | undefined) => {
  const readableFile = new Readable();
  readableFile.push(buffer);
  readableFile.push(null);

  const sallesLine = readLine.createInterface({
    input: readableFile,
  });

  const salles: ISalesRequest[] = [];

  for await (let line of sallesLine) {
    const arraySalle = line.split("");
    const type = +arraySalle.slice(0, 1).join("");
    const date = new Date(arraySalle.slice(1, 26).join(""));
    const product = arraySalle.slice(26, 56).join("");
    const value = Number(arraySalle.slice(56, 66).join(""));
    const seller = arraySalle.slice(66, 86).join("");

    if (line.split("").length !== 0) {
      salles.push({ type, date, product, value, seller });
    }
  }

  const salesRepository = AppDataSource.getRepository(Sales);

  for await (let { type, date, product, value, seller } of salles) {
    const sales = new Sales();
    sales.type = type;
    sales.date = date;
    sales.product = product;
    sales.value = value;
    sales.seller = seller;

    salesRepository.create(sales);

    await salesRepository.save(sales);
  }

  return salles;
};

export default salesUploadService;
