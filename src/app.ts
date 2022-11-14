import "reflect-metadata";
import express from "express";
import "express-async-errors";
import cors from "cors";
import salesRoutes from "./routes/sales.routes";
import sessionRoutes from "./routes/session.routes";
import userRoutes from "./routes/user.routes";
import handleErrorMiddleware from "./middlewares/errorHandling.middleware";

const app = express();
app.use(cors());

app.use(express.json());

app.use("/sales", salesRoutes);
app.use("/login", sessionRoutes);
app.use("/user", userRoutes);

app.use(handleErrorMiddleware);

export default app;
