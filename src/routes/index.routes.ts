import { Router, Request, Response } from "express";
import multer from "multer";
import salesUploadController from "../controllers/sales/salesUpload.controller";
import sallesGetController from "../controllers/sales/salesGet.controller";

const multerConfig = multer();

const appRouter = Router();

appRouter.post("/", multerConfig.single("file"), salesUploadController);
appRouter.get("/", sallesGetController);

export default appRouter;
