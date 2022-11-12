import { Router, Request, Response } from "express";
import multer from "multer";
import salesUploadController from "../controllers/sales/salesUpload.controller";
import sallesGetController from "../controllers/sales/salesGet.controller";

const multerConfig = multer();

const salesRouter = Router();

salesRouter.post("/", multerConfig.single("file"), salesUploadController);
salesRouter.get("/", sallesGetController);

export default salesRouter;
