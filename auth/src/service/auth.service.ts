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


  async signUp(res: Response, fullName: string, email: string, password: string) {
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

    const token = await this._jwtUtils.generateToken({userId: user.toJSON().id});

    res.cookie('token', token, {
      maxAge: 60 * 60 * 1000
    });

    return {
      status: "success",
      message: "successfully signup",
      user,
    };
  }
}
