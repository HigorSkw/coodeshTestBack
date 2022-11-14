import { Request, Response } from "express";
import salesUploadService from "../../services/sales/salesUpload.service";

const salesUploadController = async (req: Request, res: Response) => {
  const { file } = req;
  const buffer = file?.buffer;
  const { id } = req.user;

  const salesUploadComplete = await salesUploadService(buffer, id);

  return res.status(201).json(salesUploadComplete);
};

export default salesUploadController;
