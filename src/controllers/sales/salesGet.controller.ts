import { Request, Response } from "express";
import salesGetService from "../../services/sales/salesGet.service";

const sallesGetController = async (req: Request, res: Response) => {
  const { id } = req.user;

  const sallesValues = await salesGetService(id);

  return res.json(sallesValues);
};

export default sallesGetController;
