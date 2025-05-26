import { injectable } from "inversify";
import Redis from "ioredis";

import Profile from "../database/models/profile.model";
import { BadRequestError } from "../errors/bad-request-error";
import configuration from "../config/config";
import { CircuitBreaker } from "../utils/circuit-breaker.utils";

const redis = new Redis({
  host: configuration().redisConfiguration.host,
  port: configuration().redisConfiguration.port,
});

@injectable()
export class ProfileService {
  async fetchUserFromAuthService(userId: string) {
    return new Promise((resolve, reject) => {
      const breaker = new CircuitBreaker(
        {
          method: "GET",
          url: `${
            configuration().services.auth_service
          }/auth/user?userId=${userId}`,
          timeout: 10000,
        },
        {
          redis,
          serviceId: "auth-service",
          failureThreshold: 3,
          timeout: 3000,
        }
      );

      breaker.fire().then((data) => {
        if (!data?.data?.fullName || !data?.data?.email) {
          resolve({});
        }
        resolve(data.data);
      });
    });
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
