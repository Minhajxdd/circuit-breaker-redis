import { Request, Response, Router } from "express";
import container from "../di/inversify.config";
import TYPES from "../di/types";
import { body } from "express-validator";
import { ProfileController } from "../controller/profile.controller";
import extractUserFromHeaders from "../middlewares/extractUserFromHeaders";

const router = Router();
const profileController = container.get<ProfileController>(
  TYPES.ProfileController
);
router.post(
  "/create",
  extractUserFromHeaders,
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
