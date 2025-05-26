import { injectable } from "inversify";
import User from "../database/models/user.model";
import { BadRequestError } from "../errors/bad-request-error";

@injectable()
export class UserService {
  async getUser(userId: string) {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new BadRequestError("no user found");
    }

    const data = {
      fullName: user.toJSON().fullName,
      email: user.toJSON().email,
    };

    return {
      status: "succes",
      message: "successfully fetched user",
      data,
    };
  }
}
