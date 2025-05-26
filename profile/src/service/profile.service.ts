import { injectable } from "inversify";
import Profile from '../database/models/profile.model'

@injectable()
export class ProfileService {
  async fetchUserFromAuthService() {
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
    // Check if email already exists

    // const existing = await Profile.findOne({ where: { email: data.email } });
    // if (existing) {
    //   throw new Error("Profile with this email already exists.");
    // }

    // const profile = await Profile.create(data);
    // return profile;
  }
}
