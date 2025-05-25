import { injectable } from "inversify";
import bcrypt from "bcryptjs";
import User from "../database/models/user.model";
import { BadRequestError } from "../errors/bad-request-error";

@injectable()
export class AuthService {
  async signUp(fullName: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const isEmail = await User.findOne({
      where: {
        email: email,
      },
    });

    if (isEmail != null) {
      throw new BadRequestError("Email Already Exists");
    }

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    return {
      status: "success",
      message: "successfully signup",
      user,
    };
  }
}
