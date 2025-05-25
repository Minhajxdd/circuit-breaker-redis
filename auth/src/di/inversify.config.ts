// inversify.config.ts
import { Container } from "inversify";
import TYPES from "./types";
import { AuthController } from "../controller/auth.controller";
import { AuthService } from "../service/auth.service";
import { JwtUtils } from "../utils/jwt.utils";

const container = new Container();

container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container.bind<AuthService>(TYPES.AuthService).to(AuthService);
container.bind<JwtUtils>(TYPES.JwtUtils).to(JwtUtils);


export default container;
