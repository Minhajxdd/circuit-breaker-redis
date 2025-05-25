import { inject, injectable } from "inversify";
import TYPES from "../di/types";
import { Request, Response } from "express";
import { AuthService } from "../service/auth.service";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";

@injectable()
export class AuthController {
  constructor(@inject(TYPES.AuthService) private _authService: AuthService) {}

  signup = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { fullName, email, password } = req.body;

    const user = await this._authService.signUp(fullName, email, password);

    res.send(user);
  };
}
