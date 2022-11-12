import { Request, Response } from "express";
import salesUploadService from "../services/example.service";

const salesUploadController = async (req: Request, res: Response) => {
  const { file } = req;
  const buffer = file?.buffer;

  const salesUploadComplete = await salesUploadService(buffer);

  return res.status(200).json(salesUploadComplete);
};

export default salesUploadController;
