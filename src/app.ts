import "reflect-metadata";
import express from "express";
import "express-async-errors";
import salesRoutes from "./routes/sales.routes";
import loginRoutes from "./routes/login.routes";
import userRoutes from "./routes/user.routes";
import { Request, Response } from "express";
import handleErrorMiddleware from "./middlewares/errorHandling.middleware";

const app = express();

app.use(express.json());

app.use("/sales", salesRoutes);
app.use("/login", loginRoutes);
app.use("/user", userRoutes);

app.use(handleErrorMiddleware);

export default app;
