import { Router } from "express";

import userLoginController from "../controllers/users/userLogin.controller";

const loginRoutes = Router();

loginRoutes.post("", userLoginController);

export default loginRoutes;
