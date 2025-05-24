import { AuthService } from "../service/auth.service";

const TYPES = {
  AuthController: Symbol.for("AuthController"),
  AuthService: Symbol.for("AuthService"),
};

export default TYPES;
