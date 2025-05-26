import { injectable } from "inversify";
import Profile from "../database/models/profile.model";
import { BadRequestError } from "../errors/bad-request-error";

@injectable()
export class ProfileService {
  async fetchUserFromAuthService(userId: string) {
    return {
      fullName: "Abaad Ahmad",
      email: "abaad@example.com",
    };
  }

  async createProfile(
    fullName: string,
    email: string,
    bio: string,
    skills: string[]
  ) {
    const isEmailExists = await Profile.findOne({
      where: {
        email,
      },
    });

    if (isEmailExists != null) {
      throw new BadRequestError("Profile Already Exists");
    }

    const profile = await Profile.create({ fullName, email, bio, skills });

    return {
      status: "success",
      message: "successfully created profile",
      profile,
    };
  }
}
