import { Request, Response } from "express";
import salesGetService from "../../services/sales/salesGet.service";

const sallesGetController = async (req: Request, res: Response) => {
  const salles = await salesGetService();

  return res.json(salles);
};

export default sallesGetController;
