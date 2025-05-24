import { injectable } from "inversify";

@injectable()
export class AuthService {
  signUp() {
    return {
      status: "success",
      message: "di working",
    };
  }
}
