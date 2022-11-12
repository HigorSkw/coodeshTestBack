import { Router } from "express";
import { authUser } from "../middlewares/authUser.middleware";

import userCreateController from "../controllers/users/userCreate.controller";
import userDeleteController from "../controllers/users/userDelete.controller";
import userGetController from "../controllers/users/userGet.controller";
import userUpdateController from "../controllers/users/userUpdate.controller";

const userRoutes = Router();

userRoutes.post("", userCreateController);

userRoutes.delete("/:id", userDeleteController);

userRoutes.get("", authUser, userGetController);

userRoutes.patch("/:id", userUpdateController);

export default userRoutes;
