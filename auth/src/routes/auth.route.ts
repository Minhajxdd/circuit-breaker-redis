import { Router } from "express";
import container from "../di/inversify.config";
import TYPES from "../di/types";
import { AuthController } from "../controller/auth.controller";
import { body } from "express-validator";

const router = Router();
const authController = container.get<AuthController>(TYPES.AuthController);

router.post(
  "/signup",
  [
    body("fullName").trim().notEmpty().withMessage("Full name is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  authController.signup
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  authController.login
);

export default router;
