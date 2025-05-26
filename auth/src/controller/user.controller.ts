import { inject, injectable } from "inversify";
import TYPES from "../di/types";
import { Request, Response } from "express";
import { UserService } from "../service/user.service";
import { BadRequestError } from "../errors/bad-request-error";

@injectable()
export class UserController {
  constructor(@inject(TYPES.UserService) private _userService: UserService) {}

  getUser = async (req: Request, res: Response) => {
    const { userId } = req.query;

    if (!userId) {
      throw new BadRequestError("userId is required");
    }

    const data = await this._userService.getUser("" + userId);

    res.send(data);
  };
}
