import "reflect-metadata";
import express from "express";
import "express-async-errors";
import appRoutes from "./routes/index.routes";
import { Request, Response } from "express";
import handleErrorMiddleware from "./middlewares/errorHandling.middleware";

const app = express();

app.use(express.json());

app.use(appRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello World",
  });
});

app.use(handleErrorMiddleware);

export default app;
