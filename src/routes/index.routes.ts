import { Router, Request, Response } from "express";
import multer from "multer";
import salesUploadController from "../controllers/example.controller";

const multerConfig = multer();

const appRouter = Router();

appRouter.post("/", multerConfig.single("file"), salesUploadController);

export default appRouter;
