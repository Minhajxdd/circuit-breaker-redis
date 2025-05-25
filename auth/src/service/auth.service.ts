import { inject, injectable } from "inversify";
import bcrypt from "bcryptjs";
import User from "../database/models/user.model";
import { BadRequestError } from "../errors/bad-request-error";
import TYPES from "../di/types";
import { JwtUtils } from "../utils/jwt.utils";
import { Response } from "express";

@injectable()
export class AuthService {
  constructor(@inject(TYPES.JwtUtils) private _jwtUtils: JwtUtils) {}

  async signUp(
    res: Response,
    fullName: string,
    email: string,
    password: string
  ) {
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

    const token = await this._jwtUtils.generateToken({
      userId: user.toJSON().id,
    });

    res.cookie("token", token, {
      maxAge: 60 * 60 * 1000,
    });

    return {
      status: "success",
      message: "successfully signup",
      user,
    };
  }

  async login(res: Response, email: string, password: string) {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (user == null) {
      throw new BadRequestError("Invalid email or password");
    }

    const match = await bcrypt.compare(password, user.toJSON().password);

    if (!match) {
      throw new BadRequestError("Invalid email or password");
    }

    const token = await this._jwtUtils.generateToken({
      userId: user.toJSON().id,
    });

    res.cookie("token", token, {
      maxAge: 60 * 60 * 1000,
    });

    return {
      status: "success",
      message: "successfully loggedin",
      user,
    };
  }
}
