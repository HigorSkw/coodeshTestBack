import { Router } from "express";
import { authUser } from "../middlewares/authUser.middleware";
import multer from "multer";
import salesUploadController from "../controllers/sales/salesUpload.controller";
import sallesGetController from "../controllers/sales/salesGet.controller";

const multerConfig = multer();

const salesRouter = Router();

salesRouter.post(
  "/",
  authUser,
  multerConfig.single("file"),
  salesUploadController
);
salesRouter.get("/", authUser, sallesGetController);

export default salesRouter;
