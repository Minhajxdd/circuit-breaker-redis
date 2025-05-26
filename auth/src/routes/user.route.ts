import { Router } from "express";
import container from "../di/inversify.config";
import TYPES from "../di/types";
import { UserController } from "../controller/user.controller";

const router = Router();
const userController = container.get<UserController>(TYPES.UserController);

router.get("/user", userController.getUser);

export default router;
