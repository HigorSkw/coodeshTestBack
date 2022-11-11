import { Request, Response } from "express";

const myController = async (req: Request, res: Response) => {
  console.log("Exemplo de controoler que irei utilizar!");
};

export default myController;
