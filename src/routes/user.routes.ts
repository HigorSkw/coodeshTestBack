import { Router } from "express";
import { authUser } from "../middlewares/authUser.middleware";

import userCreateController from "../controllers/users/userCreate.controller";
import userDeleteController from "../controllers/users/userDelete.controller";
import userGetController from "../controllers/users/userGet.controller";
import userUpdateController from "../controllers/users/userUpdate.controller";
import { verifyPermission } from "../middlewares/validadePermission.middleware";

const userRoutes = Router();

userRoutes.post("", userCreateController);

userRoutes.delete("/:id", authUser, verifyPermission, userDeleteController);

userRoutes.get("", authUser, userGetController);

userRoutes.patch("/:id", authUser, verifyPermission, userUpdateController);

export default userRoutes;
