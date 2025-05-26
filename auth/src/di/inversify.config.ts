import { Container } from "inversify";
import TYPES from "./types";
import { AuthController } from "../controller/auth.controller";
import { AuthService } from "../service/auth.service";
import { JwtUtils } from "../utils/jwt.utils";
import { UserController } from "../controller/user.controller";
import { UserService } from "../service/user.service";

const container = new Container();

container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container.bind<AuthService>(TYPES.AuthService).to(AuthService);
container.bind<JwtUtils>(TYPES.JwtUtils).to(JwtUtils);
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<UserService>(TYPES.UserService).to(UserService);

export default container;
