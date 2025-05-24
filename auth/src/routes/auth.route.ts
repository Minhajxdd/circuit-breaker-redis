import { Router } from "express";
import container from "../di/inversify.config";
import TYPES from "../di/types";
import { AuthController } from "../controller/auth.controller";


const router = Router();
const userController = container.get<AuthController>(TYPES.AuthController);

router.route('/signup').get(userController.signup);

export default router;
