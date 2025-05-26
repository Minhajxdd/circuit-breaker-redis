import { Request, Response, Router } from "express";
import container from "../di/inversify.config";
import TYPES from "../di/types";
import { body } from "express-validator";
import { ProfileController } from "../controller/profile.controller";

const router = Router();
const profileController = container.get<ProfileController>(
  TYPES.ProfileController
);
router.post(
  "/create",
  [
    body("bio").isString().optional(),
    body("skills")
      .isArray()
      .optional()
      .withMessage("Skills must be an array of strings."),
    body("skills.*").isString().withMessage("Each skill must be a string."),
  ],
  profileController.createProfile
);

export default router;
