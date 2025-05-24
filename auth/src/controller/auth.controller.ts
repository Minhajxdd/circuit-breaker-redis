import { inject, injectable } from "inversify";
import TYPES from "../di/types";
import { Request, Response } from "express";
import { AuthService } from "../service/auth.service";

@injectable()
export class AuthController {
  constructor(
    @inject(TYPES.AuthService) private _authService: AuthService
  ) {}

  signup = async (req: Request, res: Response) => {
    const user = await this._authService.signUp();
    res.send(user);
  };
}
