import { Router } from "express";
import container from "../di/inversify.config";
import TYPES from "../di/types";
import { body } from "express-validator";
import { ProfileController } from "../controller/profile.controller";

const router = Router();
const profileController = container.get<ProfileController>(TYPES.ProfileController);



export default router;
