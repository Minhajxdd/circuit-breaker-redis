import { inject, injectable } from "inversify";
import TYPES from "../di/types";
import { ProfileService } from "../service/profile.service";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { Request, Response } from "express";

@injectable()
export class ProfileController {
  constructor(
    @inject(TYPES.ProfileService) private profileService: ProfileService
  ) {}

  createProfile = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const userId = req.user?.userId;

    const userData = await this.profileService.fetchUserFromAuthService(userId);

    const { fullName, email } = userData;

    const { bio, skills } = req.body;

    const data = await this.profileService.createProfile(
      fullName,
      email,
      bio,
      skills
    );

    res.send(data);
  };
}
